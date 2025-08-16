import React, { useState } from "react";

import { textInputProps } from "../../types";
import "./style.css";

const TextInput = ({ name, type, placeholder, value, handleChange, children, handleFocus, handleBlur }: textInputProps) => {
  const [inputType, setInputType] = useState(type);
  return (
    <label className="position-relative w-100" id="text_input">
      {children}
      {type === "password" ? (
        <>
          <input onBlur={handleBlur} onFocus={handleFocus} autoComplete="off" className="inputs" type={inputType} name={name} placeholder={placeholder} value={value} onChange={(event) => handleChange(event)} />
          <button className="fw-light" type="button" onClick={() => setInputType((preValue) => (preValue === type ? "text" : type))}>
            {inputType === type ? "Show" : "Hide"}
          </button>
        </>
      ) : (
        <input autoComplete="off" className="inputs" type={type} name={name} placeholder={placeholder} value={value} onChange={handleChange} onFocus={handleFocus} />
      )}
    </label>
  );
};

export default TextInput;
