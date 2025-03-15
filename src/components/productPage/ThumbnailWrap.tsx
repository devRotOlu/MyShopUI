import React from "react";

import { thumbnailWrapProps } from "../../types";

const ThumbnailWrap = ({ setActiveIndex, activeIndex, index, children }: thumbnailWrapProps) => {
  const isActiveIndex = index === activeIndex;
  const borderColor = isActiveIndex ? "var(--dark_orange)" : "var(--darker_Grey)";
  const borderThickness = isActiveIndex ? "2px" : "Thin";
  return (
    <div id="thumbnailWrap" onClick={() => setActiveIndex(index)} style={{ border: `solid ${borderThickness} ${borderColor}` }}>
      {children}
    </div>
  );
};

export default ThumbnailWrap;
