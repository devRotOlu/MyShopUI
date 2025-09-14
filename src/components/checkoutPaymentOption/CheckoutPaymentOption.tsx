import React, { useContext, forwardRef } from "react";
import { Icon } from "@iconify/react";

import { checkoutPaymentOptionProps } from "../../types/types";
import { checkoutContext } from "../checkout/Checkout";
import "./style.css";

const CheckoutPaymentOption = forwardRef<HTMLDivElement, checkoutPaymentOptionProps>(({ children, payOption }, ref) => {
  const { profileIndex, setShowModal } = useContext(checkoutContext);

  const iconColor = profileIndex >= 0 ? "var( --light_Green)" : "var(--darker_Grey)";

  return (
    <div id="checkout_payment_option" className="">
      <div className="py-2 bg-white border-bottom">
        <h2 className="fs-6 m-0 p-0 d-flex align-items-center">
          <Icon icon="pixel:check-circle-solid" className="fs-4" color={iconColor} />
          <span className="ms-2">2. Payment Options</span>
        </h2>
      </div>
      {profileIndex >= 0 && (
        <div className="bg-white">
          {children}
          <div className="pb-md-4" ref={ref} id="payment_btn_wrapper">
            <button onClick={() => setShowModal(true)} disabled={payOption === ""} className="py-3 w-100 text-light" id="payment_btn" style={{ backgroundColor: payOption === "" ? "grey" : "var(--deep_pink)" }}>
              Continue to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

CheckoutPaymentOption.displayName = "CheckoutPaymentOption"; // 👈 fix

export default CheckoutPaymentOption;
