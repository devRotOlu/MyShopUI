import React from "react";
import { MdCancel } from "react-icons/md";

import CloseTransferBtn from "../checkout/CloseTransferBtn";

import "./style.css";

const CheckoutError = () => {
  return (
    <div id="checkout_error">
      <div className="d-flex flex-column align-items-center gap-3 mb-4 pt-3  px-3">
        <p className="text-danger">OOPS! AN ERROR OCCURRED</p>
        <div>
          <MdCancel size={65} color="red" />
        </div>
        <p className="text-center" style={{ color: "var(--light_Grey)" }}>
          Sorry we could not complete your transaction at this moment
        </p>
      </div>
      <div className="pb-4 px-3">
        <CloseTransferBtn />
      </div>
    </div>
  );
};

export default CheckoutError;
