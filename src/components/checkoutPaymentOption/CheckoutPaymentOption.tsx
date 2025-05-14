import React, { useContext } from "react";
import { Icon } from "@iconify/react";

import { checkoutPaymentOptionProps } from "../../types";
import { checkoutContext } from "../checkout/Checkout";
import "./style.css";

const CheckoutPaymentOption = ({ children }: checkoutPaymentOptionProps) => {
  const { profileIndex } = useContext(checkoutContext);

  const iconColor = profileIndex >= 0 ? "var( --light_Green)" : "var(--darker_Grey)";

  return (
    <div id="checkout_payment_option">
      <div className="py-2 bg-white">
        <h2 className="fs-6">
          <Icon icon="pixel:check-circle-solid" className="fs-4" color={iconColor} />
          <span className="ms-2">2. Payment Options</span>
        </h2>
      </div>
      <div className="bg-white">{profileIndex >= 0 && children}</div>
    </div>
  );
};

export default CheckoutPaymentOption;
