import React, { useContext, useEffect, useRef, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { ProductCardProp } from "../../types.ts";
import { userContext } from "../context/UserProvider.tsx";
import "./style.css";

const ProductCard = ({ index, handleAddToCart, status }: ProductCardProp) => {
  const { products, isLoggedIn } = useContext(userContext);
  const { name, unitPrice, quantity, images, id } = products[index];
  const navigate = useNavigate();

  const { isAddingToCart, isUpdatingCart } = status;

  const beingModifiedRef = useRef(false);

  const _handleAddToCart = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation();
    if (isLoggedIn) beingModifiedRef.current = true;
    handleAddToCart(index);
  };

  useEffect(() => {
    if (beingModifiedRef.current && !isAddingToCart && !isUpdatingCart) beingModifiedRef.current = false;
  }, [isAddingToCart, isUpdatingCart]);

  const isPending = (isAddingToCart || isUpdatingCart) === true && beingModifiedRef.current === true;
  const disable = (isAddingToCart || isUpdatingCart) === true && beingModifiedRef.current === false;

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
          <p className="fw-bold">&#36;{unitPrice}</p>
          <p className="fw-bold" style={{ color: "var( --deep_pink)" }}>
            In stock: {quantity}
          </p>
        </div>
        <div className="pt-2 d-flex justify-content-center">
          {isPending ? (
            <div className="spinner-grow" role="status" id="card_spinner" style={{ width: "0.8rem", height: "0.8rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button disabled={disable} onClick={(e) => _handleAddToCart(e, index)}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
