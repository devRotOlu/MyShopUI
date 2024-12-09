import React from "react";

import "./style.css";

import { formCompProp } from "../types";

const FormComp = ({ title, children, handleFormSubmit }: formCompProp) => {
  return (
    <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3 bg-white" id="formWrapper">
      <h2>{title}</h2>
      {children}
    </form>
  );
};

export default FormComp;
