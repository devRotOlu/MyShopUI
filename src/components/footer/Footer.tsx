import React from "react";

import { footerIconMap } from "../../iconMap";
import { contacts, socials } from "../../data";
import "./style.css";

const Footer = () => {
  const _contacts = contacts.map(({ contact, channel, icon }, index) => {
    const IconComponent = footerIconMap[icon as keyof typeof footerIconMap];
    return (
      <li key={index} className="d-flex align-items-center gap-3 contact">
        <span className="icon_wrapper bg-white d-flex justify-content-center align-items-center">
          <IconComponent size={20} />
        </span>
        <div>
          <p>{contact}</p>
          <p className="mt-2">{channel}</p>
        </div>
      </li>
    );
  });
  const _socials = socials.map(({ icon, name }, index) => {
    const IconComponent = footerIconMap[icon as keyof typeof footerIconMap];
    return (
      <li key={index}>
        <a className="icon_wrapper social_icons d-flex justify-content-center align-items-center" key={index} href={`https://${name}.com`}>
          <IconComponent size={18} color="white" />
        </a>
      </li>
    );
  });
  return (
    <div id="footer">
      <ul className="d-flex flex-md-row flex-column justify-content-between px-0 px-md-5 py-2 gap-md-0 gap-3">{_contacts}</ul>
      <div className="py-4 px-md-5 px-0" id="socials_wrapper">
        <div>
          <p className="fw-bold">CONNECT WITH US SOCIAL MEDIA</p>
          <ul className="d-flex gap-4 mt-3 p-0">{_socials}</ul>
        </div>
      </div>
      <div className="position-relative d-flex justify-content-md-center" id="copy_right_wrapper">
        <span className="postion-absolute top-0 px-2" id="copy_right">
          Copyright &copy; 2025 MyShop.com. All rights reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
