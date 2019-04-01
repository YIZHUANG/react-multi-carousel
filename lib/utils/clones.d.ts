import { CarouselInternalState, CarouselProps } from "../types";
declare function getCounterPart(index: number, { slidesToShow, currentSlide, totalItems }: {
    slidesToShow: number;
    currentSlide: number;
    totalItems: number;
}, childrenArr: any[]): number;
declare function getClones(slidesToShow: number, childrenArr: any[]): {
    clones: any[];
    initialSlide: number;
};
declare function whenEnteredClones({ currentSlide, slidesToShow, itemWidth, totalItems }: CarouselInternalState, childrenArr: any[], props: CarouselProps): {
    hasEnterClonedAfter: boolean;
    hasEnterClonedBefore: boolean;
    nextSlide: number;
    nextPosition: number;
};
export { getCounterPart, getClones, whenEnteredClones };
