import React, { createContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import throttle from "lodash.throttle";

import Sidebar from "../sidebar/Sidebar";
import Modal from "../modal/Modal";

import { ProvidersProp } from "../../types";
import { getPublicKey } from "../../helperFunctions/dataFetchFunctions";

export type appContextType = { publicKeyPem: any; setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>; showSidebar: boolean };

export const appContext = createContext({} as appContextType);

const AppProvider = ({ children }: ProvidersProp) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const autoClosedRef = useRef(false);
  const { data } = useQuery({
    queryFn: getPublicKey,
    queryKey: ["public_key"],
    refetchOnWindowFocus: false,
  });
  const publicKeyPem = data?.data;
  useEffect(() => {
    const handleResize = throttle(() => {
      const isSmallScreen = window.innerWidth <= 767;
      if (isSmallScreen && autoClosedRef.current) {
        autoClosedRef.current = false;
        setShowSidebar(true);
      } else if (!isSmallScreen && showSidebar) {
        autoClosedRef.current = true;
        setShowSidebar(false);
      }
    }, 200);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [showSidebar]);
  return (
    <appContext.Provider value={{ publicKeyPem, setShowSidebar, showSidebar }}>
      {children}
      {showSidebar && (
        <Modal styles={{ height: "100%", width: "100%" }}>
          <Sidebar />
        </Modal>
      )}
    </appContext.Provider>
  );
};

export default AppProvider;
