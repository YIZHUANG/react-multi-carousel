
const containerStyle = {
  display: "flex",
  alignItems: "center",
  overflow: 'hidden'
};

const contentStyle = {
  display: "flex",
  flexDirection: "row",
  position: "relative",
  willChange: 'transform'
};

const arrowStyle = {
  zIndex: 1,
  position: 'absolute',
  border: "solid black",
  borderWidth: "0 3px 3px 0" as "0 3px 3px 0",
  display: "inline-block",
  padding: 13,
  cursor: "pointer"
};
const leftArrowStyle = {
  ...arrowStyle,
  left: 30,
  transform: "rotate(135deg)"
};
const rightArrowStyle = {
  ...arrowStyle,
  right: 30,
  transform: "rotate(-45deg)"
};

export {
  containerStyle,
  contentStyle,
  arrowStyle,
  leftArrowStyle,
  rightArrowStyle
};
