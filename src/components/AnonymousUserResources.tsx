import React from "react";
import { Outlet } from "react-router-dom";

const AnonymousUserResources = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AnonymousUserResources;
