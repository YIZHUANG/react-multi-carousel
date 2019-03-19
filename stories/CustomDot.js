import * as React from "react";

const CustomDot = ({ onClick, index, carouselState }) => {
  const { currentSlide } = carouselState;
  return (
    <li style={{ background: index === currentSlide ? "grey" : "initial" }}>
      <button
        style={{ background: index === currentSlide ? "grey" : "initial" }}
        onClick={() => onClick()}
      />
    </li>
  );
};

export default CustomDot;
