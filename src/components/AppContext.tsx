import React, { useState, useRef, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { AppContextProp, productType, cartType, userDataType, addedItemType, updatedItemType, AppContextType, isInitialRenderType, wishlistType } from "../types.ts";
import { getProducts, getCartItems, validateAccessToken, updateTokens, addItemsToCart, updateCartItems, getWishlist } from "../helperFunctions/dataFetchFunctions.ts";
import { getLocalCartItems, emptyLocalCart } from "../helperFunctions/utilityFunctions.ts";

// 10 minutes
const tokenRefreshTime = 65 * 1000 * 60;

export const appContext = React.createContext({} as AppContextType);

const AppContext = ({ children }: AppContextProp) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isOldSession, setIsOldSession] = useState(false);
  const [cart, setCart] = useState<cartType[]>([]);
  const [wishList, setWishList] = useState<wishlistType[]>([]);
  const [loginData, setLoginData] = useState<userDataType>({});

  const [products, setProducts] = useState<productType[]>([]);

  const navigate = useNavigate();

  const setInitialRender = (comp: string, value: boolean) => {
    isInitialRenderRef.current = {
      ...isInitialRenderRef.current,
      [comp]: value,
    };
  };

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
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["cart"],
    enabled: () => (isLoggedIn ? true : false),
    queryFn: async () => {
      return await getCartItems(loginData.email);
    },
    refetchInterval: () => (isLoggedIn ? 4000 : false),
  });

  const { refetch: wishlistReftech, data: wishlistData } = useQuery({
    queryFn: async () => {
      return await getWishlist(loginData.email);
    },
    queryKey: ["wishlist"],
    enabled: () => (isLoggedIn ? true : false),
    refetchInterval: () => (isLoggedIn ? 4000 : false),
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

  if (isLoggedIn && !cartData) {
    cartRefetch();
  }

  if (isLoggedIn && !wishlistData) {
    wishlistReftech();
  }

  // These keep hold of items that are added newly
  // and those that already exists in the DB and
  // needed to be updated
  const updatedItemsRef = useRef<updatedItemType[]>([]);
  const addedItemsRef = useRef<addedItemType[]>([]);

  const prevCartUpdateRef = useRef<number>(dataUpdatedAt);

  const prevCartRef = useRef(cart);
  const isInitialRenderRef = useRef<isInitialRenderType>({
    home: true,
  });

  useEffect(() => {
    const localCartItems = getLocalCartItems();
    const shouldDeleteCart =
      (updatedItemsRef.current.length && addedItemsRef.current.length && itemsAdded && itemsUpdated) ||
      (updatedItemsRef.current.length && !addedItemsRef.current.length && !itemsAdded && itemsUpdated) ||
      (!updatedItemsRef.current.length && addedItemsRef.current.length && itemsAdded && !itemsUpdated);
    if (shouldDeleteCart && localCartItems.length) {
      emptyLocalCart();
      updatedItemsRef.current = [];
      addedItemsRef.current = [];
    }
  }, [itemsAdded, itemsUpdated]);

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
    const isNewFetch = prevCartUpdateRef.current !== dataUpdatedAt;
    if (isNewFetch) {
      var fetchedData = cartData!.data as cartType[];
      setCart([...fetchedData]);
      prevCartUpdateRef.current = dataUpdatedAt;
    }
  }, [cartData, dataUpdatedAt]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (!isLoggedIn && !cartFetched) {
        var cartItems = getLocalCartItems();
        if (cartItems.length) {
          setCart([...cartItems]);
        }
      }
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [cartFetched, isLoggedIn]);

  useEffect(() => {
    if (cart !== prevCartRef.current) {
      prevCartRef.current = cart;
    }
  }, [cart]);

  useEffect(() => {
    const myTimeInterval = setInterval(() => {
      if (isLoggedIn) {
        mutateTokensRefresh();
      }
    }, tokenRefreshTime);
    return () => clearInterval(myTimeInterval);
  }, [isLoggedIn, mutateTokensRefresh]);

  useEffect(() => {
    if (isLoggedIn && refreshFailed) {
      setIsLoggedIn(false);
      navigate("/account/login");
    }
  }, [isLoggedIn, navigate, refreshFailed]);

  useEffect(() => {
    const localCartItems = getLocalCartItems();
    if (localCartItems.length && cartFetched) {
      var cart_data = cartData?.data as cartType[];
      for (let i = 0; i < localCartItems.length; i++) {
        const {
          cartQuantity: quantity,
          product: { id: localProductId },
        } = localCartItems[i];
        var isUpdate: boolean = false;
        for (let j = 0; j < cart_data.length; j++) {
          const {
            cartQuantity,
            product: { id: productId },
            id,
          } = cart_data[j];
          if (localProductId === productId) {
            updatedItemsRef.current.push({
              customerId: loginData.id,
              productId,
              quantity: quantity + cartQuantity,
              id,
            });
            isUpdate = true;
            break;
          }
        }

        if (!isUpdate) {
          addedItemsRef.current.push({
            customerId: loginData.id,
            productId: localProductId,
            quantity,
          });
        }
      }
    }
  }, [cartData?.data, cartFetched, loginData.id]);

  useEffect(() => {
    if (cartFetched && updatedItemsRef.current.length && !itemsAdded) {
      updateItems(updatedItemsRef.current);
    }
  }, [cartFetched, itemsAdded, updateItems]);

  useEffect(() => {
    if (cartFetched && addedItemsRef.current.length && !itemsUpdated) {
      addItems(addedItemsRef.current);
    }
  }, [addItems, cartFetched, itemsUpdated]);

  return <appContext.Provider value={{ isLoggedIn, setIsLoggedIn, products, cart, cartItemsCount, setCart, loginData, setLoginData, isOldSession, setIsOldSession, isInitialRender: isInitialRenderRef.current, setInitialRender }}>{children}</appContext.Provider>;
};

export default AppContext;
