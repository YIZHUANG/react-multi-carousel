import { populateSlidesOnMouseTouchMove } from "./utils";

describe("Mouse move and touch functionality", () => {
  test("Over sliding when moving right", () => {
    const state = {
      slidesToShow: 3,
      currentSlide: 2,
      itemWidth: 250,
      totalItems: 4,
      slidesHavePassed: 2,
      transform: 2000
    };
    const props = {
      slidesToSlide: 1
    };
    const initialPosition = 1000;
    const lastPosition = 1800;
    const clientX = 500;
    const results = populateSlidesOnMouseTouchMove(
      state,
      props,
      initialPosition,
      lastPosition,
      clientX
    );
    expect(results).toEqual({
      direction: "right",
      nextPosition: undefined,
      canContinue: false
    });
  });
  test("Over sliding when moving left", () => {
    const state = {
      slidesToShow: 3,
      currentSlide: 2,
      itemWidth: 250,
      totalItems: 4,
      slidesHavePassed: 2,
      transform: 2000
    };
    const props = {
      slidesToSlide: 1
    };
    const initialPosition = 1000;
    const lastPosition = 1800;
    const clientX = 1500;
    const results = populateSlidesOnMouseTouchMove(
      state,
      props,
      initialPosition,
      lastPosition,
      clientX
    );
    expect(results).toEqual({
      direction: "left",
      nextPosition: undefined,
      canContinue: false
    });
  });
  test("Moving right normally", () => {
    const state = {
      slidesToShow: 3,
      currentSlide: 2,
      itemWidth: 250,
      totalItems: 8,
      slidesHavePassed: 2,
      transform: 2000
    };
    const props = {
      slidesToSlide: 1
    };
    const initialPosition = 1000;
    const lastPosition = 1800;
    const clientX = 500;
    const results = populateSlidesOnMouseTouchMove(
      state,
      props,
      initialPosition,
      lastPosition,
      clientX
    );
    expect(results).toEqual({
      direction: "right",
      nextPosition: 700,
      canContinue: true
    });
  });
  test("Moving left normally", () => {
    const state = {
      slidesToShow: 6,
      currentSlide: 5,
      itemWidth: 250,
      totalItems: 8,
      slidesHavePassed: 2,
      transform: 600
    };
    const props = {
      slidesToSlide: 1
    };
    const initialPosition = 1000;
    const lastPosition = 2500;
    const clientX = 1200;
    const results = populateSlidesOnMouseTouchMove(
      state,
      props,
      initialPosition,
      lastPosition,
      clientX
    );
    expect(results).toEqual({
      direction: "left",
      nextPosition: -700,
      canContinue: true
    });
  });
});
