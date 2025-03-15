import React from "react";
import { Link } from "react-router-dom";

import { pageLinkProps } from "../../types";
import "./style.css";

const PageLink = ({ link, linkLabel }: pageLinkProps) => {
  return (
    <span id="page_link">
      <Link to={link}>{linkLabel}</Link>
    </span>
  );
};

export default PageLink;
