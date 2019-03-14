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
function getParitialVisibilityGutter(responsive, partialVisbile, serverSideDeviceType, clientSideDeviceType) {
    let gutter = 0;
    const deviceType = clientSideDeviceType || serverSideDeviceType;
    if (partialVisbile && deviceType) {
        gutter = responsive[deviceType].paritialVisibilityGutter;
    }
    return gutter;
}
exports.getParitialVisibilityGutter = getParitialVisibilityGutter;
//# sourceMappingURL=utils.js.map