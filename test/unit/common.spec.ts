import {
  getInitialState,
  getIfSlideIsVisbile
} from "./utils";

describe("common utils", () => {
  describe("getIfSlideIsVisbile", () => {
    test("gets slide visibile", () => {
      const isVisible = getIfSlideIsVisbile(0, {
        currentSlide: 0,
        slidesToShow: 3
      });
      expect(isVisible).toBe(true);
    });
    test("gets slide hidden", () => {
      const isVisible = getIfSlideIsVisbile(0, {
        currentSlide: 4,
        slidesToShow: 3
      });
      expect(isVisible).toBe(false);
    });
  });
  describe("getInitialState", () => {
    test("ssr", () => {
      const state = {
        domLoaded: false
      };
      const props = {
        ssr: true,
        deviceType: "desktop",
        responsive: {
          desktop: {
            breakpoint: {
              min: 1000,
              max: 1200
            },
            items: 3
          }
        }
      };
      const initialState = getInitialState(state, props);
      expect(initialState).toEqual({
        shouldRenderOnSSR: true,
        flexBisis: "33.3",
        domFullyLoaded: false,
        paritialVisibilityGutter: 0
      });
    });
    test("no ssr", () => {
      const state = {
        domLoaded: true,
        itemWidth: 300,
        slidesToShow: 3,
        containerWidth: 1000
      };
      const props = {
        ssr: true,
        deviceType: "desktop",
        responsive: {
          desktop: {
            breakpoint: {
              min: 1000,
              max: 1200
            },
            items: 3
          }
        }
      };
      const initialState = getInitialState(state, props);
      expect(initialState).toEqual({
        shouldRenderOnSSR: false,
        flexBisis: undefined,
        domFullyLoaded: true,
        paritialVisibilityGutter: 0
      });
    });
  });
});
