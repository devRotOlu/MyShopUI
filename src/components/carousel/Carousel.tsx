import React, { ReactNode, useState, MouseEvent } from "react";

import CarouselControls from "./CarouselControls";

import { carouselProps } from "../../types";
import "./style.css";

const minIndex = 0;

const Carousel = ({ images, name, activeIndex, setActiveIndex }: carouselProps) => {
  const [hideControls, setHideControls] = useState(true);

  const maxIndex = images.length - 1;

  const handleOnClickPrevious = (_: MouseEvent<HTMLButtonElement>) => {
    setActiveIndex((prevIndex) => (prevIndex > minIndex ? --prevIndex : maxIndex));
  };
  const handleOnClickNext = (_: MouseEvent<HTMLButtonElement>) => {
    setActiveIndex((prevIndex) => (prevIndex < maxIndex ? ++prevIndex : minIndex));
  };

  let carouselItems: ReactNode[] = [];
  for (let index = 0; index < images.length; index++) {
    if (index === activeIndex) {
      const { url } = images[index];
      carouselItems = [
        <div className="w-100" key={index}>
          <img src={url} alt={name} className="w-100" />
        </div>,
      ];
      break;
    }
  }
  return (
    <div id="carousel" className="d-flex justify-content-center">
      <div id="carousel" className="position-relative w-75 " onMouseEnter={() => setHideControls(false)} onMouseLeave={() => setHideControls(true)}>
        {carouselItems}
        {!hideControls && <CarouselControls handleOnClickNext={handleOnClickNext} handleOnClickPrevious={handleOnClickPrevious} />}
      </div>
    </div>
  );
};

export default Carousel;
