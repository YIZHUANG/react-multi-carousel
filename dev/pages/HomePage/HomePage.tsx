import React from "react";
import faker from "faker";
import MobileDetect from "mobile-detect";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import Card from "../../components/card";
import Image from "../../components/image";
import Carousel from "../../../src";

import Link from "next/link";

const styles = theme => ({
  root: {
    textAlign: "center"
  },
  title: {
    maxWidth: 400,
    margin: "auto",
    marginTop: 10
  }
});

class Index extends React.Component {
  static getInitialProps({ req, isServer }) {
    let userAgent;
    let deviceType;
    if (req) {
      userAgent = req.headers["user-agent"];
    } else {
      userAgent = navigator.userAgent;
    }
    const md = new MobileDetect(userAgent);
    if (md.tablet()) {
      deviceType = "tablet";
    } else if (md.mobile()) {
      deviceType = "mobile";
    } else {
      deviceType = "desktop";
    }
    return { deviceType };
  }
  state = { isMoving: false }
  render() {
    const { classes } = this.props;
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
        return {
          image: images[index],
          headline: 'w3js -> web front-end studio',
          description: texts[index] || texts[0]
        };
      });
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: 80
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        partialVisibilityGutter: 30
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 30
      }
    };
    return (
      <div className={classes.root}>
        <Carousel
          /*
          disableSwipeOnMobile
          disableDrag
          */
          responsive={responsive}
          ssr
          showDots
          centerMode
          arrows={false}
          infinite={true}
          beforeChange={() => this.setState({ isMoving: true })}
          afterChange={() => this.setState({ isMoving: false })}
          containerClass="container"
          slidesToSlide={1}
          deviceType={this.props.deviceType}
        >
          {fakerData.map((card, index) => {
            return <Card index={index} isMoving={this.state.isMoving} {...card} />;
          })}
        </Carousel>

        <Carousel
          /*
          disableSwipeOnMobile
          disableDrag
          */
          responsive={responsive}
          ssr
          showDots
          minimumTouchDrag={80}
          slidesToSlide={1}

          partialVisbile={true}
          //infinite={true}
          containerClass="container-with-dots"
          itemClass="image-item"
          deviceType={this.props.deviceType}
          rewind={true}
        >
          {fakerData.slice(0, 5).map(card => {
            return <Image url={card.image} alt={card.headline} />;
          })}
        </Carousel>

        <Carousel
          responsive={responsive}
          ssr
          showDots
          minimumTouchDrag={80}
          slidesToSlide={1}
          partialVisible={true}
          containerClass="container-with-dots"
          itemClass="image-item"
          deviceType={this.props.deviceType}
          rewind={true}
          rtl={true}
        >
          {fakerData.slice(0, 5).map(card => {
            return <Image url={card.image} alt={card.headline} />;
          })}
        </Carousel>
      </div>
    );
  }
}

export default withStyles(styles)(Index);
