import React, { useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { CartItemProp } from "../../types.ts";
import { appContext } from "../AppContext.tsx";
import "./style.css";

const CartItem = ({ item, itemIndex, delete_Item, updateQuantity, isModifying }: CartItemProp) => {
  const { id: cartId, cartQuantity, product } = item;

  const { name, unitPrice, id: productId, images } = product;

  const { isLoggedIn } = useContext(appContext);

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
        <div className="d-flex align-items-center border justify-content-between cart_toggle" style={{ borderRadius: "0.15rem" }}>
          <button onClick={isLoggedIn ? () => updateQuantity(-1, productId, itemIndex, undefined, cartQuantity, cartId) : () => updateQuantity(-1, productId, itemIndex)} className="border border-left-0 border-bottom-0 border-top-0">
            <Icon style={{ fontSize: "1.1rem" }} icon="material-symbols:remove" />
          </button>
          <span>{cartQuantity}</span>
          <button className="border border-left-0 border-bottom-0 border-top-0" onClick={isLoggedIn ? () => updateQuantity(1, productId, itemIndex, undefined, cartQuantity, cartId) : () => updateQuantity(1, productId, itemIndex, product)}>
            <Icon style={{ fontSize: "1.1rem" }} icon="material-symbols:add-2-rounded" />
          </button>
        </div>
      </td>
      <td className="border-bottom h-100 py-3 text-center">
        <div>
          <p>&#36;{unitPrice}</p>
          <p>&#36;{unitPrice} x 1 item</p>
        </div>
      </td>
      <td className="border-bottom h-100 py-3 text-end">
        <div>
          <button onClick={() => delete_Item(cartId!, itemIndex)}>Remove item</button>
        </div>
        <button>Save for Later</button>
      </td>
      {isModifying && <td className="position-absolute w-100 h-100" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", top: "0", left: "0" }}></td>}
    </tr>
  );
};

export default CartItem;
