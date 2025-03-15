import React from "react";

import { componentOverlayProps } from "../types";

const ComponentOverlay = <E extends React.ElementType = "div">({ as }: componentOverlayProps<E>) => {
  const Component = as || "div";
  return <Component className="position-absolute w-100 h-100" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", top: "0", left: "0" }}></Component>;
};

export default ComponentOverlay;
