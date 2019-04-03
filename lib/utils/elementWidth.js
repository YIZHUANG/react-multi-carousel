"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getParitialVisibilityGutter(responsive, partialVisbile, serverSideDeviceType, clientSideDeviceType) {
    var gutter = 0;
    var deviceType = clientSideDeviceType || serverSideDeviceType;
    if (partialVisbile && deviceType) {
        gutter = responsive[deviceType].paritialVisibilityGutter;
    }
    return gutter;
}
exports.getParitialVisibilityGutter = getParitialVisibilityGutter;
function getWidthFromDeviceType(deviceType, responsive) {
    var itemWidth;
    if (responsive[deviceType]) {
        var items = responsive[deviceType].items;
        itemWidth = (100 / items).toFixed(1);
    }
    return itemWidth;
}
exports.getWidthFromDeviceType = getWidthFromDeviceType;
//# sourceMappingURL=elementWidth.js.map