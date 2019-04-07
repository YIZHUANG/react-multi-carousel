

import * as React from "react";
import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

import Carousel from "../../../lib/Carousel";
import Card from "../../components/Card";
import { responsive1 } from "../../common/responsive";
import { longData } from "../../common/data";

describe("Resizing", () => {
  test("SlidesToShow", () => {
    const wrapper = mount(
      <Carousel
        ssr
        slidesToSlide={1}
        infinite={true}
        responsive={responsive1}
        minimumTouchDrag={0}
      >
        {longData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
    global.innerWidth = 360;
    global.dispatchEvent(new Event("resize"));
    const { totalItems, slidesToShow, deviceType } = wrapper.state();
    expect(slidesToShow).toBe(1);
    expect(deviceType).toBe("mobile");
    global.innerWidth = 700;
    global.dispatchEvent(new Event("resize"));
    expect(wrapper.state().slidesToShow).toBe(3);
    expect(wrapper.state().deviceType).toBe("tablet");
    wrapper.unmount();
  });
});
