
const containerStyle = {
  display: "flex",
  alignItems: "center"
};

const contentStyle = {
  display: "flex",
  overflow: "hidden",
  flexDirection: "row",
  transition: "all 0.2s",
  position: "relative",
  alignItems: "stretch"
};

const arrowStyle = {
  margin: "50px",
  border: "solid black",
  borderWidth: "0 3px 3px 0" as "0 3px 3px 0",
  display: "inline-block",
  padding: 3,
  cursor: "pointer"
};
const leftArrowStyle = {
  ...arrowStyle,
  transform: "rotate(135deg)"
};
const rightArrowStyle = {
  ...arrowStyle,
  transform: "rotate(-45deg)"
};

export {
  containerStyle,
  contentStyle,
  arrowStyle,
  leftArrowStyle,
  rightArrowStyle
};
