import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ProvidersProp } from "../../types";
import { userContext } from "./UserProvider";

export type appContextType = { prevLocation: string };

export const appContext = createContext({} as appContextType);

const AppProvider = ({ children }: ProvidersProp) => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const { isLoggedIn } = useContext(userContext);

  useEffect(() => {
    if (isLoggedIn && location.pathname !== "/checkout/complete-order") {
      setPrevLocation(location.pathname + location.search);
    }
  }, [isLoggedIn, location.pathname, location.search]);
  return <appContext.Provider value={{ prevLocation }}>{children}</appContext.Provider>;
};

export default AppProvider;
