import { useState, useRef, useContext, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { appContext } from "../components/AppContext.tsx";
import { myShopAxios } from "../api/axios.ts";
import { useLoginData } from "../types.ts";
import { AxiosResponse } from "axios";

export const useLogin = (): useLoginData => {
  const [formValues, setFormValues] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const navigate = useNavigate();
  const appStates = useContext(appContext);
  const { setIsLoggedIn, setLoginData, setIsOldSession } = appStates;

  const prevFormValues = useRef<{ email: string; password: string }>({ email: "", password: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: event.target.value };
    });
  };

  const signinUser = async (data) => await myShopAxios.post("Account/login", data);

  const onSuccess = (data: AxiosResponse) => {
    setLoginData(data.data);
    setIsLoggedIn(true);
    setIsOldSession(false);
    navigate("/");
  };

  const { mutate, isError } = useMutation({
    mutationFn: signinUser,
    onSuccess,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    prevFormValues.current = { ...formValues };
    mutate(formValues);
  };

  const _isError = prevFormValues.current.email === formValues.email && prevFormValues.current.password === formValues.password && isError;

  return {
    formValues,
    setFormValues,
    prevFormValues,
    handleChange,
    isError: _isError,
    handleSubmit,
  };
};
