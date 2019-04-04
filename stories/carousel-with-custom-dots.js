import React from "react";
import Carousel from "../src";
import classNames from "classnames";
import Avatar from "@material-ui/core/Avatar";

import articles from "./data.json";
import Card from "./Card";
import "./carousel-with-custom-dots.css";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 3,
    paritialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 2,
    paritialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 200
    },
    items: 1,
    paritialVisibilityGutter: 30
  }
};

const ArticleCard = ({ date, imageUrl, link, title, tags, content }) => {
  return <Card link={link} image={imageUrl} headline={title} />;
};


class CarouselWithCustomDots extends React.PureComponent {
  render() {
    const children = articles
      .slice(0, 6)
      .map(article => <ArticleCard key={article.title} {...article} />);

    const images = articles.map(article => (
      <Avatar key={article.title} src={article.imageUrl} />
    ));

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
          {React.Children.toArray(images)[index]}
        </button>
      );
    };
    return (
      <Carousel
        showDots
        slidesToSlide={1}
        containerClass="carousel-with-custom-dots"
        responsive={responsive}
        partialVisbile="right"
        infinite
        customDot={<CustomDot />}
      >
        {children}
      </Carousel>
    );
  }
}

export default CarouselWithCustomDots;
