import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";

import { deleteAccount } from "../helperFunctions/dataFetchFunctions";
import { useDeleteAccountDataType } from "../types/types";

export const useDeleteAccount = (setIsLoggedIn: Dispatch<SetStateAction<boolean | undefined>>): useDeleteAccountDataType => {
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
