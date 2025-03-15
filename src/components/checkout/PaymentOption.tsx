import React, { ChangeEvent, useContext } from "react";

import { payOptionProps } from "../../types";
import { checkoutContext } from "./Checkout";

const PaymentOption = ({ setPayOption, payOption }: payOptionProps) => {
  const { setShowModal } = useContext(checkoutContext);
  const handleMonnifyOption = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setPayOption("monnify");
    }
  };

  const handlePayPalOption = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setPayOption("payPal");
    }
  };
  return (
    <div className="bg-white">
      <div className="px-3 py-2 border-bottom">
        <h2>2. Payment Options</h2>
      </div>
      <div className="py-4 px-3 d-flex flex-column">
        <label className="d-flex gap-2 mb-4">
          <input onChange={handlePayPalOption} name="payment_option" type="radio" />
          <span>PayPal</span>
        </label>
        <label className="d-flex gap-2 mb-5">
          <input onChange={handleMonnifyOption} name="payment_option" type="radio" /> <span>Monnify</span>
        </label>
        <button onClick={() => setShowModal(true)} disabled={payOption === ""} className="py-3 w-100 text-light" id="payment_btn" style={{ backgroundColor: payOption === "" ? "grey" : "var(--deep_pink)" }}>
          Continue to Payment
        </button>
        {/* {payOption === "" && <div style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255,0.4)" }}></div>} */}
      </div>
    </div>
  );
};

export default PaymentOption;
