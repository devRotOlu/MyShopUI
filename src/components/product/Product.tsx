import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ItemToggleButton from "../itemToggleButton/ItemToggleButton";
import QuantityValidator from "../quantityValidator/QuantityValidator";
import AddToWishlist from "./AddToWishlist";
import ProductTab from "./ProductTab";
import ProductRatings from "./ProductRatings";
import ProductSummaryModal from "../productSummaryModal/ProductSummaryModal";
import ProductDescription from "../productDescription/ProductDescription";
import ProductReviews from "./ProductReviews";

import { productProps } from "../../types";
import "./style.css";
import { cartContext } from "../context/CartProvider";
import { naira } from "../../data";

const Product = ({ product, children }: productProps) => {
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [validateQuantity, setValidateQuantity] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);
  const { handleAddCartItem } = useContext(cartContext);

  const { name, description, unitPrice, quantity, id: productId, reviews, averageRating, attributes } = product;

  const brandIndex = attributes.findIndex((attribute) => {
    return attribute.attribute.name.toLowerCase() === "brand";
  });

  const brand = brandIndex > -1 ? attributes[brandIndex].value : "";

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
    const handleScroll = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const triggerVisible = rect.top <= 0;

        setShowModal(triggerVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const itemToggle = (
    <div>
      <ItemToggleButton itemQuantity={quantityToAdd} handleIncreaseItem={handleIncreaseItem} handleDecreaseItem={handleDecreaseItem} />
      {validateQuantity && <QuantityValidator quantity={quantity} setValidateQuantity={setValidateQuantity} />}
    </div>
  );

  return (
    <>
      <div id="product" className="px-4">
        <div className="w-100 d-flex gap-3">
          <div className="w-75 d-flex gap-4 px-3 py-5 bg-white">
            <div className="w-50">{children}</div>
            <div className="w-50">
              <div className="border-bottom pb-3 d-flex flex-column gap-3">
                <div className="border-bottom pb-3" id="product_header_wrapper">
                  <h2 className="fs-3 text-break">{name}</h2>
                  {brand && (
                    <p className="mt-1 text-muted brand">
                      Brand:{" "}
                      <Link to={`/brand/${brand}`} className="fw-bold">
                        {brand}
                      </Link>
                    </p>
                  )}
                  <div className="mt-1">
                    <ProductRatings rating={Math.floor(averageRating)} size={17} /> <span className="review_count">{reviews.length} Review(s)</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <p className="fw-bold fs-5 w-50">
                    {naira}
                    {unitPrice.toLocaleString()}
                  </p>
                  <div className="d-flex gap-4 align-items-center">
                    <span className="fs-6">Quantity:</span>
                    <div>{itemToggle}</div>
                  </div>
                </div>
              </div>
              <div id="save_item" className="pt-3">
                <button ref={targetRef} className="text-light rounded me-4 " onClick={() => handleAddCartItem(product, quantityToAdd)}>
                  Add To Cart
                </button>
                <AddToWishlist productId={productId} />
              </div>
            </div>
          </div>
          <div className="w-25">
            <div className="bg-white">
              <p className="border-bottom py-2 px-3">Same Day Delivery Available in:</p>
              <div className="py-3 px-3">
                <span className="py-2 px-3">Lagos</span>
                <p className="mt-4">Terms and conditions apply</p>
              </div>
            </div>

            <div className="mt-3 bg-white">
              <p className="border-bottom py-2 px-3">Seller Information</p>
              <div className="px-3">
                <div className="border-bottom py-3 d-flex gap-3" id="app_avatar_wrapper">
                  <p className="d-flex justify-content-center align-items-center text-white">M</p>
                  <div>
                    <p className="fw-bold">MyShop</p>
                    <p className="text-muted mt-1">2 years of service</p>
                  </div>
                </div>
                <div className="py-3 d-flex flex-column gap-2">
                  <p>Product Reviews ({reviews.length})</p>
                  <p className="fs-4 fw-bold">{averageRating.toFixed(1)}/5</p>
                  <div>
                    <ProductRatings rating={averageRating} size={30} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 mt-5 bg-white">
          <div className="d-flex flex-column gap-3 w-100">
            <ProductTab tabIndex={tabIndex} setTabIndex={setTabIndex} reviewsLength={reviews.length} />
            <div>
              {tabIndex === 0 && <ProductDescription description={description} attributes={attributes} />}
              {tabIndex === 1 && <ProductReviews reviews={reviews} averageRating={averageRating} />}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ProductSummaryModal product={product} quantityToAdd={quantityToAdd} brand={brand}>
          {itemToggle}
        </ProductSummaryModal>
      )}
    </>
  );
};

export default Product;
