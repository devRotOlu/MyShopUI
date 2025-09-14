import React from "react";
import { Icon } from "@iconify/react";

import { itemToggleButtonProps } from "../../types/types";
import "./style.css";

const ItemToggleButton = ({ itemQuantity, handleDecreaseItem, handleIncreaseItem, styles }: itemToggleButtonProps) => {
  return (
    <div id="toggle_items" className="d-flex align-items-center justify-content-between" style={{ borderRadius: "0.15rem", ...styles }}>
      <button aria-label="increase item" onClick={handleDecreaseItem}>
        <Icon style={{ fontSize: "1.1rem" }} icon="material-symbols:remove" />
      </button>
      <span className="px-3">{itemQuantity}</span>
      <button aria-label="decrease item" onClick={handleIncreaseItem}>
        <Icon style={{ fontSize: "1.1rem" }} icon="material-symbols:add-2-rounded" />
      </button>
    </div>
  );
};

export default ItemToggleButton;
