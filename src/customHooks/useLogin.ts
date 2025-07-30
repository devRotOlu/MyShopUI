import { useState, useRef, ChangeEvent, FormEvent, SetStateAction, Dispatch } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { useLoginData, loginStateType, userDataType } from "../types.ts";
import { signinUser } from "../helperFunctions/dataFetchFunctions.ts";

export const useLogin = (setIsOldSession: Dispatch<SetStateAction<boolean>>, setIsLoggedIn: Dispatch<SetStateAction<boolean | undefined>>, setLoginData: Dispatch<SetStateAction<userDataType>>): useLoginData => {
  const [formValues, setFormValues] = useState<loginStateType>({ email: "", password: "" });

  const prevFormValues = useRef<{ email: string; password: string }>({ email: "", password: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: event.target.value };
    });
  };

  const onSuccess = (data: AxiosResponse) => {
    setLoginData((prevData) => ({ ...prevData, ...data.data }));
    setIsLoggedIn(true);
    setIsOldSession(false);
  };

  const {
    mutate,
    isError,
    submittedAt: loginTime,
    isPending,
  } = useMutation({
    mutationFn: signinUser,
    onSuccess,
    retry: false,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    prevFormValues.current = { ...formValues };
    mutate(formValues);
  };

  const _isError = prevFormValues.current.email === formValues.email && prevFormValues.current.password === formValues.password && isError;
  // const _isSuccess = prevFormValues.current.email === formValues.email && prevFormValues.current.password === formValues.password && isSuccess;

  return {
    isAuthenticating: isPending,
    loginTime,
    loginInputValues: formValues,
    setLoginInputValues: setFormValues,
    handleLoginInputChange: handleChange,
    isLoginError: _isError,
    handleLoginFormSubmit: handleSubmit,
  };
};
