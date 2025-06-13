import React from "react";

import { homeProductLayoutProps } from "../../types";
import "./style.css";

const HomeProductLayout = ({ children, productCards }: homeProductLayoutProps) => {
  return (
    <div className="d-flex flex-wrap align-self-stretch w-100" id="page_layout">
      <div id="product_card_wrapper" className="w-100">
        {productCards}
      </div>
      {children}
    </div>
  );
};

export default HomeProductLayout;
