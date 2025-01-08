import React, { useState, useRef, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { AppContextProp, productType, cartType, userDataType, addedItemType, updatedItemType } from "../types.ts";
import { getProducts, getCartItems, validateAccessToken, updateTokens, addItemsToCart, updateCartItems } from "../helperFunctions/dataFetchFunctions.ts";
import { getLocalCartItems, emptyLocalCart } from "../helperFunctions/utilityFunctions.ts";

// 10 minutes
const tokenRefreshTime = 10 * 1000 * 60;

export const appContext = React.createContext();

const AppContext = ({ children }: AppContextProp) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isOldSession, setIsOldSession] = useState(false);

  const navigate = useNavigate();

  const isfirstHomeRenderRef = useRef<boolean>(true);
  const justRefreshedRef = useRef<boolean>(true);

  const [cart, setCart] = useState<cartType[]>([]);
  const prevCartRef = useRef(cart);

  // this signals if the cart items fetched
  // from DB has hydrated our cart state
  const isCartUpdatedRef = useRef(false);

  // These keep hold of items that are added newly
  // and those that already exists in the DB and
  // needed to be updated
  const updatedItemsRef = useRef<updatedItemType[]>([]);
  const addedItemsRef = useRef<addedItemType[]>([]);

  const [loginData, setLoginData] = useState<userDataType>({});

  const [products, setProducts] = useState<productType[]>([]);

  const { data: productData, isSuccess: productsFetched } = useQuery({ queryKey: ["products"], queryFn: getProducts, staleTime: 3 * 60 * 1000 });

  const { isSuccess: tokenValidated, data: userData } = useQuery({
    queryKey: ["validate_token"],
    queryFn: validateAccessToken,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: updateItems, isSuccess: itemsUpdated } = useMutation({
    mutationFn: updateCartItems,
  });

  const { mutate: addItems, isSuccess: itemsAdded } = useMutation({
    mutationFn: addItemsToCart,
  });

  const {
    refetch: cartRefetch,
    data: cartData,
    isSuccess: cartFetched,
    isError: cartFetchError,
  } = useQuery({
    queryKey: ["cart"],
    enabled: () => (isLoggedIn ? true : false),
    queryFn: async () => {
      return await getCartItems(loginData.email);
    },
    refetchInterval: () => (isLoggedIn && (itemsAdded || itemsUpdated) ? 4000 : false),
  });

  const { mutate: mutateTokensRefresh, isError: refreshFailed } = useMutation({
    mutationFn: () => updateTokens(loginData.id),
  });

  if (tokenValidated && !isLoggedIn) {
    setIsLoggedIn(true);
    setLoginData(userData.data);
    setIsOldSession(true);
  }

  if (productsFetched && !products.length) {
    setProducts(productData.data);
  }

  if (isLoggedIn && !cartData && loginData?.email) {
    cartRefetch();
  }

  const cartItems = getLocalCartItems().length;

  if (!isLoggedIn && !cart.length && cartItems.length) {
    setCart([...cartItems]);
  }

  if ((itemsAdded || itemsUpdated) && Object.keys(cartItems).length) {
    emptyLocalCart();
  }

  const cartItemsCount = useMemo(() => {
    var count = 0;
    if (isLoggedIn || cart !== prevCartRef.current) {
      for (let index = 0; index < cart.length; index++) {
        count += cart[index].cartQuantity;
      }
      return count;
    }
    return count;
  }, [isLoggedIn, cart]);

  useEffect(() => {
    if (cartFetched && !isCartUpdatedRef.current) {
      var fetchedData = cartData.data as cartType[];
      var currentCart: cartType[] = [...cart];

      // filter out all items that already exists
      // in DB as cart items
      currentCart = currentCart.filter((item) => {
        const {
          cartQuantity: itemQuantity,
          product: { id },
        } = item;

        for (let index = 0; index < fetchedData.length; index++) {
          const {
            cartQuantity: productQuantity,
            product: { id: productId },
            id: cartId,
          } = fetchedData[index];
          if (id === productId) {
            updatedItemsRef.current = [
              ...updatedItemsRef.current,
              {
                quantity: itemQuantity + productQuantity,
                productId: productId,
                customerId: loginData.id,
                id: cartId,
              },
            ];
            return false;
          }
        }
        const currentItem: addedItemType = {
          customerId: loginData.id,
          quantity: item.cartQuantity,
          productId: item.product.id,
        };
        addedItemsRef.current = [...addedItemsRef.current, currentItem];
        return true;
      });
      setCart([...currentCart, ...fetchedData]);
      isCartUpdatedRef.current = true;
    }
  }, [cart, cartData, cartFetched, itemsAdded, itemsUpdated, loginData]);

  useEffect(() => {
    if (cart !== prevCartRef.current) {
      prevCartRef.current = cart;
    }
  }, [cart]);

  useEffect(() => {
    const myTimeInterval = setInterval(() => {
      if (isLoggedIn) {
        justRefreshedRef.current = true;
        mutateTokensRefresh();
      }
    }, tokenRefreshTime);
    return () => clearInterval(myTimeInterval);
  }, [isLoggedIn, mutateTokensRefresh]);

  useEffect(() => {
    if (isLoggedIn && refreshFailed && justRefreshedRef.current) {
      justRefreshedRef.current = false;
      setIsLoggedIn(false);
      navigate("/account/login");
    }
  }, [isLoggedIn, navigate, refreshFailed]);

  useEffect(() => {
    if (isLoggedIn && !itemsUpdated && updatedItemsRef.current.length) {
      updateItems(updatedItemsRef.current);
      updatedItemsRef.current = [];
    }
  }, [isLoggedIn, itemsUpdated, updateItems, cart]);

  useEffect(() => {
    if (isLoggedIn && !itemsAdded && addedItemsRef.current.length) {
      addItems(addedItemsRef.current);
      addedItemsRef.current = [];
    }
  }, [addItems, isLoggedIn, itemsAdded, cart]);

  return (
    <appContext.Provider value={{ isLoggedIn, setIsLoggedIn, isfirstHomeRenderRef, products, cart, cartItemsCount, setCart, loginData, setLoginData, prevCartRef, cartFetchLastItem: cartData ? cartData.data[cartData.data.length - 1] : undefined, isOldSession, setIsOldSession }}>
      {children}
    </appContext.Provider>
  );
};

export default AppContext;
