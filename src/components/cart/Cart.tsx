import React, { useContext } from "react";

import Navbar from "../navbar/Navbar.tsx";
import CartItem from "../cartItems/CartItem.tsx";
import CartTable from "../cartTable/CartTable.tsx";

import { appContext } from "../AppContext.tsx";

import "./style.css";

const Cart = () => {
  const appstates = useContext(appContext);
  const { cart } = appstates;

  const cartItems = cart.map((item, index) => {
    return <CartItem key={index} item={item} itemIndex={index} />;
  });

  return (
    <main className="min-vh-100" id="cart">
      <Navbar />
      <div className="d-flex gap-5 py-5 px-3 w-100">
        <div className="flex-grow-1 bg-white">
          <CartTable>{cartItems}</CartTable>
        </div>
        <div style={{ width: "20%" }}></div>
      </div>
    </main>
  );
};

export default Cart;
