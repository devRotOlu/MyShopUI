import React, { useState } from "react";

import { textInputProps } from "../types";

import "./style.css";

const TextInput = ({ name, type, placeholder, value, handleChange, children }: textInputProps) => {
  const [inputType, setInputType] = useState("");
  return (
    <label className="position-relative">
      {children}
      {name === "password" ? (
        <>
          <input
            autoComplete="off"
            className="inputs"
            type={inputType}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(event) => {
              setInputType("password");
              handleChange(event);
            }}
          />
          <button type="button" onClick={() => setInputType((preValue) => (preValue === type ? "password" : type))}>
            {inputType === type ? "Hide" : "Show"}
          </button>
        </>
      ) : (
        <input autoComplete="off" className="inputs" type={type} name={name} placeholder={placeholder} value={value} onChange={handleChange} />
      )}
    </label>
  );
};

export default TextInput;
