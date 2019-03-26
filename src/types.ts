import { any } from "prop-types";

interface responsiveType {
  [key: string]: {
    breakpoint: { max: number; min: number };
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
  arrows?: boolean; // show or hide arrows.
  swipeable?: boolean;
  removeArrowOnDeviceType?: string | Array<string>;
  children: any;
  customLeftArrow?: React.ReactElement<any> | null;
  customRightArrow?: React.ReactElement<any> | null;
  customDot?: React.ReactElement<any> | null;
  customButtonGroup?: React.ReactElement<any> | null;
  infinite?: boolean;
  minimumTouchDrag: number; // default 50px. The amount of distance to drag / swipe in order to move to the next slide.
  afterChange?: (previousSlide: number, state: stateCallBack) => void; // Change callback after sliding everytime. `(previousSlide, currentState) => ...`
  beforeChange?: (nextSlide: number, state: stateCallBack) => void; // Change callback before sliding everytime. `(previousSlide, currentState) => ...`
  sliderClass?: string; // Use this to style your own track list.
  itemClass?: string; // Use this to style your own Carousel item. For example add padding-left and padding-right
  containerClass?: string; // Use this to style the whole container. For example add padding to allow the "dots" or "arrows" to go to other places without being overflown.
  dotListClass?: string; // Use this to style the dot list.
  keyBoardControl?: boolean;
  autoPlay?: boolean;
  autoPlaySpeed?: number; // default 3000ms
  showDots?: boolean;
  // Show next/previous item partially, if its right, only show the next item partially, else show both
  // partialVisbile has to be used in conjunction with the responsive props, details are in documentation.
  partialVisbile?: "right" | boolean;
  customTransition?: string;
  transitionDuration?: number;
  // if you are using customTransition, make sure to put the duration here.
  // for example, customTransition="all .5"  then put transitionDuration as 500.
  // this is needed for the resizing to work.
}


interface buttonGroupCallBack {
  previous: () => void;
  next: () => void;
  goToSlide: (index:number) => void;
  state: stateCallBack
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
