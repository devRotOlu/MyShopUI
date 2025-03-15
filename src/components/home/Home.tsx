import React, { useContext, useEffect, useState } from "react";

import Alert from "../alert/Alert.tsx";
import ProductList from "../productList/ProductList.tsx";
import PageWrapper from "../PageWrapper.tsx";

import { appContext } from "../context/AppContext.tsx";
import "./style.css";

const Home = () => {
  const appStates = useContext(appContext);
  const { isLoggedIn, isInitialRender, isOldSession, setInitialRender } = appStates;
  const [shouldDisplayAlert, setShouldDisplayAlert] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn && isInitialRender.home && !isOldSession) {
      setInitialRender("home", false);
      setShouldDisplayAlert(true);
    }
  }, [isLoggedIn, isInitialRender, isOldSession, setInitialRender]);

  return (
    <PageWrapper pageId="home">
      {shouldDisplayAlert && <Alert styles={{ backgroundColor: `var(--light_Green)` }} alertTitle="Login" alertMessage="Login Succesful" setIsDisplayed={setShouldDisplayAlert} />}
      <ProductList />
    </PageWrapper>
  );
};

export default Home;
