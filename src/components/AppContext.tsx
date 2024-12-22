import React, { useState, useRef } from "react";

import { AppContextProp } from "./types";

export const appContext = React.createContext();

const AppContext = ({ children }: AppContextProp) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const isJustLoggedIn = useRef<boolean>(false);

  return <appContext.Provider value={{ isLoggedIn, setIsLoggedIn, isJustLoggedIn }}>{children}</appContext.Provider>;
};

export default AppContext;
