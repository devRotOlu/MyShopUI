import React from "react";

import { paymentTitleProp } from "../types/types";

const MonnifyPaymentOptionTitle = ({ title, children }: paymentTitleProp) => {
  return (
    <div className="bg-dark position-relative px-2 d-flex flex-column justify-content-center" style={{ height: "35px" }}>
      {children && <div className="d-flex flex-column justify-content-center align-items-start">{children}</div>}
      <div className="position-absolute start-50 top-50" style={{ display: "inline-block", width: "fit-content", transform: "translate(-50%,-50%)" }}>
        <p className="text-white text-center" style={{ width: "fit-content" }}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default MonnifyPaymentOptionTitle;
