import React, { useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper.tsx";
import FormComp from "../formComp/FormComp.tsx";
import LoginFormElement from "../loginFormElement/LoginFormElement.tsx";
import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";
import ModalCloseButton from "../ModalCloseButton.tsx";
import ComponentOverlay from "../ComponentOverlay.tsx.tsx";
import Loader from "../Loader.tsx";
import LoginDetails from "../loginDetails/LoginDetails.tsx";

import { userContext } from "../context/UserProvider.tsx";
import { loginDetails } from "../../data.ts";
import "./style.css";
import { useHandleLoginFormChange } from "../../customHooks/useHandleLoginFormChange.ts";
import { useLoginSubmit } from "../../customHooks/useLoginSubmit.ts";
import { useValidation } from "../../customHooks/useValidation.ts";
import { loginSchema } from "../../formSchemas.ts";

const LoginOnModal = () => {
  const location = useLocation();
  const pathnameRef = useRef(location.pathname);
  const { setShowModal, isLoginError, signingUser, isAuthenticating, isJustLoggedIn } = useContext(userContext);
  const { formValues, handleLoginInputChange } = useHandleLoginFormChange();
  const { testValidation, validationErrors } = useValidation(loginSchema);
  const { handleSubmit, prevFormValues } = useLoginSubmit(signingUser, formValues, testValidation);

  const isError = prevFormValues.email === formValues.email && prevFormValues.password === formValues.password && isLoginError;

  const formElements = loginDetails.map(({ name, inputLabel, type, placeholder }) => {
    return (
      <LoginFormElement key={name} isError={isError} name={name} inputLabel={inputLabel} validationErrors={validationErrors}>
        <TextInput handleChange={(event) => handleLoginInputChange(event, name)} value={formValues[name as keyof typeof formValues]} name={name} type={type} placeholder={placeholder} />
      </LoginFormElement>
    );
  });

  if (isJustLoggedIn) {
    setShowModal(false);
  }

  useEffect(() => {
    if (pathnameRef.current !== location.pathname) {
      setShowModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div id="login_modal">
      <FormComp handleFormSubmit={handleSubmit} styles={{ height: "100%", position: "relative", width: "100%", backgroundColor: "white" }}>
        <div className="d-flex justify-content-between py-2 align-items-center " id="modal_login_header">
          <h2>Login</h2>
          <ModalCloseButton setShowModal={setShowModal} />
        </div>
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
        <div className="d-flex justify-content-center" id="modal_login_link" onClick={() => setShowModal(false)}>
          <Link to="/account/signup">Don’t have an account? Sign Up</Link>
        </div>
      </FormComp>
    </div>
  );
};

export default LoginOnModal;
