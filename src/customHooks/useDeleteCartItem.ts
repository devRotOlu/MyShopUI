import { useMutation } from "@tanstack/react-query";

import { deleteCartItem } from "../helperFunctions/dataFetchFunctions";
import { useDeleteCartItemDataType } from "../types/types";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { userContext } from "../components/context/UserProvider";
import { getLocalCartItems, setLocalCart } from "../helperFunctions/utilityFunctions";

export const useDeleteCartItem = (setLocalStorageIndex: Dispatch<SetStateAction<number>>): useDeleteCartItemDataType => {
  const { isLoggedIn } = useContext(userContext);
  const [localDeleteIndex, setLocalDeleteIndex] = useState(0);
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: deleteCartItem,
  });

  const handleItemDeletion = (itemId?: number, productId?: number) => {
    if (isLoggedIn && itemId) {
      mutate(itemId);
    } else if (productId !== undefined && productId >= 0) {
      let cartItems = getLocalCartItems();
      cartItems = cartItems.filter(({ product: { id } }, _) => id !== productId);
      setLocalStorageIndex((prevIndex) => ++prevIndex);
      setLocalCart([...cartItems]);
      setLocalDeleteIndex((prevIndex) => ++prevIndex);
    }
  };

  return {
    isDeletingCartItem: isPending,
    cartItemDeleted: isSuccess,
    deleteCartItem: handleItemDeletion,
    isLocalDelete: localDeleteIndex,
  };
};
