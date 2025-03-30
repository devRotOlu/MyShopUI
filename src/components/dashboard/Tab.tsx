import React from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

import { TabProps } from "../../types";

const getActiveClass = ({ isActive }: { isActive: boolean }) => (isActive ? "isActive" : "");

const Tab = ({ icon, tab, link }: TabProps) => {
  const _links = link.map((link, index) => {
    const { linkLabel, to } = link;
    return (
      <NavLink className={getActiveClass} to={to} key={index}>
        {linkLabel}
      </NavLink>
    );
  });
  return (
    <div className="d-flex gap-2 tab">
      <div>
        <Icon icon={icon} className="fs-5" />
      </div>
      <div className="pt-1 d-flex flex-column gap-3">
        <span className="fw-bolder">{tab}</span>
        {_links}
      </div>
    </div>
  );
};

export default Tab;
