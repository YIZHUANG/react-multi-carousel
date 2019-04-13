"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwError(state, props) {
    var partialVisbile = props.partialVisbile, centerMode = props.centerMode, ssr = props.ssr, responsive = props.responsive, infinite = props.infinite;
    if (partialVisbile && centerMode) {
        throw new Error("center mode can not be used at the same time with partialVisbile");
    }
    if (!responsive) {
        if (ssr) {
            throw new Error('ssr mode need to be used in conjunction with responsive prop');
        }
        else {
            throw new Error('Responsive prop is needed for deciding the amount of items to show on the screen');
        }
    }
    if (responsive && typeof responsive !== 'object') {
        throw new Error('responsive prop must be an object');
    }
}
exports.default = throwError;
//# sourceMappingURL=throwError.js.map