import * as React from "react";
import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import Carousel from "../../../../lib/Carousel";
import Card from "../../components/Card";
import { responsive1 } from "../../common/responsive";
import { longData } from "../../common/data";

describe("RTL", () => {
  test("Direction is left to right", () => {
    const wrapper = mount(
      <Carousel
        ssr
        swipeable={false}
        draggable={false}
        responsive={responsive1}
        slidesToSlide={2}
        infinite={true}
        minimumTouchDrag={0}
      >
        {longData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
    expect(wrapper.find("[dir='ltr'].react-multi-carousel-list")).toHaveLength(
      1
    );
    wrapper.unmount();
  });
  test("Direction is right to left", () => {
    const wrapper = mount(
      <Carousel
        ssr
        swipeable={false}
        draggable={false}
        responsive={responsive1}
        slidesToSlide={2}
        infinite={true}
        minimumTouchDrag={0}
        rtl={true}
      >
        {longData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
    expect(wrapper.find("[dir='rtl'].react-multi-carousel-list")).toHaveLength(
      1
    );
    wrapper.unmount();
  });
});
