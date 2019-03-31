module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Markdown/img.js":
/*!************************************!*\
  !*** ./components/Markdown/img.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/Users/yi.a.zhuang/Desktop/backup/react-multi-carousel/examples/ssr/components/Markdown/img.js";


var Img = function Img(props) {
  var src = props.src,
      alt = props.alt;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    src: src
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Img);

/***/ }),

/***/ "./components/Markdown/index.js":
/*!**************************************!*\
  !*** ./components/Markdown/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var markdown_to_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! markdown-to-jsx */ "markdown-to-jsx");
/* harmony import */ var markdown_to_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img */ "./components/Markdown/img.js");
/* harmony import */ var _paragraph__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paragraph */ "./components/Markdown/paragraph.js");
var _jsxFileName = "/Users/yi.a.zhuang/Desktop/backup/react-multi-carousel/examples/ssr/components/Markdown/index.js";




var options = {
  forceBlock: true,
  overrides: {
    img: _img__WEBPACK_IMPORTED_MODULE_2__["default"],
    p: _paragraph__WEBPACK_IMPORTED_MODULE_3__["default"]
  }
};

var MarkdownContent = function MarkdownContent(_ref) {
  var content = _ref.content;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_1___default.a, {
    options: options,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, content);
};

/* harmony default export */ __webpack_exports__["default"] = (MarkdownContent);

/***/ }),

/***/ "./components/Markdown/paragraph.js":
/*!******************************************!*\
  !*** ./components/Markdown/paragraph.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/yi.a.zhuang/Desktop/backup/react-multi-carousel/examples/ssr/components/Markdown/paragraph.js";


var Paragraph = function Paragraph(_ref) {
  var children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: this
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (Paragraph);

/***/ }),

/***/ "./components/card.js":
/*!****************************!*\
  !*** ./components/card.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardActions */ "@material-ui/core/CardActions");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__);
var _jsxFileName = "/Users/yi.a.zhuang/Desktop/backup/react-multi-carousel/examples/ssr/components/card.js";









var styles = {
  card: {
    margin: "0 20px"
  },
  media: {
    height: 140
  }
};

function MediaCard(props) {
  var classes = props.classes,
      image = props.image,
      headline = props.headline,
      description = props.description,
      isMoving = props.isMoving,
      link = props.link;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    onClick: function onClick(e) {
      if (isMoving) {
        e.preventDefault();
      }
    },
    href: link || 'https://w3js.com',
    target: "_blank",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: classes.card,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_6___default.a, {
    className: classes.media,
    image: image,
    title: headline,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    gutterBottom: true,
    variant: "h5",
    component: "h2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, headline), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    component: "p",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, description))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_4___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {
    size: "small",
    color: "primary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, "Share"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {
    size: "small",
    color: "primary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, "Learn More"))));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(styles)(MediaCard));

/***/ }),

/***/ "./components/carousel-with-custom-dots.css":
/*!**************************************************!*\
  !*** ./components/carousel-with-custom-dots.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/carousel-with-custom-dots.js":
/*!*************************************************!*\
  !*** ./components/carousel-with-custom-dots.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_multi_carousel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-multi-carousel */ "react-multi-carousel");
/* harmony import */ var react_multi_carousel__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_multi_carousel__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./data.json */ "./components/data.json");
var _data_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data.json */ "./components/data.json", 1);
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./card */ "./components/card.js");
/* harmony import */ var _Markdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Markdown */ "./components/Markdown/index.js");
/* harmony import */ var _carousel_with_custom_dots_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./carousel-with-custom-dots.css */ "./components/carousel-with-custom-dots.css");
/* harmony import */ var _carousel_with_custom_dots_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_carousel_with_custom_dots_css__WEBPACK_IMPORTED_MODULE_13__);






var _jsxFileName = "/Users/yi.a.zhuang/Desktop/backup/react-multi-carousel/examples/ssr/components/carousel-with-custom-dots.js";









var Tag = function Tag(_ref) {
  var name = _ref.name,
      link = _ref.link;
  return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
    href: link,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, name));
};

var ArticleCard = function ArticleCard(_ref2) {
  var date = _ref2.date,
      imageUrl = _ref2.imageUrl,
      link = _ref2.link,
      title = _ref2.title,
      tags = _ref2.tags,
      content = _ref2.content;
  return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_card__WEBPACK_IMPORTED_MODULE_11__["default"], {
    link: link,
    image: imageUrl,
    headline: title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  });
};

