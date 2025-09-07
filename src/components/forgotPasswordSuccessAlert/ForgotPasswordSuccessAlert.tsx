import React from "react";

import { forgotPasswordSuccessAlertProps } from "../../types/types";
import "./style.css";

const ForgotPasswordSuccessAlert = ({ email, mutate }: forgotPasswordSuccessAlertProps) => {
  return (
    <div className="px-5" id="forgot_password_success">
      <p className="text-center">
        We’ve sent a reset password email to {""}
        <br />
        <span className="fw-bold">{email}</span>
        <br /> To create your new password, click the link in the email and enter a new password.
      </p>
      <div className="mt-5 mb d-flex flex-column align-items-center">
        <p className="text-center">
          Didn’t receive the email?
          <br /> Check your junk mail, spam folder or
        </p>
        <button onClick={() => mutate()}>Click here to send another link.</button>
      </div>
    </div>
  );
};

export default ForgotPasswordSuccessAlert;
