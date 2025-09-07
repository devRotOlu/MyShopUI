import React from "react";

import "./style.css";
import { alertLinksType } from "../../types/types";

const AlertLinks = ({ children }: alertLinksType) => {
  return (
    <div id="alert_links" className="d-flex justify-content-between">
      {children}
    </div>
  );
};

export default AlertLinks;
