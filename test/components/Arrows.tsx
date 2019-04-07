import * as React from "react";
import Button from "@material-ui/core/Button";

const CustomLeftArrow = ({ onClick }) => (
  <Button
    onClick={() => onClick()}
    className="custom-left-arrow"
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
      className="custom-right-arrow"
      onClick={() => onClick()}
      variant="contained"
      size="medium"
      color="primary"
    >
      Next
    </Button>
  );
};
const CustomButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
  const { totalItems, currentSlide } = carouselState;
  return (
    <div className="custom-button-group">
      <div>Current slide is {currentSlide}</div>
      <button onClick={() => previous()}>Previous slide</button>
      <button onClick={() => next()}>Next slide</button>
      <button
        onClick={() => goToSlide(Math.floor(Math.random() * totalItems + 1))}
      >
        Go to a random slide
      </button>
    </div>
  );
};

export { CustomLeftArrow, CustomRightArrow, CustomButtonGroup };
