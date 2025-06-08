import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Alert from "../alert/Alert";

import { ProvidersProp, wishlistContextType, wishlistType } from "../../types";
import { removeFromWishlist } from "../../helperFunctions/dataFetchFunctions";
import { alertContext } from "./AlertProvider";

export const wishlistContext = React.createContext({} as wishlistContextType);

const WishlistProvider = ({ children }: ProvidersProp) => {
  const { handleAlert } = useContext(alertContext);
  const [wishList, setWishList] = useState<wishlistType[]>([]);

  const {
    mutate: deleteFromWishlist,
    isPending: isDeletingWishlistItem,
    isSuccess: isDeletedWishlistItem,
  } = useMutation({
    mutationFn: removeFromWishlist,
  });

  useEffect(() => {
    if (isDeletedWishlistItem) {
      const alertDialog = <Alert alertMessage="Product removed from saved items." styles={{ backgroundColor: `var(--light_Green)` }} />;
      handleAlert({ showAlert: true, alertDialog });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeletedWishlistItem]);

  return <wishlistContext.Provider value={{ wishList, setWishList, deleteFromWishlist, isDeletingWishlistItem, isDeletedWishlistItem }}>{children}</wishlistContext.Provider>;
};

export default WishlistProvider;
