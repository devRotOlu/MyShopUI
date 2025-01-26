import React from "react";
import { Icon } from "@iconify/react";

import { paymentOptionProp } from "../../types";

const PaymentOption = ({ payOption, setPayOption }: paymentOptionProp) => {
  const { payMethod, message, icon } = payOption;

  const handlePaymentOption = () => {
    if (payMethod.toLowerCase() === "card") {
      setPayOption("card");
    } else {
      setPayOption("transfer");
    }
  };
  return (
    <li className="rounded">
      <button onClick={handlePaymentOption} className="d-flex justify-content-between align-items-center bg-white py-3 px-3 w-100 rounded">
        <span className="d-flex flex-column align-items-start">
          <span className="fw-bold">{payMethod}</span>
          <span>{message}</span>
        </span>
        <span>
          <Icon icon={icon} style={{ fontSize: "2.5rem" }} />
        </span>
      </button>
    </li>
  );
};

export default PaymentOption;
