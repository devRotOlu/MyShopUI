import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AppContext from "./components/context/AppContext.tsx";
import Routes from "./components/Routes.tsx";

import "./App.css";

function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <AppContext>
        <Routes />
      </AppContext>
    </SkeletonTheme>
  );
}

export default App;
