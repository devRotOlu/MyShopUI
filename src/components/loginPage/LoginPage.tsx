import React from "react";

import AuthPageWrapper from "../AuthPageWrapper.tsx";
import AuthFormTitle from "../AuthFormTitle.tsx";
import AuthPageLinkWrapper from "../authPageLinkWrapper/AuthPageLinkWrapper.tsx";
import PageLink from "../pageLink/PageLink.tsx";
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
        <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name as keyof typeof formValues]} name={name} type={type} placeholder={placeholder} />
      </LoginFormElement>
    );
  });

  return (
    <div id="login_page">
      <AuthPageWrapper>
        <FormComp handleFormSubmit={handleSubmit} styles={{ borderRadius: "5px", boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px", backgroundColor: "white" }}>
          <AuthFormTitle title="Login" />
          <AuthFormElementWrapper>
            {formElements}
            <FormButton value="Login" styles={{ backgroundColor: "var(--light_Green)" }} />
          </AuthFormElementWrapper>
          <AuthPageLinkWrapper linkSectionTitle="Don't have an Account?">
            <PageLink link="/account/signup" linkLabel="Create an Account" />
          </AuthPageLinkWrapper>
        </FormComp>
      </AuthPageWrapper>
    </div>
  );
};

export default LoginPage;
