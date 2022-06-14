import React from "react";

import faker from "faker";
import Button from "@material-ui/core/Button";
import ReactGA from "react-ga";

import { storiesOf, setAddon } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import JSX from "storybook-addon-jsx";
import "./style.css";
import Card from "./Card";
import {
  CustomLeftArrow,
  CustomRightArrow,
  CustomButtonGroup,
  CustomButtonGroupAsArrows
} from "./CustomArrows";
import CopyOfChildAsDots from "./CopyOfChildAsDots";
import CustomDot from "./CustomDot";
import Image from "./CustomImage";
import Carousel from "../src";
import WithScrollbar from "./WithScrollbar";
import DotModeWithSlidesToSlide from "./DotModeWithSlidesToSlide";
import "../src/assets/styles.css";

setAddon(JSX);

if (typeof window !== "undefined") {
  ReactGA.initialize("UA-135638821-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const images = [
  "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
];
const texts = [
  "Appending currency sign to a purchase form in your e-commerce site using plain JavaScript.",
  "Fixing CSS load order/style.chunk.css incorrect in Nextjs",
  "React Carousel with Server Side Rendering Support – Part 1",
  "React Carousel with Server Side Rendering Support – Part 2",
  "Flutter Xcode couldn’t find any iOS App Development provisioning profiles"
];
const fakerData = Array(12)
  .fill(0)
  .map((item, index) => {
    const number = faker.random.number({ min: 0, max: 3 });
    return {
      image: images[index],
      headline: "w3js.com - web front-end studio",
      description: texts[number]
    };
  });

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40 // this is optional if you are not using partialVisible props
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30 // this is optional if you are not using partialVisible props
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30 // this is optional if you are not using partialVisible props
  }
};

const responsiveImageHero = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

storiesOf("Carousel", module)
  .addWithJSX("With infinite mode", () => (
    <Carousel
      containerClass="container-with-dots"
      infinite={true}
      responsive={responsive}
    >
      {fakerData.map(card => {
        return <Card {...card} />;
      })}
    </Carousel>
  ))
  .addWithJSX("Without infinite mode", () => {
    return (
      <Carousel containerClass="container" responsive={responsive}>
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
        containerClass="container"
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
        containerClass="container"
        draggable={false}
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
        swipeable={false}
        containerClass="container"
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
      <Carousel
        containerClass="container"
        slidesToSlide={2}
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("With custom control functionality", () => {
    return <WithScrollbar />;
  })
  .addWithJSX("Auto play with rewind in non-infinite mode", () => {
    return (
      <Carousel
        autoPlay
        rewind
        autoPlaySpeed={1000}
        containerClass="container-with-dots"
        slidesToSlide={2}
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("Auto play in infinite mode", () => {
    return (
      <Carousel
        autoPlay
        infinite
        autoPlaySpeed={1000}
        containerClass="container-with-dots"
        slidesToSlide={2}
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("Auto play custom animation", () => {
    return (
      <Carousel
        autoPlay
        autoPlaySpeed={1}
        infinite={true}
        customTransition="all 1s linear"
        transitionDuration={1000}
        containerClass="container-with-dots"
        slidesToSlide={2}
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("With dots", () => {
    return (
      <Carousel
        showDots
        infinite
        containerClass="container"
        slidesToSlide={1}
        responsive={responsiveImageHero}
      >
        {images.slice(0, 5).map(image => {
          return (
            <img
              draggable={false}
              src={image}
              style={{
                width: "100%",
                display: "block",
                height: "100%",
                margin: "auto"
              }}
            />
          );
        })}
      </Carousel>
    );
  })
  .addWithJSX(
    "With dots rendered outside of/after list container within custom div for styling",
    () => {
      return (
        <div style={{ position: "relative", paddingBottom: "30px" }}>
          <Carousel
            showDots
            renderDotsOutside
            infinite
            containerClass="container"
            slidesToSlide={1}
            responsive={responsiveImageHero}
          >
            {images.slice(0, 5).map(image => {
              return (
                <img
                  draggable={false}
                  src={image}
                  style={{
                    width: "100%",
                    display: "block",
                    height: "100%",
                    margin: "auto"
                  }}
                />
              );
            })}
          </Carousel>
        </div>
      );
    }
  )
  .addWithJSX("Custom dots", () => {
    return (
      <Carousel
        showDots
        customDot={<CustomDot />}
        infinite
        containerClass="container"
        slidesToSlide={1}
        responsive={responsiveImageHero}
      >
        {images.slice(0, 5).map(image => {
          return (
            <img
              draggable={false}
              src={image}
              style={{
                width: "100%",
                display: "block",
                height: "100%",
                margin: "auto"
              }}
            />
          );
        })}
      </Carousel>
    );
  })
  .addWithJSX("Copy of Carousel items as Custom dots", () => {
    return <CopyOfChildAsDots />;
  })
  .addWithJSX("With aria hidden, inspect me in the debugger", () => {
    return (
      <Carousel
        showDots
        infinite
        containerClass="container"
        slidesToSlide={1}
        responsive={responsiveImageHero}
      >
        {images.slice(0, 5).map((url, ...rest) => {
          return <Image url={url} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("With afterChange function, a callback function", () => {
    return (
      <Carousel
        showDots
        infinite
        containerClass="container"
        slidesToSlide={1}
        afterChange={(previousSlide, { currentSlide, onMove }) =>
          alert(
            "previous slide is " +
              previousSlide +
              " currentSlide is " +
              currentSlide
          )
        }
        responsive={responsiveImageHero}
      >
        {images.slice(0, 5).map((url, ...rest) => {
          return <Image url={url} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("With beforeChange function, a callback function", () => {
    return (
      <Carousel
        showDots
        infinite
        containerClass="container"
        slidesToSlide={1}
        beforeChange={(nextSlide, { currentSlide, onMove }) =>
          alert(
            "previous slide is " + currentSlide + " nextSlide is " + nextSlide
          )
        }
        responsive={responsiveImageHero}
      >
        {images.slice(0, 5).map((url, ...rest) => {
          return <Image url={url} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("With partially visibie on next items", () => {
    return (
      <Carousel
        infinite
        partialVisible
        containerClass="container"
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("With centerMode, partially visibie on both direction", () => {
    return (
      <Carousel
        centerMode
        infinite
        containerClass="container"
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("With custom button group", () => {
    return (
      <Carousel
        arrows={false}
        containerClass="container-padding-bottom"
        customButtonGroup={<CustomButtonGroup />}
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("Render custom button group outside of the container", () => {
    return (
      <div
        style={{
          position: "relative"
        }}
      >
        <Carousel
          arrows={false}
          renderButtonGroupOutside
          containerClass="container-padding-bottom"
          customButtonGroup={<CustomButtonGroupAsArrows />}
          responsive={responsive}
        >
          {fakerData.map(card => {
            return <Card {...card} />;
          })}
        </Carousel>
      </div>
    );
  })
  .addWithJSX("With focusOnSelect prop", () => {
    return (
      <Carousel
        focusOnSelect
        showDots
        arrows={false}
        infinite
        containerClass="container-padding-bottom"
        responsive={responsive}
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  })
  .addWithJSX("Responsive dot mode", () => {
    return <DotModeWithSlidesToSlide />;
  })
  .addWithJSX("RTL", () => {
    return (
      <Carousel
        containerClass="container"
        focusOnSelect
        showDots
        autoPlay={false}
        partialVisible={true}
        responsive={responsive}
        rtl
      >
        {fakerData.map(card => {
          return <Card {...card} />;
        })}
      </Carousel>
    );
  });
