// import React from 'react';
import { getClones, getInitialSlideInInfiniteMode } from "./utils";

describe("Infinite mode for clones", () => {
  describe("getClones functionality", () => {
    test("Less than slidesToShow * 2", () => {
      const slidesToShow = 2;
      // const children = React.Children.toArray([1, 2, 3]);
      const children = [1, 2, 3];
      const initialSlide = getInitialSlideInInfiniteMode(slidesToShow, children);
      const clones = getClones(slidesToShow, children);
      expect(clones).toEqual([1, 2, 3, 1, 2, 3, 1, 2, 3]);
      expect(initialSlide).toEqual(3);
    });
    test("Large than slidesToShow * 2", () => {
      const slidesToShow = 2;
      const children = [1, 2, 3, 1, 2, 3];
      const initialSlide = getInitialSlideInInfiniteMode(slidesToShow, children);
      const clones = getClones(slidesToShow, children);
      expect(clones).toEqual([3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1]);
      expect(initialSlide).toEqual(4);
    });
    test("The same amount of slidesToShow * 2", () => {
      const slidesToShow = 2;
      const children = [1, 2, 3, 1];
      const initialSlide = getInitialSlideInInfiniteMode(slidesToShow, children);
      const clones = getClones(slidesToShow, children);
      expect(clones).toEqual([1, 2, 3, 1, 1, 2, 3, 1, 1, 2, 3, 1]);
      expect(initialSlide).toEqual(4);
    });
  });
});
