import React, { useContext } from "react";
import { MdArrowBack } from "react-icons/md";

import { checkoutContext } from "../checkout/Checkout";

const ResetPayOptionBtn = () => {
  const { setMonnifyOption } = useContext(checkoutContext);
  return (
    <button aria-label="reset-option" onClick={() => setMonnifyOption("")}>
      <MdArrowBack size="1.1rem" color="white" />
    </button>
  );
};

export default ResetPayOptionBtn;
