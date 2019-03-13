import React from "react";
import faker from "faker";
import MobileDetect from "mobile-detect";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import Card from "../components/card";
import Image from "../components/image";
import Carousel from "react-multi-carousel";
import "../style.css";

import Link from "next/link";

const styles = theme => ({
  root: {
    textAlign: "center"
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
  render() {
    const { classes } = this.props;
    const images = [
      "https://images.unsplash.com/photo-1552298930-24a24595de10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552300977-cbc8b08d95e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552250638-14e2a8e85123?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552320853-b14fa736e4c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552320853-b14fa736e4c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552311412-02930b11ce59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552285227-5a2f4b075a64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552264885-97cf191866e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552255096-2c689c9da505?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552318965-6e6be7484ada?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552311971-598182195748?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552256029-4e3aa83bbe2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
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
    return (
      <div className={classes.root}>
        <Carousel
          /*
          disableSwipeOnMobile
          disableDrag
          */
          responsive={responsive}
          forSSR
          containerClassName="container"
          slidesToSlide={1}
          infinite={true}
          deviceType={this.props.deviceType}
        >
          {fakerData.map(card => {
            return <Card {...card} />;
          })}
        </Carousel>

        <Carousel
          /*
          disableSwipeOnMobile
          disableDrag
          */
          responsive={responsive}
          forSSR
          slidesToSlide={1}
          infinite={true}
          containerClassName="container"
          itemClassName="image-item"
          deviceType={this.props.deviceType}
        >
          {fakerData.map(card => {
            return <Image url={card.image} alt={card.headline} />;
          })}
        </Carousel>
      </div>
    );
  }
}

export default withStyles(styles)(Index);
