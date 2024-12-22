import React from "react";
import { Link } from "react-router-dom";

//import Brand

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link to="/signup">SignUp</Link>
      </nav>
    </header>
  );
};

export default Navbar;
