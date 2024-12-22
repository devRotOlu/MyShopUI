import React, { useContext, useEffect } from "react";

import Alert from "../alert/Alert.tsx";

import { appContext } from "../AppContext.tsx";

const Home = () => {
  const appStates = useContext(appContext);
  const { isLoggedIn, isJustLoggedIn } = appStates;

  useEffect(() => {
    if (isLoggedIn && !isJustLoggedIn.current) {
      isJustLoggedIn.current = true;
    }
  }, [isLoggedIn, isJustLoggedIn]);

  return (
    <main className="min-vh-100">
      <Alert alertTitle="Login" alertMessage="Login Succesful" shouldDisplay={isLoggedIn && !isJustLoggedIn.current ? true : false} />
    </main>
  );
};

export default Home;
