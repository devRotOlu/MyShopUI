import React from "react";

import { emptyViewProps } from "../../types";
import "./style.css";

const EmptyView = ({ children }: emptyViewProps) => {
  return (
    <div className="align-self-stretch d-flex justify-content-center align-items-center w-100 mb-5" id="empty_view">
      <div className="d-flex bg-white align-items-center justify-content-center">{children}</div>
    </div>
  );
};

export default EmptyView;
