import * as React from "react";

import { CarouselInternalState, CarouselProps } from "./types";
import { getInitialState, getIfSlideIsVisbile } from "./utils";

interface CarouselItemsProps {
  props: CarouselProps;
  state: CarouselInternalState;
  clones: any[];
  goToSlide: (index: number, skipCallbacks?: boolean) => void;
}

const CarouselItems = ({
  props,
  state,
  goToSlide,
  clones
}: CarouselItemsProps) => {
  const { itemWidth } = state;
  const { children, infinite, itemClass, partialVisbile } = props;
  const {
    flexBisis,
    shouldRenderOnSSR,
    domFullyLoaded,
    partialVisibilityGutter,
    shouldRenderAtAll
  } = getInitialState(state, props);
  if (!shouldRenderAtAll) {
    return null;
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
              style={{
                flex: shouldRenderOnSSR ? `1 0 ${flexBisis}%` : "auto",
                position: "relative",
                width: domFullyLoaded
                  ? `${
                      partialVisbile && partialVisibilityGutter
                        ? itemWidth - partialVisibilityGutter
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
          );
        }
      )}
    </>
  );
};

export default CarouselItems;
