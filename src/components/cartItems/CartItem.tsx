import React, { MouseEvent, useContext } from "react";

import ComponentOverlay from "../ComponentOverlay.tsx.tsx";
import ItemToggleButton from "../itemToggleButton/ItemToggleButton.tsx";
import QuantityValidator from "../quantityValidator/QuantityValidator.tsx";

import { truncateName } from "../../helperFunctions/utilityFunctions.ts";
import { cartItemProp } from "../../types.ts";
import { naira } from "../../data.ts";
import "./style.css";
import { useCartItem } from "../../customHooks/useCartItem.ts";
import { userContext } from "../context/UserProvider.tsx";
import { alertContext } from "../context/AlertProvider.tsx";
import { promptWishlistLoginAlert } from "../uiHelpers/utilities.tsx";

const CartItem = ({ item, index, itemCount }: cartItemProp) => {
  const { isLoggedIn, setShowModal } = useContext(userContext);
  const { handleAddToWishlist, handleDeleteItem, handleQuantityUpdate, beingModified, validateQuantity, setValidateQuantity } = useCartItem(item);
  const { handleAlert } = useContext(alertContext);

  const { cartQuantity, product } = item;

  const { name, unitPrice, images, quantity } = product;

  const _handleAddToWishlist = (_: MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn) {
      handleAddToWishlist();
    } else {
      const alertDialog = promptWishlistLoginAlert("You need to be logged in to Save an Item", () => setShowModal(true));
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  };

  return (
    <tr className="cart_table_row position-relative">
      <td className={`${index !== itemCount! - 1 ? "border-bottom" : ""} h-100 py-3`}>
        <div className="d-flex gap-4">
          <div style={{ width: "6rem" }}>
            <img src={images[0].url} alt={name} style={{ width: "100%" }} />
          </div>
          <div className="d-flex flex-column gap-2">
            <p className="fw-bold text-muted">{truncateName(name, 50)}</p>
            <p className="fst-italic item_seller">
              <span className="text-muted">Sold by</span>
              <span style={{ color: "var(--dark_moderate_violet)" }}> MyShop</span>
            </p>
          </div>
        </div>
      </td>
      <td className={`${index !== itemCount! - 1 ? "border-bottom" : ""} h-100  py-3`}>
        <div className="d-flex flex-column gap-1">
          <ItemToggleButton itemQuantity={cartQuantity} handleDecreaseItem={() => handleQuantityUpdate(-1)} handleIncreaseItem={() => handleQuantityUpdate(1)} styles={{ boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px" }} />
          {validateQuantity && <QuantityValidator quantity={quantity} setValidateQuantity={setValidateQuantity} />}
        </div>
      </td>
      <td className={`${index !== itemCount! - 1 ? "border-bottom" : ""} h-100 py-3 text-center `}>
        <div className="price_wrapper">
          <p className="fw-bold fs-6">
            {naira}
            {unitPrice.toLocaleString()}
          </p>
          <p className="text-muted">
            {naira}
            {unitPrice.toLocaleString()} x 1 item
          </p>
        </div>
      </td>
      <td className={`${index !== itemCount! - 1 ? "border-bottom" : ""} h-100 py-3 text-end`}>
        <div>
          <button onClick={() => handleDeleteItem()}>Remove item</button>
        </div>
        <button onClick={_handleAddToWishlist}>Save for Later</button>
      </td>
      {beingModified && <ComponentOverlay as="td" />}
    </tr>
  );
};

export default CartItem;
