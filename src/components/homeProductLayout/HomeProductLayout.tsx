import React from "react";

import { homeProductLayoutProps } from "../../types/types";
import "./style.css";

const HomeProductLayout = ({ children }: homeProductLayoutProps) => {
  return (
    <div className="d-flex flex-wrap align-self-stretch w-100 mb-5 px-sm-2 px-1" id="page_layout">
      {children}
    </div>
  );
};

export default HomeProductLayout;
