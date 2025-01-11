import React, { useContext, useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import Navbar from "../navbar/Navbar.tsx";
import CartItem from "../cartItems/CartItem.tsx";
import CartTable from "../cartTable/CartTable.tsx";
import Alert from "../alert/Alert.tsx";

import { cartType, productType } from "../../types.ts";
import { updateCartItem, deleteCartItem } from "../../helperFunctions/dataFetchFunctions.ts";
import { setLocalCart, getLocalCartItems } from "../../helperFunctions/utilityFunctions.ts";

import { appContext } from "../AppContext.tsx";

import "./style.css";

const Cart = () => {
  const appstates = useContext(appContext);
  const { cart, loginData, isLoggedIn } = appstates;

  const [shouldDisplayAlert, setShouldDisplayAlert] = useState<boolean>(false);
  const isPossibleDeletionRef = useRef<boolean>(true);
  const modifiedIndexRef = useRef<number>(null);

  const { mutate: updateItem, isPending: isUpdating } = useMutation({
    mutationFn: updateCartItem,
  });

  const {
    mutate: deleteItem,
    isPending: isDeleting,
    isSuccess: itemDeleted,
  } = useMutation({
    mutationFn: deleteCartItem,
  });

  if (itemDeleted && isPossibleDeletionRef.current) {
    isPossibleDeletionRef.current = false;
    setShouldDisplayAlert(true);
  }

  const delete_Item = (cartId: number, itemIndex: number) => {
    modifiedIndexRef.current = itemIndex;
    deleteItem(cartId);
  };

  const updateQuantity = (value: number, productId, itemIndex: number, product?: productType, cartQuantity?, id?) => {
    modifiedIndexRef.current = itemIndex;
    if (isLoggedIn) {
      updateItem({
        customerId: loginData.id,
        productId,
        quantity: cartQuantity + value,
        id,
      });
    } else {
      let cartItems = getLocalCartItems();
      let index = cartItems.findIndex(({ product: { id } }) => {
        return id === productId;
      });

      if (index) {
        cartItems[index].cartQuantity += value;
        setLocalCart([...cartItems]);
      } else {
        const item: cartType = {
          cartQuantity: cartQuantity + value,
          product: product!,
        };
        setLocalCart([...cartItems, item]);
      }
    }
  };

  const cartItems = cart.map((item, index) => {
    return <CartItem delete_Item={delete_Item} key={index} item={item} itemIndex={index} updateQuantity={updateQuantity} isModifying={modifiedIndexRef.current === index ? isDeleting || isUpdating : false} />;
  });

  useEffect(() => {
    if (isPossibleDeletionRef.current === false) {
      isPossibleDeletionRef.current = true;
    }
  }, [isDeleting]);

  return (
    <main className="min-vh-100" id="cart">
      <Navbar />
      <div className="d-flex gap-5 py-5 px-3 w-100">
        <div className="flex-grow-1 bg-white">
          <CartTable>{cartItems}</CartTable>
        </div>
        <div style={{ width: "20%" }}></div>
      </div>
      {shouldDisplayAlert && <Alert alertMessage="Product successfully removed from your Cart" styles={{ backgroundColor: `var(--light_Green)` }} setIsDisplayed={setShouldDisplayAlert} />}
    </main>
  );
};

export default Cart;
