import React from "react";

import { textInputProps } from "../types";

import "./style.css";

const TextInput = ({ name, type, inputLabel, placeholder, value, handleChange }: textInputProps) => {
  console.log(value);
  return (
    <label>
      <p>{inputLabel}</p>
      <input className="inputs" type={type} name={name} placeholder={placeholder} value={value} onChange={handleChange} />
    </label>
  );
};

export default TextInput;
