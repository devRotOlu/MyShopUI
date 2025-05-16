import React from "react";
import { useParams } from "react-router-dom";

import Category from "../category/Category";

const CategoryPageWrapper = () => {
  const { productCategory } = useParams();
  return <Category key={productCategory} productCategory={productCategory} />;
};

export default CategoryPageWrapper;
