import { useMutation } from "@tanstack/react-query";

import { confirmEmail } from "../helperFunctions/dataFetchFunctions";
import { useConfirmEmailDataType } from "../types/types";

export const useConfirmEmail = (): useConfirmEmailDataType => {
  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: confirmEmail,
  });

  return { isEmailConfirmed: isSuccess, confirmEmail: mutate, isEmailConfirmedFailed: isError };
};
