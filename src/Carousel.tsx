import * as React from "react";

import {
  throttle,
  getClones,
  checkClonesPosition, // handle when there are clones appear on the screen, only apply to infinite mode.
  getInitialState,
  throwError,
  getItemClientSideWidth,
  populateNextSlides,
  populatePreviousSlides,
  populateSlidesOnMouseTouchMove,
  isInLeftEnd,
  isInRightEnd,
  getInitialSlideInInfiniteMode,
  notEnoughChildren
} from "./utils";
import {
  CarouselInternalState,
  CarouselProps,
  StateCallBack,
  Direction,
  isMouseMoveEvent,
  SkipCallbackOptions
} from "./types";
import Dots from "./Dots";
import { LeftArrow, RightArrow } from "./Arrows";
import CarouselItems from "./CarouselItems";
import { getTransform } from "./utils/common";

const defaultTransitionDuration = 400;
const defaultTransition = "transform 400ms ease-in-out";
class Carousel extends React.Component<CarouselProps, CarouselInternalState> {
  public static defaultProps = {
    slidesToSlide: 1,
    infinite: false,
    draggable: true,
    swipeable: true,
    arrows: true,
    renderArrowsWhenDisabled: false,
    containerClass: "",
    sliderClass: "",
    itemClass: "",
    keyBoardControl: true,
    autoPlaySpeed: 3000,
    showDots: false,
    renderDotsOutside: false,
    renderButtonGroupOutside: false,
    minimumTouchDrag: 80,
    className: "",
    dotListClass: "",
    focusOnSelect: false,
    centerMode: false,
    additionalTransfrom: 0,
    pauseOnHover: true
  };
  private readonly containerRef: React.RefObject<HTMLDivElement>;
  private readonly listRef: React.RefObject<HTMLUListElement>;
  public onMove: boolean;
  public initialX: number;
  public lastX: number;
  public isAnimationAllowed: boolean;
  public direction: Direction;
  public autoPlay?: any;
  public isInThrottle?: boolean;
  public initialY: number;
  private transformPlaceHolder: number;
  private itemsToShowTimeout: any;

  constructor(props: CarouselProps) {
    super(props);
    this.containerRef = React.createRef();
    this.listRef = React.createRef();
    this.state = {
      itemWidth: 0,
      slidesToShow: 0,
      currentSlide: 0,
      totalItems: React.Children.count(props.children),
      deviceType: "",
      domLoaded: false,
      transform: 0,
      containerWidth: 0
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
    this.initialX = 0;
    this.lastX = 0;
    this.isAnimationAllowed = false;
    this.direction = "";
    this.initialY = 0;
    this.isInThrottle = false;
    this.transformPlaceHolder = 0;
  }
  // we only use this when infinite mode is off
  public resetTotalItems(): void {
    const totalItems = React.Children.count(this.props.children);
    const currentSlide = notEnoughChildren(this.state)
      ? 0
      : // this ensures that if the currentSlide before change in childrenCount is more than new childrenCount; we will set it to new childrenCount
        Math.max(0, Math.min(this.state.currentSlide, totalItems));
    this.setState(
      {
        totalItems,
        currentSlide
      },
      () => {
        this.setContainerAndItemWidth(this.state.slidesToShow, true);
      }
    );
  }
  public setIsInThrottle(isInThrottle = false): void {
    this.isInThrottle = isInThrottle;
  }
  public setTransformDirectly(position: number, withAnimation?: boolean) {
    const { additionalTransfrom } = this.props;
    const currentTransform = getTransform(this.state, this.props, position);
    this.transformPlaceHolder = position;
    if (this.listRef && this.listRef.current) {
      this.setAnimationDirectly(withAnimation);
      this.listRef.current.style.transform = `translate3d(${currentTransform +
        additionalTransfrom!}px,0,0)`;
    }
  }
  public setAnimationDirectly(animationAllowed?: boolean) {
    if (this.listRef && this.listRef.current) {
      if (animationAllowed) {
        this.listRef.current.style.transition =
          this.props.customTransition || defaultTransition;
      } else {
        this.listRef.current.style.transition = "none";
      }
    }
  }

  public bindKeyUpEvent() {
    if (this.listRef.current) {
      this.listRef.current.addEventListener("keyup", this.onKeyUp, false);
    }
  }

  public removeKeyUpEvent() {
    if (this.listRef.current) {
      this.listRef.current.removeEventListener("keyup", this.onKeyUp, false);
    }
  }

  public componentDidMount(): void {
    this.setState({ domLoaded: true });
    this.setItemsToShow();
    this.bindKeyUpEvent();
    window.addEventListener("resize", this.onResize as React.EventHandler<any>);
    this.onResize(true);
    if (this.props.autoPlay && this.props.autoPlaySpeed) {
      this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed);
    }
  }

