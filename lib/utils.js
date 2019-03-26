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
function getCounterPart(index, { slidesToShow, currentSlide, totalItems }, childrenArr) {
    if (childrenArr.length > slidesToShow * 2) {
        const originalFirstSlide = childrenArr.length - (childrenArr.length - slidesToShow * 2);
        if (index < currentSlide) {
            return originalFirstSlide + index;
        }
        else {
            // this means navigative value.
            if (index - (childrenArr.length - slidesToShow * 2) < 0) {
                return index * 2;
            }
            return index - (childrenArr.length - slidesToShow * 2);
        }
    }
    else {
        if (currentSlide >= childrenArr.length) {
            return childrenArr.length + index;
        }
        else {
            return index;
        }
    }
}
exports.getCounterPart = getCounterPart;
function getClones(slidesToShow, childrenArr) {
    let initialSlide;
    let clones;
    if (childrenArr.length > slidesToShow * 2) {
        clones = [
            ...childrenArr.slice(childrenArr.length - slidesToShow * 2, childrenArr.length),
            ...childrenArr,
            ...childrenArr.slice(0, slidesToShow * 2)
        ];
        initialSlide = slidesToShow * 2;
    }
    else {
        clones = [...childrenArr, ...childrenArr, ...childrenArr];
        initialSlide = childrenArr.length;
    }
    return {
        clones,
        initialSlide
    };
}
exports.getClones = getClones;
function whenEnteredClones({ currentSlide, slidesToShow, itemWidth, totalItems }, childrenArr, props) {
    let nextSlide = 0;
    let nextPosition = 0;
    let hasEnterClonedAfter;
    const hasEnterClonedBefore = currentSlide === 0;
    const originalFirstSlide = childrenArr.length - (childrenArr.length - slidesToShow * 2);
    if (childrenArr.length > slidesToShow * 2) {
        hasEnterClonedAfter =
            currentSlide >= originalFirstSlide + childrenArr.length;
        if (hasEnterClonedAfter) {
            nextSlide = currentSlide - childrenArr.length;
            nextPosition = -(itemWidth * nextSlide);
        }
        if (hasEnterClonedBefore) {
            nextSlide = originalFirstSlide + (childrenArr.length - slidesToShow * 2);
            nextPosition = -(itemWidth * nextSlide);
        }
    }
    else {
        hasEnterClonedAfter = currentSlide >= childrenArr.length * 2;
        if (hasEnterClonedAfter) {
            nextSlide = currentSlide - childrenArr.length;
            nextPosition = -(itemWidth * nextSlide);
        }
        if (hasEnterClonedBefore) {
            if (props.shouldShowDots) {
                nextSlide = childrenArr.length;
                nextPosition = -(itemWidth * nextSlide);
            }
            else {
                nextSlide = totalItems - slidesToShow * 2;
                nextPosition = -(itemWidth * nextSlide);
            }
        }
    }
    return {
        hasEnterClonedAfter,
        hasEnterClonedBefore,
        nextSlide,
        nextPosition
    };
}
exports.whenEnteredClones = whenEnteredClones;
const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
exports.throttle = throttle;
//# sourceMappingURL=utils.js.map