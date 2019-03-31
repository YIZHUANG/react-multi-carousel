import React from "react";
import Markdown from "markdown-to-jsx";

import Img from "./img";
import Paragraph from "./paragraph";

const options = {
  forceBlock: true,
  overrides: {
    img: Img,
    p: Paragraph
  }
};

const MarkdownContent = ({ content }) => {
  return <Markdown options={options}>{content}</Markdown>;
};

export default MarkdownContent;
