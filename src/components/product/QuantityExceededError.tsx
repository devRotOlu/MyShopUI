import React, { useEffect } from "react";

import { quantityExceededErrorProps } from "../../types";

const QuantityExceededError = ({ ...props }: quantityExceededErrorProps) => {
  const { quantity, setValidateQuantity, validateQuantity, quantityExceedRef } = props;

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
  }, [setValidateQuantity, validateQuantity]);
  return (
    <span id="quantity_validation" className="text-danger">
      only {quantity} items left
    </span>
  );
};

export default QuantityExceededError;
