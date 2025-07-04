import React, { useContext } from "react";
import { Icon } from "@iconify/react";

import { dialogHeaderProps } from "../../types";
import logo from "../../assests/logo_new_2.png";
import { checkoutContext } from "../checkout/Checkout";
import "./style.css";

const DialogHeader = ({ children }: dialogHeaderProps) => {
  const { setShowModal } = useContext(checkoutContext);

  return (
    <>
      <div className="border-bottom px-3 py-2 d-flex flex-column" id="dialog_header">
        <div id="brand">
          <img src={logo} alt="App Brand" style={{ width: "100%" }} />
        </div>
        <button onClick={() => setShowModal(false)} className="align-self-end">
          <Icon icon="mdi:cancel-box" fontSize={30} />
        </button>
      </div>
      <div className="px-3 py-2 border-bottom">{children}</div>
    </>
  );
};

export default DialogHeader;