var CarouselWithCustomDots =
/*#__PURE__*/
function (_React$PureComponent) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(CarouselWithCustomDots, _React$PureComponent);

  function CarouselWithCustomDots() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CarouselWithCustomDots);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(CarouselWithCustomDots).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(CarouselWithCustomDots, [{
    key: "render",
    value: function render() {
      var deviceType = this.props.deviceType;
      var children = _data_json__WEBPACK_IMPORTED_MODULE_10__.slice(0, 6).map(function (article) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(ArticleCard, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          key: article.title
        }, article, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 26
          },
          __self: this
        }));
      });
      var images = _data_json__WEBPACK_IMPORTED_MODULE_10__.map(function (article) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_9___default.a, {
          key: article.title,
          src: article.imageUrl,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          },
          __self: this
        });
      });

      var CustomDot = function CustomDot(_ref3) {
        var index = _ref3.index,
            _onClick = _ref3.onClick,
            slideIndex = _ref3.slideIndex,
            currentSlide = _ref3.carouselState.currentSlide;
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("button", {
          onClick: function onClick(e) {
            _onClick();

            e.preventDefault();
          },
          className: classnames__WEBPACK_IMPORTED_MODULE_8___default()("custom-dot", {
            "custom-dot--active": currentSlide === slideIndex
          }),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 37
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.Children.toArray(images)[index]);
      };

      var responsive = {
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 3,
          paritialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 2,
          paritialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 200
          },
          items: 1,
          paritialVisibilityGutter: 30
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_multi_carousel__WEBPACK_IMPORTED_MODULE_7___default.a, {
        showDots: true,
        deviceType: deviceType,
        ssr: true,
        slidesToSlide: 1,
        containerClass: "carousel-with-custom-dots",
        responsive: responsive,
        partialVisbile: "right",
        infinite: true,
        customDot: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(CustomDot, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 86
          },
          __self: this
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }, children);
    }
  }]);

  return CarouselWithCustomDots;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["default"] = (CarouselWithCustomDots);

/***/ }),

/***/ "./components/data.json":
/*!******************************!*\
  !*** ./components/data.json ***!
  \******************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, default */
