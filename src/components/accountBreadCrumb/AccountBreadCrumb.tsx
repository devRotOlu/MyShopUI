import React from "react";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

import { accountBreadCrumbProps } from "../../types/types";
import "./style.css";

const AccountBreadCrumb = ({ currentLinkLabel, route }: accountBreadCrumbProps) => {
  return (
    <nav className="d-sm-flex gap-2 flex-column w-100 bg-white py-md-5 px-3 py-3 mb-5 d-none" id="account_bread_crumb">
      <div className="d-md-flex">
        <p className="d-flex align-items-center gap-1">
          <Link to="/">Home</Link>
          <span>
            <MdNavigateNext size={20} />
          </span>
          <Link to={route} className="d-flex align-items-center gap-1">
            <span>My Account</span>
            <span>
              <MdNavigateNext size={20} />
            </span>
            <span id="current_link_label">{currentLinkLabel}</span>
          </Link>
        </p>
      </div>
      <h1 className="fs-2">{currentLinkLabel}</h1>
    </nav>
  );
};

export default AccountBreadCrumb;
