import * as React from "react";

import { CarouselInternalState, CarouselProps } from "./types";
import { getCounterPart } from "./utils";

interface DotsTypes {
  props: CarouselProps;
  state: CarouselInternalState;
  goToSlide: (index:number) => void;
  getState: () => any;
}

const Dots = ({
  props,
  state,
  goToSlide,
  getState
}: DotsTypes): React.ReactElement<any> | null => {
  const { showDots, customDot, dotListClass, infinite, children } = props;
  if(!showDots) {
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
            ? getCounterPart(index, state, childrenArr)
            : index;
          // console.log(getCounterPart(this.state.currentSlide, this.state, childrenArr), slideIndex);
          if (customDot) {
            return React.cloneElement(customDot, {
              index,
              slideIndex,
              onClick: () => goToSlide(slideIndex),
              carouselState: getState()
            });
          }
          return (
            <li
              key={index}
              className={`react-multi-carousel-dot ${
                currentSlide === slideIndex
                  ? "react-multi-carousel-dot--active"
                  : ""
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
