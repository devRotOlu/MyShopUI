import { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { updateCartItems } from "../helperFunctions/dataFetchFunctions";
import { userContext } from "../components/context/UserProvider";
import { updatedItemType, useUpdateCartItemsDataType } from "../types";

export const useUpdateCartItems = (updatedItems: updatedItemType[]): useUpdateCartItemsDataType => {
  const { isLoggedIn } = useContext(userContext);
  const { mutate, isSuccess } = useMutation({
    mutationFn: updateCartItems,
  });

  useEffect(() => {
    if (isLoggedIn && updatedItems.length && !isSuccess) {
      mutate(updatedItems);
    }
  }, [isLoggedIn, isSuccess, mutate, updatedItems, updatedItems.length]);

  return {
    itemsUpdated: isSuccess,
    updateCartItems: mutate,
  };
};
