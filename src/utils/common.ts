import {
  getPartialVisibilityGutter,
  getWidthFromDeviceType
} from "./elementWidth";
import { CarouselInternalState, CarouselProps } from "../types";

function notEnoughChildren(state: CarouselInternalState): boolean {
  const { slidesToShow, totalItems } = state;
  return totalItems < slidesToShow;
}

function getInitialState(
  state: CarouselInternalState,
  props: CarouselProps
): {
  shouldRenderOnSSR: boolean;
  flexBisis: number | string | undefined;
  domFullyLoaded: boolean;
  partialVisibilityGutter: number | undefined;
  shouldRenderAtAll: boolean;
} {
  const { domLoaded, slidesToShow, containerWidth, itemWidth } = state;
  // old wrongly spelt partialVisbile prop kept to not make changes breaking
  const { deviceType, responsive, ssr, partialVisbile, partialVisible } = props;
  let flexBisis: number | string | undefined;
  const domFullyLoaded = Boolean(
    domLoaded && slidesToShow && containerWidth && itemWidth
  );
  if (ssr && deviceType && !domFullyLoaded) {
    flexBisis = getWidthFromDeviceType(deviceType, responsive);
  }
  const shouldRenderOnSSR = Boolean(
    ssr && deviceType && !domFullyLoaded && flexBisis
  );
  const partialVisibilityGutter = getPartialVisibilityGutter(
    responsive,
    partialVisbile || partialVisible,
    deviceType,
    state.deviceType
  );
  const shouldRenderAtAll = shouldRenderOnSSR || domFullyLoaded;
  return {
    shouldRenderOnSSR,
    flexBisis,
    domFullyLoaded,
    partialVisibilityGutter,
    shouldRenderAtAll
  };
}

function getIfSlideIsVisbile(
  index: number,
  state: CarouselInternalState
): boolean {
  const { currentSlide, slidesToShow } = state;
  return index >= currentSlide && index < currentSlide + slidesToShow;
}

function getTransformForCenterMode(
  state: CarouselInternalState,
  props: CarouselProps,
  transformPlaceHolder?: number
) {
  const transform = transformPlaceHolder || state.transform;
  if (
    (!props.infinite && state.currentSlide === 0) ||
    notEnoughChildren(state)
  ) {
    return transform;
  } else {
    return transform + state.itemWidth / 2;
  }
}

function isInLeftEnd({ currentSlide }: CarouselInternalState): boolean {
  return !(currentSlide > 0);
}

function isInRightEnd({
  currentSlide,
  totalItems,
  slidesToShow
}: CarouselInternalState): boolean {
  return !(currentSlide + slidesToShow < totalItems);
}

function getTransformForPartialVsibile(
  state: CarouselInternalState,
  partialVisibilityGutter = 0,
  props: CarouselProps,
  transformPlaceHolder?: number
) {
  const { currentSlide, slidesToShow } = state;
  const isRightEndReach = isInRightEnd(state);
  const shouldRemoveRightGutter = !props.infinite && isRightEndReach;
  const baseTransform = transformPlaceHolder || state.transform;
  if (notEnoughChildren(state)) {
    return baseTransform;
  }
  const transform = baseTransform + currentSlide * partialVisibilityGutter;
  if (shouldRemoveRightGutter) {
    const remainingWidth =
      state.containerWidth -
      (state.itemWidth - partialVisibilityGutter) * slidesToShow;
    return transform + remainingWidth;
  }
  return transform;
}

function getTransform(
  state: CarouselInternalState,
  props: CarouselProps,
  transformPlaceHolder?: number
) {
  // old wrongly spelt partialVisbile prop kept to not make changes breaking
  const {
    partialVisbile,
    partialVisible,
    responsive,
    deviceType,
    centerMode
  } = props;
  const transform = transformPlaceHolder || state.transform;
  const partialVisibilityGutter = getPartialVisibilityGutter(
    responsive,
    partialVisbile || partialVisible,
    deviceType,
    state.deviceType
  );
  const currentTransform =
    partialVisible || partialVisbile
      ? getTransformForPartialVsibile(
          state,
          partialVisibilityGutter,
          props,
          transformPlaceHolder
        )
      : centerMode
      ? getTransformForCenterMode(state, props, transformPlaceHolder)
      : transform;
  return currentTransform;
}

function getSlidesToSlide(
  state: CarouselInternalState,
  props: CarouselProps
): number {
  const { domLoaded, slidesToShow, containerWidth, itemWidth } = state;
  const { deviceType, responsive } = props;
  let slidesToScroll = props.slidesToSlide || 1;
  const domFullyLoaded = Boolean(
    domLoaded && slidesToShow && containerWidth && itemWidth
  );
  const ssr = props.ssr && props.deviceType && !domFullyLoaded;
  if (ssr) {
    Object.keys(responsive).forEach(device => {
      const { slidesToSlide } = responsive[device];
      if (deviceType === device && slidesToSlide) {
        slidesToScroll = slidesToSlide;
      }
    });
  }
  if (domFullyLoaded) {
    Object.keys(responsive).forEach(item => {
      const { breakpoint, slidesToSlide } = responsive[item];
      const { max, min } = breakpoint;
      if (
        slidesToSlide &&
        window.innerWidth >= min &&
        window.innerWidth <= max
      ) {
        slidesToScroll = slidesToSlide;
      }
    });
  }
  return slidesToScroll;
}

export {
  isInLeftEnd,
  isInRightEnd,
  getInitialState,
  getIfSlideIsVisbile,
  getTransformForCenterMode,
  getTransformForPartialVsibile,
  notEnoughChildren,
  getSlidesToSlide,
  getTransform
};
