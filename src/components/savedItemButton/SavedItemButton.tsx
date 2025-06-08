import React, { useContext, MouseEvent, useState } from "react";

import Loader from "../Loader";
import Alert from "../alert/Alert";

import { savedItemButtonProps } from "../../types";
import { useAddToWhishlist } from "../../customHooks/useAddToWishlist";
import { userContext } from "../context/UserProvider";
import { wishlistContext } from "../context/WishlistProvider";
import { alertContext } from "../context/AlertProvider";
import "./style.css";

const SavedItemButton = ({ productId, styles, showMessage, icon }: savedItemButtonProps) => {
  const [targetProduct, setTargetProduct] = useState(-1);
  const {
    loginData: { id: customerId },
    isLoggedIn,
    setShowModal,
  } = useContext(userContext);
  const { handleAlert } = useContext(alertContext);

  const { wishList, isDeletingWishlistItem, deleteFromWishlist, isDeletedWishlistItem } = useContext(wishlistContext);

  const _handleAlert = (alertMessage: string) => {
    const alertDialog = (
      <Alert alertMessage={alertMessage} styles={{ backgroundColor: "var(--darkest_Grey)" }}>
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

  const { addItemToWishList, isAddingToWishList } = useAddToWhishlist();

  const handleAddToWishlist = (_: MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn) {
      setTargetProduct(productId);
      addItemToWishList(customerId, productId);
    } else {
      _handleAlert("You need to be logged in to Save an Item");
    }
  };

  const handleRemoveFromWishlist = (_: MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn) {
      setTargetProduct(productId);
      deleteFromWishlist({ customerId, productId });
    } else {
      _handleAlert("You need to be logged in to Delete an Item");
    }
  };

  if (isDeletedWishlistItem && targetProduct !== -1) {
    setTargetProduct(-1);
  }

  const isBeingAdded = isAddingToWishList && targetProduct === productId;
  const isBeingDeleted = isDeletingWishlistItem && targetProduct === productId;

  return (
    <div className="d-inline-flex gap-1 align-items-center justify-content-center" id="saved_item_btn_wrapper">
      <div>
        {!isSaved && (
          <button style={styles} onClick={handleAddToWishlist} id="add_item_btn">
            {isBeingAdded ? <Loader size="spinner-border-sm" color="white" /> : <> {icon}</>}
          </button>
        )}
        {isSaved && (
          <button onClick={handleRemoveFromWishlist} id="remove_item_btn" style={{ backgroundColor: isBeingDeleted ? "white" : "", ...styles }}>
            {isBeingDeleted ? <Loader size="spinner-border-sm" color="warning" /> : <> {icon}</>}
          </button>
        )}
      </div>
      {showMessage && <span>{isSaved ? "Saved" : "Save For Later"}</span>}
    </div>
  );
};

export default SavedItemButton;
