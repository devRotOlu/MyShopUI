import React from "react";

import { formButtonProp } from "../../types.ts";
import "./style.css";

const FormButton = ({ value }: formButtonProp) => {
  return <input type="submit" className="text-light bg-success w-100 f-bold" id="formButton" value={value} />;
};

export default FormButton;
