import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { appContext } from "./AppContext";

const AuthenticatedUserResources = () => {
  const navigate = useNavigate();
  const appStates = useContext(appContext);
  const { isLoggedIn } = appStates;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/account/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthenticatedUserResources;
