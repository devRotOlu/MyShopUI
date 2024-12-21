import React from "react";

import Logo from "../assests/Logo.png";

const Brand = () => {
  return (
    <div style={{ height: "130px", width: "200px" }}>
      <img src={Logo} alt="App Brand" style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default Brand;
