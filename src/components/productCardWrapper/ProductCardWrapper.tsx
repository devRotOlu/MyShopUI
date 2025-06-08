import React from "react";

import { productCardWrapperProps } from "../../types";
import "./style.css";

const ProductCardWrapper = ({ children }: productCardWrapperProps) => {
  return <div id="product_card_wrapper">{children}</div>;
};

export default ProductCardWrapper;
