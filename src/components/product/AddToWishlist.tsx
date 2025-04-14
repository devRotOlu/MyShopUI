import React, { useContext, MouseEvent } from "react";
import { Icon } from "@iconify/react";

import Loader from "../Loader";
import Alert from "../alert/Alert";

import { addToWishlistProps } from "../../types";
import { useAddToWhishlist } from "../../customHooks/useAddToWishlist";
import { userContext } from "../context/UserProvider";
import { wishlistContext } from "../context/WishlistProvider";
import { alertContext } from "../context/AlertProvider";

const AddToWishlist = ({ productId }: addToWishlistProps) => {
  const {
    loginData: { id: customerId },
    isLoggedIn,
    setShowModal,
  } = useContext(userContext);
  const { handleAlert } = useContext(alertContext);

  const { wishList } = useContext(wishlistContext);

  const _handleAlert = () => {
    const alertDialog = (
      <Alert alertMessage="You need to be logged in to Save an Item" styles={{ backgroundColor: "var(--darkest_Grey)" }}>
        <button className="py-1 px-2 border border-white rounded" onClick={() => setShowModal(true)} style={{ width: "fit-content", color: "var(--dark_orange)" }}>
          Click here to Login
        </button>
      </Alert>
    );
    handleAlert({
      showAlert: true,
      alertDialog,
    });
  };

  const isSaved = wishList.some((item) => {
    return item.product.id === productId;
  });

  const backgroundColor = isSaved ? "var(--dark_orange)" : "";

  const { addItemToWishList, isAddingToWishList } = useAddToWhishlist();

  const handleAddToWishlist = (_: MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn) addItemToWishList(customerId, productId);
    else _handleAlert();
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
