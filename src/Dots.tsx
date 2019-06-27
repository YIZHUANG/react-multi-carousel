import * as React from "react";

import { CarouselInternalState, CarouselProps, stateCallBack } from "./types";

interface DotsTypes {
  props: CarouselProps;
  state: CarouselInternalState;
  goToSlide: (index: number) => void;
  getState: () => stateCallBack;
}

const Dots = ({
  props,
  state,
  goToSlide,
  getState,
}: DotsTypes): React.ReactElement<any> | null => {
  const { showDots, customDot, dotListClass, infinite, children } = props;
  if (!showDots) {
    return null;
  }
  const { currentSlide, slidesToShow } = state;
  const { slidesToSlide } = props;
  const childrenArr = React.Children.toArray(children);
  let numberOfDotsToShow;
  if (!infinite) {
    numberOfDotsToShow =
      Math.ceil((childrenArr.length - slidesToShow) / slidesToSlide!) + 1;
  } else {
    throw new Error("Not supported yet");
  }
  return (
    <ul className={`react-multi-carousel-dot-list ${dotListClass}`}>
      {Array(numberOfDotsToShow)
        .fill(0)
        .map((item, index: number) => {
          let isActive;
          let nextSlide: number;
          if (!infinite) {
            const maximumNextSlide = childrenArr.length - slidesToShow;
            const possibileNextSlides = index * slidesToSlide!;
            const isAboutToOverSlide = possibileNextSlides > maximumNextSlide;
            nextSlide = isAboutToOverSlide
              ? maximumNextSlide
              : possibileNextSlides;
            isActive =
              nextSlide === currentSlide ||
              (currentSlide > nextSlide &&
                currentSlide < nextSlide + slidesToSlide! &&
                currentSlide < childrenArr.length - slidesToShow);
          } else {
            throw new Error("Not supported yet");
          }
          if (customDot) {
            return React.cloneElement(customDot, {
              index,
              active: isActive,
              key: index,
              onClick: () => goToSlide(nextSlide),
              carouselState: getState(),
            });
          }
          return (
            <li
              data-index={index}
              key={index}
              className={`react-multi-carousel-dot ${
                isActive ? "react-multi-carousel-dot--active" : ""
              }`}
            >
              <button onClick={() => goToSlide(nextSlide)} />
            </li>
          );
        })}
    </ul>
  );
};

export default Dots;