/***/ (function(module) {

module.exports = [{"imageUrl":"https://w3js.com/wp-content/uploads/2019/03/Similar-Cloud-Services-in-AWS-and-Azure-.png","link":"https://w3js.com/index.php/what-aws-lambda-users-should-know-about-azure-functions-and-vice-versa/","date":"29.3.2019","tags":[{"id":64,"count":5,"description":"","link":"https://w3js.com/index.php/tag/aws/","name":"Aws","slug":"aws","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/64"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=64"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}},{"id":74,"count":1,"description":"","link":"https://w3js.com/index.php/tag/azure/","name":"Azure","slug":"azure","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/74"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=74"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}}],"title":"What AWS Lambda Users Should Know About Azure Functions, and Vice Versa.","content":"<p>In&nbsp;my previous post, I explained about my painful multi-cloud experience and lessons that I learned. Regardless of which cloud platform you are using, I recommend you to read it to avoid our mistakes. I’ve encountered a surprising high number of Cloud developers who have never tried other providers. That’s why in this post, I would [&hellip;]</p>\n"},{"imageUrl":"https://w3js.com/wp-content/uploads/2019/03/migrating-legacy-back-ends-to-serverless-14-638.jpg","link":"https://w3js.com/index.php/lessons-learned-from-a-legacy-serverless-app/","date":"29.3.2019","tags":[{}],"title":"Lessons Learned From a Legacy Serverless App","content":"<p>Feeping in mind the growing multi-cloud trend, developers should start working with more than one provider. However, this can mean leaving your comfort zone, and not everyone likes the idea of doing that. Recently, I’ve done this and would like to share my experiences with you. I believe they are useful, regardless of whatever cloud platform [&hellip;]</p>\n"},{"imageUrl":"https://w3js.com/wp-content/uploads/2019/03/1_g_0RpVhugETqQt_zriSebQ.png","link":"https://w3js.com/index.php/implementing-infinite-mode-in-a-carousel-that-rocks-by-putting-your-algorithm-knowledge-into-use-part-one/","date":"27.3.2019","tags":[],"title":"Implementing infinite mode in a Carousel that rocks by putting your algorithm knowledge into use  &#8211; part one.","content":"<p>Hello, this is part one of the series &#8211; Implementing infinite mode in a Carousel that rocks by putting your algorithm knowledge into use. A while back i built a fully customizable Carousel library called react-multi-carousel which you can find on github or the npm registry that supports multiple items and server-side rendering. Everything was [&hellip;]</p>\n"},{"imageUrl":"https://w3js.com/wp-content/uploads/2019/03/1_y8bT4O5fXWXC140iiTRYPQ.png","link":"https://w3js.com/index.php/how-to-integrate-an-amazon-lex-chatbot-with-facebook-messenger/","date":"27.3.2019","tags":[{"id":64,"count":5,"description":"","link":"https://w3js.com/index.php/tag/aws/","name":"Aws","slug":"aws","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/64"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=64"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}},{"id":72,"count":1,"description":"","link":"https://w3js.com/index.php/tag/chatbots/","name":"Chatbots","slug":"chatbots","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/72"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=72"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}}],"title":"How to integrate an Amazon Lex chatbot with Facebook Messenger","content":"<p>Amazon Lex enables you to quickly build a chatbot in a few minutes. A few months ago, I tried to integrate a Lex chatbot with Facebook — and spent way too long because of the poor documentation and guidance. To help save you some time and effort, this blog explains how the integration works and provides a [&hellip;]</p>\n"},{"imageUrl":"https://w3js.com/wp-content/uploads/2019/03/Benchmarked-Serverless-observability-tools-got-very-disappointed2.png","link":"https://w3js.com/index.php/benchmarked-serverless-observability-tools-got-very-disappointed/","date":"26.3.2019","tags":[{"id":64,"count":5,"description":"","link":"https://w3js.com/index.php/tag/aws/","name":"Aws","slug":"aws","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/64"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=64"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}},{}],"title":"Benchmarked Serverless observability tools, got very disappointed","content":"<p>Observability is about the ability to troubleshoot unknown issues that might happen in your application. If you are not familiar with it, I recommend you to watch&nbsp;How to Build Observable Distributed Systems&nbsp;and&nbsp;The Present and Future of Serverless Observability&nbsp;from QCon 2018. In this article, I’m going to explain you how some of the most prominent Serverless [&hellip;]</p>\n"},{"imageUrl":"https://w3js.com/wp-content/uploads/2019/03/Overcome-X-Ray’s-issue-for-Lambda-debugging.png","link":"https://w3js.com/index.php/overcome-x-rays-issue-for-lambda-debugging/","date":"25.3.2019","tags":[{"id":64,"count":5,"description":"","link":"https://w3js.com/index.php/tag/aws/","name":"Aws","slug":"aws","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/64"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=64"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}},{}],"title":"Overcome X-Ray’s issue for Lambda debugging","content":"<p>Tracing is one of the pillars of Observebility, according to Twitter. AWS X-Ray helps you to get an overview of your distributed application, to find bottlenecks and to tune its critical path. Also, it&nbsp;provides&nbsp;you&nbsp;with the ability to&nbsp;trace your&nbsp;requests, so you can see which journey, any single request goes through when it enters your application. AWS [&hellip;]</p>\n"},{"imageUrl":"https://w3js.com/wp-content/uploads/2019/03/Worrying-and-promising-signals-from-serverless-community.jpeg","link":"https://w3js.com/index.php/worrying-and-promising-signals-from-serverless-community/","date":"25.3.2019","tags":[{"id":64,"count":5,"description":"","link":"https://w3js.com/index.php/tag/aws/","name":"Aws","slug":"aws","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/64"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=64"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}},{"id":62,"count":1,"description":"","link":"https://w3js.com/index.php/tag/cloud-computing/","name":"Cloud Computing","slug":"cloud-computing","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/62"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=62"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}}],"title":"Worrying and promising signals from serverless community","content":"<p>Recently, I attended AWS Community Days in Frankfurt — Serverless Computing track, while I was one of its speakers. Having 400 attendees, it’s the biggest AWS community event in Germany. Even though not a definite indicator, but it can reflect skill level of serverless community in the region. I would like to share my assessment about Germany’s serverless community’s level with you. Some of them are good (indicated as “promising”) and some of them require attention (indicated as “worrying”). Here is table of content:</p>\n"},{"imageUrl":"https://w3js.com/wp-content/uploads/2019/03/pre.png","link":"https://w3js.com/index.php/appending-currency-sign-to-a-purchase-form-in-your-e-commerce-site/","date":"14.3.2019","tags":[{},{}],"title":"Appending currency sign to a purchase form in your e-commerce site using plain JavaScript.","content":"<p>Here is the code snippet on how to append currency sign to a purchase form in your e-commerce site. For example, you have an input that allows user to put in the amount of money to filter out some certain products at different price range, you might also want to remind the user of the [&hellip;]</p>\n"},{"imageUrl":"https://w3js.com/wp-content/uploads/2019/03/1_kFaSuc5rVdJ_fM2c_bHszQ.png","link":"https://w3js.com/index.php/fixing-css-loaded-order-style-chunk-incorrect-in-nextjs/","date":"14.3.2019","tags":[{"id":52,"count":1,"description":"","link":"https://w3js.com/index.php/tag/css/","name":"CSS","slug":"css","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/52"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=52"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}},{"id":57,"count":1,"description":"","link":"https://w3js.com/index.php/tag/css-order/","name":"CSS order","slug":"css-order","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/57"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=57"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}}],"title":"Fixing CSS load order/style.chunk.css incorrect in Nextjs","content":"<p>Introduction For Nextjs developers, if you are using a third-party UI library for example Material-ui or Semantic-ui, you might end up overriding a lot of the existing styles with your own CSS. That brings to us the importance of the order of which CSS file gets loaded first and after. If your own CSS gets [&hellip;]</p>\n"},{"imageUrl":"https://w3js.com/wp-content/uploads/2019/03/Learn-How-to-Create-A-Simple-Carousel-with-React-e1503928616477.jpg","link":"https://w3js.com/index.php/react-carousel-with-server-side-rendering-support-part-2/","date":"20.3.2019","tags":[{"id":47,"count":1,"description":"","link":"https://w3js.com/index.php/tag/carousel/","name":"Carousel","slug":"carousel","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/47"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=47"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}},{"id":50,"count":1,"description":"","link":"https://w3js.com/index.php/tag/dom/","name":"DOM","slug":"dom","taxonomy":"post_tag","meta":[],"_links":{"self":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags/50"}],"collection":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/tags"}],"about":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/taxonomies/post_tag"}],"wp:post_type":[{"href":"https://w3js.com/index.php/wp-json/wp/v2/posts?tags=50"}],"curies":[{"name":"wp","href":"https://api.w.org/{rel}","templated":true}]}}],"title":"React Carousel with Server Side Rendering Support &#8211; Part 2","content":"<p>With this article I am going to show you how you can create your own Carousel component using React that supports multiple items and server-side rendering and add testing to it and finally publish to NPM. This is part one of the series &#8220;React Carousel with Server Side Rendering Support&#8221;. Part two can be found [&hellip;]</p>\n"}];

/***/ }),

/***/ "./components/image.js":
/*!*****************************!*\
  !*** ./components/image.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/yi.a.zhuang/Desktop/backup/react-multi-carousel/examples/ssr/components/image.js";


var Image = function Image(_ref) {
  var url = _ref.url,
      alt = _ref.alt;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    draggable: false,
    style: {
      width: '100%',
      height: '100%',
      position: 'relative'
    },
    src: url,
    alt: alt,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Image);

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/json/stringify */ "core-js/library/fn/json/stringify");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/assign */ "core-js/library/fn/object/assign");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/create.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/create */ "core-js/library/fn/object/create");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "core-js/library/fn/object/define-property");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ "core-js/library/fn/object/get-prototype-of");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ "core-js/library/fn/object/set-prototype-of");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/reflect/construct */ "core-js/library/fn/reflect/construct");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol */ "core-js/library/fn/symbol");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol/iterator */ "core-js/library/fn/symbol/iterator");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/construct.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/construct.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Reflect$construct = __webpack_require__(/*! ../core-js/reflect/construct */ "./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js");

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_Reflect$construct) return false;
  if (_Reflect$construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(_Reflect$construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = _Reflect$construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/createClass.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _createClass; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);

function _extends() {
  _extends = _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default.a || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _getPrototypeOf; });
