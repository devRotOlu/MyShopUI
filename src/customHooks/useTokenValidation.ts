import { useQuery } from "@tanstack/react-query";

import { validateAccessToken } from "../helperFunctions/dataFetchFunctions";
import { userDataType } from "../types";

export const useTokenValidation = (isLoggedIn: boolean, setIsLoggedIn: (value: React.SetStateAction<boolean>) => void, setLoginData: (value: React.SetStateAction<userDataType>) => void, setIsOldSession: (value: React.SetStateAction<boolean>) => void) => {
  const { isSuccess: tokenValidated, data: userData } = useQuery({
    queryKey: ["validate_token"],
    queryFn: validateAccessToken,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (tokenValidated && !isLoggedIn) {
    setIsLoggedIn(true);
    setLoginData(userData.data);
    setIsOldSession(true);
  }
};
