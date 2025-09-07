import React from "react";

import { formButtonProp } from "../../types/types.ts";
import "./style.css";

const FormButton = ({ value, styles }: formButtonProp) => {
  return <input type="submit" className="text-light w-100 f-bold" id="formButton" value={value} style={styles} />;
};

export default FormButton;
