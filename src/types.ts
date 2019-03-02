

interface responsiveType {
  [key: string]: {
    breakpoint: { max: number; min: number };
    items: number;
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
  children: React.ReactNode | null;
  customLeftArrow?: React.ReactElement<any> | null;
  customRightArrow?: React.ReactElement<any> | null;
  infinite?: boolean;
  contentClassName?: string;
  itemClassName?:string;
  containerClassName?: string;
  customTransition?:string;
  transitionDuration?: number;
  // if you are using customTransition, make sure to put the duration here.
  // for example, customTransition="all .5"  then put transitionDuration as 500.
  // this is needed for the resizing to work.
}
interface CarouselInternalState {
  itemWidth: number;
  containerWidth: number;
  slidesToShow: number;
  currentSlide: number;
  totalItems: number;
  activeItem: any;
  domLoaded: boolean;
  deviceType?: string;
  transform: number | string;
}

export { CarouselInternalState, CarouselProps, responsiveType };
