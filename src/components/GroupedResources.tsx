import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./navbar/Navbar";

const GroupedResources = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default GroupedResources;
