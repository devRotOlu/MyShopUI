import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { moveToWishlist } from "../helperFunctions/dataFetchFunctions";
import { useMoveToWishlistDataType } from "../types/types";

export const useMoveToWishlist = (): useMoveToWishlistDataType => {
  const [isItemExistErrorIndex, setIsItemExistErrorIndex] = useState<number>(0);
  const { isSuccess, isPending, mutate } = useMutation({
    mutationFn: moveToWishlist,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.status === 409) {
        setIsItemExistErrorIndex((prevIndex) => ++prevIndex);
      } else {
        setIsItemExistErrorIndex(0);
      }
    },
    onSuccess: () => {
      setIsItemExistErrorIndex(0);
    },
  });
  return {
    isMovedToWishlist: isSuccess,
    isMovingToWishlist: isPending,
    moveItemToWishlist: mutate,
    isItemExistErrorIndex,
  };
};
