import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import TextInput from "./textInput/TextInput.tsx";
import FormButton from "./formButton/FormButton.tsx";
import FormComp from "./formComp/FormComp.tsx";
import AuthPageWrapper from "./AuthPageWrapper.tsx";

import { loginDetails } from "../data.ts";
import { Link } from "react-router-dom";
import { myShopAxios } from "../axios.ts";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleChange = (event, name) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: event.target.value };
    });
  };

  const signinUser = async (data) => await myShopAxios.post("Account/login", data);

  const { mutate, isError, isSuccess, isIdle, data, error } = useMutation({ mutationFn: signinUser });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(formValues);
  };

  const formElements = loginDetails.map(({ name, inputLabel, type, placeholder }) => {
    return (
      <div key={name}>
        {name === "password" ? (
          <>
            <div className="d-flex justify-content-between">
              <p>{inputLabel}</p>
              <Link to="/">Forgot Password?</Link>
            </div>
            <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name]} name={name} type={type} placeholder={placeholder} />
          </>
        ) : (
          <>
            <p>{inputLabel}</p>
            <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name]} name={name} type={type} placeholder={placeholder} />
          </>
        )}
      </div>
    );
  });

  return (
    <AuthPageWrapper>
      <FormComp title="Login" handleFormSubmit={handleSubmit} linkSectionTitle="Don't have an Account?" linkTitle="Create an Account" link="/signup">
        <div className="d-flex flex-column gap-3">
          {formElements}
          <FormButton value="Login" />
        </div>
      </FormComp>
    </AuthPageWrapper>
  );
};

export default Login;
