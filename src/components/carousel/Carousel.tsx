import React, { ReactNode, useState, MouseEventHandler } from "react";

import CarouselControls from "../carouselControls/CarouselControls";
import CarouselImage from "../carouselImage/CarouselImage";

import { carouselProps } from "../../types/types";
import "./style.css";

const minIndex = 0;

const Carousel = ({ images, name, activeIndex, setActiveIndex }: carouselProps) => {
  const [hideControls, setHideControls] = useState(true);

  const maxIndex = images.length - 1;

  const handleOnClickPrevious: MouseEventHandler<HTMLButtonElement> = () => {
    setActiveIndex((prevIndex) => (prevIndex > minIndex ? --prevIndex : maxIndex));
  };
  const handleOnClickNext: MouseEventHandler<HTMLButtonElement> = () => {
    setActiveIndex((prevIndex) => (prevIndex < maxIndex ? ++prevIndex : minIndex));
  };

  let carouselItems: ReactNode[] = [];
  for (let index = 0; index < images.length; index++) {
    if (index === activeIndex) {
      const { url } = images[index];
      carouselItems = [<CarouselImage key={url} url={url} name={name} index={index} />];
      break;
    }
  }
  return (
    <div id="carousel" className="d-flex justify-content-center w-100">
      <div id="carousel" className="position-relative w-100" onMouseEnter={() => setHideControls(false)} onMouseLeave={() => setHideControls(true)}>
        {carouselItems}
        {!hideControls && <CarouselControls handleOnClickNext={handleOnClickNext} handleOnClickPrevious={handleOnClickPrevious} />}
      </div>
    </div>
  );
};

export default Carousel;
