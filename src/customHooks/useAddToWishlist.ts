import { useMutation } from "@tanstack/react-query";

import { addToWishlist } from "../helperFunctions/dataFetchFunctions";
import { useAddToWhishlistDataType } from "../types/types";

export const useAddToWhishlist = (): useAddToWhishlistDataType => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: addToWishlist,
  });

  const addItemToWishList = (customerId: string, productId: number) => {
    const data = {
      customerId,
      productId,
    };
    mutate(data);
  };

  return {
    addItemToWishList,
    isAddingToWishList: isPending,
    isAddedToWishlist: isSuccess,
  };
};
