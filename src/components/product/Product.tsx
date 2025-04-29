import React, { useContext, useEffect, useState } from "react";

import ItemToggleButton from "../itemToggleButton/ItemToggleButton";
import QuantityValidator from "../quantityValidator/QuantityValidator";
import AddToWishlist from "./AddToWishlist";
import ProductTab from "./ProductTab";
import ProductSummaryModal from "../productSummaryModal/ProductSummaryModal";

import { productProps } from "../../types";
import "./style.css";
import { cartContext } from "../context/CartProvider";

const Product = ({ product, children }: productProps) => {
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [validateQuantity, setValidateQuantity] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { handleAddCartItem } = useContext(cartContext);

  const { name, description, unitPrice, quantity, id: productId, reviews, averageRating } = product;

  const handleIncreaseItem = () => {
    if (quantity === quantityToAdd) {
      if (!validateQuantity) {
        setValidateQuantity(true);
      }
      return;
    }
    setQuantityToAdd((prevQuantity) => ++prevQuantity);
  };

  const handleDecreaseItem = () => {
    setQuantityToAdd((prevQuantiy) => (prevQuantiy > 1 ? --prevQuantiy : prevQuantiy));
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      const pageFraction = pageHeight / 5;

      if (scrollPosition >= pageFraction && !showModal) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="product" className="w-100 d-flex gap-3 px-4">
      <div className="w-75 d-flex gap-4 px-3 pt-4 pb-5 bg-white">
        <div>{children}</div>
        <div>
          <div className="border-bottom pb-3 d-flex flex-column gap-3">
            <h2 className="fs-3 text-break">{name}</h2>
            <div className="d-flex align-items-center">
              <p className="fw-bold fs-5 w-50">&#8358;{Math.ceil(unitPrice * 1500)}</p>
              <div className="d-flex gap-4 align-items-center">
                <span className="fs-6">Quantity:</span>
                <div>
                  <ItemToggleButton itemQuantity={quantityToAdd} handleIncreaseItem={handleIncreaseItem} handleDecreaseItem={handleDecreaseItem} />
                  {validateQuantity && <QuantityValidator quantity={quantity} setValidateQuantity={setValidateQuantity} />}
                </div>
              </div>
            </div>
          </div>
          <div id="save_item" className="py-3 border-bottom">
            <button className="text-light rounded me-4 " onClick={() => handleAddCartItem(product, quantityToAdd)}>
              Add To Cart
            </button>
            <AddToWishlist productId={productId} />
          </div>
          <ProductTab description={description} reviews={reviews} averageRating={averageRating} />
        </div>
      </div>
      <div className="w-25 bg-white"></div>
    </div>
  );
};

export default Product;
