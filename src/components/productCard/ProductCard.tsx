import React, { useContext, MouseEvent, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductRatings from "../productRating/ProductRatings.tsx";
import SavedItemButton from "../savedItemButton/SavedItemButton.tsx";

import { ProductCardProp } from "../../types.ts";
import "./style.css";
import { cartContext } from "../context/CartProvider.tsx";
import { naira } from "../../data.ts";
import { Icon } from "@iconify/react";

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

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="product_card rounded d-flex flex-column justify-content-between flex-grow-1" onClick={() => navigate(`/product/${name}-${id}`)}>
      <div className="w-100 d-flex flex-column gap-2 pb-1">
        <div className="product_image w-100 position-relative">
          <img src={images[0].url} loading="lazy" alt={name} style={{ width: "100%" }} />
          <div className="position-absolute top-0 d-flex justify-content-end w-100" onClick={handleClick}>
            <SavedItemButton productId={id} styles={{ height: "1.5rem", width: "1.5rem" }} icon={<Icon icon="fluent-mdl2:heart-fill" fontSize="0.8rem" color="white" />} />
          </div>
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
            <div className="d-flex align-items-center">
              <ProductRatings rating={rating} styles="fs-5" />
            </div>
            <p>{reviews.length > 0 ? `${reviews.length} Reviews` : "No reviews yet"}</p>
          </div>
          {isPending ? (
            <div className="spinner-grow" role="status" id="card_spinner" style={{ width: "0.8rem", height: "0.8rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button id="add_cart_btn" onClick={(e) => _handleAddToCart(e)}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
