import React from "react";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import { caurouselControlProps } from "../../types/types";
import "./style.css";

const CarouselControls = ({ handleOnClickNext, handleOnClickPrevious }: caurouselControlProps) => {
  return (
    <div className="d-flex justify-content-between w-100" id="carousel_controls">
      <button onClick={handleOnClickPrevious} aria-label="previous">
        <MdOutlineNavigateBefore />
      </button>
      <button aria-label="next" onClick={handleOnClickNext}>
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default CarouselControls;
