import React from "react";

import { ProductCardProp } from "../../types.ts";
import "./style.css";

const ProductCard = ({ name, unitPrice, quantity, images, index, handleAddToCart, isPending, disabled }: ProductCardProp) => {
  return (
    <div className="product_card w-100">
      <div className="w-100">
        <div className="product_image w-100">
          <img src={images[0].url} loading="lazy" alt={name} style={{ width: "100%" }} />
        </div>
        <div className="product_title">
          <p>{name}</p>
        </div>
      </div>
      <div className="product_price border-bottom border-top d-flex justify-content-between">
        <p>&#36;{unitPrice}</p>
        <p>In stock: {quantity}</p>
      </div>
      <div className="pt-2 d-flex justify-content-center">
        {isPending ? (
          <div class="spinner-grow" role="status" id="card_spinner" style={{ width: "0.8rem", height: "0.8rem" }}>
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button disabled={disabled} onClick={() => handleAddToCart(index)}>
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
