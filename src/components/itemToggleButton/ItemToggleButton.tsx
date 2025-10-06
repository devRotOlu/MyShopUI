import React from "react";
import { MdRemove, MdAdd } from "react-icons/md";

import { itemToggleButtonProps } from "../../types/types";
import "./style.css";

const ItemToggleButton = ({ itemQuantity, handleDecreaseItem, handleIncreaseItem, styles }: itemToggleButtonProps) => {
  return (
    <div id="toggle_items" className="d-flex align-items-center justify-content-between" style={{ borderRadius: "0.15rem", ...styles }}>
      <button aria-label="increase item" onClick={handleDecreaseItem}>
        <MdRemove size="1.1rem" />
      </button>
      <span className="px-3">{itemQuantity}</span>
      <button aria-label="decrease item" onClick={handleIncreaseItem}>
        <MdAdd size="1.1rem" />
      </button>
    </div>
  );
};

export default ItemToggleButton;
