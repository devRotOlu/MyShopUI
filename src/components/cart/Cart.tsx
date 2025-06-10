import React, { useContext } from "react";
import { Icon } from "@iconify/react";

import CartItem from "../cartItems/CartItem.tsx";
import CartTable from "../cartTable/CartTable.tsx";
import OrderSummary from "./OrderSummary.tsx";
import EmptyView from "../emptyView/EmptyView.tsx";
import PageWrapper from "../PageWrapper.tsx";
import BreadCrumb from "../breadCrumbs/BreadCrumb.tsx";

import "./style.css";
import { cartContext } from "../context/CartProvider.tsx";

const Cart = () => {
  const { cart } = useContext(cartContext);

  const cartItems = cart.map((item, index) => {
    return <CartItem key={index} item={item} index={index} itemCount={cart.length} />;
  });

  const isEmptyView = cart.length === 0;

  return (
    <>
      <PageWrapper pageId="cart">
        {isEmptyView && (
          <EmptyView>
            <div className="d-flex flex-column gap-4 align-items-center" id="empty_view_content">
              <Icon icon="mdi:cart-remove" style={{ fontSize: "4rem", color: "var(--lighter_pink)" }} />
              <div className="d-flex flex-column gap-2">
                <p className="fw-bold text-center">Your cart is empty.</p>
                <p className="text-muted">You have not added any item to your cart.</p>
              </div>
            </div>
          </EmptyView>
        )}
        {!isEmptyView && (
          <div className="w-100">
            <BreadCrumb currentLinkLabel="Shopping Cart" />
            <div className="d-flex gap-5 px-3 w-100">
              <div className="flex-grow-1 bg-white align-self-start">
                <CartTable>{cartItems}</CartTable>
              </div>
              <div className="align-self-start bg-dark" style={{ width: "25%" }}>
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
