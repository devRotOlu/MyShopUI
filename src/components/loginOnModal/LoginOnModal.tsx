import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper.tsx";
import FormComp from "../formComp/FormComp.tsx";
import LoginFormElement from "../loginFormElement/LoginFormElement.tsx";
import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";
import ModalCloseButton from "../ModalCloseButton.tsx";

import { useLogin } from "../../customHooks/useLogin.ts";
import { appContext } from "../context/AppContext.tsx";
import { loginDetails } from "../../data.ts";
import "./style.css";

const LoginOnModal = () => {
  const { setShowModal } = useContext(appContext);

  const { isError, handleChange, handleSubmit, formValues, isSuccess } = useLogin();
  const formElements = loginDetails.map(({ name, inputLabel, type, placeholder }) => {
    return (
      <LoginFormElement key={name} isError={isError} name={name} inputLabel={inputLabel}>
        <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name as keyof typeof formValues]} name={name} type={type} placeholder={placeholder} />
      </LoginFormElement>
    );
  });

  if (isSuccess) {
    setShowModal(false);
  }

  return (
    <FormComp handleFormSubmit={handleSubmit} styles={{ minHeight: "100vh", position: "relative", width: "400px", backgroundColor: "white" }}>
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
