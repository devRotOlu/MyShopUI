import { useMutation } from "@tanstack/react-query";

import { addToWishlist } from "../helperFunctions/dataFetchFunctions";
import { useAddToWhishlistDataType } from "../types";

export const useAddToWhishlist = (): useAddToWhishlistDataType => {
  const {
    mutate: saveForLater,
    isPending: isAddingToWishList,
    isSuccess,
  } = useMutation({
    mutationFn: addToWishlist,
  });

  const addItemToWishList = (customerId: string, productId: number) => {
    const data = {
      customerId,
      productId,
    };
    saveForLater(data);
  };

  return {
    addItemToWishList,
    isAddingToWishList,
    isAddedToWishlist: isSuccess,
  };
};
