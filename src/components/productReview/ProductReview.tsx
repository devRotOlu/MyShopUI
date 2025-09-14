import React, { ChangeEvent, FormEvent, useContext, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";

import FormButton from "../formButton/FormButton";
import ComponentOverlay from "../ComponentOverlay.tsx";
import Loader from "../Loader.tsx";
import ValidationError from "../validationError/ValidationError.tsx";

import { productReviewProps } from "../../types/types.ts";
import "./style.css";
import { userContext } from "../context/UserProvider";
import { addReview, editReview } from "../../helperFunctions/dataFetchFunctions";
import { useValidation } from "../../customHooks/useValidation.ts";
import { productReviewSchema } from "../../formSchemas.ts";

const ProductReview = ({ productId, setShowModal, userReviews }: productReviewProps) => {
  const { testValidation, validationErrors } = useValidation(productReviewSchema);
  const reviewIndex = useMemo(() => {
    return userReviews.findIndex(({ productId: _productId }) => productId === _productId);
  }, [userReviews, productId]);
  const {
    loginData: { id: reviewerId },
  } = useContext(userContext);
  const [rating, setRating] = useState(() => {
    return reviewIndex > -1 ? userReviews[reviewIndex].rating : 0;
  });
  const [review, setReview] = useState(() => {
    return reviewIndex > -1 ? userReviews[reviewIndex].review : "";
  });
  const {
    mutate: addProductReview,
    isPending: isAddingReview,
    isSuccess: isAddedReview,
  } = useMutation({
    mutationFn: addReview,
  });
  const {
    mutate: editProductReview,
    isPending: isEditingReview,
    isSuccess: isEditedReview,
  } = useMutation({
    mutationFn: editReview,
  });
  const ratings = Array(5)
    .fill(0)
    .map((_, index) => {
      const isMarked = rating >= index + 1;
      return (
        <button aria-label="set-ratings" className="star_icon" key={index} onClick={() => setRating(index + 1)}>
          <Icon color={!isMarked ? "var(--cerebral_grey)" : "var(--dark_orange)"} icon="material-symbols-light:star" />
        </button>
      );
    });
  const handleProductReview = (event: FormEvent) => {
    event.preventDefault();
    const isValid = testValidation({ rating, review });
    if (!isValid) return;
    const reviewDTO = {
      reviewerId,
      productId,
      rating,
      review,
    };
    if (reviewIndex > -1) {
      editProductReview(reviewDTO);
    } else {
      addProductReview(reviewDTO);
    }
  };

  const handleWriteReview = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.currentTarget.value);
  };

  if (isAddedReview || isEditedReview) {
    setShowModal(false);
  }

  return (
    <div className="bg-white py-4 px-md-5 px-3" id="product_review">
      <h2 className="text-center fs-5">Write a review</h2>
      <p className="text-center mt-2">How would you rate this product?</p>
      <div className="d-flex gap-1 justify-content-center">{ratings}</div>
      <div className="d-flex justify-content-center gap-2 w-100">
        <div className="w-100">
          <form className="d-flex flex-column align-items-center gap-3 mt-2 w-100" onSubmit={handleProductReview}>
            <div className="w-100">
              <label className="w-100">
                <p className="text-center mb-1"> Add a review</p>
                <textarea value={review} className="p-2 w-100" placeholder="Share your thoughts about this product." onChange={handleWriteReview} style={{ resize: "none", height: "150px" }}></textarea>
              </label>
              {validationErrors.review !== undefined && <ValidationError error={validationErrors.review} />}
            </div>
            <div className="position-relative w-100  mb-1">
              <FormButton value="Submit Review" styles={{ backgroundColor: "var( --dark_Green)" }} />
              {(isAddingReview || isEditingReview) && (
                <ComponentOverlay>
                  <div className="d-flex h-100 justify-content-center align-items-center">
                    <Loader size="spinner-border-sm" color="white" />
                  </div>
                </ComponentOverlay>
              )}
            </div>
          </form>
          <button className="w-100 py-2 mt-2 text-white" onClick={() => setShowModal(false)} id="cancel_modal_btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
