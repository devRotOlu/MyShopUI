import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { AlertProp } from "../types";
import "./style.css";

const Alert = ({ alertMessage, alertTitle, shouldDisplay }: AlertProp) => {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(shouldDisplay);

  useEffect(() => {
    const myTimeOut = setTimeout(() => setIsDisplayed(false), 10000);
    return () => clearTimeout(myTimeOut);
  }, []);

  return (
    <>
      {isDisplayed ? (
        <div className="d-flex text-white justify-content-between" id="alert">
          <div className="flex-grow-1 px-2">
            {alertTitle ? <p>{alertTitle}</p> : ""}
            <p>{alertMessage}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button onClick={() => setIsDisplayed(false)} className="d-flex">
              <Icon icon="iconoir:cancel" style={{ fontSize: "30px" }} />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Alert;
