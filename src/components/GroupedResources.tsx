import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const GroupedResources = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <div className="d-md-block d-none">
        <Footer />
      </div>
    </>
  );
};

export default GroupedResources;
