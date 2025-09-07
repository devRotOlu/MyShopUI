import React, { useState } from "react";
import { Icon } from "@iconify/react";

import { productTabLabels } from "../../data";
import { productAccordionProps } from "../../types/types";

const ProductAccordion = ({ ...props }: productAccordionProps) => {
  const { productDescription, productReviews } = props;
  const [showDescription, setShowDescription] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  return (
    <ul className="w-100 m-0 p-0">
      <li className="w-100 d-flex flex-column gap-2 border-bottom">
        <button className="w-100 d-flex justify-content-between align-items-center p-3" onClick={() => setShowDescription((prevState) => !prevState)}>
          {productTabLabels[0]}
          <span>{showDescription ? <Icon icon="ep:arrow-down" /> : <Icon icon="ep:arrow-up" />}</span>
        </button>
        {showDescription && <div className="px-3">{productDescription}</div>}
      </li>
      <li className="w-100">
        <button className="w-100 d-flex justify-content-between align-items-center p-3" onClick={() => setShowReviews((prevState) => !prevState)}>
          {productTabLabels[1]}
          <span>{showReviews ? <Icon icon="ep:arrow-down" /> : <Icon icon="ep:arrow-up" />}</span>
        </button>
        {showReviews && <div className="px-3 pb-3">{productReviews}</div>}
      </li>
    </ul>
  );
};

export default ProductAccordion;
