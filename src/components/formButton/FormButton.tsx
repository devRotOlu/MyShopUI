import React from "react";

import { formButtonProp } from "../../types.ts";
import "./style.css";

const FormButton = ({ value, styles, isPending }: formButtonProp) => {
  return <input type="submit" className="text-light w-100 f-bold" id="formButton" value={isPending ? "" : value} style={styles} />;
};

export default FormButton;
