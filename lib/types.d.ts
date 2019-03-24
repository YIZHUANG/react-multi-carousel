/// <reference types="react" />
interface responsiveType {
    [key: string]: {
        breakpoint: {
            max: number;
            min: number;
        };
        items: number;
        paritialVisibilityGutter?: number;
    };
}
interface CarouselProps {
    responsive: responsiveType;
    deviceType?: string;
    forSSR?: boolean;
    slidesToSlide: number;
    disableDrag?: boolean;
    removeArrow?: boolean;
    disableSwipeOnMobile?: boolean;
    removeArrowOnDeviceType?: string | Array<string>;
    children: any;
    customLeftArrow?: React.ReactElement<any> | null;
    customRightArrow?: React.ReactElement<any> | null;
    customDot?: React.ReactElement<any> | null;
    customButtonGroup?: React.ReactElement<any> | null;
    infinite?: boolean;
    minimumTouchDrag: number;
    afterChanged?: (previousSlide: number, state: stateCallBack) => void;
    beforeChanged?: (nextSlide: number, state: stateCallBack) => void;
    contentClassName?: string;
    itemClassName?: string;
    containerClassName?: string;
    dotListClassName?: string;
    keyBoardControl?: boolean;
    autoPlay?: boolean;
    autoPlaySpeed?: number;
    shouldShowDots?: boolean;
    partialVisbile?: "right" | boolean;
    customTransition?: string;
    transitionDuration?: number;
}
interface buttonGroupCallBack {
    previous: () => void;
    next: () => void;
    goToSlide: (index: number) => void;
    state: stateCallBack;
}
interface stateCallBack extends CarouselInternalState {
    onMove: boolean;
    direction: string | undefined;
}
interface CarouselInternalState {
    itemWidth: number;
    containerWidth: number;
    slidesToShow: number;
    currentSlide: number;
    totalItems: number;
    domLoaded: boolean;
    deviceType?: string;
    transform: number;
    isSliding?: boolean;
    clones: any[];
}
export { CarouselInternalState, CarouselProps, responsiveType, stateCallBack, buttonGroupCallBack };
