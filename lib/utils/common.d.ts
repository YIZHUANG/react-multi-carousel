import { CarouselInternalState, CarouselProps } from "../types";
declare function getInitialState(state: CarouselInternalState, props: CarouselProps): {
    shouldRenderOnSSR: boolean;
    flexBisis: number | string | undefined;
    domFullyLoaded: boolean;
    paritialVisibilityGutter: number | undefined;
};
declare function getIfSlideIsVisbile(index: number, state: CarouselInternalState): boolean;
export { getInitialState, getIfSlideIsVisbile };
