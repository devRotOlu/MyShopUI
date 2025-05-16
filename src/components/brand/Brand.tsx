import React from "react";

import { brandProp } from "../../types.ts";
import "./style.css";

const Brand = ({ styles }: brandProp) => {
  return <img src="https://files.logomakr.com/4l0a4K-LogoMakr.png" alt="App Brand" style={styles} />;
};

export default Brand;
