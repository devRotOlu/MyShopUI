import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { userContext } from "./context/UserProvider";

const AuthenticatedUserResources = () => {
  const navigate = useNavigate();
  const appStates = useContext(userContext);
  const { isLoggedIn } = appStates;

  useEffect(() => {
    if (isLoggedIn === false) {
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
