import React from "react";

import AuthPageWrapper from "../AuthPageWrapper.tsx";
import AuthFormTitle from "../AuthFormTitle.tsx";
import AuthFormLink from "../authFormLink/AuthFormLink.tsx";
import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper.tsx";
import FormComp from "../formComp/FormComp.tsx";
import LoginFormElement from "../loginFormElement/LoginFormElement.tsx";
import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";

import { useLogin } from "../../customHooks/useLogin.ts";
import { loginDetails } from "../../data.ts";

import "./style.css";

const LoginPage = () => {
  const { isError, handleChange, formValues, handleSubmit } = useLogin();

  const formElements = loginDetails.map(({ name, inputLabel, type, placeholder }, index) => {
    return (
      <LoginFormElement key={index} isError={isError} name={name} inputLabel={inputLabel}>
        <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name]} name={name} type={type} placeholder={placeholder} />
      </LoginFormElement>
    );
  });

  return (
    <div id="login_page">
      <AuthPageWrapper>
        <FormComp handleFormSubmit={handleSubmit} styles={{ borderRadius: "5px", boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px" }}>
          <AuthFormTitle title="Login" />
          <AuthFormElementWrapper>
            {formElements}
            <FormButton value="Login" />
          </AuthFormElementWrapper>
          <AuthFormLink link="/account/signup" linkLabel="Create an Account" linkSectionTitle="Don't have an Account?" />
        </FormComp>
      </AuthPageWrapper>
    </div>
  );
};

export default LoginPage;
