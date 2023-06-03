import * as React from "react";

import {
  CarouselInternalState,
  CarouselProps,
  SkipCallbackOptions
} from "./types";
import { getInitialState, getIfSlideIsVisbile } from "./utils";

interface CarouselItemsProps {
  props: CarouselProps;
  state: CarouselInternalState;
  clones: any[];
  notEnoughChildren: boolean;
  goToSlide: (index: number, skipCallbacks?: SkipCallbackOptions) => void;
}

const CarouselItems = ({
  props,
  state,
  goToSlide,
  clones
}: CarouselItemsProps) => {
  const { itemWidth } = state;
  const {
    children,
    infinite,
    itemClass,
    itemAriaLabel,
    partialVisbile
  } = props;
  const {
    flexBisis,
    shouldRenderOnSSR,
    domFullyLoaded,
    shouldRenderAtAll
  } = getInitialState(state, props);
  if (!shouldRenderAtAll) {
    return null;
  }
  if (partialVisbile) {
    console.warn(
      'WARNING: Please correct props name: "partialVisible" as old typo will be removed in future versions!'
    );
  }

  return (
    <>
      {(infinite ? clones : React.Children.toArray(children)).map(
        (child, index) => {
          return (
            <li
              key={index}
              data-index={index}
              onClick={() => {
                if (props.focusOnSelect) {
                  goToSlide(index);
                }
              }}
              aria-hidden={getIfSlideIsVisbile(index, state) ? "false" : "true"}
              aria-label={
                itemAriaLabel
                  ? itemAriaLabel
                  : child.props.ariaLabel
                  ? child.props.ariaLabel
                  : null
              }
              style={{
                flex: shouldRenderOnSSR ? `1 0 ${flexBisis}%` : "auto",
                position: "relative",
                width: domFullyLoaded ? `${itemWidth}px` : "auto"
              }}
              className={`react-multi-carousel-item ${
                getIfSlideIsVisbile(index, state)
                  ? "react-multi-carousel-item--active"
                  : ""
              } ${itemClass}`}
            >
              {child}
            </li>
          );
        }
      )}
    </>
  );
};

export default CarouselItems;
