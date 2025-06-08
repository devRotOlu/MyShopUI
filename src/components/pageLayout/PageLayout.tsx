import React from "react";

import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";

import { pageLayoutProps } from "../../types";
import "./style.css";

const PageLayout = ({ isLoading, children, productCards }: pageLayoutProps) => {
  return (
    <div className="d-flex flex-wrap align-self-stretch w-100" id="page_layout">
      <div className="w-100">
        {isLoading && (
          <div className="w-100 d-flex justify-content-between px-4 flex-wrap gap-3">
            <ProductCardSkeleton count={4} />
          </div>
        )}
        {!isLoading && (
          <div id="product_card_wrapper" className="w-100">
            {productCards}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
