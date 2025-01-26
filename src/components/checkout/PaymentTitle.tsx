import React from "react";
import { Icon } from "@iconify/react";

import { paymentTitleProp } from "../../types";

const PaymentTitle = ({ title, setPayOption }: paymentTitleProp) => {
  const handlePayOption = () => {
    setPayOption("");
  };
  return (
    <div className="bg-dark position-relative py-2 px-2">
      <button onClick={handlePayOption}>
        <Icon icon="ep:back" style={{ color: "white", fontSize: "1.1rem" }} />
      </button>
      <div className="position-absolute start-50" style={{ display: "inline-block", width: "fit-content", transform: "translate(-50%,0)" }}>
        <p className="text-white text-center" style={{ width: "fit-content" }}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default PaymentTitle;
