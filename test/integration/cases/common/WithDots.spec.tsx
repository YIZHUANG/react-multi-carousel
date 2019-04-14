import * as React from "react";
import { configure, shallow, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

import Carousel from "../../../../lib/Carousel";
import Dots from "../../../../lib/Dots";
import CustomDot from "../../components/CustomDot";
import Card from "../../components/Card";
import { responsive1 } from '../../common/responsive';
import { longData } from '../../common/data';

describe("With dots", () => {
  test("Default dots", () => {
    const wrapper = mount(
      <Carousel
        showDots={true}
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
    expect(wrapper.find(Dots).length).toBe(1);
    expect(wrapper.find('.react-multi-carousel-dot').length).toBe(12);
    wrapper.unmount();
  });
  test('Custom dots', () => {
    const wrapper = mount(
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive1}
        slidesToSlide={1}
        showDots={true}
        customDot={<CustomDot />}
        minimumTouchDrag={0}
      >
      {longData.map(card => {
        return <Card {...card} />;
      })}
      </Carousel>
    );
    expect(wrapper.find(CustomDot).length).toBe(12);
    wrapper.unmount();
  });
});
