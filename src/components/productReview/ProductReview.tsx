import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";

import FormButton from "../formButton/FormButton";
import ComponentOverlay from "../ComponentOverlay.tsx";
import Loader from "../Loader.tsx";

import { productReviewProps } from "../../types";
import "./style.css";
import { userContext } from "../context/UserProvider";
import { addReview } from "../../helperFunctions/dataFetchFunctions";

const ProductReview = ({ productId, setShowModal }: productReviewProps) => {
  const {
    loginData: { id: reviewerId },
  } = useContext(userContext);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: addReview,
  });
  const ratings = Array(5)
    .fill(0)
    .map((_, index) => {
      const isMarked = rating >= index + 1;
      return (
        <button key={index} onClick={() => setRating(index + 1)}>
          <Icon color={!isMarked ? "var(--cerebral_grey)" : "var(--dark_orange)"} icon="material-symbols-light:star" fontSize={35} />
        </button>
      );
    });
  const handleProductReview = (event: FormEvent) => {
    event.preventDefault();
    mutate({
      reviewerId,
      productId,
      rating,
      review,
    });
  };

  const handleWriteReview = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.currentTarget.value);
  };

  if (isSuccess) {
    setShowModal(false);
  }
  return (
    <div className="bg-white py-4 px-5" id="product_review">
      <h2 className="text-center fs-5">Write a review</h2>
      <p className="text-center">How would you rate this product?</p>
      <div className="d-flex gap-1 justify-content-center">{ratings}</div>
      <div className="d-flex justify-content-center gap-2 w-100">
        <div>
          <form className="d-flex flex-column align-items-center gap-2" onSubmit={handleProductReview}>
            <label>
              <p className="text-center mb-1"> Add a review</p>
              <textarea value={review} rows={5} cols={30} className="p-2" placeholder="Share your thoughts about this product." onChange={handleWriteReview}></textarea>
            </label>
            <div className="position-relative w-100">
              <FormButton value="Submit Review" styles={{ backgroundColor: "var( --dark_Green)" }} />
              {isPending && (
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
