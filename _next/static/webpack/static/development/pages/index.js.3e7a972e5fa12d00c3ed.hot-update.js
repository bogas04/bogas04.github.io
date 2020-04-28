webpackHotUpdate("static/development/pages/index.js",{

/***/ "./src/layout/section.tsx":
/*!********************************!*\
  !*** ./src/layout/section.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


var styleMap = {
  "default": {
    backgroundColor: "#673ab7",
    color: "white"
  },
  green: {
    backgroundColor: "#4caf50",
    "& a": {
      color: "#123886"
    }
  },
  grey: {
    backgroundColor: "rgb(52, 58, 64)",
    color: "white"
  },
  blue: {
    backgroundColor: "#3f51b5",
    color: "white"
  },
  yellow: {
    backgroundColor: "#ffc107",
    color: "black"
  }
};
var Section = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].section.withConfig({
  displayName: "section__Section",
  componentId: "uqekbj-0"
})(function (props) {
  return _objectSpread({
    position: "relative",
    minHeight: "100vh",
    padding: "2% 5%",
    boxShadow: "0px 10px 50px 20px black"
  }, styleMap[props.color || "default"], {
    "& h1": {
      fontSize: "8rem",
      padding: "5% 0"
    },
    "& h3": {
      fontSize: "3.5rem",
      padding: "2% 10px",
      margin: "0 -20px",
      position: "sticky",
      top: "0",
      backgroundColor: "inherit",
      zIndex: 1
    },
    "& h6": {
      fontSize: "2rem",
      padding: "2% 0"
    },
    "@media (max-width: 750px)": {
      "& h1": {
        fontSize: "8em",
        padding: "5% 0"
      },
      "& h3": {
        fontSize: "3.5em",
        padding: "2% 10px"
      },
      "& h6": {
        fontSize: "2em",
        padding: "2% 0"
      }
    }
  });
});
/* harmony default export */ __webpack_exports__["default"] = (Section);

/***/ })

})
//# sourceMappingURL=index.js.3e7a972e5fa12d00c3ed.hot-update.js.map