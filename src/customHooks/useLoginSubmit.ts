import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { FormEvent, useRef } from "react";

import { loginStateType, useLoginSubmitDataType } from "../types/types";
import { loginSchemaType } from "../types/formSchemaTypes";

export const useLoginSubmit = (signingUser: UseMutateFunction<AxiosResponse<any, any>, Error, loginStateType, unknown>, formValues: loginStateType, testValidation: (data: unknown) => data is loginSchemaType): useLoginSubmitDataType => {
  const prevFormValues = useRef<{ email: string; password: string }>({ email: "", password: "" });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    prevFormValues.current = { ...formValues };
    const isValidated = testValidation(formValues);
    if (isValidated) signingUser(formValues);
  };
  return { prevFormValues: prevFormValues.current, handleSubmit };
};
