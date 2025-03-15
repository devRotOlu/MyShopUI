import { useState, useRef, useContext, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import { appContext } from "../components/context/AppContext.tsx";
import { useLoginData, LoginStateType } from "../types.ts";
import { signinUser } from "../helperFunctions/dataFetchFunctions.ts";

export const useLogin = (): useLoginData => {
  const [formValues, setFormValues] = useState<LoginStateType>({ email: "", password: "" });
  const navigate = useNavigate();
  const appStates = useContext(appContext);
  const { setIsLoggedIn, setLoginData, setIsOldSession } = appStates;

  const prevFormValues = useRef<{ email: string; password: string }>({ email: "", password: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: event.target.value };
    });
  };

  const onSuccess = (data: AxiosResponse) => {
    setLoginData(data.data);
    setIsLoggedIn(true);
    setIsOldSession(false);
    navigate("/");
  };

  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: signinUser,
    onSuccess,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    prevFormValues.current = { ...formValues };
    mutate(formValues);
  };

  const _isError = prevFormValues.current.email === formValues.email && prevFormValues.current.password === formValues.password && isError;
  const _isSuccess = prevFormValues.current.email === formValues.email && prevFormValues.current.password === formValues.password && isSuccess;

  return {
    formValues,
    setFormValues,
    handleChange,
    isError: _isError,
    handleSubmit,
    isSuccess: _isSuccess,
  };
};
