import React from "react";

import { thumbnailProps } from "../../types";
import "./style.css";

const Thumbnail = ({ url, name }: thumbnailProps) => {
  return (
    <div className="thumbnails">
      <img className="w-100 h-100" src={url} alt={name} />
    </div>
  );
};

export default Thumbnail;
