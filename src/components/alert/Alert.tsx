import React, { useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { AlertProp } from "../../types.ts";
import "./style.css";
import { alertContext } from "../context/AlertProvider.tsx";

const Alert = ({ alertMessage, alertTitle, children, styles }: AlertProp) => {
  const { handleAlert } = useContext(alertContext);
  return (
    <div className="d-flex text-white justify-content-between" id="alert" style={styles}>
      <div className="flex-grow-1 px-2 d-flex flex-column gap-2 justify-content-center">
        {alertTitle ? <p>{alertTitle}</p> : ""}
        <p>{alertMessage}</p>
        {children}
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <button onClick={() => handleAlert({ showAlert: false })} className="d-flex">
          <Icon icon="iconoir:cancel" style={{ fontSize: "30px" }} />
        </button>
      </div>
    </div>
  );
};

export default Alert;
