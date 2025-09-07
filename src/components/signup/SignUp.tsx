import React, { useState, FormEvent, ChangeEvent, useContext } from "react";

import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";
import FormComp from "../formComp/FormComp.tsx";
import AuthPageWrapper from "../authPageWrapper/AuthPageWrapper.tsx";
import AuthPageLinkWrapper from "../authPageLinkWrapper/AuthPageLinkWrapper.tsx";
import PageLink from "../pageLink/PageLink.tsx";
import AuthFormTitle from "../AuthFormTitle.tsx";
import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper.tsx";
import ComponentOverlay from "../ComponentOverlay.tsx.tsx";
import Loader from "../Loader.tsx";
import ValidationError from "../validationError/ValidationError.tsx";
import PasswordChecklistDisplay from "../PasswordChecklistDisplay.tsx";

import { signupDetails } from "../../data.ts";
import "./signup.css";
import { signupType } from "../../types/types.ts";
import { userContext } from "../context/UserProvider.tsx";
import { signUpSchema } from "../../formSchemas.ts";
import { useValidation } from "../../customHooks/useValidation.ts";

const SignUp = () => {
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [formValues, setFormValues] = useState<signupType>({ firstName: "", lastName: "", email: "", phoneNumber: "", password: "" });

  const { validationErrors, testValidation } = useValidation(signUpSchema);

  const { signup, isSigningUp, isSignupError } = useContext(userContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: event.target.value };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidated = testValidation(formValues);
    if (isValidated) signup(formValues);
  };

  const formElements = signupDetails.map(({ name, inputLabel, type, placeholder }) => {
    if (type === "email") {
      return (
        <div key={name}>
          <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name as keyof typeof formValues]} name={name} type={type} placeholder={placeholder}>
            <p>{inputLabel}</p>
          </TextInput>
          {validationErrors.email && <ValidationError error={validationErrors.email} />}
          {isSignupError && (
            <p id="error_report" className="text-danger">
              This email is already in use, please login or use a different email address.
            </p>
          )}
        </div>
      );
    } else if (type === "password") {
      const value = formValues[name as keyof typeof formValues];
      return (
        <div key={name}>
          <TextInput handleBlur={() => setIsFocusedPassword(false)} handleFocus={() => setIsFocusedPassword(true)} handleChange={(event) => handleChange(event, name)} value={value} name={name} type={type} placeholder={placeholder}>
            <p>{inputLabel}</p>
          </TextInput>
          {validationErrors.password && <ValidationError error={validationErrors.password} />}
          {isFocusedPassword && <PasswordChecklistDisplay value={value} />}
        </div>
      );
    }
    const error = validationErrors[name as keyof typeof validationErrors];
    return (
      <div key={name}>
        <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name as keyof typeof formValues]} name={name} type={type} placeholder={placeholder}>
          <p>{inputLabel}</p>
        </TextInput>
        {error !== undefined && <ValidationError error={error} />}
      </div>
    );
  });
  return (
    <AuthPageWrapper id="signup">
      <FormComp handleFormSubmit={handleSubmit} styles={{ borderRadius: "5px", boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px", backgroundColor: "white" }}>
        <AuthFormTitle title="Create An Account" />
        <AuthFormElementWrapper>
          <div className="d-flex flex-column gap-3">
            {formElements}
            <p className="text-center text-muted" id="policy">
              By signing up you accept our terms and conditions
              <br /> & privacy policy
            </p>
            <div className="position-relative">
              <FormButton value="Create Account" styles={{ backgroundColor: "var(--light_Green)" }} />
              {isSigningUp && (
                <ComponentOverlay>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <Loader color="white" size="spinner-border-sm" />
                  </div>
                </ComponentOverlay>
              )}
            </div>
          </div>
        </AuthFormElementWrapper>
        <AuthPageLinkWrapper linkSectionTitle="Already have an account?">
          <PageLink link="/account/login" linkLabel="Login" />
        </AuthPageLinkWrapper>
      </FormComp>
    </AuthPageWrapper>
  );
};

export default SignUp;
