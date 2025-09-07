import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { updateCartItem } from "../helperFunctions/dataFetchFunctions";
import { getLocalCartItems, setLocalCart } from "../helperFunctions/utilityFunctions";
import { useUpdateItemDataType } from "../types/types";
import { userContext } from "../components/context/UserProvider";

export const useUpdateCartItem = (setLocalStorageIndex: Dispatch<SetStateAction<number>>): useUpdateItemDataType => {
  const [isLocalUpdate, setIsLocalUpdate] = useState(false);
  const {
    loginData: { id: customerId },
    isLoggedIn,
  } = useContext(userContext);

  const {
    mutate: updateItem,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: updateCartItem,
  });
  const updateQuantity = (value: number, productId: number, cartQuantity?: number, id?: number) => {
    if (isLoggedIn) {
      updateItem({
        customerId,
        productId,
        quantity: cartQuantity! + value,
        id: id!,
      });
    } else {
      let cartItems = getLocalCartItems();
      let index = cartItems.findIndex(({ product: { id } }) => {
        return id === productId;
      });
      cartItems[index].cartQuantity += value;
      setLocalStorageIndex((prevIndex) => ++prevIndex);
      setLocalCart([...cartItems]);
      setIsLocalUpdate(true);
      const timeout = setTimeout(() => {
        setIsLocalUpdate(false);
        clearTimeout(timeout);
      }, 1000);
    }
  };
  return { isUpdatingCartItem: isPending || isLocalUpdate, updateCartItem: updateQuantity, isUpdatedCartItem: isSuccess };
};
