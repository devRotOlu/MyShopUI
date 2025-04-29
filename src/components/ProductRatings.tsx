import { Icon } from "@iconify/react";
import React from "react";
import { productRatingsProps } from "../types";

const ProductRatings = ({ rating }: productRatingsProps) => {
  const ratings = Array(5)
    .fill(0)
    .map((_, index) => {
      const isMarked = rating >= index + 1;
      return <Icon color={!isMarked ? "var(--cerebral_grey)" : "var(--dark_orange)"} icon="material-symbols-light:star" fontSize={25} />;
    });
  return <>{ratings}</>;
};

export default ProductRatings;
