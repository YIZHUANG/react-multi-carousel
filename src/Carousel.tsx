import * as React from "react";

import {
  containerStyle,
  contentStyle,
  rightArrowStyle,
  leftArrowStyle
} from "./style";
import { guessWidthFromDeviceType } from "./utils";
import { CarouselInternalState, CarouselProps } from "./types";

const defaultTransitionDuration = 300;
const defaultTransition = "transform 300ms";
class Container extends React.Component<CarouselProps, CarouselInternalState> {
  public static defaultProps: any = {
    slidesToSlide: 1,
    infinite: false,
    containerClassName: "",
    contentClassName: "",
    itemClassName: ""
  };
  private readonly containerRef: React.RefObject<any>;
  constructor(props: CarouselProps) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      itemWidth: 0,
      slidesToShow: 0,
      currentSlide: 0,
      totalItems: React.Children.count(props.children),
      activeItem: {},
      deviceType: "",
      domLoaded: false,
      transform: 0,
      containerWidth: 0
    };
    this.onResize = this.onResize.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }
  public componentDidMount(): void {
    this.setState({ domLoaded: true });
    this.setItemsToShow();
    window.addEventListener("resize", this.onResize);
    this.onResize();
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
        this.setState({
          transform: -(itemWidth * this.state.currentSlide)
        });
      }
    }
  }
  public onResize(): void {
    this.setItemsToShow();
  }
  public componentDidUpdate(
    prevProps: CarouselProps,
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
  }

  public resetAllItems(): void {
    this.setState({ transform: 0, currentSlide: 0 });
  }

  public next(): void {
    const { slidesToShow } = this.state;
    const { slidesToSlide, infinite } = this.props;
    if (this.state.currentSlide + 1 + slidesToShow <= this.state.totalItems) {
      this.setState({
        transform: -(
          this.state.itemWidth *
          (this.state.currentSlide + slidesToSlide)
        ),
        currentSlide: this.state.currentSlide + slidesToSlide
      });
    } else {
      if (infinite) {
        this.resetAllItems();
      }
    }
  }
  public previous(): void {
    const { slidesToShow } = this.state;
    const { slidesToSlide, infinite } = this.props;
    if (this.state.currentSlide - slidesToSlide >= 0) {
      this.setState({
        transform: -(
          this.state.itemWidth *
          (this.state.currentSlide - slidesToSlide)
        ),
        currentSlide: this.state.currentSlide - slidesToSlide
      });
    } else {
      if (infinite) {
        this.setState({
          transform: -(
            this.state.itemWidth *
            (this.state.totalItems - slidesToShow)
          ),
          currentSlide: this.state.totalItems - slidesToShow
        });
      }
    }
  }

  public componentWillUnmount(): void {
    window.removeEventListener("resize", this.onResize);
  }

  public handleMouseDown(e: any): void {
    if (this.props.disableDrag) {
      return;
    }
    this.setState({
      activeItem: { mousedown: true, initialPosition: e.pageX }
    });
  }
  public handleMouseMove(e: any): void {
    if (this.props.disableDrag) {
      return;
    }
    const { activeItem } = this.state;
    if (activeItem.mousedown) {
      if (activeItem.initialPosition - e.pageX > this.state.itemWidth / 2) {
        this.next();
        this.setState({ activeItem: {} });
      }
      if (e.pageX - activeItem.initialPosition > this.state.itemWidth / 2) {
        this.previous();
        this.setState({ activeItem: {} });
      }
    }
  }
  public handleMouseUp(e: any): void {
    if (this.props.disableDrag) {
      return;
    }
    this.setState({ activeItem: {} });
  }
  public handleTouchStart(e: any): void {
    if (this.props.disableSwipeOnMobile) {
      return;
    }
    this.setState({
      activeItem: { touchStart: true, initialPosition: e.touches[0].screenX }
    });
  }
  public handleTouchMove(e: any): void {
    if (this.props.disableSwipeOnMobile) {
      return;
    }
    const { activeItem } = this.state;
    if (activeItem.touchStart) {
      if (
        activeItem.initialPosition - e.touches[0].screenX >
        this.state.itemWidth / 4
      ) {
        this.next();
        this.setState({ activeItem: {} });
      }
      if (
        e.touches[0].screenX - activeItem.initialPosition >
        this.state.itemWidth / 4
      ) {
        this.previous();
        this.setState({ activeItem: {} });
      }
    }
  }
  public handleTouchEnd(e: any): void {
    if (this.props.disableSwipeOnMobile) {
      return;
    }
    this.setState({ activeItem: {} });
  }

  public render(): any {
    const { domLoaded, slidesToShow, containerWidth, itemWidth } = this.state;
    const {
      deviceType,
      responsive,
      forSSR,
      children,
      slidesToSlide,
      customLeftArrow,
      customRightArrow,
      disableSwipeOnMobile,
      removeArrow,
      removeArrowOnDeviceType,
      infinite,
      containerClassName,
      contentClassName,
      itemClassName,
      customTransition
    } = this.props;
    let flexBisis: number | string | undefined;
    const domFullLoaded =
      domLoaded && slidesToShow && containerWidth && itemWidth;
    if (forSSR && deviceType && !domFullLoaded) {
      flexBisis = guessWidthFromDeviceType(deviceType, responsive);
    }
    const shouldRenderOnSSR =
      forSSR && deviceType && !domFullLoaded && flexBisis;
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
    const LeftArrow = () => {
      if (customLeftArrow) {
        return React.cloneElement(customLeftArrow, {
          onClick: () => this.previous()
        });
      } else {
        return (
          <i
            // @ts-ignore
            style={leftArrowStyle}
            onClick={() => this.previous()}
          />
        );
      }
    };
    const RightArrow = () => {
      if (customRightArrow) {
        return React.cloneElement(customRightArrow, {
          onClick: () => this.next()
        });
      } else {
        return (
          <i
            // @ts-ignore
            style={rightArrowStyle}
            onClick={() => this.next()}
          />
        );
      }
    };
    return (
      <div
        className={containerClassName}
        ref={this.containerRef}
        style={containerStyle}
      >
        <ul
          className={contentClassName}
          // @ts-ignore
          style={{
            ...contentStyle,
            listStyle: "none",
            padding: 0,
            margin: 0,
            transition: customTransition || defaultTransition,
            overflow: shouldRenderOnSSR ? "hidden" : "unset",
            transform: `translate3d(${this.state.transform}px,0,0)`
          }}
        >
          {React.Children.toArray(children).map((child, index) => (
            <li
              key={index}
              onMouseMove={this.handleMouseMove}
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleTouchEnd}
              style={{
                flex: shouldRenderOnSSR ? `1 0 ${flexBisis}%` : "auto",
                width: domFullLoaded ? `${itemWidth}px` : "auto"
              }}
              className={itemClassName}
            >
              {child}
            </li>
          ))}
        </ul>
        {shouldShowArrows && !disableLeftArrow && <LeftArrow />}
        {shouldShowArrows && !disableRightArrow && <RightArrow />}
      </div>
    );
  }
}
const Carousel = ({ children, ...rest }: CarouselProps): React.ReactNode => (
  <Container {...rest}>{children}</Container>
);

export default Carousel;
