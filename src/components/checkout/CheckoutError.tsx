import React from "react";
import { Icon } from "@iconify/react";

import CloseTransferBtn from "./CloseTransferBtn";

const CheckoutError = () => {
  return (
    <>
      <div className="d-flex flex-column align-items-center gap-3 mb-3 pt-3 pb-5 px-3">
        <p className="text-danger">OOPS! AN ERROR OCCURRED</p>
        <div>
          <Icon icon="material-symbols-light:cancel" fontSize="65px" color="red" />
        </div>
        <p style={{ color: "var(--light_Grey)" }}>Sorry we could not complete your transaction at this moment</p>
      </div>
      <div className="pb-4 px-3 bg-white">
        <CloseTransferBtn />
      </div>
    </>
  );
};

export default CheckoutError;
