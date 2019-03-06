webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/image.js":
/*!*****************************!*\
  !*** ./components/image.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/yi.a.zhuang/Desktop/npm/react-multi-carousel/examples/ssr/components/image.js";


var Image = function Image(_ref) {
  var url = _ref.url,
      alt = _ref.alt;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      width: '100%',
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
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! faker */ "./node_modules/faker/index.js");
/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(faker__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var mobile_detect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! mobile-detect */ "./node_modules/mobile-detect/mobile-detect.js");
/* harmony import */ var mobile_detect__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(mobile_detect__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/Typography/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/card */ "./components/card.js");
/* harmony import */ var _components_image__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/image */ "./components/image.js");
/* harmony import */ var react_multi_carousel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-multi-carousel */ "./node_modules/react-multi-carousel/index.js");
/* harmony import */ var react_multi_carousel__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_multi_carousel__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../style.css */ "./style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_16__);






var _jsxFileName = "/Users/yi.a.zhuang/Desktop/npm/react-multi-carousel/examples/ssr/pages/index.js";












var styles = function styles(theme) {
  return {
    root: {
      textAlign: "center"
    }
  };
};

var Index =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(Index, _React$Component);

  function Index() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Index);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Index).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Index, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      var images = [faker__WEBPACK_IMPORTED_MODULE_7___default.a.image.imageUrl(), faker__WEBPACK_IMPORTED_MODULE_7___default.a.image.fashion(), faker__WEBPACK_IMPORTED_MODULE_7___default.a.image.people(), faker__WEBPACK_IMPORTED_MODULE_7___default.a.image.nature(), faker__WEBPACK_IMPORTED_MODULE_7___default.a.image.city()];
      var fakerData = Array(5).fill(0).map(function (item, index) {
        return {
          image: images[index],
          headline: faker__WEBPACK_IMPORTED_MODULE_7___default.a.lorem.sentence(),
          description: faker__WEBPACK_IMPORTED_MODULE_7___default.a.lorem.sentences(3, 3)
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
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: classes.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_multi_carousel__WEBPACK_IMPORTED_MODULE_14___default.a
      /*
      disableSwipeOnMobile
      disableDrag
      */
      , {
        responsive: responsive,
        forSSR: true,
        slidesToSlide: 1,
        infinite: true,
        deviceType: this.props.deviceType,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, fakerData.map(function (card) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_card__WEBPACK_IMPORTED_MODULE_12__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, card, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 86
          },
          __self: this
        }));
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_multi_carousel__WEBPACK_IMPORTED_MODULE_14___default.a
      /*
      disableSwipeOnMobile
      disableDrag
      */
      , {
        responsive: responsive,
        forSSR: true,
        slidesToSlide: 1,
        infinite: true,
        itemClassName: "image-item",
        deviceType: this.props.deviceType,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      }, fakerData.map(function (card) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_image__WEBPACK_IMPORTED_MODULE_13__["default"], {
          url: card.image,
          alt: card.headline,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 103
          },
          __self: this
        });
      })));
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

      var md = new mobile_detect__WEBPACK_IMPORTED_MODULE_8___default.a(userAgent);

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
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__["withStyles"])(styles)(Index));

/***/ })

})
//# sourceMappingURL=index.js.310123f29e04c642eb0c.hot-update.js.map