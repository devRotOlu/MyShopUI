import { useMutation } from "@tanstack/react-query";
import { removeFromWishlist } from "../helperFunctions/dataFetchFunctions";

export const useDeleteWishlist = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: removeFromWishlist,
  });

  return {
    deleteFromWishlist: mutate,
    isDeletingWishlistItem: isPending,
    isDeletedWishlistItem: isSuccess,
  };
};
