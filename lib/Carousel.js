"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const style_1 = require("./style");
const utils_1 = require("./utils");
const defaultTransitionDuration = 300;
const defaultTransition = "transform 300ms";
class Container extends React.Component {
    constructor(props) {
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
    componentDidMount() {
        this.setState({ domLoaded: true });
        this.correctCurrentState();
        window.addEventListener("resize", this.onResize);
        this.onResize();
    }
    correctCurrentState(shouldCorrectItemPosition) {
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
    setContainerAndItemWidth(slidesToShow, shouldCorrectItemPosition) {
        if (this.containerRef && this.containerRef.current) {
            const containerWidth = this.containerRef.current.offsetWidth;
            const itemWidth = Math.round(this.containerRef.current.offsetWidth / slidesToShow);
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
    onResize() {
        this.correctCurrentState();
    }
    componentDidUpdate(prevProps, { containerWidth }) {
        if (this.containerRef &&
            this.containerRef.current &&
            this.containerRef.current.offsetWidth !== containerWidth) {
            setTimeout(() => {
                this.correctCurrentState(true);
            }, this.props.transitionDuration || defaultTransitionDuration);
        }
    }
    resetAllItems() {
        this.setState({ transform: 0, currentSlide: 0 });
    }
    next() {
        const { slidesToShow } = this.state;
        const { slidesToSlide, infinite } = this.props;
        if (this.state.currentSlide + 1 + slidesToShow <= this.state.totalItems) {
            this.setState({
                transform: -(this.state.itemWidth *
                    (this.state.currentSlide + slidesToSlide)),
                currentSlide: this.state.currentSlide + slidesToSlide
            });
        }
        else {
            if (infinite) {
                this.resetAllItems();
            }
        }
    }
    previous() {
        const { slidesToShow } = this.state;
        const { slidesToSlide, infinite } = this.props;
        if (this.state.currentSlide - slidesToSlide >= 0) {
            this.setState({
                transform: -(this.state.itemWidth *
                    (this.state.currentSlide - slidesToSlide)),
                currentSlide: this.state.currentSlide - slidesToSlide
            });
        }
        else {
            if (infinite) {
                this.setState({
                    transform: -(this.state.itemWidth *
                        (this.state.totalItems - slidesToShow)),
                    currentSlide: this.state.totalItems - slidesToShow
                });
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }
    handleMouseDown(e) {
        if (this.props.disableDrag) {
            return;
        }
        this.setState({
            activeItem: { mousedown: true, initialPosition: e.pageX }
        });
    }
    handleMouseMove(e) {
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
    handleMouseUp(e) {
        if (this.props.disableDrag) {
            return;
        }
        this.setState({ activeItem: {} });
    }
    handleTouchStart(e) {
        if (this.props.disableSwipeOnMobile) {
            return;
        }
        this.setState({
            activeItem: { touchStart: true, initialPosition: e.touches[0].screenX }
        });
    }
    handleTouchMove(e) {
        if (this.props.disableSwipeOnMobile) {
            return;
        }
        const { activeItem } = this.state;
        if (activeItem.touchStart) {
            if (activeItem.initialPosition - e.touches[0].screenX >
                this.state.itemWidth / 4) {
                this.next();
                this.setState({ activeItem: {} });
            }
            if (e.touches[0].screenX - activeItem.initialPosition >
                this.state.itemWidth / 4) {
                this.previous();
                this.setState({ activeItem: {} });
            }
        }
    }
    handleTouchEnd(e) {
        if (this.props.disableSwipeOnMobile) {
            return;
        }
        this.setState({ activeItem: {} });
    }
    render() {
        const { domLoaded, slidesToShow, containerWidth, itemWidth } = this.state;
        const { deviceType, responsive, forSSR, children, slidesToSlide, customLeftArrow, customRightArrow, disableSwipeOnMobile, removeArrow, removeArrowOnDeviceType, infinite, containerClassName, contentClassName, itemClassName, customTransition } = this.props;
        let flexBisis;
        const domFullLoaded = domLoaded && slidesToShow && containerWidth && itemWidth;
        if (forSSR && deviceType && !domFullLoaded) {
            flexBisis = utils_1.guessWidthFromDeviceType(deviceType, responsive);
        }
        const shouldRenderOnSSR = forSSR && deviceType && !domFullLoaded && flexBisis;
        const isLeftEndReach = !(this.state.currentSlide - slidesToSlide >= 0);
        const isRightEndReach = !(this.state.currentSlide + 1 + slidesToShow <=
            this.state.totalItems);
        const shouldShowArrows = !removeArrow &&
            !(removeArrowOnDeviceType &&
                ((deviceType && removeArrowOnDeviceType.indexOf(deviceType) > -1) ||
                    (this.state.deviceType &&
                        removeArrowOnDeviceType.indexOf(this.state.deviceType) > -1)));
        const disableLeftArrow = !infinite && isLeftEndReach;
        const disableRightArrow = !infinite && isRightEndReach;
        const LeftArrow = () => {
            if (customLeftArrow) {
                return React.cloneElement(customLeftArrow, {
                    onClick: () => this.previous()
                });
            }
            else {
                return (React.createElement("i", { 
                    // @ts-ignore
                    style: style_1.leftArrowStyle, onClick: () => this.previous() }));
            }
        };
        const RightArrow = () => {
            if (customRightArrow) {
                return React.cloneElement(customRightArrow, {
                    onClick: () => this.next()
                });
            }
            else {
                return (React.createElement("i", { 
                    // @ts-ignore
                    style: style_1.rightArrowStyle, onClick: () => this.next() }));
            }
        };
        return (React.createElement("div", { className: containerClassName, ref: this.containerRef, style: style_1.containerStyle },
            React.createElement("div", { className: contentClassName, 
                // @ts-ignore
                style: Object.assign({}, style_1.contentStyle, { transition: customTransition || defaultTransition, overflow: shouldRenderOnSSR ? "hidden" : "unset", transform: `translate3d(${this.state.transform}px,0,0)` }) }, React.Children.toArray(children).map((child, index) => (React.createElement("div", { key: index, onMouseMove: this.handleMouseMove, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd, style: {
                    flex: shouldRenderOnSSR ? `1 0 ${flexBisis}%` : "auto",
                    width: domFullLoaded ? `${itemWidth}px` : "auto"
                }, className: itemClassName }, child)))),
            shouldShowArrows && !disableLeftArrow && React.createElement(LeftArrow, null),
            shouldShowArrows && !disableRightArrow && React.createElement(RightArrow, null)));
    }
}
Container.defaultProps = {
    slidesToSlide: 1,
    infinite: false,
    containerClassName: "",
    contentClassName: "",
    itemClassName: ""
};
const Carousel = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return (React.createElement(Container, Object.assign({}, rest), children));
};
exports.default = Carousel;
//# sourceMappingURL=Carousel.js.map