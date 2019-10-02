import * as React from "react";
export interface ResponsiveType {
  [key: string]: {
    breakpoint: { max: number; min: number };
    items: number;
    partialVisibilityGutter?: number; // back-ward compatible, because previously there has been a typo
    paritialVisibilityGutter?: number;
    slidesToSlide?: number;
  };
}

export function isMouseMoveEvent(
  e: React.MouseEvent | React.TouchEvent
): e is React.MouseEvent {
  return "clientX" && 'clientY' in e;
}
export interface CarouselProps {
  responsive: ResponsiveType;
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
  afterChange?: (previousSlide: number, state: StateCallBack) => void; // Change callback after sliding everytime. `(previousSlide, currentState) => ...`
  beforeChange?: (nextSlide: number, state: StateCallBack) => void; // Change callback before sliding everytime. `(previousSlide, currentState) => ...`
  sliderClass?: string; // Use this to style your own track list.
  itemClass?: string; // Use this to style your own Carousel item. For example add padding-left and padding-right
  containerClass?: string; // Use this to style the whole container. For example add padding to allow the "dots" or "arrows" to go to other places without being overflown.
  className?: string; // Use this to style the whole container with styled-components
  dotListClass?: string; // Use this to style the dot list.
  keyBoardControl?: boolean;
  centerMode?: boolean; // show previous and next set of items partially
  autoPlay?: boolean;
  autoPlaySpeed?: number; // default 3000ms
  showDots?: boolean;
  renderDotsOutside?: boolean; // show dots outside of the container for custom styling.
  renderButtonGroupOutside?: boolean; // show buttonGroup outside of the container for custom styling.
  // Show next/previous item partially
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

export interface StateCallBack extends CarouselInternalState {
  onMove: boolean;
  direction: Direction;
}
export type Direction = "left" | "right" | "" | undefined;
export interface ButtonGroupProps {
  previous?: () => void;
  next?: () => void;
  goToSlide?: (index: number) => void;
  carouselState?: StateCallBack;
}
export interface ArrowProps {
  onClick?: () => void;
  carouselState?: StateCallBack;
}
export interface DotProps {
  index?: number;
  active?: boolean;
  onClick?: () => void;
  carouselState?: StateCallBack;
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
}

export default class Carousel extends React.Component<CarouselProps> {
  previous: (slidesHavePassed: number) => void;
  next: (slidesHavePassed: number) => void;
  goToSlide: (slide: number) => void;
  state: CarouselInternalState;
  setClones: (
    slidesToShow: number,
    itemWidth?: number,
    forResizing?: boolean
  ) => void; // reset carousel in infinite mode.
  setItemsToShow: (shouldCorrectItemPosition?: boolean) => void; // reset carousel in non-infinite mode.
  correctClonesPosition: ({ domLoaded }: { domLoaded: boolean }) => void;
  onMove: boolean;
  direction: Direction;
  containerRef: React.RefObject<HTMLDivElement>;
}
