import React, { useContext } from "react";
import { Icon } from "@iconify/react";

import { monnifyPaymentOptionProp } from "../../types";
import { checkoutContext } from "../checkout/Checkout";
import "./style.css";

const MonnifyPaymentOption = ({ payOption }: monnifyPaymentOptionProp) => {
  const { payMethod, message, icon } = payOption;

  const { setMonnifyOption } = useContext(checkoutContext);

  const handlePaymentOption = () => {
    if (payMethod.toLowerCase() === "card") {
      setMonnifyOption("card");
    } else {
      setMonnifyOption("transfer");
    }
  };
  return (
    <li className="rounded monnify_payment_option">
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

export default MonnifyPaymentOption;
