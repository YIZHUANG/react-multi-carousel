import { responsiveType, CarouselInternalState, CarouselProps } from "./types";
declare function guessWidthFromDeviceType(deviceType: string, responsive: responsiveType): number | string | undefined;
declare function getParitialVisibilityGutter(responsive: responsiveType, partialVisbile?: string | boolean, serverSideDeviceType?: string | undefined, clientSideDeviceType?: string | undefined): number | undefined;
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
declare const throttle: (func: any, limit: number, setIsInThrottle?: any) => any;
export { guessWidthFromDeviceType, getParitialVisibilityGutter, getClones, whenEnteredClones, throttle, getCounterPart };