/* harmony import */ var _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js");
/* harmony import */ var _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__);


function _getPrototypeOf(o) {
  _getPrototypeOf = _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default.a ? _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default.a : function _getPrototypeOf(o) {
    return o.__proto__ || _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default()(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inherits; });
/* harmony import */ var _core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _setPrototypeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js");


function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object(_setPrototypeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _possibleConstructorReturn; });
/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/esm/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && (Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  }

  return Object(_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _setPrototypeOf; });
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0__);

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0___default.a || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _typeof; });
/* harmony import */ var _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js");
/* harmony import */ var _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/symbol */ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js");
/* harmony import */ var _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);



function _typeof2(obj) { if (typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && typeof _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && obj.constructor === _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a && obj !== _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && _typeof2(_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && obj.constructor === _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a && obj !== _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$getPrototypeOf = __webpack_require__(/*! ../core-js/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js");

var _Object$setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = _Object$setPrototypeOf ? _Object$getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || _Object$getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/inherits.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$create = __webpack_require__(/*! ../core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = _Object$setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/typeof.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol$iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js");

var _Symbol = __webpack_require__(/*! ../core-js/symbol */ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js");

function _typeof2(obj) { if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _Symbol === "function" && _typeof2(_Symbol$iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__(/*! react-is */ "react-is");
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = TYPE_STATICS[targetComponent['$$typeof']] || REACT_STATICS;
        var sourceStatics = TYPE_STATICS[sourceComponent['$$typeof']] || REACT_STATICS;

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global __NEXT_DATA__ */

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _stringify = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var url_1 = __webpack_require__(/*! url */ "url");

var react_1 = __importStar(__webpack_require__(/*! react */ "react"));

var prop_types_1 = __importDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var router_1 = __importStar(__webpack_require__(/*! next/router */ "./node_modules/next/router.js"));

var utils_1 = __webpack_require__(/*! next-server/dist/lib/utils */ "next-server/dist/lib/utils");

function isLocal(href) {
  var url = url_1.parse(href, false, true);
  var origin = url_1.parse(utils_1.getLocationOrigin(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatUrl) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return function (href, as) {
    if (href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatUrl(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

var Link =
/*#__PURE__*/
function (_react_1$Component) {
  (0, _inherits2.default)(Link, _react_1$Component);

  function Link() {
    var _this;

    (0, _classCallCheck2.default)(this, Link);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Link).apply(this, arguments)); // The function is memoized so that no extra lifecycles are needed
    // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

    _this.formatUrls = memoizedFormatUrl(function (href, asHref) {
      return {
        href: href && (0, _typeof2.default)(href) === 'object' ? utils_1.formatWithValidation(href) : href,
        as: asHref && (0, _typeof2.default)(asHref) === 'object' ? utils_1.formatWithValidation(asHref) : asHref
      };
    });

    _this.linkClicked = function (e) {
      var _e$currentTarget = e.currentTarget,
          nodeName = _e$currentTarget.nodeName,
          target = _e$currentTarget.target;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var _this$formatUrls = _this.formatUrls(_this.props.href, _this.props.as),
          href = _this$formatUrls.href,
          as = _this$formatUrls.as;

      if (!isLocal(href)) {
        // ignore click if it's outside our scope
        return;
      }

      var pathname = window.location.pathname;
      href = url_1.resolve(pathname, href);
      as = as ? url_1.resolve(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var scroll = _this.props.scroll;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      router_1.default[_this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: _this.props.shallow
      }).then(function (success) {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      }).catch(function (err) {
        if (_this.props.onError) _this.props.onError(err);
      });
    };

    return _this;
  }

  (0, _createClass2.default)(Link, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.prefetch();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if ((0, _stringify.default)(this.props.href) !== (0, _stringify.default)(prevProps.href)) {
        this.prefetch();
      }
    }
  }, {
    key: "prefetch",
    value: function prefetch() {
      if (!this.props.prefetch) return;
      if (typeof window === 'undefined') return; // Prefetch the JSON page if asked (only in the client)

      var pathname = window.location.pathname;

      var _this$formatUrls2 = this.formatUrls(this.props.href, this.props.as),
          parsedHref = _this$formatUrls2.href;

      var href = url_1.resolve(pathname, parsedHref);
      router_1.default.prefetch(href);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var children = this.props.children;

      var _this$formatUrls3 = this.formatUrls(this.props.href, this.props.as),
          href = _this$formatUrls3.href,
          as = _this$formatUrls3.as; // Deprecated. Warning shown by propType check. If the childen provided is a string (<Link>example</Link>) we wrap it in an <a> tag


      if (typeof children === 'string') {
        children = react_1.default.createElement("a", null, children);
      } // This will return the first child, if multiple are provided it will throw an error


      var child = react_1.Children.only(children);
      var props = {
        onClick: function onClick(e) {
          if (child.props && typeof child.props.onClick === 'function') {
            child.props.onClick(e);
          }

          if (!e.defaultPrevented) {
            _this2.linkClicked(e);
          }
        }
      }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
      // defined, we specify the current 'href', so that repetition is not needed by the user

      if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
        props.href = as || href;
      } // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly.


      if (props.href && typeof __NEXT_DATA__ !== 'undefined' && __NEXT_DATA__.nextExport) {
        props.href = router_1.Router._rewriteUrlForNextExport(props.href);
      }

      return react_1.default.cloneElement(child, props);
    }
  }]);
  return Link;
}(react_1.Component);

if (true) {
  var warn = utils_1.execOnce(console.error); // This module gets removed by webpack.IgnorePlugin

  var exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact");

  Link.propTypes = exact({
    href: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]).isRequired,
    as: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]),
    prefetch: prop_types_1.default.bool,
    replace: prop_types_1.default.bool,
    shallow: prop_types_1.default.bool,
    passHref: prop_types_1.default.bool,
    scroll: prop_types_1.default.bool,
    children: prop_types_1.default.oneOfType([prop_types_1.default.element, function (props, propName) {
      var value = props[propName];

      if (typeof value === 'string') {
        warn("Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>");
      }

      return null;
    }]).isRequired
  });
}

exports.default = Link;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js"));

var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/construct */ "./node_modules/@babel/runtime-corejs2/helpers/construct.js"));

