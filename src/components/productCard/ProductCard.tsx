import React, { useContext, MouseEvent, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import ProductRatings from "../productRating/ProductRatings.tsx";
import SavedItemButton from "../savedItemButton/SavedItemButton.tsx";

import { productCardProp } from "../../types/types.ts";
import "./style.css";
import { cartContext } from "../context/CartProvider.tsx";
import { naira } from "../../data.ts";
import { wishlistContext } from "../context/WishlistProvider.tsx";
import { userContext } from "../context/UserProvider.tsx";
import { promptWishlistLoginAlert } from "../uiHelpers/utilities.tsx";
import { alertContext } from "../context/AlertProvider.tsx";
import { truncateName } from "../../helperFunctions/utilityFunctions.ts";

const ProductCard = ({ product }: productCardProp) => {
  const [targetProduct, setTargetProduct] = useState(-1);

  const { handleAddCartItem, isAddingCartItem, isUpdatingCartItem, isAddedCartItem } = useContext(cartContext);
  const {
    isLoggedIn,
    loginData: { id: customerId },
    setShowModal,
  } = useContext(userContext);
  const { handleAlert } = useContext(alertContext);
  const { addItemToWishList, isAddingToWishList, deleteFromWishlist, isDeletedWishlistItem, wishList, isAddedToWishlist } = useContext(wishlistContext);

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

  const isBeingAddedToCart = (isAddingCartItem || isUpdatingCartItem) && isAddedItemRef.current;

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleAddToWishlist = (_: MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn) {
      setTargetProduct(id);
      addItemToWishList(customerId, id);
    } else {
      const alertDialog = promptWishlistLoginAlert("You need to be logged in to Save an Item", () => setShowModal(true));
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  };

  const handleRemoveFromWishlist = (_: MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn) {
      setTargetProduct(id);
      deleteFromWishlist({ customerId, productId: id });
    } else {
      const alertDialog = promptWishlistLoginAlert("You need to be logged in to Delete an Item", () => setShowModal(true));
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  };

  if ((isDeletedWishlistItem || isAddedToWishlist) && targetProduct !== -1) {
    setTargetProduct(-1);
  }

  const isBeingAddedToWishlist = isAddingToWishList && targetProduct === id;
  const isBeingRemovedFromWishlist = isDeletedWishlistItem && targetProduct === id;

  const isSaved = wishList.some((item) => {
    return item.product.id === id;
  });

  return (
    <div className="product_card rounded d-flex flex-column justify-content-between flex-grow-1" onClick={() => navigate(`/product/${name}-${id}`)}>
      <div className="w-100 d-flex flex-column gap-2 pb-1">
        <div className="product_image w-100 position-relative">
          <img src={images[0].url} loading="lazy" alt={name} style={{ width: "100%" }} />
          <div className="position-absolute top-0 d-flex justify-content-end w-100" onClick={handleClick}>
            <SavedItemButton
              data={{ styles: { height: "1.5rem", width: "1.5rem" }, icon: <Icon icon="fluent-mdl2:heart-fill" fontSize="0.8rem" color="white" />, handleAddToWishlist, handleRemoveFromWishlist, isBeingAdded: isBeingAddedToWishlist, isBeingRemoved: isBeingRemovedFromWishlist, isSaved }}
            />
          </div>
        </div>
        <div className="product_title">
          <p>{truncateName(name)}</p>
        </div>
      </div>
      <div>
        <div className="product_price border-bottom border-top d-flex justify-content-between flex-wrap py-2">
          <p className="fw-bold">
            {naira}
            {unitPrice.toLocaleString()}
          </p>
          <p className="fw-bold" style={{ color: "var( --deep_pink)" }}>
            In stock: {quantity}
          </p>
        </div>
        <div className="pt-2 d-flex align-items-center flex-column gap-2">
          <div className="w-100 reviews">
            <div>
              <ProductRatings rating={rating} styles="fs-5" />
            </div>
            <span>{reviews.length > 0 ? `${reviews.length} Reviews` : "No reviews yet"}</span>
          </div>
          {isBeingAddedToCart ? (
            <div className="spinner-grow card_spinner" role="status" style={{ width: "0.8rem", height: "0.8rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button className="add_cart_btn" onClick={(e) => _handleAddToCart(e)}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
