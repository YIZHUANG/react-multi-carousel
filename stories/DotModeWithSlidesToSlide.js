import React from "react";
import Carousel from "../src";
import classNames from "classnames";

import articles from "./data.json";
import Card from "./Card";
import "./CopyOfChildAsDots.css";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 3,
    slidesToSlide: 3,
    paritialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 2,
    slidesToSlide: 2,
    paritialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 200
    },
    items: 1,
    slidesToSlide: 1,
    paritialVisibilityGutter: 30
  }
};

const ArticleCard = ({ date, imageUrl, link, title, tags, content }) => {
  return <Card link={link} image={imageUrl} headline={title} />;
};


class DotModeWithSlidesToSlide extends React.PureComponent {
  render() {
    const children = articles
      .slice(0, 6)
      .map(article => <ArticleCard key={article.title} {...article} />);

    const CustomDot = ({
      index,
      onClick,
      active,
      carouselState: { currentSlide }
    }) => {
      return (
        <button
          onClick={e => {
            onClick();
            e.preventDefault();
          }}
          className={classNames("custom-dot", {
            "custom-dot--active": active
          })}
        >
          Dot {index + 1}
        </button>
      );
    };
    return (
      <Carousel
        showDots
        slidesToSlide={1}
        focusOnSelect
        containerClass="carousel-with-custom-dots"
        responsive={responsive}
        partialVisbile
        customDot={<CustomDot />}
        infinite
      >
        {children}
      </Carousel>
    );
  }
}

export default DotModeWithSlidesToSlide;
