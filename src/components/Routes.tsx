import React from "react";
import { Routes as Routers, Route } from "react-router-dom";

import SignUp from "./signup/SignUp.tsx";
import Home from "./home/Home.tsx";
import UserDashboard from "./UserDashboard.tsx";
import ForgotPassword from "./ForgotPassword.tsx";
import Cart from "./cart/Cart.tsx";
import LoginPage from "./loginPage/LoginPage.tsx";
import Checkout from "./checkout/Checkout.tsx";
import AuthenticatedUserResources from "./AuthenticatedUserResources.tsx";
import AnonymousUserResources from "./AnonymousUserResources.tsx";

const Routes = () => {
  return (
    <Routers>
      <>
        <Route element={<AnonymousUserResources />}>
          <Route path="/" element={<Home />} />
          <Route path="/account/signup" element={<SignUp />} />
          <Route path="/account/login" element={<LoginPage />} />
          <Route path="/account/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route element={<AuthenticatedUserResources />}>
          <Route path="/checkout/complete-order" element={<Checkout />} />
          <Route path="/cart/overview" element={<Cart />} />
        </Route>
      </>
    </Routers>
  );
};

export default Routes;
