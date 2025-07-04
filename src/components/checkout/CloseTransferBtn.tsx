import React, { useContext } from "react";

import { checkoutContext } from "./Checkout";

const CloseTransferBtn = () => {
  const { setShowModal } = useContext(checkoutContext);
  return (
    <button id="closeTransferBtn" onClick={() => setShowModal(false)} className="w-100 text-white rounded py-2 px-2" style={{ backgroundColor: "var(--lighter_pink)" }}>
      Select another payment method
    </button>
  );
};

export default CloseTransferBtn;
