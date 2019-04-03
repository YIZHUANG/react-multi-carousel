"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var LeftArrow = function (_a) {
    var customLeftArrow = _a.customLeftArrow, getState = _a.getState, previous = _a.previous;
    if (customLeftArrow) {
        return React.cloneElement(customLeftArrow, {
            onClick: function () { return previous(); },
            carouselState: getState()
        });
    }
    return (React.createElement("button", { className: "react-multiple-carousel__arrow react-multiple-carousel__arrow--left", onClick: function () { return previous(); } }));
};
exports.LeftArrow = LeftArrow;
var RightArrow = function (_a) {
    var customRightArrow = _a.customRightArrow, next = _a.next, getState = _a.getState;
    if (customRightArrow) {
        return React.cloneElement(customRightArrow, {
            onClick: function () { return next(); },
            carouselState: getState()
        });
    }
    return (React.createElement("button", { className: "react-multiple-carousel__arrow react-multiple-carousel__arrow--right", onClick: function () { return next(); } }));
};
exports.RightArrow = RightArrow;
//# sourceMappingURL=Arrows.js.map