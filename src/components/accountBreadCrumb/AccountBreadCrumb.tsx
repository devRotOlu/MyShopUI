import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { accountBreadCrumbProps } from "../../types";
import "./style.css";

const AccountBreadCrumb = ({ currentLinkLabel }: accountBreadCrumbProps) => {
  return (
    <nav className="d-sm-flex gap-2 flex-column w-100 bg-white py-md-5 px-3 py-3 mb-5 d-none" id="account_bread_crumb">
      <Link to="/" className="d-md-flex">
        <p className="d-flex align-items-center gap-1">
          <span>Home</span>
          <span>
            <Icon icon="grommet-icons:next" />
          </span>
          <span>My Account</span>
          <span>
            <Icon icon="grommet-icons:next" />
          </span>
          <span id="current_link_label">{currentLinkLabel}</span>
        </p>
      </Link>
      <h1 className="fs-2">{currentLinkLabel}</h1>
    </nav>
  );
};

export default AccountBreadCrumb;
