import React from "react";

import { resetPasswordErrorProps } from "../../types/types";
import "./style.css";

const PasswordResetErrorAlert = ({ message }: resetPasswordErrorProps) => {
  return (
    <div className="px-4 py-2 mx-4 mt-1 mb-3 text-danger" id="password_reset_error">
      <p>{message}</p>
    </div>
  );
};

export default PasswordResetErrorAlert;
