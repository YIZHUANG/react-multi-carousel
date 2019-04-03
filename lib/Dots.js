"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("./utils");
var Dots = function (_a) {
    var props = _a.props, state = _a.state, goToSlide = _a.goToSlide, getState = _a.getState;
    var showDots = props.showDots, customDot = props.customDot, dotListClass = props.dotListClass, infinite = props.infinite, children = props.children;
    if (!showDots) {
        return null;
    }
    var currentSlide = state.currentSlide;
    var childrenArr = React.Children.toArray(children);
    return (React.createElement("ul", { className: "react-multi-carousel-dot-list " + dotListClass }, Array(childrenArr.length)
        .fill(0)
        .map(function (item, index) {
        var slideIndex = infinite
            ? utils_1.getCounterPart(index, state, childrenArr)
            : index;
        // console.log(getCounterPart(this.state.currentSlide, this.state, childrenArr), slideIndex);
        if (customDot) {
            return React.cloneElement(customDot, {
                index: index,
                slideIndex: slideIndex,
                onClick: function () { return goToSlide(slideIndex); },
                carouselState: getState()
            });
        }
        return (React.createElement("li", { key: index, className: "react-multi-carousel-dot " + (currentSlide === slideIndex
                ? "react-multi-carousel-dot--active"
                : "") },
            React.createElement("button", { onClick: function () { return goToSlide(slideIndex); } })));
    })));
};
exports.default = Dots;
//# sourceMappingURL=Dots.js.map