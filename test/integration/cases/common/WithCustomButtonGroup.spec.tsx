import * as React from "react";
import { configure, shallow, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

import Carousel from "../../../../lib/Carousel";
import { CustomButtonGroup } from "../../components/Arrows";
import Card from "../../components/Card";
import { responsive1 } from '../../common/responsive';
import { longData } from '../../common/data';

describe("Custom button group", () => {
  test("It renders and has the props", () => {
    const wrapper = mount(
      <Carousel
        arrows={false}
        swipeable={false}
        draggable={false}
        responsive={responsive1}
        slidesToSlide={1}
        customButtonGroup={<CustomButtonGroup />}
      >
      {longData.map(card => {
        return <Card {...card} />;
      })}
      </Carousel>
    );
    expect(wrapper.find(CustomButtonGroup).length).toBe(1);
    const { previous, next } = wrapper.find(CustomButtonGroup).props();
    expect(typeof previous).toBe('function')
    expect(typeof next).toBe('function')
    wrapper.unmount();
  });
});
