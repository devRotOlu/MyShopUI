import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { breadCrumbProps } from "../../types";
import "./style.css";

const BreadCrumb = ({ currentLinkLabel }: breadCrumbProps) => {
  return (
    <nav className="px-5 bg-white mb-4 w-100" id="breadCrumb">
      <Link to="/">
        <p className="d-flex align-items-center gap-1">
          <span>Home</span>{" "}
          <span>
            <Icon icon="grommet-icons:next" />
          </span>{" "}
          <span id="current_link_label">{currentLinkLabel}</span>
        </p>
      </Link>
      <h1 className="mt-2 fs-2">{currentLinkLabel}</h1>
    </nav>
  );
};

export default BreadCrumb;
