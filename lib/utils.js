"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function guessWidthFromDeviceType(deviceType, responsive) {
    let itemWidth;
    if (responsive[deviceType]) {
        const { items } = responsive[deviceType];
        itemWidth = (100 / items).toFixed(1);
    }
    return itemWidth;
}
exports.guessWidthFromDeviceType = guessWidthFromDeviceType;
//# sourceMappingURL=utils.js.map