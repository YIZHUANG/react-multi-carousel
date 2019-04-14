import * as React from "react";
import { configure, shallow, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

import Carousel from "../../../../lib/Carousel";
import { LeftArrow, RightArrow } from "../../../../lib/Arrows";
import { CustomLeftArrow, CustomRightArrow } from "../../components/Arrows";
import Card from "../../components/Card";
import { responsive1 } from '../../common/responsive';
import { longData, shortData } from '../../common/data';

/*
The current setting is if the length of the carousel item is larger than "slidesToShow * 2",
then we clone "slidesToShow * 2" amount of beginning and end items.
Otherwise, it means we only have a few items. Then we clone it 3 times.
*/
describe("Clones", () => {
  test("Gets clones for small amount of data 3 items the length", () => {
    const wrapper = mount(
      <Carousel
        responsive={responsive1}
        infinite={true}
        minimumTouchDrag={0}
      >
      {shortData.map(card => {
        return <Card {...card} />;
      })}
      </Carousel>
    );
    console.log(wrapper.state().clones.length);
    expect(wrapper.state().clones.length).toBe(shortData.length * 3);
    wrapper.unmount();
  });
  test("Gets clones for large amount of data for beginning and end set of items", () => {
    const wrapper = mount(
      <Carousel
        responsive={responsive1}
        infinite={true}
        minimumTouchDrag={0}
      >
      {longData.map(card => {
        return <Card {...card} />;
      })}
      </Carousel>
    );
    expect(wrapper.state().clones.length).toBe(24);
    wrapper.unmount();
  });
});
