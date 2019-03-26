"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("./utils");
const defaultTransitionDuration = 400;
const defaultTransition = "transform 400ms ease-in-out";
class Carousel extends React.Component {
    constructor(props) {
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
        const { infinite, transitionDuration } = props;
        this.onResize = this.onResize.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleOut = this.handleOut.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        /*
        The reason of using throttle its because of cloning elemnts for inifinite mode.
        */
        this.next = infinite
            ? utils_1.throttle(this.next.bind(this), props.transitionDuration || defaultTransitionDuration)
            : this.next.bind(this);
        this.previous = infinite
            ? utils_1.throttle(this.previous.bind(this), props.transitionDuration || defaultTransitionDuration)
            : this.previous.bind(this);
        this.goToSlide = infinite
            ? utils_1.throttle(this.goToSlide.bind(this), props.transitionDuration || defaultTransitionDuration)
            : this.goToSlide.bind(this);
        this.getIfSlideIsVisbile = this.getIfSlideIsVisbile.bind(this);
        this.onMove = false;
        this.initialPosition = 0;
        this.lastPosition = 0;
        this.isAnimationAllowed = false;
        this.direction = "";
    }
    componentDidMount() {
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
    setClones(slidesToShow, itemWidth, forResizing) {
        this.isAnimationAllowed = false;
        const childrenArr = React.Children.toArray(this.props.children);
        const { clones, initialSlide } = utils_1.getClones(this.state.slidesToShow, childrenArr);
        this.setState({
            clones,
            totalItems: clones.length,
            currentSlide: forResizing ? this.state.currentSlide : initialSlide
        }, () => {
            this.correctItemsPosition(itemWidth || this.state.itemWidth);
        });
    }
    setItemsToShow(shouldCorrectItemPosition) {
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
    // this is for resizing.
    setContainerAndItemWidth(slidesToShow, shouldCorrectItemPosition) {
        if (this.containerRef && this.containerRef.current) {
            const containerWidth = this.containerRef.current.offsetWidth;
            const itemWidth = Math.round(this.containerRef.current.offsetWidth / slidesToShow);
            this.setState({
                containerWidth,
                itemWidth
            }, () => {
                if (this.props.infinite) {
                    this.setClones(slidesToShow, itemWidth, shouldCorrectItemPosition);
                }
            });
            if (shouldCorrectItemPosition) {
                this.correctItemsPosition(itemWidth);
            }
        }
    }
    correctItemsPosition(itemWidth, isAnimationAllowed) {
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
    onResize(value) {
        // value here can be html event or a boolean.
        // if its in infinite mode, we want to keep the current slide index no matter what.
        // if its not infinite mode, keeping the current slide index has already been taken care of
        const { infinite } = this.props;
        let shouldCorrectItemPosition;
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
    }
    componentDidUpdate({ keyBoardControl, autoPlay }, { containerWidth, domLoaded, isSliding }) {
        if (this.containerRef &&
            this.containerRef.current &&
            this.containerRef.current.offsetWidth !== containerWidth) {
            // this is for handing resizing.
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
            // this is to quicly cancel the animation and move the items position to create the infinite effects.
            this.correctClonesPosition({ domLoaded, isSliding });
        }
    }
    correctClonesPosition({ domLoaded, isSliding }) {
        const childrenArr = React.Children.toArray(this.props.children);
        const { hasEnterClonedAfter, hasEnterClonedBefore, nextSlide, nextPosition } = utils_1.whenEnteredClones(this.state, childrenArr, this.props);
        if (
        // this is to prevent this gets called on the server-side.
        this.state.domLoaded &&
            domLoaded &&
            isSliding &&
            !this.state.isSliding) {
            if (hasEnterClonedAfter || hasEnterClonedBefore) {
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
    next(slidesHavePassed = 0) {
        const { slidesToShow } = this.state;
        const { slidesToSlide, infinite, afterChange, beforeChange } = this.props;
        const nextMaximumSlides = this.state.currentSlide +
            1 +
            slidesHavePassed +
            slidesToShow +
            slidesToSlide;
        const nextSlides = this.state.currentSlide + slidesHavePassed + slidesToSlide;
        const nextPosition = -(this.state.itemWidth * nextSlides);
        const previousSlide = this.state.currentSlide;
        if (nextMaximumSlides <= this.state.totalItems) {
            if (typeof beforeChange === "function") {
                beforeChange(nextSlides, this.getState());
            }
            this.isAnimationAllowed = true;
            this.setState({
                isSliding: true,
                transform: nextPosition,
                currentSlide: nextSlides
            }, () => {
                this.setState({ isSliding: false });
                if (typeof afterChange === "function") {
                    setTimeout(() => {
                        afterChange(previousSlide, this.getState());
                    }, this.props.transitionDuration || defaultTransitionDuration);
                }
            });
        }
        else if (nextMaximumSlides > this.state.totalItems &&
            this.state.currentSlide !== this.state.totalItems - slidesToShow) {
            // prevent oversliding;
            const maxSlides = this.state.totalItems - slidesToShow;
            const maxPosition = -(this.state.itemWidth * maxSlides);
            if (typeof beforeChange === "function") {
                beforeChange(maxSlides, this.getState());
            }
            this.isAnimationAllowed = true;
            this.setState({
                isSliding: true,
                transform: maxPosition,
                currentSlide: maxSlides
            }, () => {
                this.setState({ isSliding: false });
                if (typeof afterChange === "function") {
                    setTimeout(() => {
                        afterChange(previousSlide, this.getState());
                    }, this.props.transitionDuration || defaultTransitionDuration);
                }
            });
        }
        else {
            return;
        }
    }
    previous(slidesHavePassed = 0) {
        const { slidesToShow } = this.state;
        const { slidesToSlide, infinite, afterChange, beforeChange } = this.props;
        const nextSlides = this.state.currentSlide - slidesHavePassed - slidesToSlide;
        const nextPosition = -(this.state.itemWidth * nextSlides);
        const previousSlide = this.state.currentSlide;
        if (nextSlides >= 0) {
            if (typeof beforeChange === "function") {
                beforeChange(nextSlides, this.getState());
            }
            this.isAnimationAllowed = true;
            this.setState({
                isSliding: true,
                transform: nextPosition,
                currentSlide: nextSlides
            }, () => {
                this.setState({ isSliding: false });
                if (typeof afterChange === "function") {
                    setTimeout(() => {
                        afterChange(previousSlide, this.getState());
                    }, this.props.transitionDuration || defaultTransitionDuration);
                }
            });
        }
        else if (nextSlides < 0 && this.state.currentSlide !== 0) {
            // prevent oversliding.
            if (typeof beforeChange === "function") {
                beforeChange(0, this.getState());
            }
            this.isAnimationAllowed = true;
            this.setState({
                isSliding: true,
                transform: 0,
                currentSlide: 0
            }, () => {
                this.setState({ isSliding: false });
                if (typeof afterChange === "function") {
                    setTimeout(() => {
                        afterChange(previousSlide, this.getState());
                    }, this.props.transitionDuration || defaultTransitionDuration);
                }
            });
        }
        else {
            const maxSlides = this.state.totalItems - slidesToShow;
            const maxPosition = -(this.state.itemWidth * maxSlides);
            if (infinite) {
                if (typeof beforeChange === "function") {
                    beforeChange(maxSlides, this.getState());
                }
                this.isAnimationAllowed = true;
                this.setState({
                    isSliding: true,
                    transform: maxPosition,
                    currentSlide: maxSlides
                }, () => {
                    this.setState({ isSliding: false });
                    if (typeof afterChange === "function") {
                        setTimeout(() => {
                            afterChange(previousSlide, this.getState());
                        }, this.props.transitionDuration || defaultTransitionDuration);
                    }
                });
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
        if (this.props.keyBoardControl) {
            window.removeEventListener("keyup", this.onKeyUp);
        }
        if (this.props.autoPlay && this.autoPlay) {
            clearInterval(this.autoPlay);
            this.autoPlay = undefined;
        }
    }
    resetMoveStatus() {
        this.onMove = false;
        this.initialPosition = 0;
        this.lastPosition = 0;
        this.direction = "";
    }
    handleDown(e) {
        if ((e.touches && !this.props.swipeable) ||
            (e && !e.touches && !this.props.draggable)) {
            return;
        }
        const { clientX } = e.touches ? e.touches[0] : e;
        this.onMove = true;
        this.initialPosition = clientX;
        this.lastPosition = clientX;
        this.isAnimationAllowed = false;
    }
    handleMove(e) {
        if ((e.touches && !this.props.swipeable) ||
            (e && !e.touches && !this.props.draggable)) {
            return;
        }
        const { clientX } = e.touches ? e.touches[0] : e;
        if (e.touches && this.autoPlay && this.props.autoPlay) {
            clearInterval(this.autoPlay);
            this.autoPlay = undefined;
        }
        if (this.onMove) {
            const slidesHavePassedRight = Math.round((this.initialPosition - this.lastPosition) / this.state.itemWidth);
            const slidesHavePassedLeft = Math.round((this.lastPosition - this.initialPosition) / this.state.itemWidth);
            if (this.initialPosition > clientX &&
                slidesHavePassedRight <= this.state.slidesToShow) {
                this.direction = "right";
                const translateXLimit = Math.abs(-(this.state.itemWidth *
                    (this.state.totalItems - this.state.slidesToShow)));
                const nextTranslate = this.state.transform - (this.lastPosition - clientX);
                const isLastSlide = this.state.currentSlide ===
                    this.state.totalItems - this.state.slidesToShow;
                if (Math.abs(nextTranslate) <= translateXLimit ||
                    (isLastSlide && this.props.infinite)) {
                    this.setState({ transform: nextTranslate });
                }
            }
            if (clientX > this.initialPosition &&
                slidesHavePassedLeft <= this.state.slidesToShow) {
                this.direction = "left";
                const nextTranslate = this.state.transform + (clientX - this.lastPosition);
                const isFirstSlide = this.state.currentSlide === 0;
                if (nextTranslate <= 0 || (isFirstSlide && this.props.infinite)) {
                    this.setState({ transform: nextTranslate });
                }
            }
            this.lastPosition = clientX;
        }
    }
    handleOut(e) {
        if (this.props.autoPlay && !this.autoPlay) {
            this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed);
        }
        const shouldDisableOnMobile = e.type === "touchend" && !this.props.swipeable;
        const shouldDisableOnDesktop = (e.type === "mouseleave" || e.type === "mouseup") &&
            !this.props.draggable;
        if (shouldDisableOnMobile || shouldDisableOnDesktop) {
            return;
        }
        if (this.onMove) {
            if (this.direction === "right") {
                const slidesHavePassed = Math.round((this.initialPosition - this.lastPosition) / this.state.itemWidth);
                if (this.initialPosition - this.lastPosition >=
                    this.props.minimumTouchDrag) {
                    this.next(slidesHavePassed);
                }
                else {
                    this.correctItemsPosition(this.state.itemWidth, true);
                }
            }
            if (this.direction === "left") {
                const slidesHavePassed = Math.round((this.lastPosition - this.initialPosition) / this.state.itemWidth);
                if (this.lastPosition - this.initialPosition >
                    this.props.minimumTouchDrag) {
                    this.previous(slidesHavePassed);
                }
                else {
                    this.correctItemsPosition(this.state.itemWidth, true);
                }
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
    handleEnter() {
        if (this.autoPlay && this.props.autoPlay) {
            clearInterval(this.autoPlay);
            this.autoPlay = undefined;
        }
    }
    goToSlide(slide) {
        const { itemWidth } = this.state;
        const { afterChange, beforeChange } = this.props;
        const previousSlide = this.state.currentSlide;
        if (typeof beforeChange === "function") {
            beforeChange(slide, this.getState());
        }
        this.isAnimationAllowed = true;
        this.setState({
            currentSlide: slide,
            transform: -(itemWidth * slide)
        }, () => {
            if (this.props.infinite) {
                this.correctClonesPosition({ domLoaded: true, isSliding: true });
            }
            if (typeof afterChange === "function") {
                setTimeout(() => {
                    afterChange(previousSlide, this.getState());
                }, this.props.transitionDuration || defaultTransitionDuration);
            }
        });
    }
    getState() {
        return Object.assign({}, this.state, { onMove: this.onMove, direction: this.direction });
    }
    renderLeftArrow() {
        const { customLeftArrow } = this.props;
        if (customLeftArrow) {
            return React.cloneElement(customLeftArrow, {
                onClick: () => this.previous(),
                carouselState: this.getState()
            });
        }
        else {
            return (React.createElement("button", { className: "react-multiple-carousel__arrow react-multiple-carousel__arrow--left", onClick: () => this.previous() }));
        }
    }
    renderRightArrow() {
        const { customRightArrow } = this.props;
        if (customRightArrow) {
            return React.cloneElement(customRightArrow, {
                onClick: () => this.next(),
                carouselState: this.getState()
            });
        }
        else {
            return (React.createElement("button", { className: "react-multiple-carousel__arrow react-multiple-carousel__arrow--right", onClick: () => this.next() }));
        }
    }
    renderButtonGroups() {
        const { customButtonGroup } = this.props;
        if (customButtonGroup) {
            return React.cloneElement(customButtonGroup, {
                previous: () => this.previous(),
                next: () => this.next(),
                goToSlide: (slideIndex) => this.goToSlide(slideIndex),
                carouselState: this.getState()
            });
        }
        return null;
    }
    renderDotsList() {
        const { customDot, dotListClass, infinite } = this.props;
        // getPureItemsWithoutClone
        const childrenArr = React.Children.toArray(this.props.children);
        return (React.createElement("ul", { className: `react-multi-carousel-dot-list ${dotListClass}` }, Array(childrenArr.length)
            .fill(0)
            .map((item, index) => {
            const slideIndex = infinite
                ? utils_1.getCounterPart(index, this.state, childrenArr)
                : index;
            // console.log(getCounterPart(this.state.currentSlide, this.state, childrenArr), slideIndex);
            if (customDot) {
                return React.cloneElement(customDot, {
                    index: slideIndex,
                    onClick: () => this.goToSlide(slideIndex),
                    carouselState: this.getState()
                });
            }
            return (React.createElement("li", { key: index, className: `react-multi-carousel-dot ${this.state.currentSlide === slideIndex
                    ? "react-multi-carousel-dot--active"
                    : ""}` },
                React.createElement("button", { onClick: () => this.goToSlide(slideIndex) })));
        })));
    }
    getIfSlideIsVisbile(index) {
        return (index >= this.state.currentSlide &&
            index < this.state.currentSlide + this.state.slidesToShow);
    }
    getServerSideState() {
        const { domLoaded, slidesToShow, containerWidth, itemWidth } = this.state;
        const { deviceType, responsive, ssr, partialVisbile } = this.props;
        let flexBisis;
        const domFullyLoaded = domLoaded && slidesToShow && containerWidth && itemWidth;
        if (ssr && deviceType && !domFullyLoaded) {
            flexBisis = utils_1.guessWidthFromDeviceType(deviceType, responsive);
        }
        const shouldRenderOnSSR = ssr && deviceType && !domFullyLoaded && flexBisis;
        const paritialVisibilityGutter = utils_1.getParitialVisibilityGutter(responsive, partialVisbile, deviceType, this.state.deviceType);
        return {
            shouldRenderOnSSR,
            flexBisis,
            domFullyLoaded,
            paritialVisibilityGutter
        };
    }
    renderCarouselItems() {
        const { itemWidth } = this.state;
        const { children, infinite, itemClass, partialVisbile } = this.props;
        const { flexBisis, shouldRenderOnSSR, domFullyLoaded, paritialVisibilityGutter } = this.getServerSideState();
        if (infinite) {
            return this.state.clones.map((child, index) => (React.createElement("li", { key: index, "aria-hidden": this.getIfSlideIsVisbile(index) ? "false" : "true", "data-index": index, style: {
                    flex: shouldRenderOnSSR ? `1 0 ${flexBisis}%` : "auto",
                    position: "relative",
                    width: domFullyLoaded
                        ? `${partialVisbile && paritialVisibilityGutter
                            ? itemWidth - paritialVisibilityGutter
                            : itemWidth}px`
                        : "auto"
                }, className: itemClass }, child)));
        }
        return React.Children.toArray(children).map((child, index) => (React.createElement("li", { key: index, "data-index": index, "aria-hidden": this.getIfSlideIsVisbile(index) ? "false" : "true", style: {
                flex: shouldRenderOnSSR ? `1 0 ${flexBisis}%` : "auto",
                position: "relative",
                width: domFullyLoaded
                    ? `${partialVisbile && paritialVisibilityGutter
                        ? itemWidth - paritialVisibilityGutter
                        : itemWidth}px`
                    : "auto"
            }, className: itemClass }, child)));
    }
    render() {
        const { slidesToShow } = this.state;
        const { deviceType, slidesToSlide, arrows, removeArrowOnDeviceType, infinite, containerClass, sliderClass, customTransition, partialVisbile } = this.props;
        const { shouldRenderOnSSR, paritialVisibilityGutter } = this.getServerSideState();
        const isLeftEndReach = !(this.state.currentSlide - slidesToSlide >= 0);
        const isRightEndReach = !(this.state.currentSlide + 1 + slidesToShow <=
            this.state.totalItems);
        const shouldShowArrows = arrows &&
            !(removeArrowOnDeviceType &&
                ((deviceType && removeArrowOnDeviceType.indexOf(deviceType) > -1) ||
                    (this.state.deviceType &&
                        removeArrowOnDeviceType.indexOf(this.state.deviceType) > -1)));
        const disableLeftArrow = !infinite && isLeftEndReach;
        const disableRightArrow = !infinite && isRightEndReach;
        // this is the perfect formular, the perfect code.
        const currentTransform = paritialVisibilityGutter && partialVisbile
            ? partialVisbile === "right"
                ? this.state.transform +
                    this.state.currentSlide * paritialVisibilityGutter
                : this.state.transform +
                    this.state.currentSlide * paritialVisibilityGutter +
                    (this.state.currentSlide === 0
                        ? 0
                        : paritialVisibilityGutter + paritialVisibilityGutter / 2)
            : this.state.transform;
        return (React.createElement("div", { className: `react-multi-carousel-list ${containerClass}`, ref: this.containerRef },
            React.createElement("ul", { className: `react-multi-carousel-track ${sliderClass}`, 
                // @ts-ignore
                style: {
                    transition: this.isAnimationAllowed
                        ? customTransition || defaultTransition
                        : "none",
                    overflow: shouldRenderOnSSR ? "hidden" : "unset",
                    transform: `translate3d(${currentTransform}px,0,0)`
                }, onMouseMove: this.handleMove, onMouseDown: this.handleDown, onMouseUp: this.handleOut, onMouseEnter: this.handleEnter, onMouseLeave: this.handleOut, onTouchStart: this.handleDown, onTouchMove: this.handleMove, onTouchEnd: this.handleOut }, this.renderCarouselItems()),
            shouldShowArrows && !disableLeftArrow && this.renderLeftArrow(),
            shouldShowArrows && !disableRightArrow && this.renderRightArrow(),
            this.renderButtonGroups(),
            this.props.showDots && this.renderDotsList()));
    }
}
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
    dotListClass: ""
};
exports.default = Carousel;
//# sourceMappingURL=Carousel.js.map