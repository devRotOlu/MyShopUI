import React, { useContext } from "react";
import { Icon } from "@iconify/react";

import { checkoutPaymentOptionProps } from "../../types";
import { checkoutContext } from "../checkout/Checkout";
import "./style.css";

const CheckoutPaymentOption = ({ children, payOption }: checkoutPaymentOptionProps) => {
  const { profileIndex, setShowModal } = useContext(checkoutContext);

  const iconColor = profileIndex >= 0 ? "var( --light_Green)" : "var(--darker_Grey)";

  return (
    <div id="checkout_payment_option">
      <div className="py-2 bg-white">
        <h2 className="fs-6">
          <Icon icon="pixel:check-circle-solid" className="fs-4" color={iconColor} />
          <span className="ms-2">2. Payment Options</span>
        </h2>
      </div>
      <div className="bg-white">
        {profileIndex >= 0 && children}
        <div className="pb-4" id="payment_btn_wrapper">
          <button onClick={() => setShowModal(true)} disabled={payOption === ""} className="py-3 w-100 text-light" id="payment_btn" style={{ backgroundColor: payOption === "" ? "grey" : "var(--deep_pink)" }}>
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentOption;
