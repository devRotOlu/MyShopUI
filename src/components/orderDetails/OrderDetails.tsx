import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { cartContext } from "../context/CartProvider";
import { naira } from "../../data";
import "./style.css";

const OrderDetails = () => {
  const { cart, cartItemsTotalPrice } = useContext(cartContext);

  const cartItems = cart.map((item) => {
    const {
      id,
      product: { unitPrice, name, images },
      cartQuantity,
    } = item;
    const imageSrc = images[0].url;
    return (
      <div key={id} className="d-flex gap-3 py-4 cart_item">
        <div>
          <img style={{ width: "60px", height: "60px" }} src={imageSrc} alt={name} />
        </div>
        <div className="flex-grow-1 gap-2 d-flex flex-column">
          <p>{name}</p>
          <p>
            Sold by <span className="fw-bold">MyShop</span>
          </p>
          <p className="fw-bold">
            {naira}
            {unitPrice.toLocaleString()}
          </p>
          <p>Quantity: {cartQuantity}</p>
        </div>
      </div>
    );
  });
  return (
    <div id="order__details">
      <div className="bg-white ps-md-0 ps-2">
        <div className="d-flex pt-2 border-bottom justify-content-between align-items-center gap-2">
          <p className="fs-6" id="order_details_header">
            ORDER DETAILS
          </p>
          <Link className="py-2 px-3 d-flex align-items-center align-self-start justify-content-center flex-shrink-0" to="/cart/overview">
            Modify Cart
          </Link>
        </div>
        <div>{cartItems}</div>
      </div>
      <div className="bg-white mt-1 py-4">
        <p>
          Sub total :{naira}
          {cartItemsTotalPrice.toLocaleString()}
        </p>
        <p className="fw-bold mt-3">
          Total: {naira}
          {cartItemsTotalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
