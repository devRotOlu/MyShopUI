import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import SignUp from "./components/signup/SignUp.tsx";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx";

import "./App.css";

function App() {
  return (
    <Routes>
      <>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </>
    </Routes>
  );
}

export default App;
