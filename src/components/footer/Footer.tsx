import React from "react";
import { Icon } from "@iconify/react";

import { contacts, socials } from "../../data";
import "./style.css";

const Footer = () => {
  const _contacts = contacts.map(({ contact, channel, icon }, index) => {
    return (
      <li key={index} className="d-flex align-items-center gap-3">
        <span className="icon_wrapper bg-white d-flex justify-content-center align-items-center">
          <Icon icon={icon} fontSize={20} />
        </span>
        <div>
          <p className="text-white">{contact}</p>
          <p className="mt-2 text-white">{channel}</p>
        </div>
      </li>
    );
  });
  const _socials = socials.map(({ icon }, index) => {
    return (
      <li>
        <span className="icon_wrapper social_icons d-flex justify-content-center align-items-center" key={index}>
          <Icon icon={icon} fontSize={15} color="white" />
        </span>
      </li>
    );
  });
  return (
    <div id="footer">
      <ul className="d-flex justify-content-between px-5 py-2">{_contacts}</ul>
      <div className="py-4 px-5">
        <div>
          <p className="text-white fw-bold">CONNECT WITH US</p>
          <ul className="d-flex gap-4 mt-3 p-0">{_socials}</ul>
        </div>
      </div>
      <div className="border-top position-relative d-flex justify-content-center">
        <span className="postion-absolute top-0 px-2">Copyright &copy; 2025 MyShop.com. All rights reserved</span>
      </div>
    </div>
  );
};

export default Footer;
