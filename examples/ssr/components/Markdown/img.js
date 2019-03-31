
import React from 'react';


const Img = (props) => {
  const { src, alt } = props;
  return <img src={src} {...props} />;
};

export default Img;
