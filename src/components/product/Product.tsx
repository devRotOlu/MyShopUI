import React, { useContext, useEffect, useRef, useState, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import ItemToggleButton from "../itemToggleButton/ItemToggleButton";
import QuantityValidator from "../quantityValidator/QuantityValidator";
import SavedItemButton from "../savedItemButton/SavedItemButton";
import ProductTab from "./ProductTab";
import ProductRatings from "../productRating/ProductRatings";
import ProductSummaryModal from "../productSummaryModal/ProductSummaryModal";
import ProductDescription from "../productDescription/ProductDescription";
import ProductReviews from "../productReviews/ProductReviews";
import ProductAccordion from "../productAccordion/ProductAccordion";

import { productProps } from "../../types/types";
import "./style.css";
import { cartContext } from "../context/CartProvider";
import { naira } from "../../data";
import { Icon } from "@iconify/react";
import { alertContext } from "../context/AlertProvider";
import { useDeleteWishlist } from "../../customHooks/useDeleteWishlist";
import { userContext } from "../context/UserProvider";
import { useAddToWhishlist } from "../../customHooks/useAddToWishlist";
import { promptWishlistLoginAlert } from "../uiHelpers/utilities";
import { useCalHeightOnResize } from "../../customHooks/useCalHeightOnResize";

const Product = ({ product, children, isWishlistItem }: productProps) => {
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [validateQuantity, setValidateQuantity] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null!);
  const { handleAddCartItem } = useContext(cartContext);
  const { handleAlert } = useContext(alertContext);
  const {
    isLoggedIn,
    loginData: { id: customerId },
    setShowModal: setLoginModal,
  } = useContext(userContext);
  const { deleteFromWishlist, isDeletingWishlistItem } = useDeleteWishlist();
  const { addItemToWishList, isAddingToWishList } = useAddToWhishlist();

  const isSaved = isWishlistItem ?? false;

  const { name, description, unitPrice, quantity, id: productId, reviews, averageRating, attributes } = product;

  const brandIndex = attributes.findIndex((attribute) => {
    return attribute.attribute.name.toLowerCase() === "brand";
  });

  const brand = brandIndex > -1 ? attributes[brandIndex].value : "";

  const handleAddToWishlist: MouseEventHandler<HTMLButtonElement> = () => {
    if (isLoggedIn) {
      addItemToWishList(customerId, productId);
    } else {
      const alertDialog = promptWishlistLoginAlert("You need to be logged in to Save an Item", () => setLoginModal(true));
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  };

  const handleRemoveFromWishlist: MouseEventHandler<HTMLButtonElement> = () => {
    if (isLoggedIn) {
      deleteFromWishlist({ customerId, productId });
    } else {
      const alertDialog = promptWishlistLoginAlert("You need to be logged in to Delete an Item", () => setLoginModal(true));
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  };

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
        const rect = targetRef.current.firstElementChild!.getBoundingClientRect();
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

  useCalHeightOnResize(targetRef, "--product_add_cart_btn");

  const itemToggle = (
    <div>
      <ItemToggleButton itemQuantity={quantityToAdd} handleIncreaseItem={handleIncreaseItem} handleDecreaseItem={handleDecreaseItem} />
      {validateQuantity && <QuantityValidator quantity={quantity} setValidateQuantity={setValidateQuantity} />}
    </div>
  );

  return (
    <>
      <div id="product" className="px-sm-4 px-sm-3 px-2 mb-md-5">
        <div className="w-100 d-flex flex-md-row flex-column gap-md-3 gap-0">
          <div className="d-flex flex-lg-row flex-column  px-sm-3 px-2 pt-md-5 pb-md-5 pt-3 pb-0 bg-white gap-4" id="carousel_wrapper">
            <div className="d-flex align-items-center flex-column">{children}</div>
            <div>
              <div className="border-bottom pb-3 d-flex flex-column gap-3">
                <div className="border-bottom pb-3" id="product_header_wrapper">
                  <h2 className="fs-md-3 text-break fs-5">{name}</h2>
                  {brand && (
                    <p className="mt-1 text-muted brand">
                      Brand:{" "}
                      <Link to={`/brand/${brand}`} className="fw-bold">
                        {brand}
                      </Link>
                    </p>
                  )}
                  <div className="mt-1">
                    <ProductRatings rating={Math.floor(averageRating)} styles="fs-6" /> <span className="review_count">{reviews.length} Review(s)</span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-lg-between justify-content-start gap-xl-5 gap-3 flex-wrap">
                  <p className="fw-bold fs-5">
                    {naira}
                    {unitPrice.toLocaleString()}
                  </p>
                  <div className="d-flex gap-4 align-items-center">
                    <span>Quantity:</span>
                    <div>{itemToggle}</div>
                  </div>
                </div>
              </div>
              <div id="save_item" className="pb-md-0 pb-3 pt-3 d-flex gap-xl-5 gap-2 flex-wrap">
                <div className="py-md-0 py-3" ref={targetRef}>
                  <button className="text-light rounded me-md-4 py-3 " onClick={() => handleAddCartItem(product, quantityToAdd)}>
                    Add To Cart
                  </button>
                </div>
                <SavedItemButton
                  data={{
                    styles: { height: "2.5rem", width: "2.5rem" },
                    icon: <Icon icon="fluent-mdl2:heart-fill" fontSize="1.2rem" color="white" />,
                    showAlert: true,
                    handleAddToWishlist,
                    handleRemoveFromWishlist,
                    isBeingAdded: isAddingToWishList,
                    isBeingRemoved: isDeletingWishlistItem,
                    isSaved,
                  }}
                ></SavedItemButton>
              </div>
            </div>
          </div>
          <div>
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
                  <p className="d-flex justify-content-center align-items-center text-white fs-6 fw-bold">M</p>
                  <div>
                    <p className="fw-bold">MyShop</p>
                    <p className="text-muted mt-1">2 years of service</p>
                  </div>
                </div>
                <div className="py-3 d-flex flex-column gap-2">
                  <p>Product Reviews ({reviews.length})</p>
                  <p className="fs-4 fw-bold">{averageRating.toFixed(1)}/5</p>
                  <div>
                    <ProductRatings rating={averageRating} styles="fs-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-md-4 p-0 mt-5 bg-white">
          <div className="d-md-flex d-none flex-column gap-3 w-100">
            <ProductTab tabIndex={tabIndex} setTabIndex={setTabIndex} reviewsLength={reviews.length} />
            <div>
              {tabIndex === 0 && <ProductDescription description={description} attributes={attributes} />}
              {tabIndex === 1 && <ProductReviews reviews={reviews} averageRating={averageRating} />}
            </div>
          </div>
          <div className="d-md-none d-block">
            <ProductAccordion productDescription={<ProductDescription description={description} attributes={attributes} />} productReviews={<ProductReviews reviews={reviews} averageRating={averageRating} />} />
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
