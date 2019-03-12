import React from "react";

import faker from "faker";
import Button from "@material-ui/core/Button";
import ReactGA from 'react-ga';

import { storiesOf, setAddon } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import JSX from 'storybook-addon-jsx';
import './style.css';
import Card from "./Card";
import Carousel from "../src";

setAddon(JSX);

if(typeof window !== 'undefined') {
  ReactGA.initialize('UA-135638821-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
}


const images = [
  'https://images.unsplash.com/photo-1552298930-24a24595de10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552300977-cbc8b08d95e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552250638-14e2a8e85123?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552320853-b14fa736e4c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552320853-b14fa736e4c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552311412-02930b11ce59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552285227-5a2f4b075a64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552264885-97cf191866e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552255096-2c689c9da505?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552318965-6e6be7484ada?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552311971-598182195748?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552256029-4e3aa83bbe2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
];
const texts = [
  'Appending currency sign to a purchase form in your e-commerce site using plain JavaScript.',
  'Fixing CSS load order/style.chunk.css incorrect in Nextjs',
  'React Carousel with Server Side Rendering Support – Part 1',
  'React Carousel with Server Side Rendering Support – Part 2',
  'Flutter Xcode couldn’t find any iOS App Development provisioning profiles'
]
const fakerData = Array(12)
  .fill(0)
  .map((item, index) => {
    const number = faker.random.number({min:0, max:3});
    return {
      image: images[index],
      headline: 'w3js.com - web front-end studio',
      description: texts[number]
    };
  });

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

const CustomLeftArrow = ({ onClick }) => (
  <Button
    onClick={() => onClick()}
    className='custom-left-arrow'
    variant="contained"
    size="medium"
    color="primary"
  >
    Prev
  </Button>
);
const CustomRightArrow = ({ onClick }) => {
  return (
    <Button
      className='custom-right-arrow'
      onClick={() => onClick()}
      variant="contained"
      size="medium"
      color="primary"
    >
      Next
    </Button>
  );
};

storiesOf("Carousel", module)
  .addWithJSX("With infinite mode", () => (
    <Carousel containerClassName='container' infinite={true} responsive={responsive}>
      {fakerData.map(card => {
        return <Card {...card} />;
      })}
    </Carousel>
  ))
  .addWithJSX("Without infinite mode", () => {
    return (
      <Carousel containerClassName='container' responsive={responsive}>
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("Custom arrow", () => {
    return (
      <Carousel
        infinite={true}
        containerClassName='container'
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("No drag on desktop", () => {
    return (
      <Carousel
        containerClassName='container'
        disableDrag
        infinite={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("No swipe on mobile", () => {
    return (
      <Carousel
        disableSwipeOnMobile
        containerClassName='container'
        infinite={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("Slide two at a time", () => {
    return (
      <Carousel containerClassName='container' slidesToSlide={2} responsive={responsive}>
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("auto play", () => {
    return (
      <Carousel autoPlay infinite autoPlaySpeed={1000} containerClassName='container' slidesToSlide={2} responsive={responsive}>
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
