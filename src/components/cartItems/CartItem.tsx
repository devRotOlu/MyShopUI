import React, { useContext, useState } from "react";

import ComponentOverlay from "../ComponentOverlay.tsx.tsx";
import ItemToggleButton from "../itemToggleButton/ItemToggleButton.tsx";
import QuantityValidator from "../quantityValidator/QuantityValidator.tsx";

import { CartItemProp } from "../../types.ts";
import { userContext } from "../context/UserProvider.tsx";
import "./style.css";
import { useAddToWhishlist } from "../../customHooks/useAddToWishlist.ts";
import { cartContext } from "../context/CartProvider.tsx";

const CartItem = ({ item, index, itemCount }: CartItemProp) => {
  const [validateQuantity, setValidateQuantity] = useState(false);
  const { isDeletingCartItem, deleteCartItem, isUpdatingCartItem, handleAddCartItem } = useContext(cartContext);

  const { addItemToWishList, isAddingToWishList } = useAddToWhishlist();
  const { id: cartId, cartQuantity, product } = item;

  const { name, unitPrice, id: productId, images, quantity } = product;

  const {
    isLoggedIn,
    loginData: { id: customerId },
  } = useContext(userContext);

  const handleQuantityUpdate = (value: number) => {
    if (quantity === cartQuantity && value > 0) {
      if (!validateQuantity) {
        setValidateQuantity(true);
      }
      return;
    }
    handleAddCartItem(product, value);
  };

  const handleAddToWishlist = () => {
    if (isLoggedIn) addItemToWishList(customerId, productId);
  };

  const handleDeleteItem = () => {
    if (isLoggedIn) deleteCartItem(cartId!);
    else deleteCartItem(undefined, productId);
  };

  const beingModified = isAddingToWishList || isDeletingCartItem || isUpdatingCartItem;

  return (
    <tr className="cart_table_row position-relative">
      <td className={`${index !== itemCount - 1 ? "border-bottom" : ""} h-100  w-50 py-3`}>
        <div className="d-flex gap-4">
          <div style={{ width: "5rem" }}>
            <img src={images[0].url} alt={name} style={{ width: "100%" }} />
          </div>
          <div className="d-flex flex-column gap-2">
            <p>{name}</p>
            <p>
              <span className="text-muted">Sold by</span>
              <span style={{ color: "var(--dark_moderate_violet)" }}> MyShop</span>
            </p>
          </div>
        </div>
      </td>
      <td className={`${index !== itemCount - 1 ? "border-bottom" : ""} h-100  py-3`}>
        <div className="d-flex flex-column gap-1">
          <ItemToggleButton itemQuantity={cartQuantity} handleDecreaseItem={() => handleQuantityUpdate(-1)} handleIncreaseItem={() => handleQuantityUpdate(1)} styles={{ boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px" }} />
          {validateQuantity && <QuantityValidator quantity={quantity} setValidateQuantity={setValidateQuantity} />}
        </div>
      </td>
      <td className={`${index !== itemCount - 1 ? "border-bottom" : ""} h-100 py-3 text-center`}>
        <div>
          <p className="fs-5 fw-bold">&#36;{unitPrice}</p>
          <p className="text-muted">&#36;{unitPrice} x 1 item</p>
        </div>
      </td>
      <td className={`${index !== itemCount - 1 ? "border-bottom" : ""} h-100 py-3 text-end`}>
        <div>
          <button onClick={() => handleDeleteItem()}>Remove item</button>
        </div>
        <button onClick={() => handleAddToWishlist()}>Save for Later</button>
      </td>
      {beingModified && <ComponentOverlay as="td" />}
    </tr>
  );
};

export default CartItem;