var _defineProperty = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js"));

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global window */

var router_1 = __importDefault(__webpack_require__(/*! next-server/dist/lib/router/router */ "next-server/dist/lib/router/router"));

var SingletonRouter = {
  router: null,
  readyCallbacks: [],
  ready: function ready(cb) {
    if (this.router) return cb();

    if (typeof window !== 'undefined') {
      this.readyCallbacks.push(cb);
    }
  }
}; // Create public properties and methods of the router in the SingletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath'];
var propertyFields = ['components'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(SingletonRouter, 'events', {
  get: function get() {
    return router_1.default.events;
  }
});
propertyFields.concat(urlPropertyFields).forEach(function (field) {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  (0, _defineProperty.default)(SingletonRouter, field, {
    get: function get() {
      throwIfNoRouter();
      return SingletonRouter.router[field];
    }
  });
});
coreMethodFields.forEach(function (field) {
  SingletonRouter[field] = function () {
    var _SingletonRouter$rout;

    throwIfNoRouter();
    return (_SingletonRouter$rout = SingletonRouter.router)[field].apply(_SingletonRouter$rout, arguments);
  };
});
routerEvents.forEach(function (event) {
  SingletonRouter.ready(function () {
    router_1.default.events.on(event, function () {
      var eventField = "on".concat(event.charAt(0).toUpperCase()).concat(event.substring(1));

      if (SingletonRouter[eventField]) {
        try {
          SingletonRouter[eventField].apply(SingletonRouter, arguments);
        } catch (err) {
          console.error("Error when running the Router event: ".concat(eventField));
          console.error("".concat(err.message, "\n").concat(err.stack));
        }
      }
    });
  });
});

function throwIfNoRouter() {
  if (!SingletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }
} // Export the SingletonRouter and this is the public API.


exports.default = SingletonRouter; // Reexport the withRoute HOC

var with_router_1 = __webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js");

exports.withRouter = with_router_1.default; // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.

exports.createRouter = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  SingletonRouter.router = (0, _construct2.default)(router_1.default, args);
  SingletonRouter.readyCallbacks.forEach(function (cb) {
    return cb();
  });
  SingletonRouter.readyCallbacks = [];
  return SingletonRouter.router;
}; // Export the actual Router class, which is usually used inside the server


