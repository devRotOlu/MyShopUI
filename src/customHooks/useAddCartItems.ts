import { useMutation } from "@tanstack/react-query";

import { addItemsToCart } from "../helperFunctions/dataFetchFunctions";
import { useContext, useEffect } from "react";
import { userContext } from "../components/context/UserProvider";
import { addedItemType, useAddCartItemsDataType } from "../types";

export const useAddCartItems = (addedItems: addedItemType[]): useAddCartItemsDataType => {
  const { isLoggedIn } = useContext(userContext);
  const { mutate, isSuccess } = useMutation({
    mutationFn: addItemsToCart,
  });

  useEffect(() => {
    if (isLoggedIn && addedItems.length && !isSuccess) {
      mutate(addedItems);
    }
  }, [addedItems, isLoggedIn, isSuccess, mutate]);

  return {
    cartItemsAdded: isSuccess,
    addCartItems: mutate,
  };
};
