import React from "react";

import { thumbnailWrapperProps } from "../../types/types";

const ThumbnailWrapper = ({ setActiveIndex, activeIndex, index, children }: thumbnailWrapperProps) => {
  const isActiveIndex = index === activeIndex;
  const borderColor = isActiveIndex ? "var(--dark_orange)" : "var(--darker_Grey)";
  const borderThickness = isActiveIndex ? "2px" : "Thin";
  return (
    <div className="thumbnailWrap" onClick={() => setActiveIndex(index)} style={{ border: `solid ${borderThickness} ${borderColor}` }}>
      {children}
    </div>
  );
};

export default ThumbnailWrapper;
