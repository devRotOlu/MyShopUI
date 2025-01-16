import React from "react";

import Logo from "../assests/Logo.png";

import { BrandProp } from "../types.ts";

const Brand = ({ styles }: BrandProp) => {
  return (
    <div style={styles}>
      <img src={Logo} alt="App Brand" style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default Brand;
