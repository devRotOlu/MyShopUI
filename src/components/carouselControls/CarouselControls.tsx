import React from "react";
import { Icon } from "@iconify/react";

import { caurouselControlProps } from "../../types/types";
import "./style.css";

const CarouselControls = ({ handleOnClickNext, handleOnClickPrevious }: caurouselControlProps) => {
  return (
    <div className="d-flex justify-content-between w-100" id="carousel_controls">
      <button onClick={handleOnClickPrevious} aria-label="previous">
        <Icon icon="ooui:previous-ltr" />
      </button>
      <button aria-label="next" onClick={handleOnClickNext}>
        <Icon icon="ooui:previous-rtl" />
      </button>
    </div>
  );
};

export default CarouselControls;
