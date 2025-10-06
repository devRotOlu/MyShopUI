import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { AlertProp } from "../../types/types.ts";
import "./style.css";
import { alertContext } from "../context/AlertProvider.tsx";

const Alert = ({ alertMessage, alertTitle, children, styles }: AlertProp) => {
  const { handleAlert } = useContext(alertContext);
  return (
    <div className="d-flex text-white justify-content-between" id="alert" style={styles} role="alert">
      <div className="flex-grow-1 px-2 d-flex flex-column gap-1 justify-content-center">
        {alertTitle ? <p>{alertTitle}</p> : ""}
        <p>{alertMessage}</p>
        {children}
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <button aria-label="Close alert" onClick={() => handleAlert({ showAlert: false })} className="d-flex">
          <AiOutlineClose size="30px" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
