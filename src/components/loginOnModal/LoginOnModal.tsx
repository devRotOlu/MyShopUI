import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper.tsx";
import FormComp from "../formComp/FormComp.tsx";
import LoginFormElement from "../loginFormElement/LoginFormElement.tsx";
import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";
import ModalCloseButton from "../ModalCloseButton.tsx";

import { userContext } from "../context/UserProvider.tsx";
import { loginDetails } from "../../data.ts";
import "./style.css";

const LoginOnModal = () => {
  const { setShowModal, isLoginError, isLoginSuccess, handleLoginFormSubmit, loginInputValues, handleLoginInputChange } = useContext(userContext);

  const formElements = loginDetails.map(({ name, inputLabel, type, placeholder }) => {
    return (
      <LoginFormElement key={name} isError={isLoginError} name={name} inputLabel={inputLabel}>
        <TextInput handleChange={(event) => handleLoginInputChange(event, name)} value={loginInputValues[name as keyof typeof loginInputValues]} name={name} type={type} placeholder={placeholder} />
      </LoginFormElement>
    );
  });

  if (isLoginSuccess) {
    setShowModal(false);
  }

  return (
    <FormComp handleFormSubmit={handleLoginFormSubmit} styles={{ minHeight: "100vh", position: "relative", width: "400px", backgroundColor: "white" }}>
      <div className="d-flex justify-content-between py-2 " id="modal_login_header">
        <h2>Login</h2>
        <ModalCloseButton setShowModal={setShowModal} />
      </div>
      <AuthFormElementWrapper>
        {formElements}
        <FormButton value="Login" styles={{ backgroundColor: "var(--light_Green)" }} />
      </AuthFormElementWrapper>
      <div className="d-flex justify-content-center" id="modal_login_link" onClick={() => setShowModal(false)}>
        <Link to="/account/signup">Don’t have an account? Sign Up</Link>
      </div>
    </FormComp>
  );
};

export default LoginOnModal;
