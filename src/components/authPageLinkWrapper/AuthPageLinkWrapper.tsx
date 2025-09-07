import React from "react";

import { authFormLinkProps } from "../../types/types";
import "./style.css";

const AuthPageLinkWrapper = ({ linkSectionTitle, children }: authFormLinkProps) => {
  return (
    <div id="authFormLink">
      <p className="text-center text-muted mb-1">{linkSectionTitle}</p>
      {children}
    </div>
  );
};

export default AuthPageLinkWrapper;
