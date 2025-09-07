import React from "react";

import { productRatingsProps } from "../../types/types";

const ProductRatings = ({ rating, styles }: productRatingsProps) => {
  const ratings = Array(5)
    .fill(0)
    .map((_, index) => {
      const isMarked = rating >= index + 1;
      return (
        <span className={styles} key={index} style={{ color: !isMarked ? "var(--cerebral_grey)" : "var(--dark_orange)" }}>
          &#9733;
        </span>
      );
    });
  return <>{ratings}</>;
};

export default ProductRatings;
