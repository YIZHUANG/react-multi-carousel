import { getOriginalCounterPart } from './clones';
import { CarouselInternalState, CarouselProps } from '../types';
import { getSlidesToSlide } from './common';

interface NextSlidesTable {
  [key: number]: number;
}

/*
This produce a list of possibile slides that dot can go to next;
*/
function getLookupTableForNextSlides(
  numberOfDotsToShow: number,
  state: CarouselInternalState,
  props: CarouselProps,
  childrenArr: any[]
): NextSlidesTable {
  const table: NextSlidesTable = {};
  const slidesToSlide = getSlidesToSlide(state, props);
  Array(numberOfDotsToShow)
    .fill(0)
    .forEach((_, i) => {
      const nextSlide = getOriginalCounterPart(i, state, childrenArr);
      if (i === 0) {
        table[0] = nextSlide;
      } else {
        const prevIndex = i - 1;
        const now = table[prevIndex] + slidesToSlide!;
        table[i] = now;
      }
    });
  return table;
}

export { getLookupTableForNextSlides };
