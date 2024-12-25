import React from "react";
import { Link } from "react-router-dom";

import { LoginFormElementProp } from "../../types";
import "./style.css";

const LoginFormElement = ({ name, inputLabel, children, isError }: LoginFormElementProp) => {
  var formElement;
  if (name === "password") {
    formElement = (
      <>
        <div id="password_label_wrapper" className="d-flex justify-content-between">
          <p>{inputLabel}</p>
          <Link to="/account/forgot-password">Forgot Password?</Link>
        </div>
        {children}
      </>
    );
  } else {
    formElement = (
      <>
        <p>{inputLabel}</p>
        {children}
        {isError ? (
          <p className="text-danger" id="errorReport">
            The email or password you have entered is incorrect. Please try again.
          </p>
        ) : (
          ""
        )}
      </>
    );
  }
  return <div className="w-100">{formElement}</div>;
};

export default LoginFormElement;
