import * as React from "react";
import { configure, shallow, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

import Carousel from "../../../lib/Carousel";
import { LeftArrow, RightArrow } from "../../../lib/Arrows";
import { CustomLeftArrow, CustomRightArrow } from "../../components/Arrows";
import Card from "../../components/Card";
import { responsive1 } from '../../common/responsive';
import { longData } from '../../common/data';

describe("With arrows", () => {
  test("Default arrow", () => {
    const wrapper = mount(
      <Carousel
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
    expect(wrapper.find(LeftArrow).find(".react-multiple-carousel__arrow--left").length).toBe(1);
    expect(wrapper.find(RightArrow).find(".react-multiple-carousel__arrow--right").length).toBe(1);
    wrapper.unmount();
  });
  test('Custom arrow', () => {
    const wrapper = mount(
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive1}
        slidesToSlide={2}
        infinite={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        minimumTouchDrag={0}
      >
      {longData.map(card => {
        return <Card {...card} />;
      })}
      </Carousel>
    );
    expect(wrapper.find(LeftArrow).find(CustomLeftArrow).length).toBe(1);
    expect(wrapper.find(RightArrow).find(CustomRightArrow).length).toBe(1);
    wrapper.unmount();
  });
});
