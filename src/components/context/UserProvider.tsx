import React, { useState, useRef, useEffect, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import LoginOnModal from "../loginOnModal/LoginOnModal";
import Alert from "../alert/Alert";
import Modal from "../modal/Modal";

import { ProvidersProp, productType, userContextType, userDataType } from "../../types";
import { getProducts, modifyProfile } from "../../helperFunctions/dataFetchFunctions";
import { useModal } from "../../customHooks/useModal";
import { useLogin } from "../../customHooks/useLogin";
import { alertContext } from "./AlertProvider";
import { useLogout } from "../../customHooks/useLogout";
import { useDeleteAccount } from "../../customHooks/useDeleteAccount";
import { useTokenValidation } from "../../customHooks/useTokenValidation";
import { useConfirmEmail } from "../../customHooks/useConfirmEmail";

export const userContext = React.createContext({} as userContextType);

const initialDeliveryProfile = {
  id: undefined,
  streetAddress: "",
  city: "",
  lastName: "",
  firstName: "",
  additionalInformation: undefined,
  directions: undefined,
  phoneNumber: "",
  state: "",
  lga: "",
};

const UserProvider = ({ children }: ProvidersProp) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [loginData, setLoginData] = useState<userDataType>({
    id: "",
    phoneNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    state: "",
    city: "",
  });
  const [isOldSession, setIsOldSession] = useState(false);

  const [products, setProducts] = useState<productType[]>([]);

  const { isLoginError, handleLoginInputChange, handleLoginFormSubmit, loginInputValues, setLoginInputValues, loginTime, isAuthenticating } = useLogin(setIsOldSession, setIsLoggedIn, setLoginData);
  const { logoutUser, isLoggedOut, logoutTime } = useLogout(setIsLoggedIn);
  const { isAccountDeleted, isDeletingAccount, deleteAccount, accountDeletionTime } = useDeleteAccount(setIsLoggedIn);
  const { isValidatingToken } = useTokenValidation(setIsLoggedIn, setLoginData, setIsOldSession);
  const { isEmailConfirmed, confirmEmail, isEmailConfirmedFailed } = useConfirmEmail();

  const { data: productData, isSuccess: productsFetched, isLoading: isLoadingProducts } = useQuery({ queryKey: ["products"], queryFn: getProducts, staleTime: 3 * 60 * 1000 });

  const {
    mutate: profileMutate,
    data: modifiedUserData,
    isPending: modifyingProfile,
    isSuccess: profileModified,
  } = useMutation({
    mutationFn: modifyProfile,
  });

  const { handleAlert } = useContext(alertContext);

  if (productsFetched && !products.length) {
    setProducts(productData.data);
  }

  const modifyingProfileRef = useRef(false);

  const handLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    if (modifyingProfile) {
      modifyingProfileRef.current = true;
    }
  }, [modifyingProfile]);

  useEffect(() => {
    const isUpdated = modifyingProfileRef.current === true && profileModified === true;
    if (isUpdated) {
      modifyingProfileRef.current = false;
      const _data = modifiedUserData?.data;
      setLoginData((prevData) => ({ ...prevData, ..._data }));
    }
  }, [modifiedUserData, profileModified, setLoginData]);

  const loginTimeRef = useRef(loginTime);
  const logoutTimeRef = useRef(loginTime);
  const accountDeletionTimeRef = useRef(accountDeletionTime);

  const { setShowModal, showModal } = useModal();

  useEffect(() => {
    if (isAccountDeleted && accountDeletionTimeRef.current !== accountDeletionTime) {
      accountDeletionTimeRef.current = accountDeletionTime;
      const alertDialog = <Alert alertMessage="You have successfully deleted your account" styles={{ backgroundColor: `var(--light_Green)` }} />;
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  }, [accountDeletionTime, handleAlert, isAccountDeleted]);

  useEffect(() => {
    if (isLoggedOut && logoutTimeRef.current !== logoutTime) {
      logoutTimeRef.current = logoutTime;
      const alertDialog = <Alert alertMessage="You have successfully logged out" styles={{ backgroundColor: `var(--light_Green)` }} />;
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  }, [handleAlert, isLoggedOut, logoutTime]);

  useEffect(() => {
    if (isLoggedIn && !isOldSession && loginTimeRef.current !== loginTime) {
      loginTimeRef.current = loginTime;
      const alertDialog = <Alert styles={{ backgroundColor: `var(--light_Green)` }} alertTitle="Login" alertMessage="Login Successful" />;
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  }, [handleAlert, isLoggedIn, isOldSession, loginTime]);

  useEffect(() => {
    if (isEmailConfirmed) {
      const alertDialog = <Alert styles={{ backgroundColor: `var(--light_Green)` }} alertTitle="Email confirmation" alertMessage="Email confirmation Successful. Login to proceed." />;
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  }, [handleAlert, isEmailConfirmed]);

  useEffect(() => {
    if (isEmailConfirmedFailed) {
      navigate("/", { replace: true });
      const alertDialog = <Alert alertTitle="Cart Error" alertMessage="Error occured. Email verification failed." styles={{ backgroundColor: `var(--light_red)` }} />;
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  }, [handleAlert, isEmailConfirmedFailed, navigate]);

  return (
    <userContext.Provider
      value={{
        confirmEmail,
        isValidatingToken,
        productsFetched,
        isLoadingProducts,
        isAuthenticating,
        deleteAccount,
        isJustLoggedIn: loginTimeRef.current !== loginTime && isLoggedIn === true,
        isLoginError,
        handleLoginFormSubmit,
        handleLoginInputChange,
        loginInputValues,
        setLoginInputValues,
        modifyingProfile,
        profileMutate,
        setShowModal,
        isLoggedIn,
        products,
        loginData,
        setLoginData,
        isOldSession,
        setIsOldSession,
        handLogout,
        initialDeliveryProfile,
        isDeletingAccount,
      }}
    >
      {children}
      {showModal && (
        <Modal styles={{ display: "flex", justifyContent: "end" }}>
          <LoginOnModal />
        </Modal>
      )}
    </userContext.Provider>
  );
};

export default UserProvider;
