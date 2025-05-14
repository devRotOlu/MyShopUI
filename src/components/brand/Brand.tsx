import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assests/myshop-logo.png";

import { brandProp } from "../../types.ts";
import "./style.css";

const Brand = ({ styles }: brandProp) => {
  return (
    <Link to="/">
      <div id="brand" style={styles}>
        <img src="https://files.logomakr.com/4l0a4K-LogoMakr.png" alt="App Brand" style={{ height: "100%", width: "100%" }} />
      </div>
    </Link>
  );
};

export default Brand;
