import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { productSummaryModalProps } from "../../types";
import "./style.css";
import { cartContext } from "../context/CartProvider";
import { naira } from "../../data";

const ProductSummaryModal = ({ product, children, quantityToAdd, brand }: productSummaryModalProps) => {
  const { name, images, unitPrice } = product;
  const { handleAddCartItem } = useContext(cartContext);
  return (
    <div id="product_summary_modal" className="d-flex px-5 justify-content-between w-100 bg-white py-4" style={{ height: "fit-content" }}>
      <div className="d-flex gap-4 align-items-center w-50">
        <div style={{ height: "70px", width: "70px" }}>
          <img src={images[0].url} alt={name} className="h-100 w-100" />
        </div>
        <div id="name_wrapper">
          {brand && (
            <Link to={`/brand/${brand}`} className="fw-bold mb-1">
              {brand}
            </Link>
          )}
          <p className="fw-bold fs-5">{name}</p>
        </div>
      </div>
      <div className="d-flex gap-5 justify-content-end align-items-center w-50">
        <div>
          <p className="fw-bold fs-5">
            {naira}
            {unitPrice.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="mb-1">Quantity:</p>
          {children}
        </div>
        <div onClick={() => handleAddCartItem(product, quantityToAdd)}>
          <button className="text-light rounded me-4 ">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductSummaryModal;
