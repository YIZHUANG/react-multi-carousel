import { CarouselInternalState, CarouselProps } from "../types";
declare function populateSlidesOnMouseTouchMove(state: CarouselInternalState, props: CarouselProps, initialPosition: number, lastPosition: number, clientX: number): {
    direction?: string;
    nextPosition: number | undefined;
    canContinue: boolean;
};
export { populateSlidesOnMouseTouchMove };
