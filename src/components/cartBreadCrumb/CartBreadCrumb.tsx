import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

import "./style.css";
import { naira } from "../../data";
import { cartContext } from "../context/CartProvider";

const CartBreadCrumb = () => {
  const { cartItemsCount, cartItemsTotalPrice } = useContext(cartContext);
  return (
    <div id="cart_bread_crumb" className="py-5 mb-3 px-lg-5 px-3 bg-white">
      <nav className="flex-grow-1 d-flex gap-2 flex-column align-items-start py-lg-0 py-4 px-lg-0 px-3">
        <Link to="/" className="d-lg-flex d-none">
          <p className="d-flex align-items-center gap-1">
            <span>Home</span>{" "}
            <span>
              <MdNavigateNext size={20} />
            </span>
            <span id="current_link_label">Shopping Cart</span>
          </p>
        </Link>
        <h1 className="fs-lg-2 fs-3">Shopping Cart</h1>
      </nav>
      <div className="d-lg-none d-block py-3 px-2 border-bottom d-flex justify-content-between">
        <p className="text-muted">Subtotal ({cartItemsCount} items)</p>
        <p className="fw-bold">
          {naira}
          {cartItemsTotalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CartBreadCrumb;
