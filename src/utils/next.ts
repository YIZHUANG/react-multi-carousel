import { CarouselInternalState, CarouselProps } from "../types";

/*
two cases:
1. We are not over-sliding.
2. We are sliding over to what we have, that means nextslides > this.props.children.length. (does not apply to the inifnite mode)
*/
function populateNextSlides(
  state: CarouselInternalState,
  props: CarouselProps,
  slidesHavePassed: number = 0
): {
  nextSlides: number | undefined;
  nextPosition: number | undefined;
} {
  const { slidesToShow, currentSlide, itemWidth, totalItems } = state;
  const { slidesToSlide } = props;
  let nextSlides;
  let nextPosition;
  // possibile next number of slides that don't go over what we have, this doesn't apply to the infinite mode.
  // because for inifnite mode this will never happen.
  const nextMaximumSlides =
    currentSlide +
    1 +
    slidesHavePassed +
    slidesToShow +
    (slidesHavePassed > 0 ? 0 : slidesToSlide);
  if (nextMaximumSlides <= totalItems) {
    // It means if we have next slides go back to on the right-hand side.
    nextSlides =
      currentSlide +
      slidesHavePassed +
      (slidesHavePassed > 0 ? 0 : slidesToSlide);
    nextPosition = -(itemWidth * nextSlides);
  } else if (
    nextMaximumSlides > totalItems &&
    currentSlide !== totalItems - slidesToShow
  ) {
    // This is to prevent oversliding
    // This is not for inifinite mode as for inifinite mode is never over-sliding.
    nextSlides = totalItems - slidesToShow;
    nextPosition = -(itemWidth * nextSlides);
  } else {
    nextSlides = undefined;
    nextPosition = undefined;
  }
  return {
    nextSlides,
    nextPosition
  };
}

export { populateNextSlides };
