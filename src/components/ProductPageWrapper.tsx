import React from "react";
import { useParams } from "react-router-dom";

import ProductPage from "./productPage/ProductPage";

const ProductPageWrapper = () => {
  const { productName } = useParams();
  return <ProductPage key={productName} productName={productName} />;
};

export default ProductPageWrapper;
