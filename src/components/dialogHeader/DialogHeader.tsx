import React, { useContext } from "react";
import { Icon } from "@iconify/react";

import Brand from "../brand/Brand";

import { dialogHeaderProps } from "../../types";
import { cartContext } from "../context/CartProvider";
import { checkoutContext } from "../checkout/Checkout";
import { naira } from "../../data";
import "./style.css";

const DialogHeader = ({ children }: dialogHeaderProps) => {
  const { cartItemsTotalPrice } = useContext(cartContext);
  const { setShowModal } = useContext(checkoutContext);

  return (
    <>
      <div className="border-bottom px-3 py-2 d-flex flex-column" id="dialog_header">
        <div id="brand">
          <Brand />
        </div>
        <button onClick={() => setShowModal(false)} className="align-self-end">
          <Icon icon="mdi:cancel-box" fontSize={30} />
        </button>
      </div>
      <div className="px-3 py-2 d-flex justify-content-between border-bottom">
        {children}
        <p className="fw-bold">
          {naira}
          {Math.ceil(cartItemsTotalPrice).toLocaleString()}
        </p>
      </div>
    </>
  );
};

export default DialogHeader;
