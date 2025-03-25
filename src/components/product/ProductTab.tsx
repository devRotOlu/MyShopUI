import React, { useState } from "react";

import { productTabProps } from "../../types";

const ProductTab = ({ description }: productTabProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = ["Description", "Reviews"].map((name, index) => {
    const color = tabIndex === index ? "var(--deep_pink)" : "";
    return (
      <button onClick={() => setTabIndex(index)} key={index} style={{ color }}>
        {name}
      </button>
    );
  });
  return (
    <div className="py-3 d-flex flex-column gap-3" id="product_tab">
      <div className="d-flex gap-5">{tabs}</div>
      {tabIndex === 0 && (
        <div className="py-3" id="description_wrapper">
          <p className="lh-lg text-wrap">{description}</p>
        </div>
      )}
      {tabIndex === 1 && <div></div>}
    </div>
  );
};

export default ProductTab;
