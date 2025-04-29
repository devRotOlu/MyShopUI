import React from "react";

import { productDescriptionProps } from "../../types";

const ProductDescription = ({ description }: productDescriptionProps) => {
  return (
    <div className="py-3" id="product_description">
      <p className="lh-lg text-wrap">{description}</p>
    </div>
  );
};

export default ProductDescription;
