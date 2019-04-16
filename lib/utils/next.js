"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
two cases:
1. We are not over-sliding.
2. We are sliding over to what we have, that means nextslides > this.props.children.length. (does not apply to the inifnite mode)
*/
function populateNextSlides(state, props, slidesHavePassed) {
    if (slidesHavePassed === void 0) { slidesHavePassed = 0; }
    var slidesToShow = state.slidesToShow, currentSlide = state.currentSlide, itemWidth = state.itemWidth, totalItems = state.totalItems;
    var slidesToSlide = props.slidesToSlide;
    var nextSlides;
    var nextPosition;
    // possibile next number of slides that don't go over what we have, this doesn't apply to the infinite mode.
    // because for inifnite mode this will never happen.
    var nextMaximumSlides = currentSlide +
        1 +
        slidesHavePassed +
        slidesToShow +
        (slidesHavePassed > 0 ? 0 : slidesToSlide);
    if (nextMaximumSlides <= totalItems) {
        // It means if we have next slides go back to on the right-hand side.
        nextSlides =
            currentSlide +
                slidesHavePassed +
                (slidesHavePassed > 0 ? 0 : slidesToSlide);
        nextPosition = -(itemWidth * nextSlides);
    }
    else if (nextMaximumSlides > totalItems &&
        currentSlide !== totalItems - slidesToShow) {
        // This is to prevent oversliding
        // This is not for inifinite mode as for inifinite mode is never over-sliding.
        nextSlides = totalItems - slidesToShow;
        nextPosition = -(itemWidth * nextSlides);
    }
    else {
        nextSlides = undefined;
        nextPosition = undefined;
    }
    return {
        nextSlides: nextSlides,
        nextPosition: nextPosition
    };
}
exports.populateNextSlides = populateNextSlides;
//# sourceMappingURL=next.js.map