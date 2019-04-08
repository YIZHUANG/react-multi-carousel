"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("./utils");
var CarouselItems = function (_a) {
    var props = _a.props, state = _a.state;
    var itemWidth = state.itemWidth, clones = state.clones, currentSlide = state.currentSlide;
    var children = props.children, infinite = props.infinite, itemClass = props.itemClass, partialVisbile = props.partialVisbile;
    var _b = utils_1.getInitialState(state, props), flexBisis = _b.flexBisis, shouldRenderOnSSR = _b.shouldRenderOnSSR, domFullyLoaded = _b.domFullyLoaded, paritialVisibilityGutter = _b.paritialVisibilityGutter;
    if (infinite) {
        return clones.map(function (child, index) { return (React.createElement("li", { key: index, "aria-hidden": utils_1.getIfSlideIsVisbile(index, state) ? "false" : "true", "data-index": index, style: {
                flex: shouldRenderOnSSR ? "1 0 " + flexBisis + "%" : "auto",
                position: "relative",
                width: domFullyLoaded
                    ? (partialVisbile && paritialVisibilityGutter
                        ? itemWidth - paritialVisibilityGutter
                        : itemWidth) + "px"
                    : "auto"
            }, className: "react-multi-carousel-item " + itemClass }, React.cloneElement(child, {
            isvisible: utils_1.getIfSlideIsVisbile(index, state),
            active: currentSlide === index
        }))); });
    }
    return React.Children.toArray(children).map(function (child, index) { return (React.createElement("li", { key: index, "data-index": index, "aria-hidden": utils_1.getIfSlideIsVisbile(index, state) ? "false" : "true", style: {
            flex: shouldRenderOnSSR ? "1 0 " + flexBisis + "%" : "auto",
            position: "relative",
            width: domFullyLoaded
                ? (partialVisbile && paritialVisibilityGutter
                    ? itemWidth - paritialVisibilityGutter
                    : itemWidth) + "px"
                : "auto"
        }, className: "react-multi-carousel-item " + itemClass }, React.cloneElement(child, {
        isvisible: utils_1.getIfSlideIsVisbile(index, state),
        active: currentSlide === index
    }))); });
};
exports.default = CarouselItems;
//# sourceMappingURL=CarouselItems.js.map