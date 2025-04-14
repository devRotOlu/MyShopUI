import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";

import ItemToggleButton from "../itemToggleButton/ItemToggleButton";
import QuantityExceededError from "./QuantityExceededError";
import AddToWishlist from "./AddToWishlist";
import ProductTab from "./ProductTab";

import { productProps } from "../../types";
import { useModifyCart } from "../../customHooks/useModifyCart";
import "./style.css";

const Product = ({ product, children, index }: productProps) => {
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [validateQuantity, setValidateQuantity] = useState(false);

  const { handleAddToCart } = useModifyCart();

  const { name, description, unitPrice, quantity, id: productId } = product;

  const quantityExceedRef = useRef(false);

  const handleIncreaseItem = () => {
    if (quantity === quantityToAdd) quantityExceedRef.current = true;
    setQuantityToAdd((prevQuantity) => (prevQuantity < quantity ? ++prevQuantity : prevQuantity));
  };

  const handleDecreaseItem = () => {
    setQuantityToAdd((prevQuantiy) => (prevQuantiy > 1 ? --prevQuantiy : prevQuantiy));
  };

  if (quantityExceedRef.current && !validateQuantity) {
    setValidateQuantity(true);
  }

  return (
    <div id="product">
      <div className="py-4 bg-white mb-3">
        <div className="d-flex gap-2">
          <span>Home</span>
          <span>
            <Icon icon="grommet-icons:next" />
          </span>
          <span>Product</span>
        </div>
      </div>
      <div className="d-flex gap-3 px-4">
        <div className="w-75 d-flex gap-4 px-3 pt-2 pb-5 bg-white">
          <div className="w-50">{children}</div>
          <div className="w-50">
            <div className="border-bottom pb-3 d-flex flex-column gap-3">
              <h2 className="fs-3 text-break">{name}</h2>
              <div className="d-flex align-items-center">
                <p className="fw-bold fs-5 w-50">&#8358;{Math.ceil(unitPrice * 1500)}</p>
                <div className="d-flex gap-4 align-items-center">
                  <span className="fs-6">Quantity:</span>
                  <div>
                    <ItemToggleButton itemQuantity={quantityToAdd} handleIncreaseItem={handleIncreaseItem} handleDecreaseItem={handleDecreaseItem} />
                    {validateQuantity && <QuantityExceededError quantity={quantity} validateQuantity={validateQuantity} setValidateQuantity={setValidateQuantity} quantityExceedRef={quantityExceedRef} />}
                  </div>
                </div>
              </div>
            </div>
            <div id="save_item" className="py-3 border-bottom">
              <button className="text-light rounded me-4" onClick={() => handleAddToCart(index!)}>
                Add To Cart
              </button>
              <AddToWishlist productId={productId} />
            </div>
            <ProductTab description={description} />
          </div>
        </div>
        <div className="w-25 bg-white"></div>
      </div>
    </div>
  );
};

export default Product;
