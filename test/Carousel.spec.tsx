/*
The test here is trying to cover as many edge cases as possibile.
*/

import * as React from "react";
import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

import Carousel from "../lib/Carousel";
import { CustomLeftArrow, CustomRightArrow } from './Arrows';
import fakerData from './fakeData';
import Card from './Card';

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
        minimumTouchDrag={0}
      >
        <div>1</div>
        <div>2</div>
      </Carousel>
    );
    expect(wrapper.find(".test-class").length).toBe(1);
    wrapper.unmount();
  });
  test('can pass custom arrows', () => {
    const wrapper = mount(
      <Carousel
        forSSR
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
        slidesToSlide={2}
        infinite={true}
        minimumTouchDrag={0}
        containerClassName="test-class"
        responsive={responsive}
      >
        <div>1</div>
        <div>2</div>
      </Carousel>
    );
    expect(wrapper.find(CustomLeftArrow).length).toBe(1);
    expect(wrapper.find(CustomRightArrow).length).toBe(1);
    expect(wrapper.find(CustomLeftArrow).props().onClick).toBeTruthy();
    expect(wrapper.find(CustomRightArrow).props().onClick).toBeTruthy();
    wrapper.unmount();
  });
  test('Has the correct initial state', () => {
    const wrapper = mount(
      <Carousel
        forSSR
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
        slidesToSlide={2}
        infinite={true}
        containerClassName="test-class"
        responsive={responsive}
        minimumTouchDrag={0}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
    global.innerWidth = 360;
    global.dispatchEvent(new Event('resize'));
    const { totalItems, slidesToShow, deviceType } = wrapper.state()
    //expect(totalItems).toBe(12)
    expect(slidesToShow).toBe(1)
    expect(deviceType).toBe('mobile')
    global.innerWidth = 700;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.state().slidesToShow).toBe(2)
    expect(wrapper.state().deviceType).toBe('tablet')
  })
  /*
  test('Click arrow moves items, two at a time', () => {
    const wrapper = mount(
      <Carousel
        forSSR
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
        slidesToSlide={2}
        infinite={true}
        containerClassName="test-class"
        responsive={responsive}
        minimumTouchDrag={0}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
    global.innerWidth = 700;
    global.dispatchEvent(new Event('resize'));
    wrapper.setState({ itemWidth: 200 });
    // to left, infinite
    wrapper.find(CustomLeftArrow).simulate('click')
    expect(wrapper.state().transform).toBe(-2000);
    wrapper.find(CustomRightArrow).simulate('click')
    // to right, infinite
    expect(wrapper.state().transform).toBe(0);
    wrapper.find(CustomRightArrow).simulate('click')
    expect(wrapper.state().transform).toBe(-400);
    wrapper.find(CustomRightArrow).simulate('click')
    expect(wrapper.state().transform).toBe(-800);
    wrapper.find(CustomLeftArrow).simulate('click')
    expect(wrapper.state().transform).toBe(-400);
    wrapper.find(CustomRightArrow).simulate('click')
    wrapper.find(CustomRightArrow).simulate('click')
    wrapper.find(CustomRightArrow).simulate('click')
    expect(wrapper.state().transform).toBe(-1600);
    wrapper.find(CustomLeftArrow).simulate('click')
    wrapper.find(CustomLeftArrow).simulate('click')
    wrapper.find(CustomLeftArrow).simulate('click')
    wrapper.find(CustomLeftArrow).simulate('click')
    wrapper.find(CustomLeftArrow).simulate('click')
    wrapper.find(CustomLeftArrow).simulate('click')
    expect(wrapper.state().transform).toBe(-1600);
  });
  test('disable drag on desktop', () => {
    const wrapper = mount(
      <Carousel
        forSSR
        disableDrag
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
        slidesToSlide={1}
        infinite={true}
        containerClassName="test-class"
        responsive={responsive}
      >
        {fakerData.map(card => {
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
    wrapper.find('ul').simulate('mouseUp')
    expect(wrapper.state().transform).toBe(0);
    wrapper.unmount();
  });
  test('mouse event slides items, one at a time', () => {
    const wrapper = mount(
      <Carousel
        forSSR
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
        slidesToSlide={1}
        infinite={true}
        containerClassName="test-class"
        responsive={responsive}
        minimumTouchDrag={0}
      >
        {fakerData.map(card => {
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
    expect(wrapper.state().transform).toBe(-600);
    // move left
    wrapper.find('ul').simulate('mousedown', {
      clientX: 100
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 200
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-200);
    // move left
    wrapper.find('ul').simulate('mousedown', {
      clientX: 50
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 60
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-0);
    // infinite - left
    wrapper.find('ul').simulate('mousedown', {
      clientX: 50
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 60
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-1800);
    // infinite - right
    wrapper.find('ul').simulate('mousedown', {
      clientX: 50
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 40
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(0);
    // move right
    wrapper.find('ul').simulate('mousedown', {
      clientX: 50
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-200);
    // move to bottom 4 of the carousel - right, to test if oversliding is prevented.
    wrapper.find('ul').simulate('mousedown', {
      clientX: 1200
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-1600);
    // even though the move-right-action way pass the initial position, but it doesn't overslide out of the container of the carousel
    wrapper.find('ul').simulate('mousedown', {
      clientX: 1600
    })
    wrapper.find('ul').simulate('mousemove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('mouseup')
    expect(wrapper.state().transform).toBe(-1800);
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
    expect(wrapper.state().transform).toBe(0);
    expect(wrapper.state().currentSlide).toBe(0);
  })
  test('touch event, the same as the mouse event with the same test cases', () => {
    const wrapper = mount(
      <Carousel
        forSSR
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
        slidesToSlide={1}
        infinite={true}
        containerClassName="test-class"
        responsive={responsive}
        minimumTouchDrag={0}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
    global.innerWidth = 1200;
    global.dispatchEvent(new Event('resize'));
    wrapper.setState({ itemWidth: 200 });
    // move right
    wrapper.find('ul').simulate('touchStart', {
      clientX: 100
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: -200
    })
    wrapper.find('ul').simulate('touchEnd')
    expect(wrapper.state().transform).toBe(-600);
    // move left
    wrapper.find('ul').simulate('touchStart', {
      clientX: 100
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: 200
    })
    wrapper.find('ul').simulate('touchEnd')
    expect(wrapper.state().transform).toBe(-200);
    // move left
    wrapper.find('ul').simulate('touchStart', {
      clientX: 50
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: 60
    })
    wrapper.find('ul').simulate('touchEnd')
    expect(wrapper.state().transform).toBe(-0);
    // infinite - left
    wrapper.find('ul').simulate('touchStart', {
      clientX: 50
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: 60
    })
    wrapper.find('ul').simulate('touchEnd')
    expect(wrapper.state().transform).toBe(-1800);
    // infinite - right
    wrapper.find('ul').simulate('touchStart', {
      clientX: 50
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: 40
    })
    wrapper.find('ul').simulate('touchEnd')
    expect(wrapper.state().transform).toBe(0);
    // move right
    wrapper.find('ul').simulate('touchStart', {
      clientX: 50
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('touchEnd')
    expect(wrapper.state().transform).toBe(-200);
    // move to bottom 4 of the carousel - right, to test if oversliding is prevented.
    wrapper.find('ul').simulate('touchStart', {
      clientX: 1200
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('touchEnd')
    expect(wrapper.state().transform).toBe(-1600);
    // even though the move-right-action way pass the initial position, but it doesn't overslide out of the container of the carousel
    wrapper.find('ul').simulate('touchStart', {
      clientX: 1600
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('touchEnd')
    expect(wrapper.state().transform).toBe(-1800);
    // now do the same for previous action.
    // move to first 1 slide of the Carousel
    wrapper.find('ul').simulate('touchStart', {
      clientX: 11
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('touchEnd')
     // move to first 3 slides of the Carousel
    wrapper.find('ul').simulate('touchStart', {
      clientX: 500
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: 10
    })
    wrapper.find('ul').simulate('touchEnd')
    // move to left as much as it can, but it doesn't overslide
    wrapper.find('ul').simulate('touchStart', {
      clientX: 10
    })
    wrapper.find('ul').simulate('touchMove', {
      clientX: 1000
    })
    wrapper.find('ul').simulate('touchEnd')
    expect(wrapper.state().transform).toBe(0);
    expect(wrapper.state().currentSlide).toBe(0);
  });
  */
});
