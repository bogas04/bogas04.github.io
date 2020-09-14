webpackHotUpdate_N_E("pages/blog/[slug]",{

/***/ "./src/pages/blog/[slug].tsx":
/*!***********************************!*\
  !*** ./src/pages/blog/[slug].tsx ***!
  \***********************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ \"./src/constants/index.ts\");\n/* harmony import */ var _components_SeoTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/SeoTags */ \"./src/components/SeoTags/index.ts\");\n/* harmony import */ var _layout_blog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../layout/blog */ \"./src/layout/blog.tsx\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);\nvar _jsxFileName = \"/Users/divjot.singh/Work/bogas04.github.io/src/pages/blog/[slug].tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n\n\nfunction BlogPost(_ref) {\n  var post = _ref.post;\n  var postTitle = \"\".concat(post.title, \" | Blog | Divjot Singh\");\n  var postUrl = \"\".concat(_constants__WEBPACK_IMPORTED_MODULE_1__[\"BLOG_URL\"], \"/\").concat(post.slug);\n  var postImage = \"\".concat(_constants__WEBPACK_IMPORTED_MODULE_1__[\"WEBSITE_URL\"], \"/\").concat(post.image);\n  var keywords = (post.keywords || []).join(\", \");\n  return __jsx(_layout_blog__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 41,\n      columnNumber: 5\n    }\n  }, __jsx(\"style\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 7\n    }\n  }, \"\\n  .content h2 {\\n    font-size: 1.6em;\\n    margin: 1em 0;\\n    font-weight: 500;\\n  }\\n\\n  .content h3 {\\n    font-size: 1.2em;\\n    margin: 0.8em 0;\\n    font-weight: 500;\\n  }\\n\\n  .content video {\\n    max-width: 100%;\\n  }\\n\\n  .content img,\\n  .content video,\\n  .content h4 {\\n    margin: 1em 0;\\n  }\\n\\n  .content pre {\\n    padding: 10px;\\n    font-size: 20px;\\n    overflow-x: auto;\\n  } \\n\\n  @media (prefers-color-scheme: dark) {\\n    .content pre {\\n      color: black;\\n    }\\n  }\\n\\n  .content ul {\\n    line-height: 1.5;\\n  }\\n\\n  .content li {\\n    margin: 0 0 0.5em 0;\\n  }\\n  h4 {\\n    text-transform: capitalize;\\n    margin-bottom: 2em;\\n  }\\n  h4 p{\\n    margin: 0.4em 0;\\n  }\\n  \"), __jsx(_components_SeoTags__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    title: postTitle,\n    description: post.description,\n    imageUrl: postImage,\n    pageUrl: postUrl,\n    keywords: keywords,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 95,\n      columnNumber: 7\n    }\n  }), __jsx(\"h1\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 103,\n      columnNumber: 7\n    }\n  }, post.title), __jsx(\"h4\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 104,\n      columnNumber: 7\n    }\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    href: \"/\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 105,\n      columnNumber: 9\n    }\n  }, __jsx(\"a\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 106,\n      columnNumber: 11\n    }\n  }, \"Divjot Singh\")), \" \", \"|\", \" \", __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    href: \"/blog\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 109,\n      columnNumber: 9\n    }\n  }, __jsx(\"a\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 110,\n      columnNumber: 11\n    }\n  }, \"Blog\")), \" \", \"| \", new Date(post.date).toDateString(), __jsx(\"br\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 113,\n      columnNumber: 9\n    }\n  }), __jsx(\"p\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 114,\n      columnNumber: 9\n    }\n  }, keywords)), __jsx(\"div\", {\n    className: \"content\",\n    dangerouslySetInnerHTML: {\n      __html: post.html\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 117,\n      columnNumber: 7\n    }\n  }));\n}\n\n_c = BlogPost;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_c2 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"memo\"])(BlogPost));\n\nvar _c, _c2;\n\n$RefreshReg$(_c, \"BlogPost\");\n$RefreshReg$(_c2, \"%default%\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2Jsb2cvW3NsdWddLnRzeD81Y2JhIl0sIm5hbWVzIjpbIkJsb2dQb3N0IiwicG9zdCIsInBvc3RUaXRsZSIsInRpdGxlIiwicG9zdFVybCIsIkJMT0dfVVJMIiwic2x1ZyIsInBvc3RJbWFnZSIsIldFQlNJVEVfVVJMIiwiaW1hZ2UiLCJrZXl3b3JkcyIsImpvaW4iLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJkYXRlIiwidG9EYXRlU3RyaW5nIiwiX19odG1sIiwiaHRtbCIsIm1lbW8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUdBO0FBQ0E7QUFDQTs7QUEwQkEsU0FBU0EsUUFBVCxPQUE0QztBQUFBLE1BQXhCQyxJQUF3QixRQUF4QkEsSUFBd0I7QUFDMUMsTUFBTUMsU0FBUyxhQUFNRCxJQUFJLENBQUNFLEtBQVgsMkJBQWY7QUFDQSxNQUFNQyxPQUFPLGFBQU1DLG1EQUFOLGNBQWtCSixJQUFJLENBQUNLLElBQXZCLENBQWI7QUFDQSxNQUFNQyxTQUFTLGFBQU1DLHNEQUFOLGNBQXFCUCxJQUFJLENBQUNRLEtBQTFCLENBQWY7QUFDQSxNQUFNQyxRQUFRLEdBQUcsQ0FBRVQsSUFBSSxDQUFDUyxRQUFMLElBQWlCLEVBQW5CLEVBQW9DQyxJQUFwQyxDQUF5QyxJQUF6QyxDQUFqQjtBQUVBLFNBQ0UsTUFBQyxvREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3c0JBREYsRUFzREUsTUFBQywyREFBRDtBQUNFLFNBQUssRUFBRVQsU0FEVDtBQUVFLGVBQVcsRUFBRUQsSUFBSSxDQUFDVyxXQUZwQjtBQUdFLFlBQVEsRUFBRUwsU0FIWjtBQUlFLFdBQU8sRUFBRUgsT0FKWDtBQUtFLFlBQVEsRUFBRU0sUUFMWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBdERGLEVBOERFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBS1QsSUFBSSxDQUFDRSxLQUFWLENBOURGLEVBK0RFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLGdEQUFEO0FBQU0sUUFBSSxFQUFDLEdBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBREYsQ0FERixFQUdVLEdBSFYsT0FJSSxHQUpKLEVBS0UsTUFBQyxnREFBRDtBQUFNLFFBQUksRUFBQyxPQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsQ0FMRixFQU9VLEdBUFYsUUFRSyxJQUFJVSxJQUFKLENBQVNaLElBQUksQ0FBQ2EsSUFBZCxFQUFvQkMsWUFBcEIsRUFSTCxFQVNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFURixFQVVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSUwsUUFBSixDQVZGLENBL0RGLEVBNEVFO0FBQ0UsYUFBUyxFQUFDLFNBRFo7QUFFRSwyQkFBdUIsRUFBRTtBQUFFTSxZQUFNLEVBQUVmLElBQUksQ0FBQ2dCO0FBQWYsS0FGM0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQTVFRixDQURGO0FBbUZEOztLQXpGUWpCLFE7O0FBMkZNLHFFQUFBa0Isa0RBQUksQ0FBQ2xCLFFBQUQsQ0FBbkIiLCJmaWxlIjoiLi9zcmMvcGFnZXMvYmxvZy9bc2x1Z10udHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IG1lbW8gfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgQkxPR19VUkwsIFdFQlNJVEVfVVJMIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuXG5pbXBvcnQgeyBnZXRCbG9nUG9zdHMsIElCbG9nUG9zdCB9IGZyb20gXCIuLi8uLi91dGlscy9ibG9nXCI7XG5pbXBvcnQgU2VvVGFncyBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9TZW9UYWdzXCI7XG5pbXBvcnQgQmxvZ0xheW91dCBmcm9tIFwiLi4vLi4vbGF5b3V0L2Jsb2dcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1BhdGhzKCkge1xuICBjb25zdCBwb3N0cyA9IGdldEJsb2dQb3N0cygpO1xuICBjb25zdCBwYXRocyA9IHBvc3RzLm1hcCgocykgPT4gKHsgcGFyYW1zOiB7IHNsdWc6IHMuc2x1ZyB9IH0pKTtcblxuICByZXR1cm4ge1xuICAgIHBhdGhzLFxuICAgIGZhbGxiYWNrOiBmYWxzZSxcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKGNvbnRleHQ6IHsgcGFyYW1zOiB7IHNsdWc6IHN0cmluZyB9IH0pIHtcbiAgY29uc3QgcG9zdCA9IGdldEJsb2dQb3N0cygpLmZpbmQoKHApID0+IHtcbiAgICByZXR1cm4gcC5zbHVnID09PSBjb250ZXh0LnBhcmFtcy5zbHVnO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7IHBvc3QgfSxcbiAgfTtcbn1cblxuaW50ZXJmYWNlIElCbG9nUG9zdFByb3BzIHtcbiAgcG9zdDogSUJsb2dQb3N0O1xufVxuXG5mdW5jdGlvbiBCbG9nUG9zdCh7IHBvc3QgfTogSUJsb2dQb3N0UHJvcHMpIHtcbiAgY29uc3QgcG9zdFRpdGxlID0gYCR7cG9zdC50aXRsZX0gfCBCbG9nIHwgRGl2am90IFNpbmdoYDtcbiAgY29uc3QgcG9zdFVybCA9IGAke0JMT0dfVVJMfS8ke3Bvc3Quc2x1Z31gO1xuICBjb25zdCBwb3N0SW1hZ2UgPSBgJHtXRUJTSVRFX1VSTH0vJHtwb3N0LmltYWdlfWA7XG4gIGNvbnN0IGtleXdvcmRzID0gKChwb3N0LmtleXdvcmRzIHx8IFtdKSBhcyBzdHJpbmdbXSkuam9pbihcIiwgXCIpO1xuXG4gIHJldHVybiAoXG4gICAgPEJsb2dMYXlvdXQ+XG4gICAgICA8c3R5bGU+XG4gICAgICAgIHtgXG4gIC5jb250ZW50IGgyIHtcbiAgICBmb250LXNpemU6IDEuNmVtO1xuICAgIG1hcmdpbjogMWVtIDA7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIC5jb250ZW50IGgzIHtcbiAgICBmb250LXNpemU6IDEuMmVtO1xuICAgIG1hcmdpbjogMC44ZW0gMDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG5cbiAgLmNvbnRlbnQgdmlkZW8ge1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5jb250ZW50IGltZyxcbiAgLmNvbnRlbnQgdmlkZW8sXG4gIC5jb250ZW50IGg0IHtcbiAgICBtYXJnaW46IDFlbSAwO1xuICB9XG5cbiAgLmNvbnRlbnQgcHJlIHtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBvdmVyZmxvdy14OiBhdXRvO1xuICB9IFxuXG4gIEBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcbiAgICAuY29udGVudCBwcmUge1xuICAgICAgY29sb3I6IGJsYWNrO1xuICAgIH1cbiAgfVxuXG4gIC5jb250ZW50IHVsIHtcbiAgICBsaW5lLWhlaWdodDogMS41O1xuICB9XG5cbiAgLmNvbnRlbnQgbGkge1xuICAgIG1hcmdpbjogMCAwIDAuNWVtIDA7XG4gIH1cbiAgaDQge1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgIG1hcmdpbi1ib3R0b206IDJlbTtcbiAgfVxuICBoNCBwe1xuICAgIG1hcmdpbjogMC40ZW0gMDtcbiAgfVxuICBgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPFNlb1RhZ3NcbiAgICAgICAgdGl0bGU9e3Bvc3RUaXRsZX1cbiAgICAgICAgZGVzY3JpcHRpb249e3Bvc3QuZGVzY3JpcHRpb259XG4gICAgICAgIGltYWdlVXJsPXtwb3N0SW1hZ2V9XG4gICAgICAgIHBhZ2VVcmw9e3Bvc3RVcmx9XG4gICAgICAgIGtleXdvcmRzPXtrZXl3b3Jkc31cbiAgICAgIC8+XG5cbiAgICAgIDxoMT57cG9zdC50aXRsZX08L2gxPlxuICAgICAgPGg0PlxuICAgICAgICA8TGluayBocmVmPVwiL1wiPlxuICAgICAgICAgIDxhPkRpdmpvdCBTaW5naDwvYT5cbiAgICAgICAgPC9MaW5rPntcIiBcIn1cbiAgICAgICAgfHtcIiBcIn1cbiAgICAgICAgPExpbmsgaHJlZj1cIi9ibG9nXCI+XG4gICAgICAgICAgPGE+QmxvZzwvYT5cbiAgICAgICAgPC9MaW5rPntcIiBcIn1cbiAgICAgICAgfCB7bmV3IERhdGUocG9zdC5kYXRlKS50b0RhdGVTdHJpbmcoKX1cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIDxwPntrZXl3b3Jkc308L3A+XG4gICAgICA8L2g0PlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImNvbnRlbnRcIlxuICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHBvc3QuaHRtbCB9fVxuICAgICAgLz5cbiAgICA8L0Jsb2dMYXlvdXQ+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1lbW8oQmxvZ1Bvc3QpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/blog/[slug].tsx\n");

/***/ })

})