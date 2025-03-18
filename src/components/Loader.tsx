import React from "react";

import { loaderProps } from "../types";

const Loader = ({ size, color }: loaderProps) => {
  return (
    <div className={`spinner-border ${size} text-${color}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader;
