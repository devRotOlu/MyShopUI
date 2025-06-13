import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import "./style.css";

const MainLayout = () => {
  return (
    <div id="main_layout">
      <Navbar />
      <Outlet />
      <div className="d-md-block d-none">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
