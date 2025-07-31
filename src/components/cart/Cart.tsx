import React, { useContext, useRef } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";

import CartItem from "../cartItems/CartItem.tsx";
import CartTable from "../cartTable/CartTable.tsx";
import OrderSummary from "../orderSummary/OrderSummary.tsx";
import EmptyView from "../emptyView/EmptyView.tsx";
import PageWrapper from "../PageWrapper.tsx";
import CartBreadCrumb from "../cartBreadCrumb/CartBreadCrumb.tsx";
import CartCard from "../cartCard/CartCard.tsx";
import SkeletonPageLoader from "../SkeletonPageLoader.tsx";

import "./style.css";
import { cartContext } from "../context/CartProvider.tsx";
import { useCalHeightOnResize } from "../../customHooks/useCalHeightOnResize.ts";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, isFetchingCart, getCartQueryFinished } = useContext(cartContext);

  const checkoutLinkRef = useRef<HTMLDivElement>(null!);

  const cartItems = cart.map((item, index) => {
    return <CartItem key={index} item={item} index={index} itemCount={cart.length} />;
  });

  const cartCards = cart.map((item, index) => {
    return <CartCard key={index} item={item} />;
  });

  const isEmptyView = !cart.length && getCartQueryFinished && !isFetchingCart;
  const showContent = !isFetchingCart && getCartQueryFinished && cart.length;

  useCalHeightOnResize(checkoutLinkRef, "--checkout_link_height");

  return (
    <>
      <PageWrapper pageId="cart">
        {isFetchingCart && (
          <div className="pt-3 px-5 h-100 w-100 bg-white flex-grow-1 ">
            <SkeletonPageLoader count={3} />
          </div>
        )}
        {/* {isEmptyView && (
          <EmptyView>
            <div className="d-flex flex-column gap-4 align-items-center" id="empty_view_content">
              <Icon icon="mdi:cart-remove" style={{ fontSize: "4rem", color: "var(--lighter_pink)" }} />
              <div className="d-flex flex-column gap-2">
                <p className="fw-bold text-center">Your cart is empty.</p>
                <p className="text-muted">You have not added any item to your cart.</p>
              </div>
            </div>
          </EmptyView>
        )} */}
        {showContent && (
          <div className="w-100 mb-md-5" id="cart_main_content">
            <CartBreadCrumb />
            <div className="px-sm-3 px-2 ">
              <button id="back_to_shop_btn" onClick={() => navigate(-1)} className="d-flex gap-2 px-3 py-1 align-items-center mb-3 fw-light">
                <Icon icon="ep:back" />
                Continue Shopping
              </button>
              <div className="d-flex flex-row gap-xl-5 gap-3 w-100" id="cart_table_wrapper">
                <div className="flex-grow-1">
                  <div className="d-md-block d-none bg-white ">
                    <CartTable>{cartItems}</CartTable>
                  </div>
                  <div className="d-md-none d-flex flex-column gap-3">{cartCards}</div>
                </div>
                <div className="d-lg-block d-none">
                  <OrderSummary />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="d-flex d-lg-none justify-content-center mb-0 mb-md-5 px-2 py-3 py-md-0 vw-100 checkout_link_wrapper" ref={checkoutLinkRef}>
          <Link to="/checkout/complete-order" className="bg-success f-bold text-light text-center fw-bold py-3">
            Continue to Checkout
          </Link>
        </div>
      </PageWrapper>
    </>
  );
};

export default Cart;