exports.Router = router_1.default; // This function is used to create the `withRouter` router instance

function makePublicRouterInstance(router) {
  var instance = {};

  for (var _i = 0; _i < urlPropertyFields.length; _i++) {
    var property = urlPropertyFields[_i];

    if ((0, _typeof2.default)(router[property]) === 'object') {
      instance[property] = (0, _assign.default)({}, router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = router_1.default.events;
  propertyFields.forEach(function (field) {
    // Here we need to use Object.defineProperty because, we need to return
    // the property assigned to the actual router
    // The value might get changed as we change routes and this is the
    // proper way to access it
    (0, _defineProperty.default)(instance, field, {
      get: function get() {
        return router[field];
      }
    });
  });
  coreMethodFields.forEach(function (field) {
    instance[field] = function () {
      return router[field].apply(router, arguments);
    };
  });
  return instance;
}

exports.makePublicRouterInstance = makePublicRouterInstance;

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = __importStar(__webpack_require__(/*! react */ "react"));

var prop_types_1 = __importDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var hoist_non_react_statics_1 = __importDefault(__webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"));

var utils_1 = __webpack_require__(/*! next-server/dist/lib/utils */ "next-server/dist/lib/utils");

function withRouter(ComposedComponent) {
  var displayName = utils_1.getDisplayName(ComposedComponent);

  var WithRouteWrapper =
  /*#__PURE__*/
  function (_react_1$Component) {
    (0, _inherits2.default)(WithRouteWrapper, _react_1$Component);

    function WithRouteWrapper() {
      (0, _classCallCheck2.default)(this, WithRouteWrapper);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WithRouteWrapper).apply(this, arguments));
    }

    (0, _createClass2.default)(WithRouteWrapper, [{
      key: "render",
      value: function render() {
        return react_1.default.createElement(ComposedComponent, (0, _assign.default)({
          router: this.context.router
        }, this.props));
      }
    }]);
    return WithRouteWrapper;
  }(react_1.Component);

  WithRouteWrapper.contextTypes = {
    router: prop_types_1.default.object
  };
  WithRouteWrapper.displayName = "withRouter(".concat(displayName, ")");
  return hoist_non_react_statics_1.default(WithRouteWrapper, ComposedComponent);
}

exports.default = withRouter;

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./node_modules/next/router.js":
/*!*************************************!*\
  !*** ./node_modules/next/router.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/router */ "./node_modules/next/dist/client/router.js")


/***/ }),

