import React from "react";

import { productCarouselModalProps } from "../../types/types";
import "./style.css";

const ProductCarouselModal = ({ modalCloseButton, carouselContent }: productCarouselModalProps) => {
  return (
    <div className="bg-white" id="product_modal_content">
      <div className="pt-2 pb-3 d-flex justify-content-between px-md-5 px-2 border border-bottom flex-wrap">
        <h2 className="fs-4">Product Images</h2>
        {modalCloseButton}
      </div>
      <div className="px-md-5 px-2 mt-3 m-auto" id="modal_carousel">
        {carouselContent}
      </div>
    </div>
  );
};

export default ProductCarouselModal;
