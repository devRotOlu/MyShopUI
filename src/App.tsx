import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import AppContext from "./components/AppContext.tsx";

import SignUp from "./components/signup/SignUp.tsx";
import Home from "./components/home/Home.tsx";
import UserDashboard from "./components/UserDashboard.tsx";
import ForgotPassword from "./components/ForgotPassword.tsx";
import Cart from "./components/Cart.tsx";
import LoginPage from "./components/loginPage/LoginPage.tsx";
import Checkout from "./components/Checkout.tsx";

import "./App.css";

function App() {
  return (
    <AppContext>
      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="/account/signup" element={<SignUp />} />
          <Route path="/account/login" element={<LoginPage />} />
          <Route path="/account/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart/overview" element={<Cart />} />
          <Route path="/checkout/complete-order" element={<Checkout />} />
        </>
      </Routes>
    </AppContext>
  );
}

export default App;
