import React from "react";

import { categoryCardsWrapperProps } from "../../types/types";
import "./style.css";

const CategoryCardsWrapper = ({ children }: categoryCardsWrapperProps) => {
  return (
    <div id="category_card_wrapper" className="w-100">
      {children}
    </div>
  );
};

export default CategoryCardsWrapper;
