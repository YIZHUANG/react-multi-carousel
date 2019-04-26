import { getClones } from "./utils";

describe("Infinite mode for clones", () => {
  describe("getClones functionality", () => {
    test("Less than slidesToShow * 2", () => {
      const slidesToShow = 2;
      const children = [1, 2, 3];
      const results = getClones(slidesToShow, children);
      expect(results).toEqual({
        clones: [1, 2, 3, 1, 2, 3, 1, 2, 3],
        initialSlide: 3
      });
    });
    test("Large than slidesToShow * 2", () => {
      const slidesToShow = 2;
      const children = [1, 2, 3, 1, 2, 3];
      const results = getClones(slidesToShow, children);
      expect(results).toEqual({
        clones: [3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1],
        initialSlide: 4
      });
    });
    test("The same amount of slidesToShow * 2", () => {
      const slidesToShow = 2;
      const children = [1, 2, 3, 1];
      const results = getClones(slidesToShow, children);
      expect(results).toEqual({
        clones: [1, 2, 3, 1, 1, 2, 3, 1, 1, 2, 3, 1],
        initialSlide: 4
      });
    });
  });
});
