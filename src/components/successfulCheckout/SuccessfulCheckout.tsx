import React from "react";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";

import PageLink from "../pageLink/PageLink";

import "./style.css";

const SuccessfulCheckout = () => {
  const location = useLocation();
  const data = location?.state;

  return (
    <main className="vh-100 d-flex justify-content-center align-items-center" id="successful_checkout">
      <div className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-center">
          <Icon icon="gg:check-o" fontSize="4rem" />
        </div>
        <h1 className="text-center">Thank you for your order</h1>
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column p-4 gap-2" style={{ width: "70%" }}>
            <div className="d-flex flex-column p-4 gap-2 border border-secondary">
              <p className="text-center">
                Your order number is <br />
                <span className="fw-bold" id="order_id">
                  {data?.checkoutId}
                </span>
              </p>
              <PageLink link="/" linkLabel="Continue Shopping" />
            </div>
            <p className="text-center">To keep track of your orders, under "My Account", click on Track My Order.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SuccessfulCheckout;
