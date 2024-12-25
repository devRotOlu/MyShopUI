import React from "react";
import { Link } from "react-router-dom";

import { AuthFormLinkProp } from "../../types";
import "./style.css";

const AuthFormLink = ({ link, linkLabel, linkSectionTitle }: AuthFormLinkProp) => {
  return (
    <div id="authFormLink">
      <p className="text-center">{linkSectionTitle}</p>
      <Link to={link}>{linkLabel}</Link>
    </div>
  );
};

export default AuthFormLink;
