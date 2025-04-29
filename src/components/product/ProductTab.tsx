import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";

import ProductRatings from "../ProductRatings";

import { productTabProps } from "../../types";
import { months } from "../../data";

const ProductTab = ({ description, reviews, averageRating: rating }: productTabProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = ["Description", "Reviews"].map((name, index) => {
    const color = tabIndex === index ? "var(--deep_pink)" : "";

    if (index === 1) {
      return (
        <button onClick={() => setTabIndex(index)} key={index} style={{ color }}>
          {name} <span className="text-muted">({reviews.length})</span>
        </button>
      );
    }
    return (
      <button onClick={() => setTabIndex(index)} key={index} style={{ color }}>
        {name}
      </button>
    );
  });

  const _reviews = reviews.map((_review, index) => {
    const {
      review,
      reviewDate,
      reviewer: {
        details: { firstName },
      },
      rating,
    } = _review;
    const dateArray = reviewDate.split("-");
    const month = months[Number(dateArray[1])];
    const date = dateArray[2];
    const year = dateArray[0];
    return (
      <div key={index} className="d-flex gap-5 mt-3">
        <div className="d-flex gap-3">
          <p className="text-white d-flex align-items-center justify-content-center" id="reviewer_avatar">
            {firstName[0]}
          </p>
          <div>
            <p>{firstName}</p>
            <p className="text-muted">
              {date} {month}, {year}
            </p>
          </div>
        </div>
        <div>
          <div>
            <ProductRatings rating={rating} />
          </div>
          <p className="text-muted">{review}</p>
        </div>
      </div>
    );
  });

  const ratings = useMemo(() => {
    var ratingCount: number[] = Array(5).fill(0);
    for (let index = 0; index < reviews.length; index++) {
      const review = reviews[index];
      const { rating } = review;
      ratingCount[rating - 1]++;
    }
    return ratingCount;
  }, [reviews.length]);

  const ratingGuage = Array(5)
    .fill(0)
    .map((_, index) => {
      const number = index + 1;
      const count = ratings[index];
      const gauageWidth = (count / reviews.length) * 100;
      return (
        <div className="d-flex gap-2 align-items-center rating_guage">
          <span style={{ color: count ? "var(--dark_moderate_violet)" : "" }}>{number} Star</span>
          <div className="flex-grow-1">
            <div className="h-100" style={{ backgroundColor: "var(--dark_moderate_violet)", width: `${gauageWidth}%` }}></div>
          </div>
          <span style={{ color: count ? "var(--dark_moderate_violet)" : "" }}>{count}</span>
        </div>
      );
    });

  const _rating = Array(5)
    .fill(0)
    .map((_, index) => {
      const isMarked = rating >= index + 1;
      return <Icon color={!isMarked ? "var(--cerebral_grey)" : "var(--dark_orange)"} icon="material-symbols-light:star" fontSize={20} />;
    });
  return (
    <div className="py-3 d-flex flex-column gap-3 w-100" id="product_tab">
      <div className="d-flex gap-5">{tabs}</div>
      {tabIndex === 0 && (
        <div className="py-3" id="description_wrapper">
          <p className="lh-lg text-wrap">{description}</p>
        </div>
      )}
      {tabIndex === 1 && (
        <div>
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
                <div className="d-flex flex-column-reverse gap-2" id="rating_guage">
                  {ratingGuage}
                </div>
              </div>
              <div className="pt-2">{_reviews}</div>
            </div>
          )}
          {!reviews.length && <p>No product review yet. Be the first to review this product.</p>}
        </div>
      )}
    </div>
  );
};

export default ProductTab;
