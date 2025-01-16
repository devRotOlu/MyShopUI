import React, { useContext, useEffect, useState } from "react";

import Alert from "../alert/Alert.tsx";
import Navbar from "../navbar/Navbar.tsx";
import ProductList from "../productList/ProductList.tsx";
import Loader from "../Loader.tsx";

import { appContext } from "../AppContext.tsx";
import "./style.css";

const Home = () => {
  const appStates = useContext(appContext);
  const { isLoggedIn, isInitialRender, products, isOldSession, setInitialRender } = appStates;
  const [shouldDisplayAlert, setShouldDisplayAlert] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn && isInitialRender.home && !isOldSession) {
      setInitialRender("home", false);
      setShouldDisplayAlert(true);
    }
  }, [isLoggedIn, isInitialRender, isOldSession, setInitialRender]);

  return (
    <main className="min-vh-100" id="home">
      <Navbar />
      {shouldDisplayAlert && <Alert styles={{ backgroundColor: `var(--light_Green)` }} alertTitle="Login" alertMessage="Login Succesful" setIsDisplayed={setShouldDisplayAlert} />}
      {!products.length && (
        <div className="d-flex justify-content-center min-vh-100 align-items-center">
          <Loader />
        </div>
      )}
      <div className="mx-4 my-5 gap-2 min-vh-100">
        <ProductList />
      </div>
    </main>
  );
};

export default Home;
