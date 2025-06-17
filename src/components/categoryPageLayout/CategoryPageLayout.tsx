import React from "react";

import { categoryPageLayoutProps } from "../../types";
import "./style.css";

const CategoryPageLayout = ({ filterWrapper, children, products }: categoryPageLayoutProps) => {
  return (
    <div className="px-1 px-sm-2 d-flex flex-md-row flex-column gap-2 gap-xl-3 mb-5" id="category_page_layout">
      <div className="d-md-block d-none " id="filter_wrapper">
        <div>{filterWrapper}</div>
      </div>
      <div className="flex-grow-1">
        <div id="product_card_wrapper" className="w-100">
          {products}
        </div>
        {children}
      </div>
    </div>
  );
};

export default CategoryPageLayout;
