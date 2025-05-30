import React from "react";

import { resetPasswordInstructionProps } from "../../types";
import "./style.css";

const ResetPasswordInstruction = ({ instruction }: resetPasswordInstructionProps) => {
  return (
    <div className="px-4 py-2 mx-4 mt-1 mb-3" id="password_reset_instruction">
      <p className="text-center text-muted fw-light">{instruction}</p>
    </div>
  );
};

export default ResetPasswordInstruction;
