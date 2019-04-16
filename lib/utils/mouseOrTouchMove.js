"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this is to get the values for handling onTouchMove / onMouseMove;
function populateSlidesOnMouseTouchMove(state, props, initialPosition, lastPosition, clientX) {
    var itemWidth = state.itemWidth, slidesToShow = state.slidesToShow, totalItems = state.totalItems, transform = state.transform, currentSlide = state.currentSlide;
    var infinite = props.infinite;
    var canContinue = false; // it will be true if we have slides to slide to.
    var direction; // either 'left' or 'right'
    var nextPosition;
    // making sure we have items to slide back to, prevent oversliding.
    var slidesHavePassedRight = Math.round((initialPosition - lastPosition) / itemWidth);
    var slidesHavePassedLeft = Math.round((lastPosition - initialPosition) / itemWidth);
    var isMovingRight = initialPosition > clientX;
    var isMovingLeft = clientX > initialPosition;
    if (isMovingRight) {
        var isAboutToOverSlide = !(slidesHavePassedRight <= slidesToShow);
        if (!isAboutToOverSlide) {
            direction = "right";
            var translateXLimit = Math.abs(-(itemWidth * (totalItems - slidesToShow)));
            var nextTranslate = transform - (lastPosition - clientX);
            var isLastSlide = currentSlide === totalItems - slidesToShow;
            if (Math.abs(nextTranslate) <= translateXLimit ||
                (isLastSlide && infinite)) {
                nextPosition = nextTranslate;
                canContinue = true;
            }
        }
    }
    if (isMovingLeft) {
        var isAboutToOverSlide = !(slidesHavePassedLeft <= slidesToShow);
        if (!isAboutToOverSlide) {
            direction = "left";
            var nextTranslate = transform + (clientX - lastPosition);
            var isFirstSlide = currentSlide === 0;
            if (nextTranslate <= 0 || (isFirstSlide && infinite)) {
                canContinue = true;
                nextPosition = nextTranslate;
            }
        }
    }
    return {
        direction: direction,
        nextPosition: nextPosition,
        canContinue: canContinue
    };
}
exports.populateSlidesOnMouseTouchMove = populateSlidesOnMouseTouchMove;
//# sourceMappingURL=mouseOrTouchMove.js.map