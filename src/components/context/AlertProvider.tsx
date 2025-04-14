import React, { createContext, ReactNode, useEffect, useState } from "react";

export type alertDataType = {
  showAlert: boolean;
  alertDialog?: ReactNode;
};

export type alertContextType = {
  handleAlert: (alert: alertDataType) => void;
};

export const alertContext = createContext({} as alertContextType);

export type AlertProviderProps = {
  children: ReactNode;
};

const initialAlert = {
  showAlert: false,
};

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<alertDataType>(initialAlert);

  // Show alert function
  const handleAlert = (alert: alertDataType) => {
    setAlert((prevObj) => ({ ...prevObj, ...alert }));
  };

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
