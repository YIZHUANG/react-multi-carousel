import * as React from "react";
import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

// todos ...
configure({ adapter: new Adapter() });

import Carousel from "../src/Carousel";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

describe("Carousel", () => {
  test("it renders", () => {
    const wrapper = mount(
      <Carousel
        disableSwipeOnMobile
        disableDrag
        responsive={responsive}
        slidesToSlide={2}
        infinite={true}
        containerClassName="test-class"
        responsive={responsive}
      >
        <div>1</div>
        <div>2</div>
      </Carousel>
    );
    expect(wrapper.find(".test-class").length).toBe(1);
  });
});
