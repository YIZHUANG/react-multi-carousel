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
            ? utils_1.getOriginalCounterPart(index, state, childrenArr)
            : index;
        var cloneIndex = infinite
            ? utils_1.getCloneCounterPart(index, state, childrenArr)
            : null;
        var isActive;
        // cloneIndex can be 0 and its true!
        if (cloneIndex !== undefined) {
            /*
            It means we are in infinite mode, and the condition (childrenArr.length > slidesToShow * 2) is true.
            Also there could be multiple items that are exactly the same but have different index due to the reasons that they are clones.
            */
            isActive =
                currentSlide === cloneIndex || currentSlide === slideIndex;
        }
        else {
            // we are not in infinite mode or we don't have duplicate clones.
            isActive = currentSlide === slideIndex;
        }
        if (customDot) {
            return React.cloneElement(customDot, {
                index: index,
                active: isActive,
                onClick: function () { return goToSlide(slideIndex); },
                carouselState: getState()
            });
        }
        return (React.createElement("li", { "data-index": index, key: index, className: "react-multi-carousel-dot " + (isActive ? "react-multi-carousel-dot--active" : "") },
            React.createElement("button", { onClick: function () { return goToSlide(slideIndex); } })));
    })));
};
exports.default = Dots;
//# sourceMappingURL=Dots.js.map