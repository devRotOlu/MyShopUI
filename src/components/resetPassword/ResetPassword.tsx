import React, { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import AuthPageWrapper from "../authPageWrapper/AuthPageWrapper";
import FormComp from "../formComp/FormComp";
import AuthFormTitle from "../AuthFormTitle";
import AuthFormElementWrapper from "../authFromElementWrapper/AuthFormElementWrapper";
import TextInput from "../textInput/TextInput";
import ComponentOverlay from "../ComponentOverlay.tsx";
import Loader from "../Loader";
import FormButton from "../formButton/FormButton";
import PasswordResetInstruction from "../passwordResetInstruction/PasswordResetInstruction.tsx";
import ResetPasswordSuccessAlert from "../resetPasswordSuccessAlert/ResetPasswordSuccessAlert.tsx";
import PasswordResetErrorAlert from "../passwordResetErrorAlert/PasswordResetErrorAlert.tsx";
import PasswordChecklistDisplay from "../PasswordChecklistDisplay.tsx";
import ValidationError from "../validationError/ValidationError.tsx";

import { resetPassword } from "../../helperFunctions/dataFetchFunctions.ts";
import { useValidation } from "../../customHooks/useValidation.ts";
import { passwordResetSchema } from "../../formSchemas.ts";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const { validationErrors, testValidation } = useValidation(passwordResetSchema);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id") || "";
  const token = searchParams.get("token") || "";
  const { isSuccess, isPending, mutate, isError } = useMutation({
    mutationFn: () => resetPassword({ userId, token, newPassword, confirmPassword: newPassword }),
  });
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.currentTarget.value;
    setNewPassword(password);
  };
  const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.currentTarget.value;
    setConfirmPassword(password);
  };
  if (isSuccess) {
    setTimeout(() => {
      navigate("/account/login");
    }, 1000);
  }
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidated = testValidation({ password: newPassword, confirmPassword });
    if (isValidated) mutate();
  };

  return (
    <AuthPageWrapper id="reset_password">
      <FormComp handleFormSubmit={handleFormSubmit} styles={{ borderRadius: "5px", boxShadow: "1px 1px 10px -7px, -1px -1px 10px -7px", backgroundColor: "white" }}>
        <AuthFormTitle title="Reset Password" />
        {isError && <PasswordResetErrorAlert message="We could not complete password reset. Try again!" />}
        {isSuccess && <ResetPasswordSuccessAlert />}
        {!isSuccess && !isError && <PasswordResetInstruction instruction="Enter a new password below to change your password." />}
        <AuthFormElementWrapper>
          <div>
            <TextInput handleBlur={() => setIsFocusedPassword(false)} handleFocus={() => setIsFocusedPassword(true)} value={newPassword} name="password" type="password" placeholder="Password" handleChange={handlePassword}>
              <p className="fw-bold mb-1" id="input_label">
                Password
              </p>
            </TextInput>
            {validationErrors.password && <ValidationError error={validationErrors.password} />}
            {isFocusedPassword && <PasswordChecklistDisplay value={newPassword} />}
          </div>
          <div>
            <TextInput value={confirmPassword} name="confirm-password" type="password" placeholder="Confirm Password" handleChange={handleConfirmPassword}>
              <p className="fw-bold mb-1" id="input_label">
                Confirm Password
              </p>
            </TextInput>
            {validationErrors.confirmPassword && <ValidationError error={validationErrors.confirmPassword} />}
          </div>
          <div className="position-relative">
            <FormButton value="Reset Password" styles={{ backgroundColor: "var(--light_Green)" }} />
            {(isPending || isSuccess) && (
              <ComponentOverlay>
                {isPending && (
                  <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <Loader color="white" size="spinner-border-sm" />
                  </div>
                )}
              </ComponentOverlay>
            )}
          </div>
        </AuthFormElementWrapper>
      </FormComp>
    </AuthPageWrapper>
  );
};

export default ResetPassword;
