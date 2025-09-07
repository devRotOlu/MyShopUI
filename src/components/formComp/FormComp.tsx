import React from "react";

import { formCompProp } from "../../types/types";
import "./style.css";

const FormComp = ({ children, handleFormSubmit, styles }: formCompProp) => {
  return (
    <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3" id="formWrapper" style={styles}>
      {children}
    </form>
  );
};

export default FormComp;
