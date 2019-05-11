import { CarouselInternalState, CarouselProps } from "../types";

// this is to get the values for handling onTouchMove / onMouseMove;
function populateSlidesOnMouseTouchMove(
  state: CarouselInternalState,
  props: CarouselProps,
  initialX: number,
  lastX: number,
  clientX: number
): {
  direction?: string;
  nextPosition: number | undefined;
  canContinue: boolean;
} {
  const {
    itemWidth,
    slidesToShow,
    totalItems,
    transform,
    currentSlide
  } = state;
  const { infinite } = props;
  let canContinue = false; // it will be true if we have slides to slide to.
  let direction; // either 'left' or 'right'
  let nextPosition;
  // making sure we have items to slide back to, prevent oversliding.
  const slidesHavePassedRight = Math.round(
    (initialX - lastX) / itemWidth
  );
  const slidesHavePassedLeft = Math.round(
    (lastX - initialX) / itemWidth
  );
  const isMovingRight = initialX > clientX;
  const isMovingLeft = clientX > initialX;
  if (isMovingRight) {
    const isAboutToOverSlide = !(slidesHavePassedRight <= slidesToShow);
    if (!isAboutToOverSlide) {
      direction = "right";
      const translateXLimit = Math.abs(
        -(itemWidth * (totalItems - slidesToShow))
      );
      const nextTranslate = transform - (lastX - clientX);
      const isLastSlide = currentSlide === totalItems - slidesToShow;
      if (
        Math.abs(nextTranslate) <= translateXLimit ||
        (isLastSlide && infinite)
      ) {
        nextPosition = nextTranslate;
        canContinue = true;
      }
    }
  }
  if (isMovingLeft) {
    const isAboutToOverSlide = !(slidesHavePassedLeft <= slidesToShow);
    if (!isAboutToOverSlide) {
      direction = "left";
      const nextTranslate = transform + (clientX - lastX);
      const isFirstSlide = currentSlide === 0;
      if (nextTranslate <= 0 || (isFirstSlide && infinite)) {
        canContinue = true;
        nextPosition = nextTranslate;
      }
    }
  }
  return {
    direction,
    nextPosition,
    canContinue
  };
}


export { populateSlidesOnMouseTouchMove };
