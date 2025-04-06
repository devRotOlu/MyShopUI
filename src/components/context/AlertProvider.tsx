import React, { createContext, CSSProperties, ReactNode, useEffect, useState } from "react";

import Alert from "../alert/Alert";

type alertDataType = {
  showAlert: boolean;
  alertMessage: string;
  styles: CSSProperties;
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
  alertMessage: "",
  styles: {},
};

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<alertDataType>(initialAlert);

  // Show alert function
  const handleAlert = (alert: alertDataType) => {
    setAlert(alert);
  };

  const { showAlert, alertMessage, styles } = alert;

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setAlert(initialAlert), 3000);
    }
  }, [showAlert]);
  return (
    <alertContext.Provider value={{ handleAlert }}>
      {children}
      {showAlert && <Alert alertMessage={alertMessage} styles={styles} />}
    </alertContext.Provider>
  );
};

export default AlertProvider;
