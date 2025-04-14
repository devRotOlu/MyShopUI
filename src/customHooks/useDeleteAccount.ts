import { useMutation } from "@tanstack/react-query";

import { deleteAccount } from "../helperFunctions/dataFetchFunctions";
import { Dispatch, SetStateAction } from "react";
import { useDeleteAccountDataType } from "../types";

export const useDeleteAccount = (setIsLoggedIn: Dispatch<SetStateAction<boolean>>): useDeleteAccountDataType => {
  const { mutate, isSuccess, isPending, submittedAt } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => setIsLoggedIn(false),
  });

  return {
    isAccountDeleted: isSuccess,
    deleteAccount: mutate,
    accountDeletionTime: submittedAt,
    isDeletingAccount: isPending,
  };
};
