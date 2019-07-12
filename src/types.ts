import * as React from "react";
export interface responsiveType {
  [key: string]: {
    breakpoint: { max: number; min: number };
    items: number;
    paritialVisibilityGutter?: number;
    slidesToSlide?: number;
  };
}
export interface CarouselProps {
  responsive: responsiveType;
  deviceType?: string;
  ssr?: boolean;
  slidesToSlide?: number;
  draggable?: boolean;
  arrows?: boolean; // show or hide arrows.
  swipeable?: boolean;
  removeArrowOnDeviceType?: string | Array<string>;
  children: any;
  customLeftArrow?: React.ReactElement<any> | null;
  customRightArrow?: React.ReactElement<any> | null;
  customDot?: React.ReactElement<any> | null;
  customButtonGroup?: React.ReactElement<any> | null;
  infinite?: boolean;
  minimumTouchDrag?: number; // default 50px. The amount of distance to drag / swipe in order to move to the next slide.
  afterChange?: (previousSlide: number, state: stateCallBack) => void; // Change callback after sliding everytime. `(previousSlide, currentState) => ...`
  beforeChange?: (nextSlide: number, state: stateCallBack) => void; // Change callback before sliding everytime. `(previousSlide, currentState) => ...`
  sliderClass?: string; // Use this to style your own track list.
  itemClass?: string; // Use this to style your own Carousel item. For example add padding-left and padding-right
  containerClass?: string; // Use this to style the whole container. For example add padding to allow the "dots" or "arrows" to go to other places without being overflown.
  className?: string;  // Use this to style the whole container with styled-components
  dotListClass?: string; // Use this to style the dot list.
  keyBoardControl?: boolean;
  centerMode?: boolean; // show previous and next set of items paritially
  autoPlay?: boolean;
  autoPlaySpeed?: number; // default 3000ms
  showDots?: boolean;
  renderDotsOutside?: boolean; // show dots outside of the container for custom styling.
  // Show next/previous item partially, if its right, only show the next item partially, else show both
  // partialVisbile has to be used in conjunction with the responsive props, details are in documentation.
  // it shows the next set of items partially, different from centerMode as it shows both.
  partialVisbile?: boolean;
  customTransition?: string;
  transitionDuration?: number;
  // if you are using customTransition, make sure to put the duration here.
  // for example, customTransition="all .5"  then put transitionDuration as 500.
  // this is needed for the resizing to work.
  focusOnSelect?: boolean;
  additionalTransfrom?: number; // this is only used if you want to add additional transfrom to the current transform
}



export interface stateCallBack extends CarouselInternalState {
  onMove: boolean;
  direction: string | undefined;
}

export interface buttonGroupProps {
  previous?: () => void;
  next?: () => void;
  goToSlide?: (index:number) => void;
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

export default class Carousel extends React.PureComponent<CarouselProps> {}
