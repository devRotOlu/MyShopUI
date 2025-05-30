import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthPageWrapper from "../authPageWrapper/AuthPageWrapper.tsx";
import AuthFormTitle from "../AuthFormTitle.tsx";
import AuthPageLinkWrapper from "../authPageLinkWrapper/AuthPageLinkWrapper.tsx";
import PageLink from "../pageLink/PageLink.tsx";
import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper.tsx";
import FormComp from "../formComp/FormComp.tsx";
import LoginFormElement from "../loginFormElement/LoginFormElement.tsx";
import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";
import ComponentOverlay from "../ComponentOverlay.tsx.tsx";
import Loader from "../Loader.tsx";

import { loginDetails } from "../../data.ts";
import { userContext } from "../context/UserProvider.tsx";
import "./style.css";

const LoginPage = () => {
  const { isLoginError, loginInputValues, handleLoginInputChange, handleLoginFormSubmit, isJustLoggedIn, isAuthenticating } = useContext(userContext);

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
    <AuthPageWrapper id="login_page">
      <FormComp handleFormSubmit={handleLoginFormSubmit} styles={{ borderRadius: "5px", boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px", backgroundColor: "white" }}>
        <AuthFormTitle title="Login" />
        <AuthFormElementWrapper>
          {formElements}
          <div className="position-relative">
            <FormButton value="Login" styles={{ backgroundColor: "var(--light_Green)" }} />
            {isAuthenticating && (
              <ComponentOverlay>
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                  <Loader color="white" size="spinner-border-sm" />
                </div>
              </ComponentOverlay>
            )}
          </div>
        </AuthFormElementWrapper>
        <AuthPageLinkWrapper linkSectionTitle="Don't have an Account?">
          <PageLink link="/account/signup" linkLabel="Create an Account" />
        </AuthPageLinkWrapper>
      </FormComp>
    </AuthPageWrapper>
  );
};

export default LoginPage;
