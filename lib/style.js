"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const containerStyle = {
    display: "flex",
    alignItems: "center",
    overflow: 'hidden'
};
exports.containerStyle = containerStyle;
const contentStyle = {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    willChange: 'transform'
};
exports.contentStyle = contentStyle;
const arrowStyle = {
    zIndex: 1,
    position: 'absolute',
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: 13,
    cursor: "pointer"
};
exports.arrowStyle = arrowStyle;
const leftArrowStyle = Object.assign({}, arrowStyle, { left: 30, transform: "rotate(135deg)" });
exports.leftArrowStyle = leftArrowStyle;
const rightArrowStyle = Object.assign({}, arrowStyle, { right: 30, transform: "rotate(-45deg)" });
exports.rightArrowStyle = rightArrowStyle;
//# sourceMappingURL=style.js.map