import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";
import FormComp from "../formComp/FormComp.tsx";
import AuthPageWrapper from "../AuthPageWrapper.tsx";

import { signupDetails } from "../../data.ts";
import "./signup.css";
import { myShopAxios } from "../../axios.ts";

const SignUp = () => {
  const [formValues, setFormValues] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "", password: "" });

  const handleChange = (event, name) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: event.target.value };
    });
  };

  const signUpUser = async (data) => await myShopAxios.post("Account/signup", data);

  const { mutate, isError, isSuccess, isIdle, data, error } = useMutation({ mutationFn: signUpUser });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(formValues);
  };

  const formElements = signupDetails.map(({ name, inputLabel, type, placeholder }) => {
    return (
      <div key={name}>
        <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name]} name={name} type={type} placeholder={placeholder}>
          <p>{inputLabel}</p>
        </TextInput>
      </div>
    );
  });
  return (
    <AuthPageWrapper>
      <FormComp title="Create An Account" handleFormSubmit={handleSubmit} linkSectionTitle="Already have an account?" link="/account/login" linkTitle="Login">
        <div className="d-flex flex-column gap-3">
          {formElements}
          <p className="text-center">
            By signing up you accept our terms and conditions
            <br /> & privacy policy
          </p>
          <FormButton value="Create Account" />
        </div>
      </FormComp>
    </AuthPageWrapper>
  );
};

export default SignUp;
