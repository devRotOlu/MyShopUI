import React from "react";

import { thumbnailProps } from "../../types/types";
import "./style.css";

const Thumbnail = ({ children }: thumbnailProps) => {
  return <div className="thumbnails">{children}</div>;
};

export default Thumbnail;
