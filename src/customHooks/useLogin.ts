import { SetStateAction, Dispatch } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { useLoginData, userDataType } from "../types/types.ts";
import { signinUser } from "../helperFunctions/dataFetchFunctions.ts";

export const useLogin = (setIsOldSession: Dispatch<SetStateAction<boolean>>, setIsLoggedIn: Dispatch<SetStateAction<boolean | undefined>>, setLoginData: Dispatch<SetStateAction<userDataType>>): useLoginData => {
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

  return {
    signingUser: mutate,
    isAuthenticating: isPending,
    loginTime,
    isLoginError: isError,
  };
};
