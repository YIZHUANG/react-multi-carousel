import * as React from "react";
export interface responsiveType {
    [key: string]: {
        breakpoint: {
            max: number;
            min: number;
        };
        items: number;
        paritialVisibilityGutter?: number;
    };
}
export interface CarouselProps {
    responsive: responsiveType;
    deviceType?: string;
    ssr?: boolean;
    slidesToSlide?: number;
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
    minimumTouchDrag?: number;
    afterChange?: (previousSlide: number, state: stateCallBack) => void;
    beforeChange?: (nextSlide: number, state: stateCallBack) => void;
    sliderClass?: string;
    itemClass?: string;
    containerClass?: string;
    dotListClass?: string;
    keyBoardControl?: boolean;
    centerMode?: boolean;
    autoPlay?: boolean;
    autoPlaySpeed?: number;
    showDots?: boolean;
    partialVisbile?: boolean;
    customTransition?: string;
    transitionDuration?: number;
    focusOnSelect?: boolean;
}
export interface stateCallBack extends CarouselInternalState {
    onMove: boolean;
    direction: string | undefined;
}
export interface buttonGroupProps {
    previous?: () => void;
    next?: () => void;
    goToSlide?: (index: number) => void;
    carouselState?: stateCallBack;
}
export interface ArrowProps {
    onClick?: () => void;
    carouselState?: stateCallBack;
}
export interface DotProps {
    index?: number;
    active?: boolean;
    onClick?: () => void;
    carouselState?: stateCallBack;
}
export interface CarouselInternalState {
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
export default class Carousel extends React.PureComponent<CarouselProps> {
}
