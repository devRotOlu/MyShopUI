import React from "react";

import { AuthFormElementWrapperProp } from "../../types";
import "./style.css";

const AuthFormElementWrapper = ({ children }: AuthFormElementWrapperProp) => {
  return (
    <div className="d-flex flex-column gap-3" id="authFormElementsWrap">
      <div className="d-flex flex-column gap-3">{children}</div>
    </div>
  );
};

export default AuthFormElementWrapper;
