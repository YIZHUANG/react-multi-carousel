"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elementWidth_1 = require("./elementWidth");
function getInitialState(state, props) {
    var domLoaded = state.domLoaded, slidesToShow = state.slidesToShow, containerWidth = state.containerWidth, itemWidth = state.itemWidth;
    var deviceType = props.deviceType, responsive = props.responsive, ssr = props.ssr, partialVisbile = props.partialVisbile;
    var flexBisis;
    var domFullyLoaded = Boolean(domLoaded && slidesToShow && containerWidth && itemWidth);
    if (ssr && deviceType && !domFullyLoaded) {
        flexBisis = elementWidth_1.getWidthFromDeviceType(deviceType, responsive);
    }
    var shouldRenderOnSSR = Boolean(ssr && deviceType && !domFullyLoaded && flexBisis);
    var paritialVisibilityGutter = elementWidth_1.getParitialVisibilityGutter(responsive, partialVisbile, deviceType, state.deviceType);
    return {
        shouldRenderOnSSR: shouldRenderOnSSR,
        flexBisis: flexBisis,
        domFullyLoaded: domFullyLoaded,
        paritialVisibilityGutter: paritialVisibilityGutter
    };
}
exports.getInitialState = getInitialState;
function getIfSlideIsVisbile(index, state) {
    var currentSlide = state.currentSlide, slidesToShow = state.slidesToShow;
    return index >= currentSlide && index < currentSlide + slidesToShow;
}
exports.getIfSlideIsVisbile = getIfSlideIsVisbile;
function getTransformForCenterMode(state, props) {
    if (state.currentSlide === 0 && !props.infinite) {
        return state.transform;
    }
    else {
        return state.transform + state.itemWidth / 2;
    }
}
exports.getTransformForCenterMode = getTransformForCenterMode;
function getTransformForPartialVsibile(state, paritialVisibilityGutter, props) {
    if (paritialVisibilityGutter === void 0) { paritialVisibilityGutter = 0; }
    var currentSlide = state.currentSlide, totalItems = state.totalItems, slidesToShow = state.slidesToShow;
    var isRightEndReach = !(currentSlide + 1 + slidesToShow <= totalItems);
    var shouldRemoveRightGutter = !props.infinite && isRightEndReach;
    var transform = state.transform + currentSlide * paritialVisibilityGutter;
    if (shouldRemoveRightGutter) {
        return transform + paritialVisibilityGutter;
    }
    return transform;
}
exports.getTransformForPartialVsibile = getTransformForPartialVsibile;
//# sourceMappingURL=common.js.map