import React from "react";
import { Icon } from "@iconify/react";

const EmptyCart = () => {
  return (
    <div className="align-self-stretch d-flex justify-content-center align-items-center w-100" id="empty_cart">
      <div className="d-flex flex-column gap-4 bg-white align-items-center">
        <Icon icon="mdi:cart-remove" style={{ fontSize: "4rem", color: "var(--lighter_pink)" }} />
        <div className="d-flex flex-column gap-2">
          <p className="fw-bold text-center">Your cart is empty.</p>
          <p className="text-muted">You have not added any item to your cart.</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
