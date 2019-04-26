"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("./utils");
var Dots_1 = require("./Dots");
var Arrows_1 = require("./Arrows");
var CarouselItems_1 = require("./CarouselItems");
var defaultTransitionDuration = 400;
var defaultTransition = "transform 400ms ease-in-out";
var Carousel = /** @class */ (function (_super) {
    __extends(Carousel, _super);
    function Carousel(props) {
        var _this = _super.call(this, props) || this;
        _this.containerRef = React.createRef();
        _this.state = {
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
        _this.onResize = _this.onResize.bind(_this);
        _this.handleDown = _this.handleDown.bind(_this);
        _this.handleMove = _this.handleMove.bind(_this);
        _this.handleOut = _this.handleOut.bind(_this);
        _this.onKeyUp = _this.onKeyUp.bind(_this);
        _this.handleEnter = _this.handleEnter.bind(_this);
        _this.setIsInThrottle = _this.setIsInThrottle.bind(_this);
        _this.next = utils_1.throttle(_this.next.bind(_this), props.transitionDuration || defaultTransitionDuration, _this.setIsInThrottle);
        _this.previous = utils_1.throttle(_this.previous.bind(_this), props.transitionDuration || defaultTransitionDuration, _this.setIsInThrottle);
        _this.goToSlide = utils_1.throttle(_this.goToSlide.bind(_this), props.transitionDuration || defaultTransitionDuration, _this.setIsInThrottle);
        _this.onMove = false;
        _this.initialPosition = 0;
        _this.lastPosition = 0;
        _this.isAnimationAllowed = false;
        _this.direction = "";
        _this.isInThrottle = false;
        return _this;
    }
    Carousel.prototype.setIsInThrottle = function (isInThrottle) {
        if (isInThrottle === void 0) { isInThrottle = false; }
        this.isInThrottle = isInThrottle;
    };
    Carousel.prototype.componentDidMount = function () {
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
    };
    /*
    We only want to set the clones on the client-side cause it relies on getting the width of the carousel items.
    */
    Carousel.prototype.setClones = function (slidesToShow, itemWidth, forResizing) {
        var _this = this;
        // if forResizing is true, means we are on client-side.
        // if forResizing is false, means we are on server-side.
        // because the first time we set the clones, we change the position of all carousel items when entering client-side from server-side.
        // but still, we want to maintain the same position as it was on the server-side which is translateX(0) by getting the couter part of the original first slide.
        this.isAnimationAllowed = false;
        var childrenArr = React.Children.toArray(this.props.children);
        var _a = utils_1.getClones(this.state.slidesToShow, childrenArr), clones = _a.clones, initialSlide = _a.initialSlide;
        this.setState({
            clones: clones,
            totalItems: clones.length,
            currentSlide: forResizing ? this.state.currentSlide : initialSlide
        }, function () {
            _this.correctItemsPosition(itemWidth || _this.state.itemWidth);
        });
    };
    Carousel.prototype.setItemsToShow = function (shouldCorrectItemPosition) {
        var _this = this;
        var _a = this.props, responsive = _a.responsive, infinite = _a.infinite;
        Object.keys(responsive).forEach(function (item) {
            var _a = responsive[item], breakpoint = _a.breakpoint, items = _a.items;
            var max = breakpoint.max, min = breakpoint.min;
            if (window.innerWidth >= min && window.innerWidth <= max) {
                _this.setState({ slidesToShow: items, deviceType: item });
                _this.setContainerAndItemWidth(items, shouldCorrectItemPosition);
            }
        });
    };
    // this is for resizing only or the first time when we entered client-side from server-side.
    Carousel.prototype.setContainerAndItemWidth = function (slidesToShow, shouldCorrectItemPosition) {
        var _this = this;
        if (this.containerRef && this.containerRef.current) {
            var containerWidth = this.containerRef.current.offsetWidth;
            var itemWidth_1 = utils_1.getItemClientSideWidth(this.props, slidesToShow, containerWidth);
            this.setState({
                containerWidth: containerWidth,
                itemWidth: itemWidth_1
            }, function () {
                if (_this.props.infinite) {
                    _this.setClones(slidesToShow, itemWidth_1, shouldCorrectItemPosition);
                }
            });
            if (shouldCorrectItemPosition) {
                this.correctItemsPosition(itemWidth_1);
            }
        }
    };
    Carousel.prototype.correctItemsPosition = function (itemWidth, isAnimationAllowed) {
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
    };
    Carousel.prototype.onResize = function (value) {
        // value here can be html event or a boolean.
        // if its in infinite mode, we want to keep the current slide index no matter what.
        // if its not infinite mode, keeping the current slide index has already been taken care of
        var infinite = this.props.infinite;
        var shouldCorrectItemPosition;
        if (!infinite) {
            shouldCorrectItemPosition = false;
        }
        else {
            if (typeof value === "boolean" && value) {
                shouldCorrectItemPosition = false;
            }
            else {
                shouldCorrectItemPosition = true;
            }
        }
        this.setItemsToShow(shouldCorrectItemPosition);
    };
    Carousel.prototype.componentDidUpdate = function (_a, _b) {
        var _this = this;
        var keyBoardControl = _a.keyBoardControl, autoPlay = _a.autoPlay;
        var containerWidth = _b.containerWidth, domLoaded = _b.domLoaded, isSliding = _b.isSliding;
        if (this.containerRef &&
            this.containerRef.current &&
            this.containerRef.current.offsetWidth !== containerWidth) {
            // this is for handing resizing only.
            setTimeout(function () {
                _this.setItemsToShow(true);
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
            this.correctClonesPosition({ domLoaded: domLoaded, isSliding: isSliding });
        }
    };
    Carousel.prototype.correctClonesPosition = function (_a) {
        var _this = this;
        var domLoaded = _a.domLoaded, // this domLoaded comes from previous state, only use to tell if we are on client-side or server-side because this functin relies the dom.
        isSliding = _a.isSliding;
        var childrenArr = React.Children.toArray(this.props.children);
        var _b = utils_1.checkClonesPosition(this.state, childrenArr, this.props), isReachingTheEnd = _b.isReachingTheEnd, isReachingTheStart = _b.isReachingTheStart, nextSlide = _b.nextSlide, nextPosition = _b.nextPosition;
        if (
        // this is to prevent this gets called on the server-side.
        this.state.domLoaded &&
            domLoaded &&
            isSliding &&
            !this.state.isSliding) {
            if (isReachingTheEnd || isReachingTheStart) {
                this.isAnimationAllowed = false;
                setTimeout(function () {
                    _this.setState({
                        transform: nextPosition,
                        currentSlide: nextSlide
                    });
                }, this.props.transitionDuration || defaultTransitionDuration);
            }
        }
    };
    Carousel.prototype.next = function (slidesHavePassed) {
        var _this = this;
        if (slidesHavePassed === void 0) { slidesHavePassed = 0; }
        var _a = this.props, afterChange = _a.afterChange, beforeChange = _a.beforeChange;
        /*
        two cases:
        1. We are not over-sliding.
        2. We are sliding over to what we have, that means nextslides > this.props.children.length. (does not apply to the inifnite mode)
        */
        var _b = utils_1.populateNextSlides(this.state, this.props, slidesHavePassed), nextSlides = _b.nextSlides, nextPosition = _b.nextPosition;
        var previousSlide = this.state.currentSlide;
        if (nextSlides === undefined || nextPosition === undefined) {
            // they can be 0.
            return;
        }
        if (typeof beforeChange === "function") {
            beforeChange(nextSlides, this.getState());
        }
        this.isAnimationAllowed = true;
        this.setState({
            isSliding: true,
            transform: nextPosition,
            currentSlide: nextSlides
        }, function () {
            _this.setState({ isSliding: false });
            if (typeof afterChange === "function") {
                setTimeout(function () {
                    afterChange(previousSlide, _this.getState());
                }, _this.props.transitionDuration || defaultTransitionDuration);
            }
        });
    };
    Carousel.prototype.previous = function (slidesHavePassed) {
        var _this = this;
        if (slidesHavePassed === void 0) { slidesHavePassed = 0; }
        var _a = this.props, afterChange = _a.afterChange, beforeChange = _a.beforeChange;
        var _b = utils_1.populatePreviousSlides(this.state, this.props, slidesHavePassed), nextSlides = _b.nextSlides, nextPosition = _b.nextPosition;
        if (nextSlides === undefined || nextPosition === undefined) {
            // they can be 0, which goes back to the first slide.
            return;
        }
        var previousSlide = this.state.currentSlide;
        if (typeof beforeChange === "function") {
            beforeChange(nextSlides, this.getState());
        }
        this.isAnimationAllowed = true;
        this.setState({
            isSliding: true,
            transform: nextPosition,
            currentSlide: nextSlides
        }, function () {
            _this.setState({ isSliding: false });
            if (typeof afterChange === "function") {
                setTimeout(function () {
                    afterChange(previousSlide, _this.getState());
                }, _this.props.transitionDuration || defaultTransitionDuration);
            }
        });
    };
    Carousel.prototype.componentWillUnmount = function () {
        window.removeEventListener("resize", this.onResize);
        if (this.props.keyBoardControl) {
            window.removeEventListener("keyup", this.onKeyUp);
        }
        if (this.props.autoPlay && this.autoPlay) {
            clearInterval(this.autoPlay);
            this.autoPlay = undefined;
        }
    };
    Carousel.prototype.resetMoveStatus = function () {
        this.onMove = false;
        this.initialPosition = 0;
        this.lastPosition = 0;
        this.direction = "";
    };
    Carousel.prototype.handleDown = function (e) {
        if ((e.touches && !this.props.swipeable) ||
            (e && !e.touches && !this.props.draggable) ||
            this.isInThrottle) {
            return;
        }
        var clientX = (e.touches ? e.touches[0] : e).clientX;
        this.onMove = true;
        this.initialPosition = clientX;
        this.lastPosition = clientX;
        this.isAnimationAllowed = false;
    };
    Carousel.prototype.handleMove = function (e) {
        if ((e.touches && !this.props.swipeable) ||
            (e && !e.touches && !this.props.draggable)) {
            return;
        }
        var clientX = (e.touches ? e.touches[0] : e).clientX;
        if (e.touches && this.autoPlay && this.props.autoPlay) {
            clearInterval(this.autoPlay);
            this.autoPlay = undefined;
        }
        if (this.onMove) {
            var _a = utils_1.populateSlidesOnMouseTouchMove(this.state, this.props, this.initialPosition, this.lastPosition, clientX), direction = _a.direction, nextPosition = _a.nextPosition, canContinue = _a.canContinue;
            if (direction) {
                this.direction = direction;
                if (canContinue && nextPosition !== undefined) {
                    // nextPosition can be 0;
                    this.setState({ transform: nextPosition });
                }
            }
            this.lastPosition = clientX;
        }
    };
    Carousel.prototype.handleOut = function (e) {
        if (this.props.autoPlay && !this.autoPlay) {
            this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed);
        }
        var shouldDisableOnMobile = e.type === "touchend" && !this.props.swipeable;
        var shouldDisableOnDesktop = (e.type === "mouseleave" || e.type === "mouseup") &&
            !this.props.draggable;
        if (shouldDisableOnMobile || shouldDisableOnDesktop) {
            return;
        }
        if (this.onMove) {
            if (this.direction === "right") {
                var canGoNext = this.initialPosition - this.lastPosition >=
                    this.props.minimumTouchDrag;
                if (canGoNext) {
                    var slidesHavePassed = Math.round((this.initialPosition - this.lastPosition) / this.state.itemWidth);
                    this.next(slidesHavePassed);
                }
                else {
                    this.correctItemsPosition(this.state.itemWidth, true);
                }
            }
            if (this.direction === "left") {
                var canGoNext = this.lastPosition - this.initialPosition >
                    this.props.minimumTouchDrag;
                if (canGoNext) {
                    var slidesHavePassed = Math.round((this.lastPosition - this.initialPosition) / this.state.itemWidth);
                    this.previous(slidesHavePassed);
                }
                else {
                    this.correctItemsPosition(this.state.itemWidth, true);
                }
            }
            this.resetMoveStatus();
        }
    };
    Carousel.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case 37:
                return this.previous();
            case 39:
                return this.next();
        }
    };
    Carousel.prototype.handleEnter = function () {
        if (this.autoPlay && this.props.autoPlay) {
            clearInterval(this.autoPlay);
            this.autoPlay = undefined;
        }
    };
    Carousel.prototype.goToSlide = function (slide) {
        var _this = this;
        if (this.isInThrottle) {
            return;
        }
        var itemWidth = this.state.itemWidth;
        var _a = this.props, afterChange = _a.afterChange, beforeChange = _a.beforeChange;
        var previousSlide = this.state.currentSlide;
        if (typeof beforeChange === "function") {
            beforeChange(slide, this.getState());
        }
        this.isAnimationAllowed = true;
        this.setState({
            currentSlide: slide,
            transform: -(itemWidth * slide)
        }, function () {
            if (_this.props.infinite) {
                _this.correctClonesPosition({ domLoaded: true, isSliding: true });
            }
            if (typeof afterChange === "function") {
                setTimeout(function () {
                    afterChange(previousSlide, _this.getState());
                }, _this.props.transitionDuration || defaultTransitionDuration);
            }
        });
    };
    Carousel.prototype.getState = function () {
        return __assign({}, this.state, { onMove: this.onMove, direction: this.direction });
    };
    Carousel.prototype.renderLeftArrow = function () {
        var _this = this;
        var customLeftArrow = this.props.customLeftArrow;
        return (React.createElement(Arrows_1.LeftArrow, { customLeftArrow: customLeftArrow, getState: function () { return _this.getState(); }, previous: this.previous }));
    };
    Carousel.prototype.renderRightArrow = function () {
        var _this = this;
        var customRightArrow = this.props.customRightArrow;
        return (React.createElement(Arrows_1.RightArrow, { customRightArrow: customRightArrow, getState: function () { return _this.getState(); }, next: this.next }));
    };
    Carousel.prototype.renderButtonGroups = function () {
        var _this = this;
        var customButtonGroup = this.props.customButtonGroup;
        if (customButtonGroup) {
            return React.cloneElement(customButtonGroup, {
                previous: function () { return _this.previous(); },
                next: function () { return _this.next(); },
                goToSlide: function (slideIndex) { return _this.goToSlide(slideIndex); },
                carouselState: this.getState()
            });
        }
        return null;
    };
    Carousel.prototype.renderDotsList = function () {
        var _this = this;
        return (React.createElement(Dots_1.default, { state: this.state, props: this.props, goToSlide: this.goToSlide, getState: function () { return _this.getState(); } }));
    };
    Carousel.prototype.renderCarouselItems = function () {
        return (React.createElement(CarouselItems_1.default, { goToSlide: this.goToSlide, state: this.state, props: this.props }));
    };
    Carousel.prototype.render = function () {
        var slidesToShow = this.state.slidesToShow;
        var _a = this.props, deviceType = _a.deviceType, slidesToSlide = _a.slidesToSlide, arrows = _a.arrows, removeArrowOnDeviceType = _a.removeArrowOnDeviceType, infinite = _a.infinite, containerClass = _a.containerClass, sliderClass = _a.sliderClass, customTransition = _a.customTransition, partialVisbile = _a.partialVisbile, centerMode = _a.centerMode;
        utils_1.throwError(this.state, this.props);
        var _b = utils_1.getInitialState(this.state, this.props), shouldRenderOnSSR = _b.shouldRenderOnSSR, paritialVisibilityGutter = _b.paritialVisibilityGutter;
        var isLeftEndReach = !(this.state.currentSlide - slidesToSlide >= 0);
        var isRightEndReach = !(this.state.currentSlide + 1 + slidesToShow <=
            this.state.totalItems);
        var shouldShowArrows = arrows &&
            !(removeArrowOnDeviceType &&
                ((deviceType && removeArrowOnDeviceType.indexOf(deviceType) > -1) ||
                    (this.state.deviceType &&
                        removeArrowOnDeviceType.indexOf(this.state.deviceType) > -1)));
        var disableLeftArrow = !infinite && isLeftEndReach;
        var disableRightArrow = !infinite && isRightEndReach;
        // this lib supports showing next set of items paritially as well as center mode which shows both.
        var currentTransform = partialVisbile
            ? utils_1.getTransformForPartialVsibile(this.state, paritialVisibilityGutter, this.props)
            : centerMode
                ? utils_1.getTransformForCenterMode(this.state, this.props)
                : this.state.transform;
        return (React.createElement("div", { className: "react-multi-carousel-list " + containerClass, ref: this.containerRef },
            React.createElement("ul", { className: "react-multi-carousel-track " + sliderClass, 
                // @ts-ignore
                style: {
                    transition: this.isAnimationAllowed
                        ? customTransition || defaultTransition
                        : "none",
                    overflow: shouldRenderOnSSR ? "hidden" : "unset",
                    transform: "translate3d(" + currentTransform + "px,0,0)"
                }, onMouseMove: this.handleMove, onMouseDown: this.handleDown, onMouseUp: this.handleOut, onMouseEnter: this.handleEnter, onMouseLeave: this.handleOut, onTouchStart: this.handleDown, onTouchMove: this.handleMove, onTouchEnd: this.handleOut }, this.renderCarouselItems()),
            shouldShowArrows && !disableLeftArrow && this.renderLeftArrow(),
            shouldShowArrows && !disableRightArrow && this.renderRightArrow(),
            this.renderButtonGroups(),
            this.renderDotsList()));
    };
    Carousel.defaultProps = {
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
    return Carousel;
}(React.Component));
exports.default = Carousel;
//# sourceMappingURL=Carousel.js.map