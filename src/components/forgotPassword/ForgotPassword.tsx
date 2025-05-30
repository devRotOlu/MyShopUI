import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import AuthPageWrapper from "../authPageWrapper/AuthPageWrapper.tsx";
import FormComp from "../formComp/FormComp.tsx";
import AuthFormTitle from "../AuthFormTitle.tsx";
import TextInput from "../textInput/TextInput.tsx";
import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper.tsx";
import ComponentOverlay from "../ComponentOverlay.tsx.tsx";
import FormButton from "../formButton/FormButton.tsx";
import Loader from "../Loader.tsx";
import AuthPageLinkWrapper from "../authPageLinkWrapper/AuthPageLinkWrapper.tsx";
import PageLink from "../pageLink/PageLink.tsx";
import ResetPasswordInstruction from "../passwordResetInstruction/PasswordResetInstruction.tsx";
import ForgotPasswordSuccessAlert from "../forgotPasswordSuccessAlert/ForgotPasswordSuccessAlert.tsx";
import PasswordResetErrorAlert from "../passwordResetErrorAlert/PasswordResetErrorAlert.tsx";

import "./style.css";
import { sendEmailForPassWordReset } from "../../helperFunctions/dataFetchFunctions.ts";
import axios from "axios";

const ForgotPassword = () => {
  const [isFirstResetEmail, setIsFirstResetEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [emailRef, setEmailRef] = useState("");
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: async () => {
      return await sendEmailForPassWordReset(email);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.status === 403) {
        setIsInvalidEmail(true);
      }
    },
    onSuccess: () => setIsInvalidEmail(false),
  });

  useEffect(() => {
    if (isInvalidEmail) {
      setEmailRef(email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInvalidEmail]);

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    setEmail(email);
  };
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };
  if (isSuccess && !isFirstResetEmail) {
    setIsFirstResetEmail(true);
  }
  return (
    <AuthPageWrapper id="forgot_password">
      <FormComp handleFormSubmit={handleFormSubmit} styles={{ borderRadius: "5px", boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px", backgroundColor: "white" }}>
        <AuthFormTitle title={isFirstResetEmail ? "Password Link Sent" : "Forgot Password"} />
        <div id="elements_wrapper">
          {isInvalidEmail && (
            <PasswordResetErrorAlert
              message={`We could not initiate password reset for your email: ${emailRef}.
                                  Please check that the address is valid and try again`}
            />
          )}
          {isFirstResetEmail && <ForgotPasswordSuccessAlert email={email} mutate={mutate} />}
          {!isFirstResetEmail && !isInvalidEmail && <ResetPasswordInstruction instruction="Can’t remember your login credentials? Enter your details below and we’ll send instructions if your account exists." />}
          {!isFirstResetEmail && (
            <>
              <AuthFormElementWrapper>
                <TextInput name="email" type="email" placeholder="Enter Your Email Address" handleChange={handleEmailInput} value={email}>
                  <p className="fw-bold mb-1" id="input_label">
                    Enter Your Email Address
                  </p>
                </TextInput>
                <div className="position-relative">
                  <FormButton value="Send Reset Link" styles={{ backgroundColor: "var(--light_Green)" }} />
                  {isPending && (
                    <ComponentOverlay>
                      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <Loader color="white" size="spinner-border-sm" />
                      </div>
                    </ComponentOverlay>
                  )}
                </div>
              </AuthFormElementWrapper>
            </>
          )}
        </div>

        <AuthPageLinkWrapper linkSectionTitle="I remember my password">
          <PageLink link="/account/login" linkLabel="Login" />
        </AuthPageLinkWrapper>
      </FormComp>
    </AuthPageWrapper>
  );
};

export default ForgotPassword;