/***/ "./node_modules/react-multi-carousel/lib/styles.css":
/*!**********************************************************!*\
  !*** ./node_modules/react-multi-carousel/lib/styles.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! faker */ "faker");
/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(faker__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var mobile_detect__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! mobile-detect */ "mobile-detect");
/* harmony import */ var mobile_detect__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(mobile_detect__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/card */ "./components/card.js");
/* harmony import */ var _components_image__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/image */ "./components/image.js");
/* harmony import */ var react_multi_carousel__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-multi-carousel */ "react-multi-carousel");
/* harmony import */ var react_multi_carousel__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_multi_carousel__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _components_carousel_with_custom_dots__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/carousel-with-custom-dots */ "./components/carousel-with-custom-dots.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../style.css */ "./style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var react_multi_carousel_lib_styles_css__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-multi-carousel/lib/styles.css */ "./node_modules/react-multi-carousel/lib/styles.css");
/* harmony import */ var react_multi_carousel_lib_styles_css__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_multi_carousel_lib_styles_css__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_20__);








var _jsxFileName = "/Users/yi.a.zhuang/Desktop/backup/react-multi-carousel/examples/ssr/pages/index.js";














var styles = function styles(theme) {
  return {
    root: {
      textAlign: "center"
    },
    title: {
      maxWidth: 400,
      margin: "auto",
      marginTop: 10
    }
  };
};

var Index =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(Index, _React$Component);

  function Index() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Index)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "state", {
      isMoving: false
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;
      var images = ["https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"];
      var texts = ["Appending currency sign to a purchase form in your e-commerce site using plain JavaScript.", "Fixing CSS load order/style.chunk.css incorrect in Nextjs", "React Carousel with Server Side Rendering Support – Part 1", "React Carousel with Server Side Rendering Support – Part 2", "Flutter Xcode couldn’t find any iOS App Development provisioning profiles"];
      var fakerData = Array(12).fill(0).map(function (item, index) {
        return {
          image: images[index],
          headline: "w3js -> web front-end studio",
          description: texts[index] || texts[0]
        };
      });
      var responsive = {
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 3
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 2
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: classes.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default.a, {
        className: classes.title,
        variant: "h6",
        color: "grey",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        target: "_blank",
        href: "https://w3js.com/",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, "A Carousel supports multiple items and server-side rendering")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default.a, {
        className: classes.title,
        variant: "p",
        color: "grey",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        target: "_blank",
        href: "https://w3js.com/",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, "This is the server-side rendering demo of the libiary, try to disable the JavaScript in your browser, you will still see our Carousel renders nicely")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_multi_carousel__WEBPACK_IMPORTED_MODULE_16___default.a
      /*
      swipeable={false}
      draggable={false}
      */
      , {
        responsive: responsive,
        ssr: true,
        infinite: false,
        beforeChange: function beforeChange() {
          return _this2.setState({
            isMoving: true
          });
        },
        afterChange: function afterChange() {
          return _this2.setState({
            isMoving: false
          });
        },
        containerClass: "first-carousel-container container",
        slidesToSlide: 1,
        deviceType: this.props.deviceType,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }, fakerData.map(function (card) {
        return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_card__WEBPACK_IMPORTED_MODULE_14__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          isMoving: _this2.state.isMoving
        }, card, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 123
          },
          __self: this
        }));
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_multi_carousel__WEBPACK_IMPORTED_MODULE_16___default.a
      /*
      swipeable={false}
      draggable={false}
      */
      , {
        responsive: responsive,
        ssr: true,
        showDots: true,
        slidesToSlide: 1,
        infinite: true,
        containerClass: "container-with-dots",
        itemClass: "image-item",
        deviceType: this.props.deviceType,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, fakerData.slice(0, 5).map(function (card) {
        return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_image__WEBPACK_IMPORTED_MODULE_15__["default"], {
          url: card.image,
          alt: card.headline,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 142
          },
          __self: this
        });
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_carousel_with_custom_dots__WEBPACK_IMPORTED_MODULE_17__["default"], {
        deviceType: this.props.deviceType,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        },
        __self: this
      }));
    }
  }], [{
    key: "getInitialProps",
    value: function getInitialProps(_ref) {
      var req = _ref.req,
          isServer = _ref.isServer;
      var userAgent;
      var deviceType;

      if (req) {
        userAgent = req.headers["user-agent"];
      } else {
        userAgent = navigator.userAgent;
      }

      var md = new mobile_detect__WEBPACK_IMPORTED_MODULE_10___default.a(userAgent);

      if (md.tablet()) {
        deviceType = "tablet";
      } else if (md.mobile()) {
        deviceType = "mobile";
      } else {
        deviceType = "desktop";
      }

      return {
        deviceType: deviceType
      };
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__["withStyles"])(styles)(Index));

/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/yi.a.zhuang/Desktop/backup/react-multi-carousel/examples/ssr/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "@material-ui/core/Avatar":
/*!*******************************************!*\
  !*** external "@material-ui/core/Avatar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Avatar");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/Card":
/*!*****************************************!*\
  !*** external "@material-ui/core/Card" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Card");

/***/ }),

