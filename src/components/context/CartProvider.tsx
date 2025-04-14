import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import Alert from "../alert/Alert";

import { addedItemType, cartContextType, cartType, ProvidersProp, updatedItemType } from "../../types";
import { addItemsToCart, deleteCartItem, getCartItems, updateCartItems } from "../../helperFunctions/dataFetchFunctions";
import { userContext } from "./UserProvider";
import { emptyLocalCart, getLocalCartItems } from "../../helperFunctions/utilityFunctions";
import { alertContext } from "./AlertProvider";

export const cartContext = React.createContext({} as cartContextType);

const CartProvider = ({ children }: ProvidersProp) => {
  const [cart, setCart] = useState<cartType[]>([]);

  const { loginData, isLoggedIn } = useContext(userContext);
  const { handleAlert } = useContext(alertContext);

  const { mutate: updateItems, isSuccess: itemsUpdated } = useMutation({
    mutationFn: updateCartItems,
  });

  const { mutate: addItems, isSuccess: itemsAdded } = useMutation({
    mutationFn: addItemsToCart,
  });

  const {
    mutate: deleteItem,
    isPending: isDeletingCartItem,
    isSuccess: itemDeleted,
    submittedAt: deletionTime,
  } = useMutation({
    mutationFn: deleteCartItem,
  });

  const {
    data: cartData,
    isSuccess: cartFetched,
    isError: cartFetchError,
    dataUpdatedAt: cartUpdateTime,
  } = useQuery({
    queryKey: ["cart"],
    enabled: () => (isLoggedIn ? true : false),
    queryFn: async () => {
      return await getCartItems(loginData.email);
    },
    refetchInterval: () => (isLoggedIn ? 4000 : false),
  });

  const prevCartRef = useRef(cart);
  const prevCartUpdateRef = useRef(cartUpdateTime);
  const deletionTimeRef = useRef(deletionTime);

  // These keep hold of items that are added newly
  // and those that already exists in the DB and
  // needed to be updated
  const updatedItemsRef = useRef<updatedItemType[]>([]);
  const addedItemsRef = useRef<addedItemType[]>([]);

  const { count: cartItemsCount, totalPrice: cartItemsTotalPrice } = useMemo(() => {
    var count = 0;
    var totalPrice = 0;
    if (isLoggedIn || cart !== prevCartRef.current) {
      for (let index = 0; index < cart.length; index++) {
        const {
          cartQuantity,
          product: { unitPrice },
        } = cart[index];
        count += cartQuantity;
        totalPrice += cartQuantity * unitPrice;
      }
    }
    return {
      count,
      totalPrice,
    };
  }, [isLoggedIn, cart]);

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
              id: id!,
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

  useEffect(() => {
    const isNewFetch = prevCartUpdateRef.current !== cartUpdateTime;
    if (isNewFetch) {
      var fetchedData = cartData!.data as cartType[];
      setCart([...fetchedData]);
      prevCartUpdateRef.current = cartUpdateTime;
    }
  }, [cartData, cartUpdateTime]);

  useEffect(() => {
    const isNewDeletion = itemDeleted && deletionTimeRef.current !== deletionTime;
    if (isNewDeletion) {
      const alertDialog = <Alert alertMessage="Product successfully removed from your Cart" styles={{ backgroundColor: `var(--light_Green)` }} />;
      deletionTimeRef.current = deletionTime;
      handleAlert({ showAlert: true, alertDialog });
    }
  });

  return <cartContext.Provider value={{ isDeletingCartItem, deleteCartItem: deleteItem, cart, cartItemsCount, cartItemsTotalPrice, setCart }}>{children}</cartContext.Provider>;
};

export default CartProvider;
