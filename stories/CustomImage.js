import * as React from 'react';


const Image = ({ url, isvisible }) => {
  return (
    <img
      aria-hidden={isvisible ? "true" : "false"}
      draggable={false}
      src={url}
      style={{
        width: "100%",
        display: "block",
        height: "100%",
        margin: "auto"
      }}
    />
  );
};

export default Image;
