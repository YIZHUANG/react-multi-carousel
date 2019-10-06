import React from "react";

import Carousel from "react-multi-carousel";
import classNames from "classnames";
import Avatar from "@material-ui/core/Avatar";

import articles from "./data.json";
import Card from "./card";
import "./carousel-with-custom-dots.css";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 3,
    slidesToSlide: 2,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 200
    },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 30
  }
};

const ArticleCard = ({ imageUrl, link, title }) => {
  return <Card link={link} image={imageUrl} headline={title} />;
};

class CarouselWithCustomDots extends React.PureComponent {
  render() {
    const { deviceType } = this.props;
    const children = articles
      .slice(0, 6)
      .map(article => <ArticleCard key={article.title} {...article} />);

    const images = articles.map(article => (
      <Avatar key={article.title} src={article.imageUrl} />
    ));

    const CustomDot = ({
      index,
      onClick,
      active
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
        deviceType={deviceType}
        ssr
        slidesToSlide={1}
        containerClass="carousel-with-custom-dots"
        responsive={responsive}
        partialVisbile
        infinite
        customDot={<CustomDot />}
      >
        {children}
      </Carousel>
    );
  }
}

export default CarouselWithCustomDots;
