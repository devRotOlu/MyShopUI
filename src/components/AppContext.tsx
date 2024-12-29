import React, { useState, useRef, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { reactLocalStorage } from "reactjs-localstorage";

import { AppContextProp, productType, cartType, loginDataType } from "../types.ts";
import { getProducts, getCartItems } from "../helperFunctions/dataFetchFunctions.ts";

export const appContext = React.createContext();

const AppContext = ({ children }: AppContextProp) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const isfirstHomeRenderRef = useRef<boolean>(true);

  const [cart, setCart] = useState<cartType[]>([]);
  const prevCartRef = useRef(cart);
  const isCartUpdatedRef = useRef(false);

  const [loginData, setLoginData] = useState<loginDataType>({});

  const [products, setProducts] = useState<productType[]>([]);

  const { data: productData, isSuccess: productsFetched } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  console.log(productsFetched, "isFetched");

  const {
    refetch: cartRefetch,
    data: cartData,
    isSuccess: cartFetched,
    isError: cartFetchError,
  } = useQuery({
    queryKey: ["cart"],
    enabled: false,
    queryFn: async () => {
      return await getCartItems(loginData.user.email);
    },
  });

  if (productsFetched && !products.length) {
    setProducts(productData.data);
  }

  if (isLoggedIn && !cartData && !cartFetchError) {
    cartRefetch();
  }

  if (!isLoggedIn && !cart.length) {
    const cartItems = reactLocalStorage.getObject("cart");
    if (Object.keys(cartItems).length) {
      setCart([...cartItems]);
    }
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
      setCart((prevCart) => [...prevCart, ...cartData.data]);
      isCartUpdatedRef.current = true;
    }
  }, [cartData, cartFetched]);

  useEffect(() => {
    if (cart !== prevCartRef.current) {
      prevCartRef.current = cart;
    }
  }, [cart]);
  console.log("parent rendering");
  return <appContext.Provider value={{ isLoggedIn, setIsLoggedIn, isfirstHomeRenderRef, products, cart, cartItemsCount, setCart, loginData, setLoginData, prevCartRef, cartFetchLastItem: cartData ? cartData.data[cartData.data.length - 1] : undefined }}>{children}</appContext.Provider>;
};

export default AppContext;
