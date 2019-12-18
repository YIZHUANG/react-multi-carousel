
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");

let plugins = [
  postcssImport,
  autoprefixer
];

module.exports = {
  plugins
};
