

import * as React from "react";
import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

import { LeftArrow, RightArrow } from "../../../lib/Arrows";
import { CustomLeftArrow, CustomRightArrow } from "../../components/Arrows";
import Carousel from "../../../lib/Carousel";
import Card from "../../components/Card";
import { longData } from "../../common/data";

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
describe("Control functionalities", () => {
  test('Next and Previous functionalities', () => {
    const wrapper = mount(
      <Carousel
        ssr
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
        slidesToSlide={1}
        responsive={responsive}
        minimumTouchDrag={0}
      >
      {longData.map(card => {
        return <Card {...card} />;
      })}
      </Carousel>
    );
    global.innerWidth = 1200;
    global.dispatchEvent(new Event('resize'));
    wrapper.setState({ itemWidth: 200 });
    // move right
    wrapper.find('ul').simulate('mousedown', {
      clientX: 100
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: -200
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-400);
    // move left
    wrapper.find('ul').simulate('mousedown', {
      clientX: 100
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 200
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-400);
    // move left
    wrapper.find('ul').simulate('mousedown', {
      clientX: 50
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 60
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-400);
    // infinite - left
    wrapper.find('ul').simulate('mousedown', {
      clientX: 50
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 60
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-400);
    // infinite - right
    wrapper.find('ul').simulate('mousedown', {
      clientX: 50
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 40
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-400);
    // move right
    wrapper.find('ul').simulate('mousedown', {
      clientX: 50
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-400);
    // move to bottom 4 of the carousel - right, to test if oversliding is prevented.
    wrapper.find('ul').simulate('mousedown', {
      clientX: 1200
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-400);
    // even though the move-right-action way pass the initial position, but it doesn't overslide out of the container of the carousel
    wrapper.find('ul').simulate('mousedown', {
      clientX: 1600
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-400);
    // now do the same for previous action.
    // move to first 1 slide of the Carousel
    wrapper.find('ul').simulate('mousedown', {
      clientX: 11
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('mouseup')
     // move to first 3 slides of the Carousel
    wrapper.find('ul').simulate('mousedown', {
      clientX: 500
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('mouseup')
    // move to left as much as it can, but it doesn't overslide
    wrapper.find('ul').simulate('mousedown', {
      clientX: 10
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 1000
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-400);
    expect(wrapper.state().currentSlide).toBe(2);
    wrapper.unmount();
  })
});
