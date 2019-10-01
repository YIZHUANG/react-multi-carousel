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
    currentSlide
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
A slide can have many clones, this produces a hash table structure for us to know 
What is the clone of a particular slide and where it is. Note: a slide can have multiple clones.
This is based on the getclones method below.
*/
interface Table {
  [key: number]: number;
}
function getOriginalIndexLookupTableByClones(
  slidesToShow: number,
  childrenArr: any[]
): Table {
  if (childrenArr.length > slidesToShow * 2) {
    const table: Table = {};
    const firstBeginningOfClones = childrenArr.length - slidesToShow * 2;
    const firstEndOfClones = childrenArr.length - firstBeginningOfClones;
    let firstCount = firstBeginningOfClones;
    for (let i = 0; i < firstEndOfClones; i++) {
      table[i] = firstCount;
      firstCount++;
    }
    const secondBeginningOfClones = childrenArr.length + firstEndOfClones;
    const secondEndOfClones =
      secondBeginningOfClones + childrenArr.slice(0, slidesToShow * 2).length;
    let secondCount = 0;
    for (let i = secondBeginningOfClones; i <= secondEndOfClones; i++) {
      table[i] = secondCount;
      secondCount++;
    }
    const originalStart = firstEndOfClones;
    const originalEnd = secondBeginningOfClones;
    let originalCounter = 0;
    for (let i = originalStart; i < originalEnd; i++) {
      table[i] = originalCounter;
      originalCounter++;
    }
    return table;
  } else {
    const table: Table = {};
    const totalSlides = childrenArr.length * 3; // the origianl children array gets clone 3 times.
    let count = 0;
    for (let i = 0; i < totalSlides; i++) {
      table[i] = count;
      count++;
      if (count === childrenArr.length) {
        count = 0;
      }
    }
    return table;
  }
}

/*
The current setting is if the length of the carousel item is larger than "slidesToShow * 2",
then we clone "slidesToShow * 2" amount of beginning and end items.

Otherwise, it means we only have a few items. Then we clone it 3 times.
*/
function getClones(slidesToShow: number, childrenArr: any[]) {
  if (childrenArr.length < slidesToShow ) {
    return childrenArr; 
  }
  if (childrenArr.length > slidesToShow * 2) {
    return [
      ...childrenArr.slice(
        childrenArr.length - slidesToShow * 2,
        childrenArr.length
      ),
      ...childrenArr,
      ...childrenArr.slice(0, slidesToShow * 2),
    ];
  }
  return [...childrenArr, ...childrenArr, ...childrenArr];
}

function getInitialSlideInInifteMode(slidesToShow:number, childrenArr: any[]) {
  if (childrenArr.length > slidesToShow * 2) {
    return slidesToShow * 2;
  } else {
    return childrenArr.length;
  }
}

/*
When the user sees the clones, we need to reset the position, and cancel the animation so that it
creates the infinite effects.

The if else statement here is based on the getClones method. Because it decides how many items we are cloning.
*/
function checkClonesPosition(
  { currentSlide, slidesToShow, itemWidth, totalItems }: CarouselInternalState,
  childrenArr: any[],
  props: CarouselProps
): {
  isReachingTheEnd: boolean;
  isReachingTheStart: boolean;
  nextSlide: number;
  nextPosition: number;
} {
  // the one is here for pre-swtiching the position just right before we are one more slide away from the end.
  // this gives us enough time to pre-clone the carousel items.
  let nextSlide = 0;
  let nextPosition = 0;
  let isReachingTheEnd;
  const isReachingTheStart = currentSlide === 0;
  const originalFirstSlide =
    childrenArr.length - (childrenArr.length - slidesToShow * 2);
  if (childrenArr.length < slidesToShow) {
    nextSlide = 0;
    nextPosition = 0;
    isReachingTheEnd = false;
  } else if (childrenArr.length > slidesToShow * 2) {
    isReachingTheEnd = currentSlide >= originalFirstSlide + childrenArr.length;
    if (isReachingTheEnd) {
      nextSlide = currentSlide - childrenArr.length;
      nextPosition = -(itemWidth * nextSlide);
    }
    if (isReachingTheStart) {
      nextSlide = originalFirstSlide + (childrenArr.length - slidesToShow * 2);
      nextPosition = -(itemWidth * nextSlide);
    }
  } else {
    isReachingTheEnd = currentSlide >= childrenArr.length * 2;
    if (isReachingTheEnd) {
      nextSlide = currentSlide - childrenArr.length;
      nextPosition = -(itemWidth * nextSlide);
    }
    if (isReachingTheStart) {
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
    isReachingTheEnd,
    isReachingTheStart,
    nextSlide,
    nextPosition,
  };
}

export {
  getOriginalCounterPart,
  getOriginalIndexLookupTableByClones,
  getClones,
  checkClonesPosition,
  getInitialSlideInInifteMode
};
