import * as React from "react";

import { guessWidthFromDeviceType } from "./utils";
import { CarouselInternalState, CarouselProps } from "./types";

const defaultTransitionDuration = 300;
const defaultTransition = "transform 300ms ease-in-out";
class Carousel extends React.Component<CarouselProps, CarouselInternalState> {
  public static defaultProps: any = {
    slidesToSlide: 1,
    infinite: false,
    containerClassName: "",
    contentClassName: "",
    itemClassName: "",
    keyBoardControl: true,
    autoPlaySpeed: 3000,
    shouldShowDots: false,
    minimumTouchDrag: 50
  };
  private readonly containerRef: React.RefObject<any>;
  public onMove: boolean;
  public initialPosition: number;
  public lastPosition: number;
  public isAnimationAllowed: boolean;
  public direction: string;
  public autoPlay?: any;
  constructor(props: CarouselProps) {
    super(props);
    this.containerRef = React.createRef();
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
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onMove = false;
    this.initialPosition = 0;
    this.lastPosition = 0;
    this.isAnimationAllowed = true;
    this.direction = "";
  }
  public componentDidMount(): void {
    this.setState({ domLoaded: true });
    this.setItemsToShow();
    window.addEventListener("resize", this.onResize);
    this.onResize();
    if (this.props.keyBoardControl) {
      window.addEventListener("keyup", this.onKeyUp);
    }
    if (this.props.autoPlay && this.props.autoPlaySpeed) {
      this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed);
    }
  }
  public setItemsToShow(shouldCorrectItemPosition?: boolean): void {
    const { responsive } = this.props;
    Object.keys(responsive).forEach(item => {
      const { breakpoint, items } = responsive[item];
      const { max, min } = breakpoint;
      if (window.innerWidth >= min && window.innerWidth <= max) {
        this.setState({ slidesToShow: items, deviceType: item });
        this.setContainerAndItemWidth(items, shouldCorrectItemPosition);
      }
    });
  }
  public setContainerAndItemWidth(
    slidesToShow: number,
    shouldCorrectItemPosition?: boolean
  ): void {
    if (this.containerRef && this.containerRef.current) {
      const containerWidth = this.containerRef.current.offsetWidth;
      const itemWidth: number = Math.round(
        this.containerRef.current.offsetWidth / slidesToShow
      );
      this.setState({
        containerWidth,
        itemWidth
      });
      if (shouldCorrectItemPosition) {
        this.correctItemsPosition(itemWidth);
      }
    }
  }
  public correctItemsPosition(itemWidth: number): void {
    if (!this.isAnimationAllowed) {
      this.isAnimationAllowed = true;
    }
    this.setState({
      transform: -(itemWidth * this.state.currentSlide)
    });
  }
  public onResize(): void {
    this.setItemsToShow();
  }
  public componentDidUpdate(
    { keyBoardControl, autoPlay }: CarouselProps,
    { containerWidth }: CarouselInternalState
  ): void {
    if (
      this.containerRef &&
      this.containerRef.current &&
      this.containerRef.current.offsetWidth !== containerWidth
    ) {
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
  }
  public resetAllItems(): void {
    this.setState({ transform: 0, currentSlide: 0 });
  }
  public next(slidesHavePassed = 0): void {
    this.isAnimationAllowed = true;
    const { slidesToShow } = this.state;
    const { slidesToSlide, infinite } = this.props;
    const nextMaximumSlides =
      this.state.currentSlide +
      1 +
      slidesHavePassed +
      slidesToShow +
      slidesToSlide;
    const nextSlides =
      this.state.currentSlide + slidesHavePassed + slidesToSlide;
    const nextPosition = -(this.state.itemWidth * nextSlides);
    if (nextMaximumSlides <= this.state.totalItems) {
      this.setState({
        transform: nextPosition,
        currentSlide: nextSlides
      });
    } else if (
      nextMaximumSlides > this.state.totalItems &&
      this.state.currentSlide !== this.state.totalItems - slidesToShow
    ) {
      // prevent oversliding;
      const maxSlides = this.state.totalItems - slidesToShow;
      const maxPosition = -(this.state.itemWidth * maxSlides);
      this.setState({
        transform: maxPosition,
        currentSlide: maxSlides
      });
    } else {
      if (infinite) {
        this.resetAllItems();
      }
    }
  }
  public previous(slidesHavePassed = 0): void {
    this.isAnimationAllowed = true;
    const { slidesToShow } = this.state;
    const { slidesToSlide, infinite } = this.props;
    const nextSlides =
      this.state.currentSlide - slidesHavePassed - slidesToSlide;
    const nextPosition = -(this.state.itemWidth * nextSlides);
    if (nextSlides >= 0) {
      this.setState({
        transform: nextPosition,
        currentSlide: nextSlides
      });
    } else if (nextSlides < 0 && this.state.currentSlide !== 0) {
      // prevent oversliding.
      this.setState({
        transform: 0,
        currentSlide: 0
      });
    } else {
      const maxSlides = this.state.totalItems - slidesToShow;
      const maxPosition = -(this.state.itemWidth * maxSlides);
      if (infinite) {
        this.setState({
          transform: maxPosition,
          currentSlide: maxSlides
        });
      }
    }
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
      (e.touches && this.props.disableSwipeOnMobile) ||
      (e && !e.touches && this.props.disableDrag)
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
      (e.touches && this.props.disableSwipeOnMobile) ||
      (e && !e.touches && this.props.disableDrag)
    ) {
      return;
    }
    const { clientX } = e.touches ? e.touches[0] : e;
    if (e.touches && this.autoPlay && this.props.autoPlay) {
      clearInterval(this.autoPlay);
      this.autoPlay = undefined;
    }
    if (this.onMove) {
      if (this.initialPosition > clientX) {
        this.direction = "right";
        const translateXLimit = Math.abs(
          -(
            this.state.itemWidth *
            (this.state.totalItems - this.state.slidesToShow)
          )
        );
        const nextTranslate =
          this.state.transform - (this.lastPosition - clientX);
        const isLastSlide =
          this.state.currentSlide ===
          this.state.totalItems - this.state.slidesToShow;
        if (
          Math.abs(nextTranslate) <= translateXLimit ||
          (isLastSlide && this.props.infinite)
        ) {
          this.setState({ transform: nextTranslate });
        }
      }
      if (clientX > this.initialPosition) {
        this.direction = "left";
        const nextTranslate =
          this.state.transform + (clientX - this.lastPosition);
        const isFirstSlide = this.state.currentSlide === 0;
        if (nextTranslate <= 0 || (isFirstSlide && this.props.infinite)) {
          this.setState({ transform: nextTranslate });
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
      e.type === "touchend" && this.props.disableSwipeOnMobile;
    const shouldDisableOnDesktop =
      (e.type === "mouseleave" || e.type === "mouseup") &&
      this.props.disableDrag;
    if (shouldDisableOnMobile || shouldDisableOnDesktop) {
      return;
    }
    if (this.onMove) {
      if (this.direction === "right") {
        const slidesHavePassed = Math.round(
          (this.initialPosition - this.lastPosition) / this.state.itemWidth
        );
        if (
          this.initialPosition - this.lastPosition >=
          this.props.minimumTouchDrag
        ) {
          this.next(slidesHavePassed);
        } else {
          this.correctItemsPosition(this.state.itemWidth);
        }
      }
      if (this.direction === "left") {
        const slidesHavePassed = Math.round(
          (this.lastPosition - this.initialPosition) / this.state.itemWidth
        );
        if (
          this.lastPosition - this.initialPosition >
          this.props.minimumTouchDrag
        ) {
          this.previous(slidesHavePassed);
        } else {
          this.correctItemsPosition(this.state.itemWidth);
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
    const { itemWidth } = this.state;
    this.setState({
      currentSlide: slide,
      transform: -(itemWidth * slide)
    });
  }
  public getState(): any {
    return {
      ...this.state,
      onMove: this.onMove,
      direction: this.direction
    };
  }
  public renderLeftArrow(): React.ReactElement<any> {
    const { customLeftArrow } = this.props;
    if (customLeftArrow) {
      return React.cloneElement(customLeftArrow, {
        onClick: () => this.previous(),
        state: this.getState()
      });
    } else {
      return (
        <button
          className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
          onClick={() => this.previous()}
        />
      );
    }
  }
  public renderRightArrow(): React.ReactElement<any> {
    const { customRightArrow } = this.props;
    if (customRightArrow) {
      return React.cloneElement(customRightArrow, {
        onClick: () => this.next(),
        state: this.getState()
      });
    } else {
      return (
        <button
          className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
          onClick={() => this.next()}
        />
      );
    }
  }

  public renderDotsList() {
    const { customDot } = this.props;
    return (
      <ul className="react-multi-carousel-dot-list">
        {Array(this.state.totalItems)
          .fill(0)
          .map((item, index) => {
            if (customDot) {
              return React.cloneElement(customDot, {
                index,
                onClick: () => this.goToSlide(index),
                state: this.getState()
              });
            }
            return (
              <li
                key={index}
                className={`react-multi-carousel-dot ${
                  this.state.currentSlide === index
                    ? "react-multi-carousel-dot--active"
                    : ""
                }`}
              >
                <button onClick={() => this.goToSlide(index)} />
              </li>
            );
          })}
      </ul>
    );
  }

  public render(): React.ReactNode {
    const { domLoaded, slidesToShow, containerWidth, itemWidth } = this.state;
    const {
      deviceType,
      responsive,
      forSSR,
      children,
      slidesToSlide,
      removeArrow,
      removeArrowOnDeviceType,
      infinite,
      containerClassName,
      contentClassName,
      itemClassName,
      customTransition
    } = this.props;
    let flexBisis: number | string | undefined;
    const domFullyLoaded =
      domLoaded && slidesToShow && containerWidth && itemWidth;
    if (forSSR && deviceType && !domFullyLoaded) {
      flexBisis = guessWidthFromDeviceType(deviceType, responsive);
    }
    const shouldRenderOnSSR =
      forSSR && deviceType && !domFullyLoaded && flexBisis;
    const isLeftEndReach = !(this.state.currentSlide - slidesToSlide >= 0);
    const isRightEndReach = !(
      this.state.currentSlide + 1 + slidesToShow <=
      this.state.totalItems
    );
    const shouldShowArrows =
      !removeArrow &&
      !(
        removeArrowOnDeviceType &&
        ((deviceType && removeArrowOnDeviceType.indexOf(deviceType) > -1) ||
          (this.state.deviceType &&
            removeArrowOnDeviceType.indexOf(this.state.deviceType) > -1))
      );
    const disableLeftArrow = !infinite && isLeftEndReach;
    const disableRightArrow = !infinite && isRightEndReach;
    return (
      <div
        className={`react-multi-carousel-list ${containerClassName}`}
        ref={this.containerRef}
      >
        <ul
          className={`react-multi-carousel-track ${contentClassName}`}
          // @ts-ignore
          style={{
            transition: this.isAnimationAllowed
              ? customTransition || defaultTransition
              : "none",
            overflow: shouldRenderOnSSR ? "hidden" : "unset",
            transform: `translate3d(${this.state.transform}px,0,0)`
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
          {React.Children.toArray(children).map((child, index) => (
            <li
              key={index}
              style={{
                flex: shouldRenderOnSSR ? `1 0 ${flexBisis}%` : "auto",
                width: domFullyLoaded ? `${itemWidth}px` : "auto"
              }}
              className={itemClassName}
            >
              {React.cloneElement(child, {
                index,
                isvisible:
                  index >= this.state.currentSlide &&
                  index < this.state.currentSlide + this.state.slidesToShow,
                state: this.getState()
              })}
            </li>
          ))}
        </ul>
        {shouldShowArrows && !disableLeftArrow && this.renderLeftArrow()}
        {shouldShowArrows && !disableRightArrow && this.renderRightArrow()}
        {this.props.shouldShowDots && this.renderDotsList()}
      </div>
    );
  }
}
export default Carousel;
