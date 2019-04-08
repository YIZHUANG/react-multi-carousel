import { CarouselInternalState, CarouselProps } from "../types";
declare function getOriginalCounterPart(index: number, { slidesToShow, currentSlide, totalItems }: {
    slidesToShow: number;
    currentSlide: number;
    totalItems: number;
}, childrenArr: any[]): number;
declare function getCloneCounterPart(index: number, { slidesToShow, totalItems, currentSlide }: {
    slidesToShow: number;
    currentSlide: number;
    totalItems: number;
}, childrenArr: any[]): number | undefined;
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
export { getOriginalCounterPart, getCloneCounterPart, getClones, whenEnteredClones };
