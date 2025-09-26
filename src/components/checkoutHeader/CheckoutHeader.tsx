import React from "react";
import { Link } from "react-router-dom";

import "./style.css";
import logo from "../../assests/logo_new_2.webp";

const CheckoutHeader = () => {
  return (
    <header className="px-3 py-4 bg-white" id="checkout_header">
      <div className="w-100 position-relative">
        <Link to="/" className="position-absolute left-0">
          <div id="brand">
            <img src={logo} alt="App Brand" style={{ width: "100%" }} />
          </div>
        </Link>
        <h1 className="text-center">Checkout</h1>
      </div>
    </header>
  );
};

export default CheckoutHeader;
