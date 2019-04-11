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
    ssr?: boolean;
    slidesToSlide: number;
    draggable?: boolean;
    arrows?: boolean;
    swipeable?: boolean;
    removeArrowOnDeviceType?: string | Array<string>;
    children: any;
    customLeftArrow?: React.ReactElement<any> | null;
    customRightArrow?: React.ReactElement<any> | null;
    customDot?: React.ReactElement<any> | null;
    customButtonGroup?: React.ReactElement<any> | null;
    infinite?: boolean;
    minimumTouchDrag: number;
    afterChange?: (previousSlide: number, state: stateCallBack) => void;
    beforeChange?: (nextSlide: number, state: stateCallBack) => void;
    sliderClass?: string;
    itemClass?: string;
    containerClass?: string;
    dotListClass?: string;
    keyBoardControl?: boolean;
    autoPlay?: boolean;
    autoPlaySpeed?: number;
    showDots?: boolean;
    partialVisbile?: "right" | boolean;
    customTransition?: string;
    transitionDuration?: number;
    focusOnSelect?: boolean;
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
