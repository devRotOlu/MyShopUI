import { useMutation } from "@tanstack/react-query";

import { logoutUser } from "../helperFunctions/dataFetchFunctions";
import { Dispatch, SetStateAction } from "react";
import { useLogoutDataType } from "../types/types";

export const useLogout = (setIsLoggedIn: Dispatch<SetStateAction<boolean | undefined>>): useLogoutDataType => {
  const { mutate, isSuccess, submittedAt, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => setIsLoggedIn(false),
  });
  return { logoutUser: mutate, isLoggedOut: isSuccess, logoutTime: submittedAt, isLoggingOut: isPending };
};
