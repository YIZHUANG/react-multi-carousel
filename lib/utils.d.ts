import { responsiveType, CarouselInternalState } from "./types";
declare function guessWidthFromDeviceType(deviceType: string, responsive: responsiveType): number | string | undefined;
declare function getParitialVisibilityGutter(responsive: responsiveType, partialVisbile?: string | boolean, serverSideDeviceType?: string | undefined, clientSideDeviceType?: string | undefined): number | undefined;
declare function getCounterPart(index: number, { slidesToShow }: {
    slidesToShow: number;
}, childrenArr: any[]): number;
declare function getClones(slidesToShow: number, childrenArr: any[]): {
    clones: any[];
    initialSlide: number;
};
declare function whenEnteredClones({ currentSlide, slidesToShow, itemWidth, totalItems }: CarouselInternalState, childrenArr: any[]): {
    hasEnterClonedAfter: boolean;
    hasEnterClonedBefore: boolean;
    nextSlide: number;
    nextPosition: number;
};
declare const throttle: (func: any, limit: number) => any;
export { guessWidthFromDeviceType, getParitialVisibilityGutter, getClones, whenEnteredClones, throttle, getCounterPart };
