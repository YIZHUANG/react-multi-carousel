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
const defaultTransition = "transform 300ms ease-in-out";
class Container extends React.Component {
    constructor(props) {
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
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onMove = false;
        this.initialPosition = 0;
        this.lastPosition = 0;
        this.isAnimationAllowed = true;
        this.direction = "";
    }
    componentDidMount() {
        this.setState({ domLoaded: true });
        this.setItemsToShow();
        window.addEventListener("resize", this.onResize);
        this.onResize();
        if (this.props.keyBoardControl) {
            window.addEventListener("keyup", this.onKeyUp);
        }
    }
    setItemsToShow(shouldCorrectItemPosition) {
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
        this.setItemsToShow();
    }
    componentDidUpdate(prevProps, { containerWidth }) {
        if (this.containerRef &&
            this.containerRef.current &&
            this.containerRef.current.offsetWidth !== containerWidth) {
            setTimeout(() => {
                this.setItemsToShow(true);
            }, this.props.transitionDuration || defaultTransitionDuration);
        }
    }
    resetAllItems() {
        this.setState({ transform: 0, currentSlide: 0 });
    }
    next(slidesHavePassed = 0) {
        this.isAnimationAllowed = true;
        const { slidesToShow } = this.state;
        const { slidesToSlide, infinite } = this.props;
        const nextMaximumSlides = this.state.currentSlide + 1 + slidesHavePassed + slidesToShow;
        const nextSlides = this.state.currentSlide + slidesHavePassed + slidesToSlide;
        const nextPosition = -(this.state.itemWidth * nextSlides);
        if (nextMaximumSlides <= this.state.totalItems) {
            this.setState({
                transform: nextPosition,
                currentSlide: nextSlides
            });
        }
        else if (slidesHavePassed > 0 &&
            this.state.currentSlide + 1 + slidesToShow <= this.state.totalItems) {
            // prevent over sliding;
            const maxSlides = this.state.totalItems - slidesToShow;
            const maxPosition = -(this.state.itemWidth * maxSlides);
            this.setState({
                transform: maxPosition,
                currentSlide: maxSlides
            });
        }
        else {
            if (infinite) {
                this.resetAllItems();
            }
        }
    }
    previous(slidesHavePassed = 0) {
        this.isAnimationAllowed = true;
        const { slidesToShow } = this.state;
        const { slidesToSlide, infinite } = this.props;
        const nextMaximumSlides = this.state.currentSlide - slidesHavePassed - slidesToSlide;
        const nextSlides = this.state.currentSlide - slidesHavePassed - slidesToSlide;
        const nextPosition = -(this.state.itemWidth * nextSlides);
        if (nextMaximumSlides >= 0) {
            this.setState({
                transform: nextPosition,
                currentSlide: nextSlides
            });
        }
        else if (slidesHavePassed > 0 &&
            this.state.currentSlide - slidesToSlide >= 0) {
            // prevent oversliding.
            this.setState({
                transform: 0,
                currentSlide: 0
            });
        }
        else {
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
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
        if (this.props.keyBoardControl) {
            window.removeEventListener("keyup", this.onKeyUp);
        }
    }
    resetMoveStatus() {
        this.onMove = false;
        this.initialPosition = 0;
        this.lastPosition = 0;
        this.direction = "";
    }
    handleMouseDown(e) {
        if (this.props.disableDrag) {
            return;
        }
        this.onMove = true;
        this.initialPosition = e.pageX;
        this.lastPosition = e.pageX;
        this.isAnimationAllowed = false;
    }
    handleMouseMove(e) {
        if (this.props.disableDrag) {
            return;
        }
        if (this.onMove) {
            if (this.initialPosition > e.pageX) {
                const translateXLimit = Math.abs(-(this.state.itemWidth *
                    (this.state.totalItems - this.state.slidesToShow)));
                const nextTranslate = this.state.transform - (this.lastPosition - e.pageX);
                const isLastSlide = this.state.currentSlide ===
                    this.state.totalItems - this.state.slidesToShow;
                if (Math.abs(nextTranslate) <= translateXLimit ||
                    (isLastSlide && this.props.infinite)) {
                    this.setState({ transform: nextTranslate });
                }
            }
            if (e.pageX > this.initialPosition) {
                const nextTranslate = this.state.transform + (e.pageX - this.lastPosition);
                const isFirstSlide = this.state.currentSlide === 0;
                if (nextTranslate <= 0 || (isFirstSlide && this.props.infinite)) {
                    this.setState({ transform: nextTranslate });
                }
            }
            this.lastPosition = e.pageX;
        }
    }
    handleMouseUp(e) {
        if (this.props.disableDrag) {
            return;
        }
        if (this.onMove) {
            if (this.initialPosition > e.pageX) {
                const hasTravel = Math.round((this.initialPosition - e.pageX) / this.state.itemWidth) ||
                    1;
                this.next(hasTravel);
            }
            if (e.pageX > this.initialPosition) {
                const hasTravel = Math.round((e.pageX - this.initialPosition) / this.state.itemWidth);
                this.previous(hasTravel);
            }
            this.resetMoveStatus();
        }
    }
    handleTouchStart(e) {
        if (this.props.disableSwipeOnMobile) {
            return;
        }
        this.onMove = true;
        this.initialPosition = e.touches[0].screenX;
        this.lastPosition = e.touches[0].screenX;
        this.isAnimationAllowed = false;
    }
    handleTouchMove(e) {
        if (this.props.disableSwipeOnMobile) {
            return;
        }
        if (this.onMove) {
            if (this.initialPosition > e.touches[0].screenX) {
                this.direction = "right";
                const translateXLimit = Math.abs(-(this.state.itemWidth *
                    (this.state.totalItems - this.state.slidesToShow)));
                const nextTranslate = this.state.transform - (this.lastPosition - e.touches[0].screenX);
                const isLastSlide = this.state.currentSlide ===
                    this.state.totalItems - this.state.slidesToShow;
                if (Math.abs(nextTranslate) <= translateXLimit || isLastSlide) {
                    this.setState({ transform: nextTranslate });
                }
            }
            if (e.touches[0].screenX > this.initialPosition) {
                this.direction = "left";
                const nextTranslate = this.state.transform + (e.touches[0].screenX - this.lastPosition);
                const isFirstSlide = this.state.currentSlide === 0;
                if (nextTranslate <= 0 || isFirstSlide) {
                    this.setState({ transform: nextTranslate });
                }
            }
            this.lastPosition = e.touches[0].screenX;
        }
    }
    handleTouchEnd() {
        if (this.props.disableSwipeOnMobile) {
            return;
        }
        this.isAnimationAllowed = true;
        if (this.onMove) {
            if (this.direction === "right") {
                const hasTravel = Math.round((this.initialPosition - this.lastPosition) / this.state.itemWidth);
                this.next(hasTravel);
            }
            if (this.direction === "left") {
                const hasTravel = Math.round((this.lastPosition - this.initialPosition) / this.state.itemWidth);
                this.previous(hasTravel);
            }
            this.resetMoveStatus();
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case 37:
                return this.previous();
            case 39:
                return this.next();
        }
    }
    renderLeftArrow() {
        const { customLeftArrow } = this.props;
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
    }
    renderRightArrow() {
        const { customRightArrow } = this.props;
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
        return (React.createElement("div", { className: containerClassName, ref: this.containerRef, style: style_1.containerStyle },
            React.createElement("ul", { className: contentClassName, 
                // @ts-ignore
                style: Object.assign({}, style_1.contentStyle, { listStyle: "none", padding: 0, margin: 0, transition: this.isAnimationAllowed
                        ? customTransition || defaultTransition
                        : "none", overflow: shouldRenderOnSSR ? "hidden" : "unset", transform: `translate3d(${this.state.transform}px,0,0)` }), onMouseMove: this.handleMouseMove, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, onMouseLeave: this.handleMouseUp, onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd }, React.Children.toArray(children).map((child, index) => (React.createElement("li", { key: index, style: {
                    flex: shouldRenderOnSSR ? `1 0 ${flexBisis}%` : "auto",
                    width: domFullLoaded ? `${itemWidth}px` : "auto"
                }, className: itemClassName }, child)))),
            shouldShowArrows && !disableLeftArrow && this.renderLeftArrow(),
            shouldShowArrows && !disableRightArrow && this.renderRightArrow()));
    }
}
Container.defaultProps = {
    slidesToSlide: 1,
    infinite: false,
    containerClassName: "",
    contentClassName: "",
    itemClassName: "",
    keyBoardControl: true
};
const Carousel = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return (React.createElement(Container, Object.assign({}, rest), children));
};
exports.default = Carousel;
//# sourceMappingURL=Carousel.js.map