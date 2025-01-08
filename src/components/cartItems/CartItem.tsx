import React, { useRef, useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Icon } from "@iconify/react/dist/iconify.js";

import { CartItemProp, cartType } from "../../types.ts";
import { updateCartItem } from "../../helperFunctions/dataFetchFunctions.ts";
import { appContext } from "../AppContext.tsx";
import "./style.css";
import { getLocalCartItems } from "../../helperFunctions/utilityFunctions.ts";

const CartItem = ({ item, itemIndex }: CartItemProp) => {
  const {
    id,
    cartQuantity,
    product: { name, unitPrice, id: productId, images },
  } = item;

  const { loginData, setCart, cart, data, isLoggedIn } = useContext(appContext);
  const possibleUpdateRef = useRef(false);

  const { mutate, isSuccess, isPending, isError } = useMutation({
    mutationFn: updateCartItem,
  });

  useEffect(() => {
    if (isPending && !possibleUpdateRef.current) {
      possibleUpdateRef.current = true;
    }
  }, [isPending]);

  useEffect(() => {
    if (isSuccess && possibleUpdateRef.current) {
      possibleUpdateRef.current = false;
      var cartItems: cartType[] = [...cart];
      cartItems[itemIndex].cartQuantity = data.data.cartQuantity;
      setCart(cartItems);
    }
  }, [cart, data, isSuccess, itemIndex, setCart]);

  const modifyQuantity = (value: number) => {
    if (isLoggedIn) {
      mutate({
        customerId: loginData.id,
        productId: productId,
        quantity: cartQuantity + value,
        id: id!,
      });
    } else {
      const cartItems = getLocalCartItems();
    }
  };
  return (
    <tr className="cart_table_row">
      <td className="d-flex gap-3 border-bottom">
        <div style={{ width: "5rem" }}>
          <img src={images[0].url} alt={name} style={{ width: "100%" }} />
        </div>
        <div>
          <p>{name}</p>
          <p>
            Sold by <span className="text-primary">MyShop</span>
          </p>
        </div>
      </td>
      <td className="border-bottom">
        <div className="d-flex align-items-center border justify-content-between" style={{ borderRadius: "0.15rem", maxWidth: "100px" }}>
          <button onClick={() => modifyQuantity(-1)} className="border border-left-0 border-bottom-0 border-top-0  py-1 px-1">
            <Icon style={{ fontSize: "1.1rem" }} icon="material-symbols:remove" />
          </button>
          <span>{cartQuantity}</span>
          <button className="border border-left-0 border-bottom-0 border-top-0  py-1 px-1" onClick={() => modifyQuantity(1)}>
            <Icon style={{ fontSize: "1.1rem" }} icon="material-symbols:add-2-rounded" />
          </button>
        </div>
      </td>
      <td className="border-bottom">
        <p>{unitPrice}</p>
        <p>{unitPrice} x 1 item</p>
      </td>
      <td className="border-bottom">
        <div>
          <button>Remove item</button>
        </div>
        <button>Save for Later</button>
      </td>
    </tr>
  );
};

export default CartItem;
