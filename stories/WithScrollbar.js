// idea comes from https://github.com/bsultonov

import React from "react";
import Carousel from "../src";

import "./WithScrollbar.css";

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

class WithScrollbar extends React.Component {
  state = { additionalTransfrom: 0 }
  render() {
    const { deviceType } = this.props;
    const CustomSlider = ({ carouselState }) => {
      let value = 0;
      let carouselItemWidth = 0;
      if (this.Carousel) {
        carouselItemWidth = this.Carousel.state.itemWidth;
        const maxTranslateX =  // so that we don't over-slide
          carouselItemWidth *
          (this.Carousel.state.totalItems - this.Carousel.state.slidesToShow);
        value = maxTranslateX / 100; // calculate the unit of transform for the slider
      }
      const { transform } = carouselState;
      return (
        <div className="custom-slider">
          <input
            type="range"
            value={Math.abs(transform) / value}
            defaultValue={0}
            onChange={e => {
              if (this.Carousel.isAnimationAllowed) {
                this.Carousel.isAnimationAllowed = false;
              }
              const nextTransform = e.target.value * value;
              const nextSlide = Math.round(nextTransform / carouselItemWidth);
              if(nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
                this.setState({ additionalTransfrom: 150 })
              }
              if(nextSlide === 0 && this.state.additionalTransfrom === 150) {
                this.setState({ additionalTransfrom: 0 })
              }
              this.Carousel.setState({
                transform: -nextTransform, // padding 20px and 5 items.
                currentSlide: nextSlide
              });
            }}
            className="custom-slider__input"
          />
        </div>
      );
    };
    return (
      <Carousel
        ssr={false}
        ref={el => (this.Carousel = el)}
        partialVisbile={false}
        customButtonGroup={<CustomSlider />}
        itemClass="image-item"
        responsive={responsive}
        containerClass="carousel-container-with-scrollbar"
        additionalTransfrom={-this.state.additionalTransfrom}
        beforeChange={(nextSlide) => {
          if(nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
            this.setState({ additionalTransfrom: 150 })
          }
          if(nextSlide === 0 && this.state.additionalTransfrom === 150) {
            this.setState({ additionalTransfrom: 0 })
          }
        }}
      >
        <div class="image-container increase-size">
          <div class="image-container-text">
            <p>1</p>
          </div>
          <img
            draggable={false}
            style={{ width: "100%", height: "400px", cursor: "pointer" }}
            src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          />
        </div>
        <div class="increase-size">
          <div class="image-container-text">
            <p>2</p>
          </div>
          <img
            draggable={false}
            style={{ width: "100%", height: "400px", cursor: "pointer" }}
            src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          />
        </div>

        <div class="image-container increase-size">
          <div class="image-container-text">
            <p>3</p>
          </div>
          <img
            draggable={false}
            style={{ width: "100%", height: "400px", cursor: "pointer" }}
            src="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          />
        </div>

        <div class="image-container increase-size">
          <div class="image-container-text">
            <p>4</p>
          </div>
          <img
            draggable={false}
            style={{ width: "100%", height: "400px", cursor: "pointer" }}
            src="https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          />
        </div>

        <div class="image-container increase-size">
          <div class="image-container-text">
            <p>5</p>
          </div>
          <img
            draggable={false}
            style={{ width: "100%", height: "400px", cursor: "pointer" }}
            src="https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          />
        </div>

        <div class="image-container increase-size">
          <div class="image-container-text">
            <p>6</p>
          </div>
          <img
            draggable={false}
            style={{ width: "100%", height: "400px", cursor: "pointer" }}
            src="https://images.unsplash.com/flagged/photo-1556091766-9b818bc73fad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80"
          />
        </div>
      </Carousel>
    );
  }
}

export default WithScrollbar;
