import React, { useContext } from "react";
import { Icon } from "@iconify/react";

import Brand from "../../brand/Brand";

import { appContext } from "../../context/AppContext";
import { dialogHeaderProps } from "../../../types";

const DialogHeader = ({ children }: dialogHeaderProps) => {
  const { cartItemsTotalPrice } = useContext(appContext);

  return (
    <>
      <div className="border-bottom px-3 py-2 d-flex flex-column">
        <Brand styles={{ width: "100px", alignSelf: "center" }} />
        <button className="align-self-end">
          <Icon icon="mdi:cancel-box" />
        </button>
      </div>
      <div className="px-3 py-2 d-flex justify-content-between border-bottom">
        {children}
        <p className="fw-bold">&#8358;{Math.ceil(cartItemsTotalPrice * 1500)}</p>
      </div>
    </>
  );
};

export default DialogHeader;
