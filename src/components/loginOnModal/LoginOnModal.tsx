import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper.tsx";
import FormComp from "../formComp/FormComp.tsx";
import LoginFormElement from "../loginFormElement/LoginFormElement.tsx";
import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";

import { useLogin } from "../../customHooks/useLogin.ts";
import { closeModal } from "../../helperFunctions/utilityFunctions.ts";
import { loginDetails } from "../../data.ts";

import "./style.css";

const LoginOnModal = () => {
  const { isError, handleChange, handleSubmit, formValues, isSuccess } = useLogin();
  const formElements = loginDetails.map(({ name, inputLabel, type, placeholder }) => {
    return (
      <LoginFormElement key={name} isError={isError} name={name} inputLabel={inputLabel}>
        <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name as keyof typeof formValues]} name={name} type={type} placeholder={placeholder} />
      </LoginFormElement>
    );
  });

  if (isSuccess) {
    closeModal("login_shortCut");
  }

  return (
    <FormComp handleFormSubmit={handleSubmit} styles={{ minHeight: "100vh", position: "relative", width: "400px", backgroundColor: "white" }}>
      <div className="d-flex justify-content-between py-2 " id="modal_login_header">
        <h2>Login</h2>
        <button type="button" onClick={() => closeModal("login_shortCut")} className="py-1 px-2" id="modal_cancel_btn">
          <Icon icon="iconoir:cancel" />
          <span>Cancel</span>
        </button>
      </div>
      <AuthFormElementWrapper>
        {formElements}
        <FormButton value="Login" styles={{ backgroundColor: "var(--light_Green)" }} />
      </AuthFormElementWrapper>
      <div className="d-flex justify-content-center" id="modal_login_link">
        <Link to="/account/signup">Don’t have an account? Sign Up</Link>
      </div>
    </FormComp>
  );
};

export default LoginOnModal;
