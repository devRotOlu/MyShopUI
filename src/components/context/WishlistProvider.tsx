import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Alert from "../alert/Alert";
import AlertLinks from "../alertLinks/AlertLinks";

import { providersProp, wishlistContextType, wishlistType } from "../../types/types";
import { alertContext } from "./AlertProvider";
import { useDeleteWishlist } from "../../customHooks/useDeleteWishlist";
import { useAddToWhishlist } from "../../customHooks/useAddToWishlist";
import { useGetWishlist } from "../../customHooks/useGetWishlist";
import { userContext } from "./UserProvider";

export const wishlistContext = React.createContext({} as wishlistContextType);

const WishlistProvider = ({ children }: providersProp) => {
  const { handleAlert } = useContext(alertContext);
  const { isLoggedIn } = useContext(userContext);
  const [wishList, setWishList] = useState<wishlistType[]>([]);

  const { isLoadingWishlist, isFetchedWishlist, getWishlistQueryFinished } = useGetWishlist(setWishList);
  const { deleteFromWishlist, isDeletingWishlistItem, isDeletedWishlistItem } = useDeleteWishlist();
  const { addItemToWishList, isAddingToWishList, isAddedToWishlist } = useAddToWhishlist();

  useEffect(() => {
    if (isLoggedIn === false && wishList.length) {
      setWishList([]);
    }
  }, [isLoggedIn, wishList.length]);

  useEffect(() => {
    if (isAddedToWishlist) {
      const alertDialog = (
        <Alert styles={{ backgroundColor: `var(--light_Green)` }} alertMessage="Product added to saved items.">
          <AlertLinks>
            <Link to="/account/favourites">View Saved Items</Link>
          </AlertLinks>
        </Alert>
      );
      handleAlert({ showAlert: true, alertDialog });
    }
  }, [handleAlert, isAddedToWishlist]);

  useEffect(() => {
    if (isDeletedWishlistItem) {
      const alertDialog = <Alert alertMessage="Product removed from saved items." styles={{ backgroundColor: `var(--light_Green)` }} />;
      handleAlert({ showAlert: true, alertDialog });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeletedWishlistItem]);

  return <wishlistContext.Provider value={{ getWishlistQueryFinished, wishList, setWishList, deleteFromWishlist, isDeletingWishlistItem, isDeletedWishlistItem, addItemToWishList, isAddingToWishList, isAddedToWishlist, isLoadingWishlist, isFetchedWishlist }}>{children}</wishlistContext.Provider>;
};

export default WishlistProvider;
