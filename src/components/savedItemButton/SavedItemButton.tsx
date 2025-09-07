import React from "react";

import Loader from "../Loader";

import { savedItemButtonProps } from "../../types/types";
import "./style.css";

const SavedItemButton = ({ data }: savedItemButtonProps) => {
  const { showAlert, icon, styles, isBeingAdded, isBeingRemoved, handleAddToWishlist, handleRemoveFromWishlist, isSaved } = data;

  return (
    <div className="d-inline-flex gap-1 align-items-center justify-content-center" id="saved_item_btn_wrapper">
      <div>
        {!isSaved && (
          <button style={styles} onClick={handleAddToWishlist} id="add_item_btn">
            {isBeingAdded ? <Loader size="spinner-border-sm" color="white" /> : <> {icon}</>}
          </button>
        )}
        {isSaved && (
          <button onClick={handleRemoveFromWishlist} id="remove_item_btn" style={{ backgroundColor: isBeingRemoved ? "white" : "", ...styles }}>
            {isBeingRemoved ? <Loader size="spinner-border-sm" color="warning" /> : <> {icon}</>}
          </button>
        )}
      </div>
      {showAlert && <span>{isSaved ? "Saved" : "Save For Later"}</span>}
    </div>
  );
};

export default SavedItemButton;
