import React, { ChangeEvent, useEffect } from "react";

import { checkoutPaymentOptionsProps } from "../../types";
import "./style.css";

const CheckoutPaymentOptions = ({ setPayOption }: checkoutPaymentOptionsProps) => {
  const handleMonnifyOption = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setPayOption("monnify");
    }
  };

  const handlePayStackOption = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setPayOption("payStack");
    }
  };
  useEffect(() => {
    return () => setPayOption("");
  }, [setPayOption]);

  return (
    <div id="checkout_payment_options">
      <div className="pt-4 pb-5 d-flex flex-column border-top">
        <div className="mb-4 d-flex gap-3 w-100 checkbox_wrapper py-3">
          <label className="position-relative">
            <input onChange={handleMonnifyOption} name="payment_option" type="radio" />
            <span className="custom_radio">
              <span></span>
            </span>
          </label>
          <div className="flex-grow-1">
            <p className="mb-3 pay_option_name">Monnify</p>
            <div className="d-flex justify-content-between">
              <p className="text-muted">Pay with Card or bank transfer.</p>
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmOYUCIUSjE_MdDJKQuS_D8B3x1Nt06nfbpA&s" alt="monnify_logo" />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex gap-3 w-100 checkbox_wrapper py-3">
          <label className="position-relative">
            <input onChange={handlePayStackOption} name="payment_option" type="radio" />
            <span className="custom_radio">
              <span></span>
            </span>
          </label>
          <div className="flex-grow-1">
            <p className="mb-3 pay_option_name">PayStack</p>
            <div className="d-flex justify-content-between">
              <p className="text-muted">Pay with Card or bank transfer.</p>
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShqlEP0qWHv6nFrvoiGj1SSyyVuKhVr1-VwA&s" alt="paystack_logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentOptions;
