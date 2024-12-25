import React, { useContext, useEffect } from "react";

import Alert from "../alert/Alert.tsx";
import Navbar from "../navbar/Navbar.tsx";
import Modal from "../Modal.tsx";
import ModalLogin from "../modalLogin/ModalLogin.tsx";
import ProductList from "../productList/ProductList.tsx";

import { appContext } from "../AppContext.tsx";
import "./style.css";

const Home = () => {
  const appStates = useContext(appContext);
  const { isLoggedIn, isJustLoggedIn } = appStates;

  useEffect(() => {
    if (isLoggedIn && !isJustLoggedIn.current) {
      isJustLoggedIn.current = true;
    }
  }, [isLoggedIn, isJustLoggedIn]);

  return (
    <main className="min-vh-100" id="home">
      <Navbar />
      <Alert alertTitle="Login" alertMessage="Login Succesful" shouldDisplay={isLoggedIn && !isJustLoggedIn.current ? true : false} />
      <Modal modalInstance="login_shortCut" styles={{ marginLeft: "auto" }}>
        <ModalLogin />
      </Modal>
      <div className="mx-4 my-5 gap-2">
        <ProductList />
      </div>
    </main>
  );
};

export default Home;
