import React from "react";
import { CarouselInternalState, CarouselProps } from "../types";
import { isInRightEnd } from "./common";
/*
two cases:
1. We are not over-sliding.
2. We are sliding over to what we have, that means nextslides < this.props.children.length. (does not apply to the inifnite mode)
*/
function populatePreviousSlides(
  state: CarouselInternalState,
  props: CarouselProps,
  slidesHavePassed: number = 0
): {
  nextSlides: number | undefined;
  nextPosition: number | undefined;
} {
  const { currentSlide, itemWidth, slidesToShow } = state;
  const { slidesToSlide, children, showDots, infinite } = props;
  let nextSlides;
  let nextPosition;
  const nextMaximumSlides =
    currentSlide -
    slidesHavePassed -
    (slidesHavePassed > 0 ? 0 : slidesToSlide!);
  const childrenArr = React.Children.toArray(children);
  const additionalSlides = (childrenArr.length - slidesToShow) % slidesToSlide!;
  if (nextMaximumSlides >= 0) {
    // It means if we have next slides go back to on the left-hand side.
    nextSlides = nextMaximumSlides;
    if (showDots && !infinite && additionalSlides > 0 && isInRightEnd(state)) {
      nextSlides = currentSlide - additionalSlides;
    }
    nextPosition = -(itemWidth * nextSlides);
  } else if (nextMaximumSlides < 0 && currentSlide !== 0) {
    // prevent oversliding.
    // it means the user has almost scrolling over to what we have.
    // if true, then we go back to the first slide.
    // this is not for infinite mode as infinite mode always has items to go back to.
    nextSlides = 0;
    nextPosition = 0;
  } else {
    nextSlides = undefined;
    nextPosition = undefined;
  }
  return {
    nextSlides,
    nextPosition,
  };
}

export { populatePreviousSlides };
