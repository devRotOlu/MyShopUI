import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { AppContextProp, productType, cartType } from "../types.ts";
import { myShopAxios } from "../axios.ts";

export const appContext = React.createContext();

const AppContext = ({ children }: AppContextProp) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const isJustLoggedIn = useRef<boolean>(false);
  const [cart, setCart] = useState<cartType[]>([]);

  const [products, setProducts] = useState<productType[]>([]);

  const getProducts = async () => {
    return await myShopAxios.get("Product/list-products");
  };

  const getCartItems = async () => {
    return await myShopAxios.get("Cart");
  };

  const { data: productData, isSuccess: productsFetched } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  const { refetch: cartRefetch, data: cartData, isSuccess: cartFetched } = useQuery({ queryKey: ["cart"], enabled: false, queryFn: getCartItems });

  useEffect(() => {
    if (productsFetched && !products.length) {
      setProducts(productData.data);
    }
  }, [productsFetched, productData, products.length]);

  useEffect(() => {
    if (isLoggedIn && !cart.length) {
      cartRefetch();
    } else if (!isLoggedIn && !cart.length) {
      setCart([]);
    }
  }, [cart.length, cartRefetch, isLoggedIn]);

  useEffect(() => {
    if (cartFetched && !cart.length) {
      setCart((prevCart) => [...prevCart, ...cartData.data]);
    }
  }, [cart.length, cartData, cartFetched]);

  return <appContext.Provider value={{ isLoggedIn, setIsLoggedIn, isJustLoggedIn, products, cart, cartCount: cart.length }}>{children}</appContext.Provider>;
};

export default AppContext;
