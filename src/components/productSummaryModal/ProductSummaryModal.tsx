import React, { useState } from "react";

import ItemToggleButton from "../itemToggleButton/ItemToggleButton";

import { productSummaryModalProps } from "../../types";
import "./style.css";

const ProductSummaryModal = ({ product }: productSummaryModalProps) => {
  const { name, images, unitPrice } = product;
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  return (
    <div id="product_summary_modal" className="d-flex px-5 justify-content-between w-100 bg-white py-4" style={{ height: "fit-content" }}>
      <div className="d-flex gap-4 align-items-center">
        <div style={{ height: "50px", width: "50px" }}>
          <img src={images[0].url} alt={name} className="h-100 w-100" />
        </div>
        <div>
          <p className="fw-bold fs-5">{name}</p>
        </div>
      </div>
      <div className="d-flex gap-4 align-items-center">
        <div>
          <p className="fw-bold fs-5">{unitPrice}</p>
        </div>
        <div>
          <p>Quantity:</p>
          {/* <ItemToggleButton itemQuantity={quantityToAdd} handleIncreaseItem={handleIncreaseItem} handleDecreaseItem={handleDecreaseItem} /> */}
        </div>
        <div>
          <button>Add Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductSummaryModal;
