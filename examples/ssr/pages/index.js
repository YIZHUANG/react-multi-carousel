import React from "react";
import faker from "faker";
import MobileDetect from "mobile-detect";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import Card from "../components/card";
import Carousel from "react-multi-carousel";

import Link from "next/link";

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
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
      faker.image.imageUrl(),
      faker.image.fashion(),
      faker.image.people(),
      faker.image.nature(),
      faker.image.city()
    ];
    const fakerData = Array(5)
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
          disableSwipeOnMobile
          disableDrag
          responsive={responsive}
          forSSR
          slidesToSlide={2}
          infinite={true}
          className='test'
          removeArrowOnDeviceType={['tablet', 'mobile']}
          deviceType={this.props.deviceType}
        >
          {fakerData.map(card => {
            return <Card {...card} />;
          })}
        </Carousel>
        <Button variant="contained" color="secondary">
          Super Secret Password
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Index);
