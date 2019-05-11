const UglifyJS = require("uglify-js");
const UglifyCSS = require("uglifycss");
const fs = require("fs");

const baseDir = "./lib";

function uglifyJS(fileName) {
  fs.writeFileSync(
    fileName,
    UglifyJS.minify(
      { [fileName]: fs.readFileSync(fileName, "utf8") },
      { mangle: false }
    ).code,
    "utf8"
  );
}
function uglifyCSS(fileName) {
  fs.writeFileSync(fileName, UglifyCSS.processFiles([fileName]), "utf8");
}
const patterm = {
  js: "(.*?).(js)$",
  css: "(.*?).(css)$",
  dir: "^([^.]+)$"
};

function goThroughAllFiles(dir) {
  const filesAndMaybeDir = fs.readdirSync(dir);
  filesAndMaybeDir.forEach(path => {
    const fileName = `${dir}/${path}`;
    if (path.match(patterm.js)) {
      console.log(`uglifing ${fileName}`);
      uglifyJS(fileName);
    }
    if (path.match(patterm.css)) {
      console.log(`uglifing ${fileName}`);
      uglifyCSS(fileName);
    }
    if (path.match(patterm.dir)) {
      console.log(`Found dir ${path}`);
      goThroughAllFiles(`${dir}/${path}`);
    }
  });
}
goThroughAllFiles(baseDir);
