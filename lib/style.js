"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const containerStyle = {
    display: "flex",
    alignItems: "center"
};
exports.containerStyle = containerStyle;
const contentStyle = {
    display: "flex",
    overflow: "hidden",
    flexDirection: "row",
    transition: "all 0.2s",
    position: "relative",
    alignItems: "stretch"
};
exports.contentStyle = contentStyle;
const arrowStyle = {
    margin: "50px",
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: 3,
    cursor: "pointer"
};
exports.arrowStyle = arrowStyle;
const leftArrowStyle = Object.assign({}, arrowStyle, { transform: "rotate(135deg)" });
exports.leftArrowStyle = leftArrowStyle;
const rightArrowStyle = Object.assign({}, arrowStyle, { transform: "rotate(-45deg)" });
exports.rightArrowStyle = rightArrowStyle;
//# sourceMappingURL=style.js.map