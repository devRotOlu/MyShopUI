import React from "react";
import { Icon } from "@iconify/react";

import ItemToggleButton from "../itemToggleButton/ItemToggleButton";
import ComponentOverlay from "../ComponentOverlay.tsx";
import QuantityValidator from "../quantityValidator/QuantityValidator";

import { useCartItem } from "../../customHooks/useCartItem";
import { cartItemProp } from "../../types";
import { naira } from "../../data";
import { truncateName } from "../../helperFunctions/utilityFunctions.ts";
import "./style.css";

const CartCard = ({ item }: cartItemProp) => {
  const { handleAddToWishlist, handleDeleteItem, handleQuantityUpdate, validateQuantity, setValidateQuantity, beingModified } = useCartItem(item);
  const {
    product: { images, name, quantity, unitPrice },
    cartQuantity,
  } = item;
  const url = images[0].url;
  return (
    <div className="p-2 cart_card bg-white">
      <div className="border-bottom pb-2">
        <div className="d-flex gap-4 image_container">
          <div className="image_holder">
            <img src={url} alt={name} style={{ width: "100%" }} />
          </div>
          <div>
            <p className="fw-bold text-muted mb-1">{truncateName(name, 50)}</p>
            <p className="fst-italic item_seller">
              <span className="text-muted">Sold by</span>
              <span style={{ color: "var(--dark_moderate_violet)" }}> MyShop</span>
            </p>
          </div>
        </div>
        <div className="d-flex gap-3 gap-sm-5 mt-2 quantity_toggle_btn_wrapper">
          <div>
            <p className="mb-1">Quantity:</p>
            <div>
              <ItemToggleButton itemQuantity={cartQuantity} handleDecreaseItem={() => handleQuantityUpdate(-1)} handleIncreaseItem={() => handleQuantityUpdate(1)} styles={{ boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px" }} />
              {validateQuantity && <QuantityValidator quantity={quantity} setValidateQuantity={setValidateQuantity} />}
            </div>
          </div>
          <div>
            <p className="fw-bold mb-1 fs-6">
              {naira}
              {unitPrice.toLocaleString()}
            </p>
            <p className="text-muted">
              {naira}
              {unitPrice.toLocaleString()} X {cartQuantity} items
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex gap-2 gap-sm-3 pt-2 w-100 cart_save_remove_btn_wrapper">
        <button className="py-2 d-flex gap-1 justify-content-center align-items-center add_to_wishlist_btn text-muted" onClick={() => handleAddToWishlist()}>
          <Icon icon="mdi:favourite" fontSize={17} color="var(--cerebral_grey)" />
          Save for Later
        </button>
        <button className="py-2 d-flex gap-1 justify-content-center align-items-center remove_btn text-muted" onClick={() => handleDeleteItem()}>
          <Icon icon="clarity:remove-solid" fontSize={17} color="var(--cerebral_grey)" />
          Remove item
        </button>
      </div>
      {beingModified && <ComponentOverlay />}
    </div>
  );
};

export default CartCard;
