import React, { useContext, MouseEvent } from "react";
import { Icon } from "@iconify/react";

import Loader from "../Loader";

import { addToWishlistProps } from "../../types";
import { useAddToWhishlist } from "../../customHooks/useAddToWishlist";
import { appContext } from "../context/AppContext";

const AddToWishlist = ({ productId, setDisplayAlert }: addToWishlistProps) => {
  const {
    loginData: { id: customerId },
    wishList,
    isLoggedIn,
  } = useContext(appContext);

  const isSaved = wishList.some((item) => {
    return item.product.id === productId;
  });

  const backgroundColor = isSaved ? "var(--dark_orange)" : "";

  const { addItemToWishList, isAddingToWishList } = useAddToWhishlist();

  const handleAddToWishlist = (_: MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn) addItemToWishList(customerId, productId);
    else setDisplayAlert(true);
  };

  return (
    <div className="d-inline-flex gap-1 align-items-center justify-content-center" id="add_to_wishlist">
      <button onClick={handleAddToWishlist} style={{ backgroundColor }}>
        {isAddingToWishList ? <Loader size="spinner-border-sm" color="white" /> : <Icon icon="fluent-mdl2:heart-fill" fontSize="1.2rem" color="white" />}
      </button>
      <span>{isSaved ? "Saved" : "Save For Later"}</span>
    </div>
  );
};

export default AddToWishlist;
