import React from "react";
import { Link } from "react-router-dom";

import Brand from "../brand/Brand";

import "./style.css";

const CheckoutHeader = () => {
  return (
    <header className="px-3 py-4 bg-white" id="checkout_header">
      <div className="w-100 position-relative">
        <Link to="/" className="position-absolute left-0">
          <div id="brand">
            <Brand />
          </div>
        </Link>
        <h1 className="fs-2 text-center">Checkout</h1>
      </div>
    </header>
  );
};

export default CheckoutHeader;
