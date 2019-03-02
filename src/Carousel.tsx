import * as React from "react";

import {
  containerStyle,
  contentStyle,
  rightArrowStyle,
  leftArrowStyle
} from "./style";
import { guessWidthFromDeviceType } from "./utils";
import { CarouselInternalState, CarouselProps } from "./types";

class Container extends React.Component<CarouselProps, CarouselInternalState> {
  public static defaultProps: any = {
    slidesToSlide: 1,
    infinite: false,
    containerClassName: "",
    contentClassName: "",
    itemClassName: ""
  };
  private readonly itemRef: React.RefObject<any>;
  constructor(props: CarouselProps) {
    super(props);
    this.itemRef = React.createRef();
    this.state = {
      itemWidth: 0,
      slidesToShow: 0,
      currentSlide: 0,
      totalItems: React.Children.count(props.children),
      activeItem: {},
      deviceType: "",
      domLoaded: false
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
    const { disableSwipeOnMobile, disableDrag } = this.props;
    this.setState({ domLoaded: true });
    if (this.itemRef && this.itemRef.current) {
      this.setState({ itemWidth: this.itemRef.current.offsetWidth });
    }
    window.addEventListener("resize", this.onResize);
    const allItems = [
      ...(document.getElementsByClassName("carousel__item") as any)
    ];
    allItems.forEach(item => {
      if (!disableDrag) {
        item.addEventListener("mousedown", this.handleMouseDown);
        item.addEventListener("mousemove", this.handleMouseMove);
        item.addEventListener("mouseup", this.handleMouseUp);
      }
      if (!disableSwipeOnMobile) {
        item.addEventListener("touchstart", this.handleTouchStart);
        item.addEventListener("touchmove", this.handleTouchMove);
        item.addEventListener("touchend", this.handleTouchEnd);
      }
    });
    this.onResize();
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
    const allItems = [
      ...(document.getElementsByClassName("carousel__item") as any)
    ];
    const { activeItem } = this.state;
    if (activeItem.mousedown) {
      if (activeItem.initialPosition - e.pageX > this.state.itemWidth / 3) {
        this.previous();
        this.setState({ activeItem: {} });
      }
      if (e.pageX - activeItem.initialPosition > this.state.itemWidth / 3) {
        this.next();
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
  public componentWillUnmount(): void {
    const { disableSwipeOnMobile, disableDrag } = this.props;
    const allItems = [
      ...(document.getElementsByClassName("carousel__item") as any)
    ];
    allItems.forEach(item => {
      if (!disableDrag) {
        item.removeEventListener("mousedown", this.handleMouseDown);
        item.removeEventListener("mousemove", this.handleMouseMove);
        item.removeEventListener("mouseup", this.handleMouseUp);
      }
      if (!disableSwipeOnMobile) {
        item.removeEventListener("touchstart", this.handleTouchStart);
        item.removeEventListener("touchmove", this.handleTouchMove);
        item.removeEventListener("touchend", this.handleTouchEnd);
      }
    });
    window.removeEventListener("resize", this.onResize);
  }
  public onResize(): void {
    const { itemWidth } = this.state;
    this.setItemsToSlide();
    if (
      this.itemRef &&
      this.itemRef.current &&
      this.itemRef.current.offsetWidth !== itemWidth
    ) {
      this.setState({ itemWidth: this.itemRef.current.offsetWidth });
    }
  }
  public resetAllItems(): void {
    const allItems = [
      ...(document.getElementsByClassName("carousel__item") as any)
    ];
    allItems.forEach(item => {
      const left = item.offsetLeft;
      item.style.transform = `translate3d(0px,0,0)`;
    });
    this.setState({
      currentSlide: 0
    });
  }
  public componentDidUpdate(
    prevProps: CarouselProps,
    { domLoaded, itemWidth }: CarouselInternalState
  ): void {
    if (!domLoaded && this.state.domLoaded) {
      this.setItemsToSlide();
    }
    if (this.itemRef.current.offsetWidth !== itemWidth) {
      this.setState({ itemWidth: this.itemRef.current.offsetWidth });
    }
  }
  public setItemsToSlide() {
    const { responsive } = this.props;
    Object.keys(responsive).forEach(item => {
      const { breakpoint, items } = responsive[item];
      const { max, min } = breakpoint;
      if (window.innerWidth >= min && window.innerWidth <= max) {
        this.setState({ slidesToShow: items, deviceType: item });
      }
    });
  }
  public next(): void {
    const { slidesToShow } = this.state;
    const { slidesToSlide } = this.props;
    const allItems = [
      ...(document.getElementsByClassName("carousel__item") as any)
    ];
    if (this.state.currentSlide + 1 + slidesToShow <= this.state.totalItems) {
      allItems.forEach(item => {
        item.style.transform = `translate3d(${-(
          this.state.itemWidth *
          (this.state.currentSlide + slidesToSlide)
        )}px,0,0)`;
      });
      this.setState({
        currentSlide: this.state.currentSlide + slidesToSlide
      });
    } else {
      this.resetAllItems();
    }
  }
  public previous(): void {
    const { slidesToShow } = this.state;
    const { slidesToSlide } = this.props;
    const allItems = [
      ...(document.getElementsByClassName("carousel__item") as any)
    ];
    if (this.state.currentSlide - slidesToSlide >= 0) {
      allItems.forEach(item => {
        item.style.transform = `translate3d(-${this.state.itemWidth *
          (this.state.currentSlide - slidesToSlide)}px,0,0)`;
      });
      this.setState({
        currentSlide: this.state.currentSlide - slidesToSlide
      });
    } else {
      allItems.forEach(item => {
        item.style.transform = `translate3d(-${this.state.itemWidth *
          (this.state.totalItems - slidesToShow)}px,0,0)`;
      });
      this.setState({
        currentSlide: this.state.totalItems - slidesToShow
      });
    }
  }
  public render(): any {
    const { domLoaded, slidesToShow } = this.state;
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
      transition
    } = this.props;
    let itemWidth: number | string | undefined;
    if (forSSR && deviceType && !domLoaded && !slidesToShow) {
      itemWidth = guessWidthFromDeviceType(deviceType, responsive);
    } else {
      if (slidesToShow) {
        itemWidth = (100 / slidesToShow).toFixed(1);
      } else {
        itemWidth = 0;
      }
    }
    const isLeftEndReach = !(this.state.currentSlide - slidesToSlide >= 0);
    const isRightEndReach = !(
      this.state.currentSlide + 1 + slidesToShow <=
      this.state.totalItems
    );
    const shouldShowArrows =
      !removeArrow &&
      !(
        removeArrowOnDeviceType &&
        (deviceType && removeArrowOnDeviceType.indexOf(deviceType) > -1 ||
          (this.state.deviceType &&
            removeArrowOnDeviceType.indexOf(this.state.deviceType) > -1))
      );
    const disableLeftArrow = !infinite && isLeftEndReach;
    const disableRightArrow = !infinite && isRightEndReach;
    const LeftArrow = () => {
      if (customLeftArrow) {
        return React.cloneElement(customLeftArrow, {
          onClick: disableLeftArrow ? () => {} : () => this.previous()
        });
      } else {
        return (
          <i
            style={leftArrowStyle}
            onClick={disableLeftArrow ? () => {} : () => this.previous()}
          />
        );
      }
    };
    const RightArrow = () => {
      if (customRightArrow) {
        return React.cloneElement(customRightArrow, {
          onClick: disableRightArrow ? () => {} : () => this.next()
        });
      } else {
        return (
          <i
            style={rightArrowStyle}
            onClick={disableRightArrow ? () => {} : () => this.next()}
          />
        );
      }
    };
    return (
      <div className={containerClassName} style={containerStyle}>
        {shouldShowArrows && <LeftArrow />}
        {/*
  // @ts-ignore */}
        <div className={contentClassName} style={contentStyle}>
          {React.Children.toArray(children).map((child, index) => (
            <div
              key={index}
              ref={this.itemRef}
              style={{
                transition: transition || "all 0.2s",
                flex: `1 0 ${itemWidth}%`
              }}
              className={`carousel__item ${itemClassName}`}
            >
              {child}
            </div>
          ))}
        </div>
        {shouldShowArrows && <RightArrow />}
      </div>
    );
  }
}
const Carousel = ({ children, ...rest }: CarouselProps): React.ReactNode => (
  <Container {...rest}>{children}</Container>
);

export default Carousel;
