import React from "react";
import { Link } from "react-router-dom";

import { loginFormElementProp } from "../../types";
import "./style.css";

const LoginFormElement = ({ name, inputLabel, children, isError }: loginFormElementProp) => {
  var formElement;
  if (name === "password") {
    formElement = (
      <>
        <div id="password_label_wrapper" className="d-flex justify-content-between mb-1">
          <p>{inputLabel}</p>
          <Link to="/account/forgot-password">Forgot Password?</Link>
        </div>
        {children}
      </>
    );
  } else {
    formElement = (
      <>
        <p className="mb-1">{inputLabel}</p>
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
  return (
    <div className="w-100" id="login_form_element">
      {formElement}
    </div>
  );
};

export default LoginFormElement;
