import React, { useContext } from "react";

import AuthPageWrapper from "../AuthPageWrapper.tsx";
import AuthFormTitle from "../AuthFormTitle.tsx";
import AuthPageLinkWrapper from "../authPageLinkWrapper/AuthPageLinkWrapper.tsx";
import PageLink from "../pageLink/PageLink.tsx";
import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper.tsx";
import FormComp from "../formComp/FormComp.tsx";
import LoginFormElement from "../loginFormElement/LoginFormElement.tsx";
import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";

import { loginDetails } from "../../data.ts";
import { userContext } from "../context/UserProvider.tsx";
import "./style.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isLoginError, loginInputValues, handleLoginInputChange, handleLoginFormSubmit, isJustLoggedIn } = useContext(userContext);

  const navigate = useNavigate();

  if (isJustLoggedIn) {
    navigate("/");
  }

  const formElements = loginDetails.map(({ name, inputLabel, type, placeholder }, index) => {
    return (
      <LoginFormElement key={index} isError={isLoginError} name={name} inputLabel={inputLabel}>
        <TextInput handleChange={(event) => handleLoginInputChange(event, name)} value={loginInputValues[name as keyof typeof loginInputValues]} name={name} type={type} placeholder={placeholder} />
      </LoginFormElement>
    );
  });

  return (
    <div id="login_page">
      <AuthPageWrapper>
        <FormComp handleFormSubmit={handleLoginFormSubmit} styles={{ borderRadius: "5px", boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px", backgroundColor: "white" }}>
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
