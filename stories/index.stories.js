import React from "react";

import faker from "faker";
import Button from "@material-ui/core/Button";

import { storiesOf, setAddon } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import JSX from 'storybook-addon-jsx';
import './style.css';
import Card from "./Card";
import Carousel from "../src";

setAddon(JSX);

const images = [
  faker.image.imageUrl(),
  faker.image.fashion(),
  faker.image.people(),
  faker.image.nature(),
  faker.image.city(),
  faker.image.abstract(),
  faker.image.animals(),
  faker.image.business(),
  faker.image.cats(),
  faker.image.food(),
  faker.image.nightlife(),
  faker.image.fashion()
];
const fakerData = Array(12)
  .fill(0)
  .map((item, index) => {
    return {
      image: images[index],
      headline: faker.lorem.sentence(),
      description: faker.lorem.sentences(3, 3)
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
  .addWithJSX("Slide two at a time", () => {
    return (
      <Carousel containerClassName='container' slidesToSlide={2} responsive={responsive}>
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
