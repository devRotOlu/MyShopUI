import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";

import { ProvidersProp } from "../../types/types";

export type alertDataType = {
  showAlert: boolean;
  alertDialog?: ReactNode;
};

export type alertContextType = {
  handleAlert: (alert: alertDataType) => void;
};

export const alertContext = createContext({} as alertContextType);

const initialAlert = {
  showAlert: false,
};

const AlertProvider = ({ children }: ProvidersProp) => {
  const [alert, setAlert] = useState<alertDataType>(initialAlert);

  // Show alert function
  const handleAlert = useCallback((alert: alertDataType) => {
    setAlert((prevObj) => ({ ...prevObj, ...alert }));
  }, []);

  const { showAlert, alertDialog } = alert;

  useEffect(() => {
    if (showAlert) {
      const timeOut = setTimeout(() => {
        setAlert(initialAlert);
        clearTimeout(timeOut);
      }, 10000);
    }
  }, [showAlert]);
  return (
    <alertContext.Provider value={{ handleAlert }}>
      {children}
      {showAlert && alertDialog && alertDialog}
    </alertContext.Provider>
  );
};

export default AlertProvider;
