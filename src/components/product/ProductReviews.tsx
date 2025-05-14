import React, { useContext, useMemo } from "react";
import { Icon } from "@iconify/react";

import ProductRatings from "./ProductRatings";
import RatingStats from "./RatingStats";

import { productReviewsProps } from "../../types";
import { months } from "../../data";
import { userContext } from "../context/UserProvider";

const ProductReviews = ({ reviews, averageRating: rating }: productReviewsProps) => {
  const {
    loginData: { id },
  } = useContext(userContext);
  const ratingFrequency = useMemo(() => {
    var ratingCount: number[] = Array(5).fill(0);
    for (let index = 0; index < reviews.length; index++) {
      const review = reviews[index];
      const { rating } = review;
      ratingCount[rating - 1]++;
    }
    return ratingCount;
  }, [reviews.length]);

  const _rating = Array(5)
    .fill(0)
    .map((_, index) => {
      const isMarked = rating >= index + 1;
      return <Icon color={!isMarked ? "var(--cerebral_grey)" : "var(--dark_orange)"} icon="material-symbols-light:star" fontSize={20} />;
    });

  const _reviews = reviews.map((_review, index) => {
    const {
      review,
      reviewDate,
      reviewer: {
        id: reviewerId,
        details: { firstName },
      },
      rating,
    } = _review;
    const dateArray = reviewDate.split("-");
    const month = months[Number(dateArray[1])];
    const date = dateArray[2];
    const year = dateArray[0];
    const isMyReview = id === reviewerId;
    const isLastItem = index === reviews.length - 1;
    return (
      <div key={index} className={`d-flex flex-column gap-2 mt-3 pb-2 ${isLastItem ? "" : "border-bottom"}`}>
        {isMyReview && (
          <p id="your_review" className="px-2 py-1 text-white fw-bold rounded">
            Your Review
          </p>
        )}
        <div className="d-flex gap-5">
          <div className="d-flex gap-3">
            <p className="text-white d-flex align-items-center justify-content-center" id="reviewer_avatar">
              {firstName[0]}
            </p>
            <div>
              <p className="fw-bold">{firstName}</p>
              <p className="text-muted mt-2">
                {date} {month}, {year}
              </p>
            </div>
          </div>
          <div>
            <div>
              <ProductRatings rating={rating} />
            </div>
            <p className="text-muted mt-2">{review}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div id="product_reviews">
      {reviews.length !== 0 && (
        <div className="w-100">
          <div className="w-100 d-flex justify-content-between flex-wrap pb-3 border-bottom">
            <div>
              <p>
                <span className="fs-2 fw-bold">{rating.toFixed(1)}</span> <sub>out of 5</sub>
              </p>
              <div>{_rating}</div>
              <p className="text-muted">{reviews.length} Review(s)</p>
            </div>
            <RatingStats reviewsLength={reviews.length} ratingFrequency={ratingFrequency} />
          </div>
          <div className="pt-2">{_reviews}</div>
        </div>
      )}
      {!reviews.length && <p>No product review yet. Be the first to review this product.</p>}
    </div>
  );
};

export default ProductReviews;
