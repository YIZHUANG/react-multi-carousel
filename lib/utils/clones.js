"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
getOriginalCounterPart gets the index of the original children.
For example, we have an array [clones, originalChildren, clones];
Before making the clones, an item's index is 0, but after the clone,
the index is different it could be 4, because we added clones to the array after "componentDidMount".
And this function gets the "index" of the item after the clones.
*/
function getOriginalCounterPart(index, _a, childrenArr) {
    var slidesToShow = _a.slidesToShow, currentSlide = _a.currentSlide, totalItems = _a.totalItems;
    if (childrenArr.length > slidesToShow * 2) {
        var originalCouterPart = index + slidesToShow * 2;
        return originalCouterPart;
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
exports.getOriginalCounterPart = getOriginalCounterPart;
/*
getCloneCounterPart.
For example, before we make the clones, an item's index is 0, but after the clones
we have we have an array like this [clones, originalChildren, clones] and the index of item we were talking about becomes 4,
because we change the array by adding clones to it. However, we want to get the clone counter part of this item that's at index 4.
And this gets the exact clone that is exactly the same as item at index 4. (Node: This item belongs to the originalChildren)

We only need this if (childrenArr.length > slidesToShow * 2) as defined in the getClones function.
*/
function getCloneCounterPart(index, _a, childrenArr) {
    var slidesToShow = _a.slidesToShow, totalItems = _a.totalItems, currentSlide = _a.currentSlide;
    if (childrenArr.length > slidesToShow * 2) {
        if (index === 0) {
            // 0 is a special case
            return childrenArr.length + slidesToShow * 2;
        }
        var cloneCouterPart = index - (childrenArr.length - slidesToShow * 2);
        return cloneCouterPart;
    }
    else {
        if (index === 0) {
            // 0 is a special case
            return childrenArr.length + slidesToShow * 2 - 1;
        }
        return undefined;
    }
}
exports.getCloneCounterPart = getCloneCounterPart;
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