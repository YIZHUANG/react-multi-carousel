import { CarouselInternalState, CarouselProps } from "../types";
declare function populateNextSlides(state: CarouselInternalState, props: CarouselProps, slidesHavePassed?: number): {
    nextSlides: number | undefined;
    nextPosition: number | undefined;
};
export { populateNextSlides };
