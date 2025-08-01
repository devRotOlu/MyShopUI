import { useQuery } from "@tanstack/react-query";

import { validateAccessToken } from "../helperFunctions/dataFetchFunctions";
import { userDataType, useTokenValidationDataType } from "../types";
import { useEffect } from "react";

export const useTokenValidation = (setIsLoggedIn: (value: React.SetStateAction<boolean | undefined>) => void, setLoginData: (value: React.SetStateAction<userDataType>) => void, setIsOldSession: (value: React.SetStateAction<boolean>) => void): useTokenValidationDataType => {
  const { isSuccess, data, isError, isPending } = useQuery({
    queryKey: ["validate_token"],
    queryFn: validateAccessToken,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isError) {
      setIsLoggedIn(false);
    } else if (isSuccess) {
      setIsLoggedIn(true);
      setLoginData(data.data);
      setIsOldSession(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);
  return {
    isValidatingToken: isPending,
  };
};
