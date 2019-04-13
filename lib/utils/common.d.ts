import { CarouselInternalState, CarouselProps } from "../types";
declare function getInitialState(state: CarouselInternalState, props: CarouselProps): {
    shouldRenderOnSSR: boolean;
    flexBisis: number | string | undefined;
    domFullyLoaded: boolean;
    paritialVisibilityGutter: number | undefined;
};
declare function getIfSlideIsVisbile(index: number, state: CarouselInternalState): boolean;
declare function getTransformForCenterMode(state: CarouselInternalState, props: CarouselProps): number;
declare function getTransformForPartialVsibile(state: CarouselInternalState, paritialVisibilityGutter?: number): number;
export { getInitialState, getIfSlideIsVisbile, getTransformForCenterMode, getTransformForPartialVsibile };
