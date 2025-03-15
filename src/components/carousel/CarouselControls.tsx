import React from "react";
import { Icon } from "@iconify/react";

import { caurouselControlProps } from "../../types";

const CarouselControls = ({ handleOnClickNext, handleOnClickPrevious }: caurouselControlProps) => {
  return (
    <div className="d-flex justify-content-between w-100" id="carousel_controls">
      <button onClick={handleOnClickPrevious}>
        <Icon icon="ooui:previous-ltr" fontSize="1.5rem" />
      </button>
      <button onClick={handleOnClickNext}>
        <Icon icon="ooui:previous-rtl" fontSize="1.5rem" />
      </button>
    </div>
  );
};

export default CarouselControls;
