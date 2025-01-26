import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import AppContext from "./components/AppContext.tsx";
import Routes from "./components/Routes.tsx";

import "./App.css";

function App() {
  return (
    <AppContext>
      <Routes />
    </AppContext>
  );
}

export default App;
