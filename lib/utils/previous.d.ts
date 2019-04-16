import { CarouselInternalState, CarouselProps } from "../types";
declare function populatePreviousSlides(state: CarouselInternalState, props: CarouselProps, slidesHavePassed?: number): {
    nextSlides: number | undefined;
    nextPosition: number | undefined;
};
export { populatePreviousSlides };
