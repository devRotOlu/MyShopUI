import { useMutation } from "@tanstack/react-query";

import { updateTokens } from "../helperFunctions/dataFetchFunctions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 10 minutes
const tokenRefreshTime = 65 * 1000 * 60;

export const useTokenRefresh = (userId: string, isLoggedIn: boolean | undefined, setIsLoggedIn: (value: React.SetStateAction<boolean | undefined>) => void) => {
  const navigate = useNavigate();

  const { mutate, isError } = useMutation({
    mutationFn: () => updateTokens(userId),
  });

  useEffect(() => {
    const myTimeInterval = setInterval(() => {
      if (isLoggedIn) {
        mutate();
      }
    }, tokenRefreshTime);
    return () => clearInterval(myTimeInterval);
  }, [isLoggedIn, mutate]);

  if (isLoggedIn && isError) {
    setIsLoggedIn(false);
    navigate("/account/login");
  }
};
