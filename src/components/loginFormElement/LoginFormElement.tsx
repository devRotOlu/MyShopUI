import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import ValidationError from "../validationError/ValidationError";

import { loginFormElementProp } from "../../types/types";
import "./style.css";

const LoginFormElement = ({ name, inputLabel, children, isError, validationErrors }: loginFormElementProp) => {
  let formElement: ReactElement;
  if (name === "password") {
    formElement = (
      <>
        <div id="password_label_wrapper" className="d-flex justify-content-between mb-1">
          <p>{inputLabel}</p>
          <Link to="/account/forgot-password">Forgot Password?</Link>
        </div>
        {children}
        {validationErrors.password && <ValidationError error={validationErrors.password} />}
      </>
    );
  } else {
    formElement = (
      <>
        <p className="mb-1">{inputLabel}</p>
        {children}
        {validationErrors.email && <ValidationError error={validationErrors.email} />}
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
