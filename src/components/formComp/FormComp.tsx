import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

import { formCompProp } from "../types";

const FormComp = ({ title, children, handleFormSubmit, linkSectionTitle, link, linkTitle }: formCompProp) => {
  return (
    <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3 bg-white" id="formWrapper">
      <div className="pb-2 pt-2 border-bottom border-secondary">
        <h1 className="text-center h1">{title}</h1>
      </div>
      {children}
      <div>
        <p className="text-center">{linkSectionTitle}</p>
        <Link to={link}>{linkTitle}</Link>
      </div>
    </form>
  );
};

export default FormComp;
