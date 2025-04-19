import React, { useEffect } from "react";

import { quantityValidatorProps } from "../../types";
import "./style.css";

const QuantityValidator = ({ ...props }: quantityValidatorProps) => {
  const { quantity, setValidateQuantity } = props;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValidateQuantity(false);
      clearTimeout(timeout);
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [setValidateQuantity]);
  return (
    <span id="quantity_validator" className="text-danger">
      only {quantity} items left
    </span>
  );
};

export default QuantityValidator;
