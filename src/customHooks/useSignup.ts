import { useMutation } from "@tanstack/react-query";
import { myShopAxios } from "../api/axios";
import { signupType, useSignupDataType } from "../types";

export const useSignup = (): useSignupDataType => {
  const signUpUser = async (data: signupType) => await myShopAxios.post("Account/signup", data);
  const { mutate, isSuccess, submittedAt, isPending, isError } = useMutation({ mutationFn: signUpUser });
  return {
    signup: mutate,
    isSignupSuccess: isSuccess,
    isSignupError: isError,
    isSigningUp: isPending,
    signUpTime: submittedAt,
  };
};
