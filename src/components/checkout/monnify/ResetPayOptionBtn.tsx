import React, { useContext } from "react";
import { Icon } from "@iconify/react";

import { checkoutContext } from "../Checkout";

const ResetPayOptionBtn = () => {
  const { setMonnifyOption } = useContext(checkoutContext);
  return (
    <button onClick={() => setMonnifyOption("")}>
      <Icon icon="ep:back" style={{ color: "white", fontSize: "1.1rem" }} />
    </button>
  );
};

export default ResetPayOptionBtn;
