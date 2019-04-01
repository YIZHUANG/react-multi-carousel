import * as React from "react";

const CustomDot = ({ onClick, slideIndex, index, carouselState }) => {
  const { currentSlide } = carouselState;
  return (
    <li style={{ background: slideIndex === currentSlide ? "grey" : "initial" }}>
      <button
        style={{ background: slideIndex === currentSlide ? "grey" : "initial" }}
        onClick={() => onClick()}
      />
    </li>
  );
};

export default CustomDot;
