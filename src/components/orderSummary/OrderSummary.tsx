import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { cartContext } from "../context/CartProvider.tsx";
import { naira } from "../../data.ts";
import "./style.css";

const OrderSummary = () => {
  const { cartItemsCount, cartItemsTotalPrice } = useContext(cartContext);

  return (
    <div id="order_summary" className="bg-white w-100">
      <div className="d-flex justify-content-between px-3 py-3 border-bottom">
        <p className="fw-bold">Order Summary</p>
        <p className="fw-bold">{cartItemsCount} item(s)</p>
      </div>
      <div className="d-flex justify-content-between px-3 py-3 border-bottom">
        <p>Delivery charges</p>
        <p className="text-end text-muted">
          Add your Delivery <br />
          address at checkout to <br /> see delivery charges
        </p>
      </div>
      <div className="d-flex justify-content-between px-3 py-3 border-bottom">
        <p>Subtotal: </p>
        <p>
          {naira}
          {cartItemsTotalPrice.toLocaleString()}
        </p>
      </div>
      <div className="d-flex justify-content-between px-3 py-3 border-bottom" id="price_wrapper">
        <p className="fw-bold">Total</p>
        <p className="fw-bold">
          {naira}
          {cartItemsTotalPrice.toLocaleString()}
        </p>
      </div>
      <div className="d-flex justify-content-center px-3 py-3">
        <Link to="/checkout/complete-order" className="bg-success w-100 f-bold text-light text-center fw-bold py-2">
          Continue to Checkout
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
