import React, { useContext } from "react";
import { Icon } from "@iconify/react";

import { checkoutContext } from "../components/checkout/Checkout";

const ResetPayOptionBtn = () => {
  const { setMonnifyOption } = useContext(checkoutContext);
  return (
    <button aria-label="reset-option" onClick={() => setMonnifyOption("")}>
      <Icon icon="ep:back" style={{ color: "white", fontSize: "1.1rem" }} />
    </button>
  );
};

export default ResetPayOptionBtn;
