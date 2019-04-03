"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
getCounterPart gets the index of the clones.
For example, we have an array [clones, originalChildren, clones];
And we want to get the counter part index of the clones for the originalChildren.
And this does that.
*/
function getCounterPart(index, _a, childrenArr) {
    var slidesToShow = _a.slidesToShow, currentSlide = _a.currentSlide, totalItems = _a.totalItems;
    if (childrenArr.length > slidesToShow * 2) {
        var originalFirstSlide = childrenArr.length - (childrenArr.length - slidesToShow * 2);
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
/*
The current setting is if the length of the carousel item is larger than "slidesToShow * 2",
then we clone "slidesToShow * 2" amount of beginning and end items.

Otherwise, it means we only have a few items. Then we clone it 3 times.
*/
function getClones(slidesToShow, childrenArr) {
    var initialSlide;
    var clones;
    if (childrenArr.length > slidesToShow * 2) {
        clones = childrenArr.slice(childrenArr.length - slidesToShow * 2, childrenArr.length).concat(childrenArr, childrenArr.slice(0, slidesToShow * 2));
        initialSlide = slidesToShow * 2;
    }
    else {
        clones = childrenArr.concat(childrenArr, childrenArr);
        initialSlide = childrenArr.length;
    }
    return {
        clones: clones,
        initialSlide: initialSlide
    };
}
exports.getClones = getClones;
/*
When the user sees the clones, we need to reset the position, and cancel the animation so that it
creates the infinite effects.

The if else statement here is based on the getClones method. Because it decides how many items we are cloning.
*/
function whenEnteredClones(_a, childrenArr, props) {
    var currentSlide = _a.currentSlide, slidesToShow = _a.slidesToShow, itemWidth = _a.itemWidth, totalItems = _a.totalItems;
    var nextSlide = 0;
    var nextPosition = 0;
    var hasEnterClonedAfter;
    var hasEnterClonedBefore = currentSlide === 0;
    var originalFirstSlide = childrenArr.length - (childrenArr.length - slidesToShow * 2);
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
            if (props.showDots) {
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
        hasEnterClonedAfter: hasEnterClonedAfter,
        hasEnterClonedBefore: hasEnterClonedBefore,
        nextSlide: nextSlide,
        nextPosition: nextPosition
    };
}
exports.whenEnteredClones = whenEnteredClones;
//# sourceMappingURL=clones.js.map