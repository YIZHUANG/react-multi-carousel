import * as React from "react";

import { CarouselInternalState, CarouselProps } from "./types";
import { getOriginalCounterPart, getCloneCounterPart } from "./utils";

interface DotsTypes {
  props: CarouselProps;
  state: CarouselInternalState;
  goToSlide: (index: number) => void;
  getState: () => any;
}

const Dots = ({
  props,
  state,
  goToSlide,
  getState
}: DotsTypes): React.ReactElement<any> | null => {
  const { showDots, customDot, dotListClass, infinite, children } = props;
  if (!showDots) {
    return null;
  }
  const { currentSlide } = state;
  const childrenArr = React.Children.toArray(children);
  return (
    <ul className={`react-multi-carousel-dot-list ${dotListClass}`}>
      {Array(childrenArr.length)
        .fill(0)
        .map((item, index) => {
          const slideIndex = infinite
            ? getOriginalCounterPart(index, state, childrenArr)
            : index;
          const cloneIndex = infinite
            ? getCloneCounterPart(index, state, childrenArr)
            : null;
          let isActive;
          // cloneIndex can be 0 and its true!
          if (cloneIndex !== undefined) {
            /*
            It means we are in infinite mode, and the condition (childrenArr.length > slidesToShow * 2) is true.
            Also there could be multiple items that are exactly the same but have different index due to the reasons that they are clones.
            */
            isActive =
              currentSlide === cloneIndex || currentSlide === slideIndex;
          } else {
            // we are not in infinite mode or we don't have duplicate clones.
            isActive = currentSlide === slideIndex;
          }
          if (customDot) {
            return React.cloneElement(customDot, {
              index,
              active: isActive,
              onClick: () => goToSlide(slideIndex),
              carouselState: getState()
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
              <button onClick={() => goToSlide(slideIndex)} />
            </li>
          );
        })}
    </ul>
  );
};

export default Dots;
