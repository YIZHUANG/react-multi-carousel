import * as React from "react";

import {
  throttle,
  getWidthFromDeviceType,
  getParitialVisibilityGutter, // show next items partially
  getClones,
  checkClonesPosition, // handle when there are clones appear on the screen, only apply to infinite mode.
  getInitialState,
  getTransformForCenterMode,
  getTransformForPartialVsibile,
  throwError,
  getItemClientSideWidth, // get the width of each item on client side only.
  populateNextSlides, // for "next" functionality
  populatePreviousSlides, // for "previous" functionality
  populateSlidesOnMouseTouchMove // this is to get the values for handling onTouchMove / onMouseMove;
} from "./utils";
import { CarouselInternalState, CarouselProps } from "./types";
import Dots from "./Dots";
import { LeftArrow, RightArrow } from "./Arrows";
import CarouselItems from "./CarouselItems";

const defaultTransitionDuration = 400;
const defaultTransition = "transform 400ms ease-in-out";
class Carousel extends React.Component<CarouselProps, CarouselInternalState> {
  public static defaultProps = {
    slidesToSlide: 1,
    infinite: false,
    draggable: true,
    swipeable: true,
    arrows: true,
    containerClass: "",
    sliderClass: "",
    itemClass: "",
    keyBoardControl: true,
    autoPlaySpeed: 3000,
    showDots: false,
    minimumTouchDrag: 80,
    dotListClass: "",
    focusOnSelect: false,
    centerMode: false
  };
  private readonly containerRef: React.RefObject<any>;
  public onMove: boolean;
  public initialPosition: number;
  public lastPosition: number;
  public isAnimationAllowed: boolean;
  public direction: string;
  public autoPlay?: any;
  public isInThrottle?: boolean;
  constructor(props: CarouselProps) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      itemWidth: 0,
      slidesToShow: 0,
      currentSlide: 0,
      clones: React.Children.toArray(props.children),
      totalItems: React.Children.count(props.children),
      deviceType: "",
      domLoaded: false,
      transform: 0,
      containerWidth: 0,
      isSliding: false
    };
    this.onResize = this.onResize.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleOut = this.handleOut.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.setIsInThrottle = this.setIsInThrottle.bind(this);
    this.next = throttle(
      this.next.bind(this),
      props.transitionDuration || defaultTransitionDuration,
      this.setIsInThrottle
    );
    this.previous = throttle(
      this.previous.bind(this),
      props.transitionDuration || defaultTransitionDuration,
      this.setIsInThrottle
    );
    this.goToSlide = throttle(
      this.goToSlide.bind(this),
      props.transitionDuration || defaultTransitionDuration,
      this.setIsInThrottle
    );
    this.onMove = false;
    this.initialPosition = 0;
    this.lastPosition = 0;
    this.isAnimationAllowed = false;
    this.direction = "";
    this.isInThrottle = false;
  }
  public setIsInThrottle(isInThrottle: boolean = false): void {
    this.isInThrottle = isInThrottle;
  }
  public componentDidMount(): void {
    this.setState({ domLoaded: true });
    this.setItemsToShow();
    window.addEventListener("resize", this.onResize);
    this.onResize(true);
    if (this.props.keyBoardControl) {
      window.addEventListener("keyup", this.onKeyUp);
    }
    if (this.props.autoPlay && this.props.autoPlaySpeed) {
      this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed);
    }
  }

  /*
  We only want to set the clones on the client-side cause it relies on getting the width of the carousel items.
  */
  public setClones(
    slidesToShow: number,
    itemWidth?: number,
    forResizing?: boolean
  ): void {
    // if forResizing is true, means we are on client-side.
    // if forResizing is false, means we are on server-side.
    // because the first time we set the clones, we change the position of all carousel items when entering client-side from server-side.
    // but still, we want to maintain the same position as it was on the server-side which is translateX(0) by getting the couter part of the original first slide.
    this.isAnimationAllowed = false;
    const childrenArr = React.Children.toArray(this.props.children);
    const { clones, initialSlide } = getClones(
      this.state.slidesToShow,
      childrenArr
    );
    this.setState(
      {
        clones,
        totalItems: clones.length,
        currentSlide: forResizing ? this.state.currentSlide : initialSlide
      },
      () => {
        this.correctItemsPosition(itemWidth || this.state.itemWidth);
      }
    );
  }
  public setItemsToShow(shouldCorrectItemPosition?: boolean): void {
    const { responsive, infinite } = this.props;
    Object.keys(responsive).forEach(item => {
      const { breakpoint, items } = responsive[item];
      const { max, min } = breakpoint;
      if (window.innerWidth >= min && window.innerWidth <= max) {
        this.setState({ slidesToShow: items, deviceType: item });
        this.setContainerAndItemWidth(items, shouldCorrectItemPosition);
      }
    });
  }
  // this is for resizing only or the first time when we entered client-side from server-side.
  public setContainerAndItemWidth(
    slidesToShow: number,
    shouldCorrectItemPosition?: boolean
  ): void {
    if (this.containerRef && this.containerRef.current) {
      const containerWidth = this.containerRef.current.offsetWidth;
      const itemWidth: number = getItemClientSideWidth(
        this.props,
        slidesToShow,
        containerWidth
      );
      this.setState(
        {
          containerWidth,
          itemWidth
        },
        () => {
          if (this.props.infinite) {
            this.setClones(slidesToShow, itemWidth, shouldCorrectItemPosition);
          }
        }
      );
      if (shouldCorrectItemPosition) {
        this.correctItemsPosition(itemWidth);
      }
    }
  }
  public correctItemsPosition(
    itemWidth: number,
    isAnimationAllowed?: boolean
  ): void {
    /*
    For swipe, drag and resizing, they changed the position of the carousel, but the position are not always correct.
    Hence, this is to make sure our items are in the correct place.
    */
    if (isAnimationAllowed) {
      this.isAnimationAllowed = true;
    }
    if (!isAnimationAllowed && this.isAnimationAllowed) {
      this.isAnimationAllowed = false;
    }
    this.setState({
      transform: -(itemWidth * this.state.currentSlide)
    });
  }
  public onResize(value?: any): void {
    // value here can be html event or a boolean.
    // if its in infinite mode, we want to keep the current slide index no matter what.
    // if its not infinite mode, keeping the current slide index has already been taken care of
    const { infinite } = this.props;
    let shouldCorrectItemPosition;
    if (!infinite) {
      shouldCorrectItemPosition = false;
    } else {
      if (typeof value === "boolean" && value) {
        shouldCorrectItemPosition = false;
      } else {
        shouldCorrectItemPosition = true;
      }
    }
    this.setItemsToShow(shouldCorrectItemPosition);
  }
  public componentDidUpdate(
    { keyBoardControl, autoPlay }: CarouselProps,
    { containerWidth, domLoaded, isSliding }: CarouselInternalState
  ): void {
    if (
      this.containerRef &&
      this.containerRef.current &&
      this.containerRef.current.offsetWidth !== containerWidth
    ) {
      // this is for handing resizing only.
      setTimeout(() => {
        this.setItemsToShow(true);
      }, this.props.transitionDuration || defaultTransitionDuration);
    }
    if (keyBoardControl && !this.props.keyBoardControl) {
      window.removeEventListener("keyup", this.onKeyUp);
    }
    if (autoPlay && !this.props.autoPlay && this.autoPlay) {
      clearInterval(this.autoPlay);
      this.autoPlay = undefined;
    }
    if (!autoPlay && this.props.autoPlay && !this.autoPlay) {
      this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed);
    }
    if (this.props.infinite) {
      // this is to quickly cancel the animation and move the items position to create the infinite effects.
      this.correctClonesPosition({ domLoaded, isSliding });
    }
  }
  public correctClonesPosition({
    domLoaded, // this domLoaded comes from previous state, only use to tell if we are on client-side or server-side because this functin relies the dom.
    isSliding
  }: {
    domLoaded?: boolean;
    isSliding?: boolean;
  }): void {
    const childrenArr = React.Children.toArray(this.props.children);
    const {
      isReachingTheEnd,
      isReachingTheStart,
      nextSlide,
      nextPosition
    } = checkClonesPosition(this.state, childrenArr, this.props);
    if (
      // this is to prevent this gets called on the server-side.
      this.state.domLoaded &&
      domLoaded &&
      isSliding &&
      !this.state.isSliding
    ) {
      if (isReachingTheEnd || isReachingTheStart) {
        this.isAnimationAllowed = false;
        setTimeout(() => {
          this.setState({
            transform: nextPosition,
            currentSlide: nextSlide
          });
        }, this.props.transitionDuration || defaultTransitionDuration);
      }
    }
  }
  public next(slidesHavePassed = 0): void {
    const { afterChange, beforeChange } = this.props;
    /*
    two cases:
    1. We are not over-sliding.
    2. We are sliding over to what we have, that means nextslides > this.props.children.length. (does not apply to the inifnite mode)
    */
    const { nextSlides, nextPosition } = populateNextSlides(
      this.state,
      this.props,
      slidesHavePassed
    );
    const previousSlide = this.state.currentSlide;
    if (nextSlides === undefined || nextPosition === undefined) {
      // they can be 0.
      return;
    }
    if (typeof beforeChange === "function") {
      beforeChange(nextSlides, this.getState());
    }
    this.isAnimationAllowed = true;
    this.setState(
      {
        isSliding: true,
        transform: nextPosition,
        currentSlide: nextSlides
      },
      () => {
        this.setState({ isSliding: false });
        if (typeof afterChange === "function") {
          setTimeout(() => {
            afterChange(previousSlide, this.getState());
          }, this.props.transitionDuration || defaultTransitionDuration);
        }
      }
    );
  }
  public previous(slidesHavePassed = 0): void {
    const { afterChange, beforeChange } = this.props;
    const { nextSlides, nextPosition } = populatePreviousSlides(
      this.state,
      this.props,
      slidesHavePassed
    );
    if (nextSlides === undefined || nextPosition === undefined) {
      // they can be 0, which goes back to the first slide.
      return;
    }
    const previousSlide = this.state.currentSlide;
    if (typeof beforeChange === "function") {
      beforeChange(nextSlides, this.getState());
    }
    this.isAnimationAllowed = true;
    this.setState(
      {
        isSliding: true,
        transform: nextPosition,
        currentSlide: nextSlides
      },
      () => {
        this.setState({ isSliding: false });
        if (typeof afterChange === "function") {
          setTimeout(() => {
            afterChange(previousSlide, this.getState());
          }, this.props.transitionDuration || defaultTransitionDuration);
        }
      }
    );
  }
  public componentWillUnmount(): void {
    window.removeEventListener("resize", this.onResize);
    if (this.props.keyBoardControl) {
      window.removeEventListener("keyup", this.onKeyUp);
    }
    if (this.props.autoPlay && this.autoPlay) {
      clearInterval(this.autoPlay);
      this.autoPlay = undefined;
    }
  }
  public resetMoveStatus(): void {
    this.onMove = false;
    this.initialPosition = 0;
    this.lastPosition = 0;
    this.direction = "";
  }
  public handleDown(e: any): void {
    if (
      (e.touches && !this.props.swipeable) ||
      (e && !e.touches && !this.props.draggable) ||
      this.isInThrottle
    ) {
      return;
    }
    const { clientX } = e.touches ? e.touches[0] : e;
    this.onMove = true;
    this.initialPosition = clientX;
    this.lastPosition = clientX;
    this.isAnimationAllowed = false;
  }
  public handleMove(e: any): void {
    if (
      (e.touches && !this.props.swipeable) ||
      (e && !e.touches && !this.props.draggable)
    ) {
      return;
    }
    const { clientX } = e.touches ? e.touches[0] : e;
    if (e.touches && this.autoPlay && this.props.autoPlay) {
      clearInterval(this.autoPlay);
      this.autoPlay = undefined;
    }
    if (this.onMove) {
      const { direction, nextPosition, canContinue } = populateSlidesOnMouseTouchMove(
        this.state,
        this.props,
        this.initialPosition,
        this.lastPosition,
        clientX
      );
      if (direction) {
        this.direction = direction;
        if (canContinue && nextPosition !== undefined) {
          // nextPosition can be 0;
          this.setState({ transform: nextPosition });
        }
      }
      this.lastPosition = clientX;
    }
  }
  public handleOut(e: any): void {
    if (this.props.autoPlay && !this.autoPlay) {
      this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed);
    }
    const shouldDisableOnMobile =
      e.type === "touchend" && !this.props.swipeable;
    const shouldDisableOnDesktop =
      (e.type === "mouseleave" || e.type === "mouseup") &&
      !this.props.draggable;
    if (shouldDisableOnMobile || shouldDisableOnDesktop) {
      return;
    }
    if (this.onMove) {
      if (this.direction === "right") {
        const canGoNext =
          this.initialPosition - this.lastPosition >=
          this.props.minimumTouchDrag!;
        if (canGoNext) {
          const slidesHavePassed = Math.round(
            (this.initialPosition - this.lastPosition) / this.state.itemWidth
          );
          this.next(slidesHavePassed);
        } else {
          this.correctItemsPosition(this.state.itemWidth, true);
        }
      }
      if (this.direction === "left") {
        const canGoNext =
          this.lastPosition - this.initialPosition >
          this.props.minimumTouchDrag!;
        if (canGoNext) {
          const slidesHavePassed = Math.round(
            (this.lastPosition - this.initialPosition) / this.state.itemWidth
          );
          this.previous(slidesHavePassed);
        } else {
          this.correctItemsPosition(this.state.itemWidth, true);
        }
      }
      this.resetMoveStatus();
    }
  }
  public onKeyUp(e: any): void {
    switch (e.keyCode) {
      case 37:
        return this.previous();
      case 39:
        return this.next();
    }
  }
  public handleEnter(): void {
    if (this.autoPlay && this.props.autoPlay) {
      clearInterval(this.autoPlay);
      this.autoPlay = undefined;
    }
  }
  public goToSlide(slide: number): void {
    if (this.isInThrottle) {
      return;
    }
    const { itemWidth } = this.state;
    const { afterChange, beforeChange } = this.props;
    const previousSlide = this.state.currentSlide;
    if (typeof beforeChange === "function") {
      beforeChange(slide, this.getState());
    }
    this.isAnimationAllowed = true;
    this.setState(
      {
        currentSlide: slide,
        transform: -(itemWidth * slide)
      },
      () => {
        if (this.props.infinite) {
          this.correctClonesPosition({ domLoaded: true, isSliding: true });
        }
        if (typeof afterChange === "function") {
          setTimeout(() => {
            afterChange(previousSlide, this.getState());
          }, this.props.transitionDuration || defaultTransitionDuration);
        }
      }
    );
  }
  public getState(): any {
    return {
      ...this.state,
      onMove: this.onMove,
      direction: this.direction
    };
  }
  public renderLeftArrow(): React.ReactNode {
    const { customLeftArrow } = this.props;
    return (
      <LeftArrow
        customLeftArrow={customLeftArrow}
        getState={() => this.getState()}
        previous={this.previous}
      />
    );
  }
  public renderRightArrow(): React.ReactNode {
    const { customRightArrow } = this.props;
    return (
      <RightArrow
        customRightArrow={customRightArrow}
        getState={() => this.getState()}
        next={this.next}
      />
    );
  }
  public renderButtonGroups(): React.ReactElement<any> | null {
    const { customButtonGroup } = this.props;
    if (customButtonGroup) {
      return React.cloneElement(customButtonGroup, {
        previous: () => this.previous(),
        next: () => this.next(),
        goToSlide: (slideIndex: number) => this.goToSlide(slideIndex),
        carouselState: this.getState()
      });
    }
    return null;
  }
  public renderDotsList(): React.ReactElement<any> | null {
    return (
      <Dots
        state={this.state}
        props={this.props}
        goToSlide={this.goToSlide}
        getState={() => this.getState()}
      />
    );
  }
  public renderCarouselItems(): any {
    return (
      <CarouselItems
        goToSlide={this.goToSlide}
        state={this.state}
        props={this.props}
      />
    );
  }

  public render(): React.ReactNode {
    const { slidesToShow } = this.state;
    const {
      deviceType,
      slidesToSlide,
      arrows,
      removeArrowOnDeviceType,
      infinite,
      containerClass,
      sliderClass,
      customTransition,
      partialVisbile,
      centerMode
    } = this.props;
    throwError(this.state, this.props);
    const { shouldRenderOnSSR, paritialVisibilityGutter } = getInitialState(
      this.state,
      this.props
    );
    const isLeftEndReach = !(this.state.currentSlide - slidesToSlide! >= 0);
    const isRightEndReach = !(
      this.state.currentSlide + 1 + slidesToShow <=
      this.state.totalItems
    );
    const shouldShowArrows =
      arrows &&
      !(
        removeArrowOnDeviceType &&
        ((deviceType && removeArrowOnDeviceType.indexOf(deviceType) > -1) ||
          (this.state.deviceType &&
            removeArrowOnDeviceType.indexOf(this.state.deviceType) > -1))
      );
    const disableLeftArrow = !infinite && isLeftEndReach;
    const disableRightArrow = !infinite && isRightEndReach;

    // this lib supports showing next set of items paritially as well as center mode which shows both.
    const currentTransform = partialVisbile
      ? getTransformForPartialVsibile(this.state, paritialVisibilityGutter)
      : centerMode
      ? getTransformForCenterMode(this.state, this.props)
      : this.state.transform;
    return (
      <div
        className={`react-multi-carousel-list ${containerClass}`}
        ref={this.containerRef}
      >
        <ul
          className={`react-multi-carousel-track ${sliderClass}`}
          // @ts-ignore
          style={{
            transition: this.isAnimationAllowed
              ? customTransition || defaultTransition
              : "none",
            overflow: shouldRenderOnSSR ? "hidden" : "unset",
            transform: `translate3d(${currentTransform}px,0,0)`
          }}
          onMouseMove={this.handleMove}
          onMouseDown={this.handleDown}
          onMouseUp={this.handleOut}
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleOut}
          onTouchStart={this.handleDown}
          onTouchMove={this.handleMove}
          onTouchEnd={this.handleOut}
        >
          {this.renderCarouselItems()}
        </ul>
        {shouldShowArrows && !disableLeftArrow && this.renderLeftArrow()}
        {shouldShowArrows && !disableRightArrow && this.renderRightArrow()}
        {this.renderButtonGroups()}
        {this.renderDotsList()}
      </div>
    );
  }
}
export default Carousel;