/***/ "@material-ui/core/CardActionArea":
/*!***************************************************!*\
  !*** external "@material-ui/core/CardActionArea" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardActionArea");

/***/ }),

/***/ "@material-ui/core/CardActions":
/*!************************************************!*\
  !*** external "@material-ui/core/CardActions" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardActions");

/***/ }),

/***/ "@material-ui/core/CardContent":
/*!************************************************!*\
  !*** external "@material-ui/core/CardContent" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardContent");

/***/ }),

/***/ "@material-ui/core/CardMedia":
/*!**********************************************!*\
  !*** external "@material-ui/core/CardMedia" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardMedia");

/***/ }),

/***/ "@material-ui/core/Typography":
/*!***********************************************!*\
  !*** external "@material-ui/core/Typography" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "core-js/library/fn/json/stringify":
/*!****************************************************!*\
  !*** external "core-js/library/fn/json/stringify" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/json/stringify");

/***/ }),

/***/ "core-js/library/fn/object/assign":
/*!***************************************************!*\
  !*** external "core-js/library/fn/object/assign" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/assign");

/***/ }),

/***/ "core-js/library/fn/object/create":
/*!***************************************************!*\
  !*** external "core-js/library/fn/object/create" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/create");

/***/ }),

/***/ "core-js/library/fn/object/define-property":
/*!************************************************************!*\
  !*** external "core-js/library/fn/object/define-property" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "core-js/library/fn/object/get-prototype-of":
/*!*************************************************************!*\
  !*** external "core-js/library/fn/object/get-prototype-of" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-prototype-of");

/***/ }),

/***/ "core-js/library/fn/object/set-prototype-of":
/*!*************************************************************!*\
  !*** external "core-js/library/fn/object/set-prototype-of" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/set-prototype-of");

/***/ }),

/***/ "core-js/library/fn/reflect/construct":
/*!*******************************************************!*\
  !*** external "core-js/library/fn/reflect/construct" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/reflect/construct");

/***/ }),

/***/ "core-js/library/fn/symbol":
/*!********************************************!*\
  !*** external "core-js/library/fn/symbol" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol");

/***/ }),

/***/ "core-js/library/fn/symbol/iterator":
/*!*****************************************************!*\
  !*** external "core-js/library/fn/symbol/iterator" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol/iterator");

/***/ }),

/***/ "faker":
/*!************************!*\
  !*** external "faker" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("faker");

/***/ }),

/***/ "markdown-to-jsx":
/*!**********************************!*\
  !*** external "markdown-to-jsx" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("markdown-to-jsx");

/***/ }),

/***/ "mobile-detect":
/*!********************************!*\
  !*** external "mobile-detect" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mobile-detect");

/***/ }),

/***/ "next-server/dist/lib/router/router":
/*!*****************************************************!*\
  !*** external "next-server/dist/lib/router/router" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-server/dist/lib/router/router");

/***/ }),

/***/ "next-server/dist/lib/utils":
/*!*********************************************!*\
  !*** external "next-server/dist/lib/utils" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-server/dist/lib/utils");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ }),

/***/ "react-multi-carousel":
/*!***************************************!*\
  !*** external "react-multi-carousel" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-multi-carousel");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map