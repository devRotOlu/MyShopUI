import React, { useState } from "react";

import { textInputProps } from "../../types";

import "./style.css";

const TextInput = ({ name, type, placeholder, value, handleChange, children, handleFocus }: textInputProps) => {
  const [inputType, setInputType] = useState("");
  return (
    <label className="position-relative w-100" id="text_input">
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
        <input autoComplete="off" className="inputs" type={type} name={name} placeholder={placeholder} value={value} onChange={handleChange} onFocus={handleFocus} />
      )}
    </label>
  );
};

export default TextInput;
