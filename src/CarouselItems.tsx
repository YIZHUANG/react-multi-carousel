import * as React from "react";

import { CarouselInternalState, CarouselProps } from "./types";
import { getInitialState, getIfSlideIsVisbile } from "./utils";

interface CarouselItemsProps {
  props: CarouselProps;
  state: CarouselInternalState;
  goToSlide: (index: number) => void;
}

const CarouselItems = ({
  props,
  state,
  goToSlide
}: CarouselItemsProps): any => {
  const { itemWidth, clones, currentSlide } = state;
  const { children, infinite, itemClass, partialVisbile } = props;
  const {
    flexBisis,
    shouldRenderOnSSR,
    domFullyLoaded,
    paritialVisibilityGutter
  } = getInitialState(state, props);
  if (infinite) {
    return clones.map((child: any, index: number) => (
      <li
        key={index}
        onClick={() => {
          if (props.focusOnSelect) {
            goToSlide(index);
          }
        }}
        aria-hidden={getIfSlideIsVisbile(index, state) ? "false" : "true"}
        data-index={index}
        style={{
          flex: shouldRenderOnSSR ? `1 0 ${flexBisis}%` : "auto",
          position: "relative",
          width: domFullyLoaded
            ? `${
                partialVisbile && paritialVisibilityGutter
                  ? itemWidth - paritialVisibilityGutter
                  : itemWidth
              }px`
            : "auto"
        }}
        className={`react-multi-carousel-item ${
          getIfSlideIsVisbile(index, state)
            ? "react-multi-carousel-item--active"
            : ""
        } ${itemClass}`}
      >
        {child}
      </li>
    ));
  }
  return React.Children.toArray(children).map((child, index) => (
    <li
      key={index}
      data-index={index}
      onClick={() => {
        if (props.focusOnSelect) {
          goToSlide(index);
        }
      }}
      aria-hidden={getIfSlideIsVisbile(index, state) ? "false" : "true"}
      style={{
        flex: shouldRenderOnSSR ? `1 0 ${flexBisis}%` : "auto",
        position: "relative",
        width: domFullyLoaded
          ? `${
              partialVisbile && paritialVisibilityGutter
                ? itemWidth - paritialVisibilityGutter
                : itemWidth
            }px`
          : "auto"
      }}
      className={`react-multi-carousel-item ${
        getIfSlideIsVisbile(index, state)
          ? "react-multi-carousel-item--active"
          : ""
      } ${itemClass}`}
    >
      {child}
    </li>
  ));
};

export default CarouselItems;
