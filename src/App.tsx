import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import SignUp from "./components/signup/SignUp.tsx";
import Home from "./components/home/Home.tsx";
import Login from "./components/login/Login.tsx";
import UserDashboard from "./components/UserDashboard.tsx";
import ForgotPassword from "./components/ForgotPassword.tsx";
import AppContext from "./components/AppContext.tsx";

import "./App.css";

function App() {
  return (
    <AppContext>
      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="/account/signup" element={<SignUp />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/forgot-password" element={<ForgotPassword />} />
        </>
      </Routes>
    </AppContext>
  );
}

export default App;
