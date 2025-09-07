import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";

import { passwordChecklistDisplayProps } from "../types/types";

const PasswordChecklistDisplay = ({ value }: passwordChecklistDisplayProps) => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  return (
    <div className={`d-${isValidPassword ? "none" : "block"}`}>
      <PasswordChecklist rules={["specialChar", "capitalAndLowercase", "number"]} value={value} onChange={setIsValidPassword} style={{ fontSize: "12px" }} iconSize={12} />
    </div>
  );
};

export default PasswordChecklistDisplay;
