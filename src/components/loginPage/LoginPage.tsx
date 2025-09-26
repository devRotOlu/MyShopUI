import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
import LoginDetails from "../loginDetails/LoginDetails.tsx";
import SEOEnhanzer from "../../SEOEnhanzer.tsx";

import { loginDetails } from "../../data.ts";
import { useHandleLoginFormChange } from "../../customHooks/useHandleLoginFormChange.ts";
import { userContext } from "../context/UserProvider.tsx";
import "./style.css";
import { useLoginSubmit } from "../../customHooks/useLoginSubmit.ts";
import { useValidation } from "../../customHooks/useValidation.ts";
import { loginSchema } from "../../formSchemas.ts";

const LoginPage = () => {
  const { isLoginError, isJustLoggedIn, isAuthenticating, confirmEmail, signingUser } = useContext(userContext);
  const { formValues, handleLoginInputChange } = useHandleLoginFormChange();
  const { testValidation, validationErrors } = useValidation(loginSchema);
  const { handleSubmit, prevFormValues } = useLoginSubmit(signingUser, formValues, testValidation);

  const isError = prevFormValues.email === formValues.email && prevFormValues.password === formValues.password && isLoginError;

  const navigate = useNavigate();
  const location = useLocation();

  if (isJustLoggedIn) {
    navigate("/");
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const userId = query.get("id");
    const token = query.get("token");
    if (userId && token) {
      confirmEmail({ userId, token });
      setTimeout(() => {
        navigate("/account/login", { replace: true });
      }, 1000);
    }
  }, [confirmEmail, location.search, navigate]);

  const formElements = loginDetails.map(({ name, inputLabel, type, placeholder }, index) => {
    return (
      <LoginFormElement key={index} isError={isError} name={name} inputLabel={inputLabel} validationErrors={validationErrors}>
        <TextInput handleChange={(event) => handleLoginInputChange(event, name)} value={formValues[name as keyof typeof formValues]} name={name} type={type} placeholder={placeholder} />
      </LoginFormElement>
    );
  });

  return (
    <>
      <SEOEnhanzer title="Login | MyShop Online Shopping" description="Login to access your MyShop account" robots="noindex, follow" />
      <AuthPageWrapper id="login_page">
        <FormComp handleFormSubmit={handleSubmit} styles={{ borderRadius: "5px", boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px", backgroundColor: "white" }}>
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
            <LoginDetails />
          </AuthFormElementWrapper>
          <AuthPageLinkWrapper linkSectionTitle="Don't have an Account?">
            <PageLink link="/account/signup" linkLabel="Create an Account" />
          </AuthPageLinkWrapper>
        </FormComp>
      </AuthPageWrapper>
    </>
  );
};

export default LoginPage;
