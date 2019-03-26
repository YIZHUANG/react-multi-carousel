import { responsiveType, CarouselInternalState, CarouselProps } from "./types";

function guessWidthFromDeviceType(
  deviceType: string,
  responsive: responsiveType
): number | string | undefined {
  let itemWidth;
  if (responsive[deviceType]) {
    const { items } = responsive[deviceType];
    itemWidth = (100 / items).toFixed(1);
  }
  return itemWidth;
}

function getParitialVisibilityGutter(
  responsive: responsiveType,
  partialVisbile?: string | boolean,
  serverSideDeviceType?: string | undefined,
  clientSideDeviceType?: string | undefined
): number | undefined {
  let gutter: number | undefined = 0;
  const deviceType = clientSideDeviceType || serverSideDeviceType;
  if (partialVisbile && deviceType) {
    gutter = responsive[deviceType].paritialVisibilityGutter;
  }
  return gutter;
}


/*
getCounterPart gets the index of the clones.
For example, we have an array [clones, originalChildren, clones];
And we want to get the counter part index of the clones for the originalChildren.
And this does that.
*/
function getCounterPart(
  index: number,
  {
    slidesToShow,
    currentSlide,
    totalItems
  }: { slidesToShow: number; currentSlide: number; totalItems: number },
  childrenArr: any[]
): number {
  if (childrenArr.length > slidesToShow * 2) {
    const originalFirstSlide =
      childrenArr.length - (childrenArr.length - slidesToShow * 2);
    if (index < currentSlide) {
      return originalFirstSlide + index;
    } else {
      // this means navigative value.
      if (index - (childrenArr.length - slidesToShow * 2) < 0) {
        return index * 2;
      }
      return index - (childrenArr.length - slidesToShow * 2);
    }
  } else {
    if (currentSlide >= childrenArr.length) {
      return childrenArr.length + index;
    } else {
      return index;
    }
  }
}

function getClones(slidesToShow: number, childrenArr: any[]) {
  let initialSlide;
  let clones;
  if (childrenArr.length > slidesToShow * 2) {
    clones = [
      ...childrenArr.slice(
        childrenArr.length - slidesToShow * 2,
        childrenArr.length
      ),
      ...childrenArr,
      ...childrenArr.slice(0, slidesToShow * 2)
    ];
    initialSlide = slidesToShow * 2;
  } else {
    clones = [...childrenArr, ...childrenArr, ...childrenArr];
    initialSlide = childrenArr.length;
  }
  return {
    clones,
    initialSlide
  };
}

/*
When the user sees the clones, we need to reset the position, and cancel the animation so that it
creates the infinite effects.
*/
function whenEnteredClones(
  { currentSlide, slidesToShow, itemWidth, totalItems }: CarouselInternalState,
  childrenArr: any[],
  props: CarouselProps
): {
  hasEnterClonedAfter: boolean;
  hasEnterClonedBefore: boolean;
  nextSlide: number;
  nextPosition: number;
} {
  let nextSlide = 0;
  let nextPosition = 0;
  let hasEnterClonedAfter;
  const hasEnterClonedBefore = currentSlide === 0;
  const originalFirstSlide =
    childrenArr.length - (childrenArr.length - slidesToShow * 2);
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
  } else {
    hasEnterClonedAfter = currentSlide >= childrenArr.length * 2;
    if (hasEnterClonedAfter) {
      nextSlide = currentSlide - childrenArr.length;
      nextPosition = -(itemWidth * nextSlide);
    }
    if (hasEnterClonedBefore) {
      if (props.shouldShowDots) {
        nextSlide = childrenArr.length;
        nextPosition = -(itemWidth * nextSlide);
      } else {
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

const throttle = (func: any, limit: number): any => {
  let inThrottle: boolean;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export {
  guessWidthFromDeviceType,
  getParitialVisibilityGutter,
  getClones,
  whenEnteredClones,
  throttle,
  getCounterPart
};
