import React, { useContext, MouseEvent, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductRatings from "../product/ProductRatings.tsx";

import { ProductCardProp } from "../../types.ts";
import "./style.css";
import { cartContext } from "../context/CartProvider.tsx";
import { naira } from "../../data.ts";

const ProductCard = ({ product }: ProductCardProp) => {
  const { handleAddCartItem, isAddingCartItem, isUpdatingCartItem, isAddedCartItem } = useContext(cartContext);
  const { name, unitPrice, quantity, images, id, averageRating: rating, reviews } = product;
  const navigate = useNavigate();

  const isAddedItemRef = useRef(false);

  const _handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    isAddedItemRef.current = true;
    event.stopPropagation();
    handleAddCartItem(product, 1);
  };

  useEffect(() => {
    if (isAddedCartItem && isAddedItemRef.current === true) {
      isAddedItemRef.current = false;
    }
  }, [isAddedCartItem]);

  const isPending = (isAddingCartItem || isUpdatingCartItem) && isAddedItemRef.current;

  return (
    <div className="product_card rounded d-flex flex-column justify-content-between" onClick={() => navigate(`/product/${name}-${id}`)}>
      <div className="w-100 d-flex flex-column gap-2 pb-1">
        <div className="product_image w-100">
          <img src={images[0].url} loading="lazy" alt={name} style={{ width: "100%", height: "200px" }} />
        </div>
        <div className="product_title">
          <p>{name}</p>
        </div>
      </div>
      <div>
        <div className="product_price border-bottom border-top d-flex justify-content-between py-2">
          <p className="fw-bold">
            {naira}
            {unitPrice.toLocaleString()}
          </p>
          <p className="fw-bold" style={{ color: "var( --deep_pink)" }}>
            In stock: {quantity}
          </p>
        </div>
        <div className="pt-2 d-flex align-items-center flex-column gap-2">
          <div className="w-100 d-flex gap-1 align-items-center" id="reviews">
            <div>
              <ProductRatings rating={rating} />
            </div>
            <p>{reviews.length > 0 ? `${reviews.length} Reviews` : "No reviews yet"}</p>
          </div>
          {isPending ? (
            <div className="spinner-grow" role="status" id="card_spinner" style={{ width: "0.8rem", height: "0.8rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button onClick={(e) => _handleAddToCart(e)}>Add To Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
