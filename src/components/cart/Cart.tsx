import React, { useContext } from "react";

import CartItem from "../cartItems/CartItem.tsx";
import CartTable from "../cartTable/CartTable.tsx";
import OrderSummary from "./OrderSummary.tsx";
import EmptyCart from "./EmptyCart.tsx";
import PageWrapper from "../PageWrapper.tsx";
import BreadCrumb from "../breadCrumbs/BreadCrumb.tsx";

import "./style.css";
import { cartContext } from "../context/CartProvider.tsx";

const Cart = () => {
  const { cart } = useContext(cartContext);

  const cartItems = cart.map((item, index) => {
    return <CartItem key={index} item={item} index={index} itemCount={cart.length} />;
  });

  const isEmptyCart = cart.length === 0;

  return (
    <>
      <PageWrapper pageId="cart">
        {isEmptyCart && <EmptyCart />}
        {!isEmptyCart && (
          <div className="w-100">
            <BreadCrumb currentLinkLabel="Shopping Cart" />
            <div className="d-flex gap-5 px-3 w-100">
              <div className="flex-grow-1 bg-white align-self-start">
                <CartTable>{cartItems}</CartTable>
              </div>
              <div className="align-self-start" style={{ width: "20%" }}>
                <OrderSummary />
              </div>
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  );
};

export default Cart;