  /**
   * This function disable tabIndex on clone elements children
   * @private
   */
  private disableCloneTabs() {
    if (this.listRef.current) {
      const notTabableItems = this.listRef.current.querySelectorAll(
        'li[tabindex="-1"]'
      );

      notTabableItems.forEach((item: HTMLElement) => {
        const tabableItems = Carousel.getKeyboardFocusableElements(item);
        tabableItems.forEach((element: HTMLElement) => {
          element.setAttribute("tabindex", "-1");
        });
      });
    }
  }

  /*
  We only want to set the clones on the client-side cause it relies on getting the width of the carousel items.
  */
  public setClones(
    slidesToShow: number,
    itemWidth?: number,
    forResizing?: boolean,
    resetCurrentSlide = false
  ): void {
    // if forResizing is true, means we are on client-side.
    // if forResizing is false, means we are on server-side.
    // because the first time we set the clones, we change the position of all carousel items when entering client-side from server-side.
    // but still, we want to maintain the same position as it was on the server-side which is translateX(0) by getting the couter part of the original first slide.
    this.isAnimationAllowed = false;
    const childrenArr = React.Children.toArray(this.props.children);
    const initialSlide = getInitialSlideInInfiniteMode(
      slidesToShow || this.state.slidesToShow,
      childrenArr
    );
    const clones = getClones(this.state.slidesToShow, childrenArr);
    const currentSlide =
      childrenArr.length < this.state.slidesToShow
        ? 0
        : this.state.currentSlide;
    this.setState(
      {
        totalItems: clones.length,
        currentSlide:
          forResizing && !resetCurrentSlide ? currentSlide : initialSlide
      },
      () => {
        this.correctItemsPosition(itemWidth || this.state.itemWidth);
        this.disableCloneTabs();
      }
    );
  }
  public setItemsToShow(
    shouldCorrectItemPosition?: boolean,
    resetCurrentSlide?: boolean
  ): void {
    const { responsive } = this.props;
    Object.keys(responsive).forEach(item => {
      const { breakpoint, items } = responsive[item];
      const { max, min } = breakpoint;
      if (window.innerWidth >= min && window.innerWidth <= max) {
        this.setState({ slidesToShow: items, deviceType: item });
        this.setContainerAndItemWidth(
          items,
          shouldCorrectItemPosition,
          resetCurrentSlide
        );
      }
    });
  }
  // this is for resizing only or the first time when we entered client-side from server-side.
  public setContainerAndItemWidth(
    slidesToShow: number,
    shouldCorrectItemPosition?: boolean,
    resetCurrentSlide?: boolean
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
            this.setClones(
              slidesToShow,
              itemWidth,
              shouldCorrectItemPosition,
              resetCurrentSlide
            );
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
    isAnimationAllowed?: boolean,
    setToDomDirectly?: boolean
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
    const nextTransform =
      this.state.totalItems < this.state.slidesToShow
        ? 0
        : -(itemWidth * this.state.currentSlide);
    if (setToDomDirectly) {
      this.setTransformDirectly(nextTransform, true);
    }
    this.removeKeyUpEvent();
    this.setState(
      {
        transform: nextTransform
      },
      () => {
        this.bindKeyUpEvent();
      }
    );
  }
  public onResize(value?: React.KeyboardEvent | boolean): void {
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
    { keyBoardControl, autoPlay, children }: CarouselProps,
    { containerWidth, domLoaded, currentSlide }: CarouselInternalState
  ): void {
    if (
      this.containerRef &&
      this.containerRef.current &&
      this.containerRef.current.offsetWidth !== containerWidth
    ) {
      // this is for handling resizing only.
      if (this.itemsToShowTimeout) {
        clearTimeout(this.itemsToShowTimeout);
      }
      this.itemsToShowTimeout = setTimeout(() => {
        this.setItemsToShow(true);
      }, this.props.transitionDuration || defaultTransitionDuration);
    }
    if (keyBoardControl && !this.props.keyBoardControl) {
      this.removeKeyUpEvent();
    }
    if (!keyBoardControl && this.props.keyBoardControl) {
      this.bindKeyUpEvent();
    }
    if (autoPlay && !this.props.autoPlay && this.autoPlay) {
      clearInterval(this.autoPlay);
      this.autoPlay = undefined;
    }
    if (!autoPlay && this.props.autoPlay && !this.autoPlay) {
      this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed);
    }
    if (children.length !== this.props.children.length) {
      // this is for handling changing children only.
      setTimeout(() => {
        if (this.props.infinite) {
          this.setClones(
            this.state.slidesToShow,
            this.state.itemWidth,
            true,
            true
          );
        } else {
          this.resetTotalItems();
        }
      }, this.props.transitionDuration || defaultTransitionDuration);
    } else if (
      this.props.infinite &&
      this.state.currentSlide !== currentSlide
    ) {
      // this is to quickly cancel the animation and move the items position to create the infinite effects.
      this.correctClonesPosition({ domLoaded });
    }
    if (this.transformPlaceHolder !== this.state.transform) {
      this.transformPlaceHolder = this.state.transform;
    }
  }
  public correctClonesPosition({
    domLoaded // this domLoaded comes from previous state, only use to tell if we are on client-side or server-side because this functin relies the dom.
  }: {
    domLoaded?: boolean;
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
      domLoaded
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
    if (notEnoughChildren(this.state)) {
      return;
    }
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
        transform: nextPosition,
        currentSlide: nextSlides
      },
      () => {
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
    if (notEnoughChildren(this.state)) {
      return;
    }
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
        transform: nextPosition,
        currentSlide: nextSlides
      },
      () => {
        if (typeof afterChange === "function") {
          setTimeout(() => {
            afterChange(previousSlide, this.getState());
          }, this.props.transitionDuration || defaultTransitionDuration);
        }
      }
    );
  }
  public componentWillUnmount(): void {
    window.removeEventListener("resize", this.onResize as React.EventHandler<
      any
    >);
    if (this.props.keyBoardControl) {
      this.removeKeyUpEvent();
    }
    if (this.props.autoPlay && this.autoPlay) {
      clearInterval(this.autoPlay);
      this.autoPlay = undefined;
    }
    if (this.itemsToShowTimeout) {
      clearTimeout(this.itemsToShowTimeout);
    }
  }
  public resetMoveStatus(): void {
    this.onMove = false;
    this.initialX = 0;
    this.lastX = 0;
    this.direction = "";
    this.initialY = 0;
  }
  public handleDown(e: React.MouseEvent | React.TouchEvent): void {
    if (
      (!isMouseMoveEvent(e) && !this.props.swipeable) ||
      (isMouseMoveEvent(e) && !this.props.draggable) ||
      this.isInThrottle
    ) {
      return;
    }
    const { clientX, clientY } = isMouseMoveEvent(e) ? e : e.touches[0];
    this.onMove = true;
    this.initialX = clientX;
    this.initialY = clientY;
    this.lastX = clientX;
    this.isAnimationAllowed = false;
  }
  public handleMove(e: React.MouseEvent | React.TouchEvent): void {
    if (
      (!isMouseMoveEvent(e) && !this.props.swipeable) ||
      (isMouseMoveEvent(e) && !this.props.draggable) ||
      notEnoughChildren(this.state)
    ) {
      return;
    }
    const { clientX, clientY } = isMouseMoveEvent(e) ? e : e.touches[0];
    const diffX = this.initialX - clientX;
    const diffY = this.initialY - clientY;
    if (
      !isMouseMoveEvent(e) &&
      this.autoPlay &&
      this.props.autoPlay &&
      this.props.pauseOnHover
    ) {
      clearInterval(this.autoPlay);
      this.autoPlay = undefined;
    }
    if (this.onMove) {
      if (!(Math.abs(diffX) > Math.abs(diffY))) {
        // prevent swiping up and down moves the carousel.
        return;
      }
      const {
        direction,
        nextPosition,
        canContinue
      } = populateSlidesOnMouseTouchMove(
        this.state,
        this.props,
        this.initialX,
        this.lastX,
        clientX,
        this.transformPlaceHolder
      );
      if (direction) {
        this.direction = direction;
        if (canContinue && nextPosition !== undefined) {
          // nextPosition can be 0;
          this.setTransformDirectly(nextPosition);
        }
      }
      this.lastX = clientX;
    }
  }
  public handleOut(e: React.MouseEvent | React.TouchEvent): void {
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
      this.setAnimationDirectly(true);
      if (this.direction === "right") {
        const canGoNext =
          this.initialX - this.lastX >= this.props.minimumTouchDrag!;
        if (canGoNext) {
          const slidesHavePassed = Math.round(
            (this.initialX - this.lastX) / this.state.itemWidth
          );
          this.next(slidesHavePassed);
        } else {
          this.correctItemsPosition(this.state.itemWidth, true, true);
        }
      }
      if (this.direction === "left") {
        const canGoNext =
          this.lastX - this.initialX > this.props.minimumTouchDrag!;
        if (canGoNext) {
          const slidesHavePassed = Math.round(
            (this.lastX - this.initialX) / this.state.itemWidth
          );
          this.previous(slidesHavePassed);
        } else {
          this.correctItemsPosition(this.state.itemWidth, true, true);
        }
      }
      this.resetMoveStatus();
    }
  }
  private static getKeyboardFocusableElements(element: HTMLElement) {
    // check if element has any focusable child Element
    const focusableChildren = element.querySelectorAll(
      'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    );
    const elements = [].slice.call(focusableChildren);
    // Add current element if its focusable to list of focusable elements.
    const isFocusableElement = element.matches(
      'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    );
    if (isFocusableElement) {
      elements.push(element);
    }
    return elements.filter((el: HTMLElement) => !el.hasAttribute("disabled"));
  }

  public onKeyUp(e: KeyboardEvent): void {
    switch (e.key) {
      case "ArrowLeft":
        return this.previous();
      case "ArrowRight":
        return this.next();
      case "Tab":
        if (!(e.target instanceof HTMLElement) || !document.activeElement) {
          break;
        }
        const carouselItem = document.activeElement.closest(
          "li.react-multi-carousel-item"
        );
        if (!carouselItem || !(carouselItem instanceof HTMLElement)) {
          break;
        }
        const newCurrentSlide = carouselItem.getAttribute("data-index");
        if (
          newCurrentSlide &&
          this.state.currentSlide != parseInt(newCurrentSlide)
        ) {
          this.goToSlide(parseInt(newCurrentSlide));
        }
    }
  }
  public handleEnter(): void {
    if (this.autoPlay && this.props.autoPlay) {
      clearInterval(this.autoPlay);
      this.autoPlay = undefined;
    }
  }
  public goToSlide(slide: number, skipCallbacks?: SkipCallbackOptions): void {
    if (this.isInThrottle) {
      return;
    }
    const { itemWidth } = this.state;
    const { afterChange, beforeChange } = this.props;
    const previousSlide = this.state.currentSlide;
    if (
      typeof beforeChange === "function" &&
      (!skipCallbacks ||
        (typeof skipCallbacks === "object" && !skipCallbacks.skipBeforeChange))
    ) {
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
          this.correctClonesPosition({ domLoaded: true });
        }
        if (
          typeof afterChange === "function" &&
          (!skipCallbacks ||
            (typeof skipCallbacks === "object" &&
              !skipCallbacks.skipAfterChange))
        ) {
          setTimeout(() => {
            afterChange(previousSlide, this.getState());
          }, this.props.transitionDuration || defaultTransitionDuration);
        }
      }
    );
  }
  public getState(): StateCallBack {
    return this.state;
  }
  public renderLeftArrow(disbaled: boolean): React.ReactNode {
    const { customLeftArrow } = this.props;
    return (
      <LeftArrow
        customLeftArrow={customLeftArrow}
        getState={() => this.getState()}
        previous={this.previous}
        disabled={disbaled}
      />
    );
  }
  public renderRightArrow(disbaled: boolean): React.ReactNode {
    const { customRightArrow } = this.props;
    return (
      <RightArrow
        customRightArrow={customRightArrow}
        getState={() => this.getState()}
        next={this.next}
        disabled={disbaled}
      />
    );
  }
  public renderButtonGroups(): React.ReactElement<any> | null {
    const { customButtonGroup } = this.props;
    if (customButtonGroup) {
      return React.cloneElement(customButtonGroup, {
        previous: () => this.previous(),
        next: () => this.next(),
        goToSlide: (slideIndex: number, skipCallbacks?: SkipCallbackOptions) =>
          this.goToSlide(slideIndex, skipCallbacks),
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
  public renderCarouselItems() {
    let clones = [];
    if (this.props.infinite) {
      const childrenArr = React.Children.toArray(this.props.children);
      clones = getClones(this.state.slidesToShow, childrenArr);
    }
    return (
      <CarouselItems
        clones={clones}
        goToSlide={this.goToSlide}
        state={this.state}
        notEnoughChildren={notEnoughChildren(this.state)}
        props={this.props}
      />
    );
  }

  public render(): React.ReactNode {
    const {
      deviceType,
      arrows,
      renderArrowsWhenDisabled,
      removeArrowOnDeviceType,
      infinite,
      containerClass,
      sliderClass,
      customTransition,
      additionalTransfrom,
      renderDotsOutside,
      renderButtonGroupOutside,
      className
    } = this.props;
    if (process.env.NODE_ENV !== "production") {
      throwError(this.state, this.props);
    }
    const { shouldRenderOnSSR, shouldRenderAtAll } = getInitialState(
      this.state,
      this.props
    );
    const isLeftEndReach = isInLeftEnd(this.state);
    const isRightEndReach = isInRightEnd(this.state);
    const shouldShowArrows =
      arrows &&
      !(
        removeArrowOnDeviceType &&
        ((deviceType && removeArrowOnDeviceType.indexOf(deviceType) > -1) ||
          (this.state.deviceType &&
            removeArrowOnDeviceType.indexOf(this.state.deviceType) > -1))
      ) &&
      !notEnoughChildren(this.state) &&
      shouldRenderAtAll;
    const disableLeftArrow = !infinite && isLeftEndReach;
    const disableRightArrow = !infinite && isRightEndReach;

    // this lib supports showing next set of items partially as well as center mode which shows both.
    const currentTransform = getTransform(this.state, this.props);
    return (
      <>
        <div
          className={`react-multi-carousel-list ${containerClass} ${className}`}
          ref={this.containerRef}
        >
          <ul
            ref={this.listRef}
            className={`react-multi-carousel-track ${sliderClass}`}
            style={{
              // todos.  Remove this from virtual dom.
              transition: this.isAnimationAllowed
                ? customTransition || defaultTransition
                : "none",
              overflow: shouldRenderOnSSR ? "hidden" : "unset",
              transform: `translate3d(${currentTransform +
                additionalTransfrom!}px,0,0)`
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
          {shouldShowArrows &&
            (!disableLeftArrow || renderArrowsWhenDisabled) &&
            this.renderLeftArrow(disableLeftArrow)}
          {shouldShowArrows &&
            (!disableRightArrow || renderArrowsWhenDisabled) &&
            this.renderRightArrow(disableRightArrow)}
          {shouldRenderAtAll &&
            !renderButtonGroupOutside &&
            this.renderButtonGroups()}
          {shouldRenderAtAll && !renderDotsOutside && this.renderDotsList()}
        </div>
        {shouldRenderAtAll && renderDotsOutside && this.renderDotsList()}
        {shouldRenderAtAll &&
          renderButtonGroupOutside &&
          this.renderButtonGroups()}
      </>
    );
  }
}
export default Carousel;
