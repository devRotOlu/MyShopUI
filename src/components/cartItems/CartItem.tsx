import React, { useContext, useLayoutEffect, useRef } from "react";

import ComponentOverlay from "../ComponentOverlay.tsx.tsx";
import ItemToggleButton from "../itemToggleButton/ItemToggleButton.tsx";

import { CartItemProp, productType } from "../../types.ts";
import { userContext } from "../context/UserProvider.tsx";
import "./style.css";

const CartItem = ({ item, delete_Item, updateQuantity, addToWishlist, status }: CartItemProp) => {
  const { id: cartId, cartQuantity, product } = item;

  const { name, unitPrice, id: productId, images } = product;

  const beingModifiedRef = useRef(false);

  const {
    isLoggedIn,
    loginData: { id: customerId },
  } = useContext(userContext);

  const handleQuantityUpdate = (value: number, product: productType | undefined = undefined) => {
    if (isLoggedIn) {
      updateQuantity(value, productId, undefined, cartQuantity, cartId);
      beingModifiedRef.current = true;
    } else {
      updateQuantity(value, productId, product);
    }
  };

  const handleAddToWishlist = () => {
    if (isLoggedIn) beingModifiedRef.current = true;
    addToWishlist(customerId, productId);
  };

  const handleDeleteItem = () => {
    if (isLoggedIn) beingModifiedRef.current = true;
    delete_Item(cartId!);
  };

  const { beingAddedToWhishlist, beingDeleted, beingUpdated } = status;

  useLayoutEffect(() => {
    if (beingModifiedRef.current && !beingAddedToWhishlist && !beingDeleted && !beingUpdated) {
      beingModifiedRef.current = false;
    }
  }, [beingAddedToWhishlist, beingDeleted, beingUpdated]);

  return (
    <tr className="cart_table_row position-relative">
      <td className="border-bottom h-100  w-50 py-3">
        <div className="d-flex gap-4">
          <div style={{ width: "5rem" }}>
            <img src={images[0].url} alt={name} style={{ width: "100%" }} />
          </div>
          <div className="d-flex flex-column gap-2">
            <p>{name}</p>
            <p>
              Sold by <span className="text-primary">MyShop</span>
            </p>
          </div>
        </div>
      </td>
      <td className="border-bottom h-100 py-3">
        <ItemToggleButton itemQuantity={cartQuantity} handleDecreaseItem={() => handleQuantityUpdate(-1)} handleIncreaseItem={() => handleQuantityUpdate(1, product)} styles={{ boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px" }} />
      </td>
      <td className="border-bottom h-100 py-3 text-center">
        <div>
          <p>&#36;{unitPrice}</p>
          <p>&#36;{unitPrice} x 1 item</p>
        </div>
      </td>
      <td className="border-bottom h-100 py-3 text-end">
        <div>
          <button onClick={() => handleDeleteItem()}>Remove item</button>
        </div>
        <button onClick={() => handleAddToWishlist()}>Save for Later</button>
      </td>
      {beingModifiedRef.current && <ComponentOverlay as="td" />}
    </tr>
  );
};

export default CartItem;
