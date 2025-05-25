import React from "react";

import { productRatingsProps } from "../../types";

const ProductRatings = ({ rating, size }: productRatingsProps) => {
  const _size = size || 25;
  const ratings = Array(5)
    .fill(0)
    .map((_, index) => {
      const isMarked = rating >= index + 1;
      return <span style={{ color: !isMarked ? "var(--cerebral_grey)" : "var(--dark_orange)", fontSize: _size }}>&#9733;</span>;
    });
  return <>{ratings}</>;
};

export default ProductRatings;
