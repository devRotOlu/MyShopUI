import React, { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import throttle from "lodash.throttle";

import Sidebar from "../sidebar/Sidebar";
import Modal from "../modal/Modal";

import { ProvidersProp } from "../../types";
import { getPublicKey } from "../../helperFunctions/dataFetchFunctions";
import { useLocation } from "react-router-dom";

export type appContextType = { publicKeyPem: any; setModalIndex: React.Dispatch<React.SetStateAction<number>>; modalIndex: number; handleFilter: (modalIndex: number, filterInstance: ReactNode) => void; setSortIndex: React.Dispatch<React.SetStateAction<number>>; sortIndex: number };

export const appContext = createContext({} as appContextType);

const AppProvider = ({ children }: ProvidersProp) => {
  const { pathname } = useLocation();
  const [sortIndex, setSortIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const modalIndexRef = useRef(0);
  const [filterInstance, setFilterInstance] = useState<ReactNode>(null);
  const autoClosedRef = useRef(false);
  const { data } = useQuery({
    queryFn: getPublicKey,
    queryKey: ["public_key"],
    refetchOnWindowFocus: false,
  });
  const publicKeyPem = data?.data;
  const handleFilter = (modalIndex: number, filterInstance: ReactNode) => {
    setModalIndex(modalIndex);
    setFilterInstance(filterInstance);
  };

  useEffect(() => {
    setSortIndex(0);
  }, [pathname]);

  useEffect(() => {
    if (modalIndex && modalIndex !== modalIndexRef.current) {
      modalIndexRef.current = modalIndex;
    }
  }, [modalIndex]);

  useEffect(() => {
    const handleResize = throttle(() => {
      const isSmallScreen = window.innerWidth <= 767;
      if (isSmallScreen && autoClosedRef.current) {
        autoClosedRef.current = false;
        setModalIndex(modalIndexRef.current);
      } else if (!isSmallScreen && modalIndex) {
        autoClosedRef.current = true;
        setModalIndex(0);
      }
    }, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [modalIndex]);
  return (
    <appContext.Provider value={{ publicKeyPem, modalIndex, setModalIndex, handleFilter, setSortIndex, sortIndex }}>
      {children}
      {modalIndex !== 0 && (
        <Modal styles={{ height: "100%", width: "100%" }}>
          {modalIndex === 1 && <Sidebar />}
          {modalIndex === 2 && <>{filterInstance}</>}
          {modalIndex === 3 && <>{filterInstance}</>}
        </Modal>
      )}
    </appContext.Provider>
  );
};

export default AppProvider;
