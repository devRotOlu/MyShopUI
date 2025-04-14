import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { cartContext } from "../context/CartProvider.tsx";

const OrderSummary = () => {
  const { cartItemsCount, cartItemsTotalPrice } = useContext(cartContext);

  return (
    <div id="order_summary" className="bg-white" style={{ width: "20%" }}>
      <div className="d-flex justify-content-between px-2 py-3 border-bottom">
        <p>Order Summary</p>
        <p>{cartItemsCount}</p>
      </div>
      <div className="d-flex justify-content-between px-2 py-3 border-bottom">
        <p>Delivery charges</p>
        <p className="text-end">
          Add your Delivery <br />
          address at checkout to <br /> see delivery charges
        </p>
      </div>
      <div className="d-flex justify-content-between px-2 py-3 border-bottom">
        <p>Subtotal: </p>
        <p>&#36; {cartItemsTotalPrice.toFixed(4)}</p>
      </div>
      <div className="d-flex justify-content-between px-2 py-3 border-bottom">
        <p>Total</p>
        <p>&#36; {cartItemsTotalPrice.toFixed(4)}</p>
      </div>
      <div className="d-flex justify-content-center px-2 py-3 border-bottom ">
        <Link to="/checkout/complete-order" className="bg-success w-100 f-bold text-light text-center">
          Continue to Checkout
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
