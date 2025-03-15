import React from "react";

import Logo from "../../assests/myshop-logo.png";

import { BrandProp } from "../../types.ts";
import "./style.css";

const Brand = ({ styles }: BrandProp) => {
  return (
    <div id="brand" style={styles}>
      <img src={Logo} alt="App Brand" style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default Brand;
