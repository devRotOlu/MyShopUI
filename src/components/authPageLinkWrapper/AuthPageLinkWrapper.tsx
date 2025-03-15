import React from "react";

import { authFormLinkProps } from "../../types";
import "./style.css";

const AuthPageLinkWrapper = ({ linkSectionTitle, children }: authFormLinkProps) => {
  return (
    <div id="authFormLink">
      <p className="text-center">{linkSectionTitle}</p>
      {children}
    </div>
  );
};

export default AuthPageLinkWrapper;
