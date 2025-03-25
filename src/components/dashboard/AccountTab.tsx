import React from "react";

import Tab from "./Tab";

import { userTabData } from "../../data";
import "./style.css";

const AccountTab = () => {
  const tabs = userTabData.map((data, index) => {
    const { icon, tab, link } = data;
    if (userTabData.length - 1 === index) {
      return (
        <div key={index} className="d-flex py-3 pe-5">
          <Tab icon={icon} tab={tab} link={link} />
        </div>
      );
    }
    return (
      <div key={index} className="border-bottom border-secondary d-flex gap-2 flex-column py-3 pe-4">
        <Tab icon={icon} tab={tab} link={link} />
      </div>
    );
  });
  return <div className="bg-white px-3 rounded pb-5">{tabs}</div>;
};

export default AccountTab;
