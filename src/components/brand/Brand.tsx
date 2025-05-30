import React from "react";

import { brandProp } from "../../types.ts";
import logo from "../../assests/MyShopLogo.png";
import "./style.css";

const Brand = ({ styles }: brandProp) => {
  return <img src={logo} alt="App Brand" style={styles} />;
};

export default Brand;
