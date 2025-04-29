import React from "react";

import { productTabProps } from "../../types";

const ProductTab = ({ setTabIndex, tabIndex, reviewsLength }: productTabProps) => {
  const tabs = ["Description", "Reviews"].map((name, index) => {
    const color = tabIndex === index ? "var(--deep_pink)" : "";
    const borderBottom = tabIndex === index ? "solid 2px var(--deep_pink)" : "";

    if (index === 1) {
      return (
        <button className="px-2 pb-1" onClick={() => setTabIndex(index)} key={index} style={{ color, borderBottom }}>
          {name} <span className="text-muted">({reviewsLength})</span>
        </button>
      );
    }
    return (
      <button className="px-2 pb-1" onClick={() => setTabIndex(index)} key={index} style={{ color, borderBottom }}>
        {name}
      </button>
    );
  });

  return (
    <div className="d-flex gap-5" id="product_tab">
      {tabs}
    </div>
  );
};

export default ProductTab;
