import { CarouselInternalState, CarouselProps } from "../types";

/*
getOriginalCounterPart gets the index of the original children.
For example, we have an array [clones, originalChildren, clones];
Before making the clones, an item's index is 0, but after the clone,
the index is different it could be 4, because we added clones to the array after "componentDidMount".
And this function gets the "index" of the item after the clones.
*/
function getOriginalCounterPart(
  index: number,
  {
    slidesToShow,
    currentSlide,
    totalItems
  }: { slidesToShow: number; currentSlide: number; totalItems: number },
  childrenArr: any[]
): number {
  // this function is only used for "infinite and showDots are true";
  if (childrenArr.length > slidesToShow * 2) {
    const originalCouterPart = index + slidesToShow * 2;
    return originalCouterPart;
  } else {
    if (currentSlide >= childrenArr.length) {
      return childrenArr.length + index;
    } else {
      return index;
    }
  }
}

/*
getCloneCounterPart.
For example, before we make the clones, an item's index is 0, but after the clones
we have we have an array like this [clones, originalChildren, clones] and the index of item we were talking about becomes 4,
because we change the array by adding clones to it. However, we want to get the clone counter part of this item that's at index 4.
And this gets the exact clone that is exactly the same as item at index 4. (Node: This item belongs to the originalChildren)

We only need this if (childrenArr.length > slidesToShow * 2) as defined in the getClones function.
*/
function getCloneCounterPart(
  index: number,
  {
    slidesToShow,
    totalItems,
    currentSlide
  }: { slidesToShow: number; currentSlide: number; totalItems: number },
  childrenArr: any[]
): number | undefined {
  // this function is only used for "infinite and showDots are true";
  if (childrenArr.length > slidesToShow * 2) {
    if (index === 0) {
      // if (childrenArr.length > slidesToShow * 2) it means our data structure is like the following:
      /*
      const carouselItems = [
        ...childrenArr.slice(
          childrenArr.length - slidesToShow * 2,
          childrenArr.length
        ),
        ...childrenArr,
        ...childrenArr.slice(0, slidesToShow * 2)
      ]
      As you can see its being clone (childrenArr.length - slidesToShow * 2) times,
      so the couter part index for 0 is (childrenArr.length + slidesToShow * 2)
      */
      return childrenArr.length + slidesToShow * 2;
    }
    const cloneCouterPart = index - (childrenArr.length - slidesToShow * 2);
    return cloneCouterPart;
  } else {
    if (index === 0) {
      // if !(childrenArr.length > slidesToShow * 2) it means our data structure is like the following:
      /*
      const carouselItems = [...children, ...children, ...children]
      As you can see its being clone 3 times, so the couter part index for 0 is childrenArr.length * 2
      */
      return childrenArr.length * 2;
    }
    return undefined;
  }
}

/*
The current setting is if the length of the carousel item is larger than "slidesToShow * 2",
then we clone "slidesToShow * 2" amount of beginning and end items.

Otherwise, it means we only have a few items. Then we clone it 3 times.
*/
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

The if else statement here is based on the getClones method. Because it decides how many items we are cloning.
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
      if (props.showDots) {
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

export {
  getOriginalCounterPart,
  getCloneCounterPart,
  getClones,
  whenEnteredClones
};
