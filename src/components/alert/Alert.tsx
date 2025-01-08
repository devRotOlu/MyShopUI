import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { AlertProp } from "../../types.ts";
import "./style.css";

const Alert = ({ alertMessage, alertTitle, setIsDisplayed, children, styles }: AlertProp) => {
  useEffect(() => {
    const myTimeOut = setTimeout(() => setIsDisplayed(false), 10000);
    return () => clearTimeout(myTimeOut);
  }, [setIsDisplayed]);

  return (
    <div className="d-flex text-white justify-content-between" id="alert" style={styles}>
      <div className="flex-grow-1 px-2 d-flex flex-column gap-2">
        {alertTitle ? <p>{alertTitle}</p> : ""}
        <p>{alertMessage}</p>
        {children}
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <button onClick={() => setIsDisplayed(false)} className="d-flex">
          <Icon icon="iconoir:cancel" style={{ fontSize: "30px" }} />
        </button>
      </div>
    </div>
  );
};

export default Alert;
