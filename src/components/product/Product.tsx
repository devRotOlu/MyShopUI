import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

import ItemToggleButton from "../itemToggleButton/ItemToggleButton";

import { productProps } from "../../types";
import "./style.css";

const Product = ({ product, children }: productProps) => {
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [validateQuantity, setValidateQuantity] = useState(false);

  const { name, description, unitPrice, quantity } = product;

  const quantityExceedRef = useRef(false);

  const handleIncreaseItem = () => {
    if (quantity === quantityToAdd) quantityExceedRef.current = true;
    setQuantityToAdd((prevQuantity) => (prevQuantity < quantity ? ++prevQuantity : prevQuantity));
  };

  const handleDecreaseItem = () => {
    setQuantityToAdd((prevQuantiy) => (prevQuantiy > 1 ? --prevQuantiy : prevQuantiy));
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    if (validateQuantity) {
      timeout = setTimeout(() => {
        quantityExceedRef.current = false;
        setValidateQuantity(false);
        clearTimeout(timeout);
      }, 4000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [validateQuantity]);

  if (quantityExceedRef.current && !validateQuantity) {
    setValidateQuantity(true);
  }

  return (
    <div id="product">
      <div className="py-4 bg-white mb-3">
        <div className="d-flex gap-2">
          <span>Home</span>
          <span>
            <Icon icon="grommet-icons:next" />
          </span>
          <span>Product</span>
        </div>
      </div>
      <div className="d-flex gap-3 bg-white">
        <div className="flex-grow-1 d-flex gap-4 px-3 pt-2 pb-5">
          <div className="w-50">{children}</div>
          <div className="w-50">
            <div className="border-bottom pb-3 d-flex flex-column gap-3">
              <h2 className="fs-3 text-break">{name}</h2>
              <div className="d-flex align-items-center">
                <p className="fw-bold fs-5 w-50">&#8358;{Math.ceil(unitPrice * 1500)}</p>
                <div className="d-flex gap-4 align-items-center">
                  <span className="fs-6">Quantity:</span>
                  <div>
                    <ItemToggleButton itemQuantity={quantityToAdd} handleIncreaseItem={handleIncreaseItem} handleDecreaseItem={handleDecreaseItem} />
                    {validateQuantity && (
                      <span id="quantity_validation" className="text-danger">
                        only {quantity} items left
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3 border-bottom">
              {/* <button  onClick={() => handleAddToCart(index)}>
                Add To Cart
              </button> */}
            </div>
          </div>
        </div>
        <div className="w-25"></div>
      </div>
    </div>
  );
};

export default Product;
