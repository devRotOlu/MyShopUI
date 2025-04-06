import React, { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";
import FormComp from "../formComp/FormComp.tsx";
import AuthPageWrapper from "../AuthPageWrapper.tsx";
import AuthPageLinkWrapper from "../authPageLinkWrapper/AuthPageLinkWrapper.tsx";
import PageLink from "../pageLink/PageLink.tsx";
import AuthFormTitle from "../AuthFormTitle.tsx";
import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper.tsx";
import Alert from "../alert/Alert.tsx";
import ComponentOverlay from "../ComponentOverlay.tsx.tsx";
import Loader from "../Loader.tsx";

import { signupDetails } from "../../data.ts";
import "./signup.css";
import { myShopAxios } from "../../api/axios.ts";
import { signupType } from "../../types.ts";

const SignUp = () => {
  const [formValues, setFormValues] = useState<signupType>({ firstName: "", lastName: "", email: "", phoneNumber: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: event.target.value };
    });
  };

  const signUpUser = async (data: signupType) => await myShopAxios.post("Account/signup", data);

  const { mutate, isSuccess, submittedAt } = useMutation({ mutationFn: signUpUser });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formValues);
  };

  const submittedAtRef = useRef(submittedAt);

  useEffect(() => {
    const isSubmitted = submittedAtRef.current !== submittedAt;
    if (isSuccess && isSubmitted) {
      submittedAtRef.current = submittedAt;
      setShowAlert(true);
    }
  }, [isSuccess, submittedAt]);

  const formElements = signupDetails.map(({ name, inputLabel, type, placeholder }) => {
    return (
      <div key={name}>
        <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name as keyof typeof formValues]} name={name} type={type} placeholder={placeholder}>
          <p>{inputLabel}</p>
        </TextInput>
      </div>
    );
  });
  return (
    <AuthPageWrapper>
      <FormComp handleFormSubmit={handleSubmit} styles={{ borderRadius: "5px", boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px" }}>
        <AuthFormTitle title="Create An Account" />
        <AuthFormElementWrapper>
          <div className="d-flex flex-column gap-3">
            {formElements}
            <p className="text-center">
              By signing up you accept our terms and conditions
              <br /> & privacy policy
            </p>
            <FormButton value="Create Account" styles={{ backgroundColor: "var(--light_Green)" }} />
          </div>
        </AuthFormElementWrapper>
        <AuthPageLinkWrapper linkSectionTitle="Already have an account?">
          <PageLink link="/account/login" linkLabel="Login" />
        </AuthPageLinkWrapper>
      </FormComp>
      {showAlert && <Alert alertTitle="Registration Successful!" styles={{ backgroundColor: "var(--light_Green)", height: "50px" }} alertMessage="Check email for your validation" setIsDisplayed={setShowAlert} />}
    </AuthPageWrapper>
  );
};

export default SignUp;
