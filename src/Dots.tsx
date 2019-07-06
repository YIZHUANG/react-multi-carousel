import * as React from "react";

import { CarouselInternalState, CarouselProps, stateCallBack } from "./types";
import { getOriginalIndexLookupTableByClones } from "./utils/clones";
import { getLookupTableForNextSlides } from "./utils/dots";
import { getSlidesToSlide } from './utils/common';

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
  const slidesToSlide = getSlidesToSlide(state,props);
  const childrenArr = React.Children.toArray(children);
  let numberOfDotsToShow: number;
  if (!infinite) {
    numberOfDotsToShow =
      Math.ceil((childrenArr.length - slidesToShow) / slidesToSlide!) + 1;
  } else {
    numberOfDotsToShow = Math.ceil(childrenArr.length / slidesToSlide!);
  }
  const nextSlidesTable = getLookupTableForNextSlides(
    numberOfDotsToShow,
    state,
    props,
    childrenArr
  );
  const lookupTable = getOriginalIndexLookupTableByClones(
    slidesToShow,
    childrenArr
  );
  const currentSlides = lookupTable[currentSlide];
  return (
    <ul className={`react-multi-carousel-dot-list ${dotListClass}`}>
      {Array(numberOfDotsToShow)
        .fill(0)
        .map((_, index: number) => {
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
            nextSlide = nextSlidesTable[index];
            const cloneIndex = lookupTable[nextSlide];
            isActive =
              currentSlides === cloneIndex ||
              (currentSlides >= cloneIndex &&
                currentSlides < cloneIndex + slidesToSlide!);
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
