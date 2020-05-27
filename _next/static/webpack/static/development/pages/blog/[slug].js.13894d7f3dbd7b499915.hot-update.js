webpackHotUpdate("static/development/pages/blog/[slug].js",{

/***/ "./src/pages/blog/[slug].tsx":
/*!***********************************!*\
  !*** ./src/pages/blog/[slug].tsx ***!
  \***********************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ \"./src/constants/index.ts\");\n/* harmony import */ var _components_SeoTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/SeoTags */ \"./src/components/SeoTags/index.ts\");\n/* harmony import */ var _layout_blog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../layout/blog */ \"./src/layout/blog.tsx\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);\nvar _jsxFileName = \"/Users/divjot.singh/Work/bogas04.github.io/src/pages/blog/[slug].tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n\n\nfunction BlogPost(_ref) {\n  var post = _ref.post;\n  var postTitle = \"\".concat(post.title, \" | Blog | Divjot Singh\");\n  var postUrl = \"\".concat(_constants__WEBPACK_IMPORTED_MODULE_1__[\"BLOG_URL\"], \"/\").concat(post.slug);\n  var postImage = \"\".concat(_constants__WEBPACK_IMPORTED_MODULE_1__[\"WEBSITE_URL\"], \"/\").concat(post.image);\n  var keywords = (post.keywords || []).join(\", \");\n  return __jsx(_layout_blog__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 41,\n      columnNumber: 5\n    }\n  }, __jsx(\"style\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 7\n    }\n  }, \"\\n  .content h2 {\\n    font-size: 1.4em;\\n    margin: 1em 0;\\n    font-weight: 500;\\n  }\\n\\n  .content h3 {\\n    font-size: 1.2em;\\n    margin: 0.8em 0;\\n    font-weight: 500;\\n  }\\n\\n  .content img,\\n  .content h4 {\\n    margin: 1em 0;\\n  }\\n\\n  .content pre {\\n    background-color: #f9f9f9;\\n    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);\\n    padding: 0.5em;\\n    border-radius: 2px;\\n    overflow-x: auto;\\n  }\\n\\n  .content pre code {\\n    background-color: transparent;\\n    padding: 0;\\n  }\\n\\n  @media (prefers-color-scheme: dark) {\\n    .content pre {\\n      color: black;\\n    }\\n  }\\n\\n  .content ul {\\n    line-height: 1.5;\\n  }\\n\\n  .content li {\\n    margin: 0 0 0.5em 0;\\n  }\\n  h4 {\\n    text-transform: capitalize;\\n    margin-bottom: 2em;\\n  }\"), __jsx(_components_SeoTags__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    title: postTitle,\n    description: post.description,\n    imageUrl: postImage,\n    pageUrl: postUrl,\n    keywords: keywords,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 93,\n      columnNumber: 7\n    }\n  }), __jsx(\"h1\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 101,\n      columnNumber: 7\n    }\n  }, post.title), __jsx(\"h4\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 102,\n      columnNumber: 7\n    }\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    href: \"/\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 103,\n      columnNumber: 9\n    }\n  }, __jsx(\"a\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 104,\n      columnNumber: 11\n    }\n  }, \"Divjot Singh\")), \" \", \"|\", \" \", __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    href: \"/blog\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 107,\n      columnNumber: 9\n    }\n  }, __jsx(\"a\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 108,\n      columnNumber: 11\n    }\n  }, \"Blog\")), \" \", \"| \", new Date(post.date).toDateString(), __jsx(\"br\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 111,\n      columnNumber: 9\n    }\n  }), keywords), __jsx(\"div\", {\n    className: \"content\",\n    dangerouslySetInnerHTML: {\n      __html: post.html\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 115,\n      columnNumber: 7\n    }\n  }));\n}\n\n_c = BlogPost;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_c2 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"memo\"])(BlogPost));\n\nvar _c, _c2;\n\n$RefreshReg$(_c, \"BlogPost\");\n$RefreshReg$(_c2, \"%default%\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYmxvZy9bc2x1Z10udHN4PzVjYmEiXSwibmFtZXMiOlsiQmxvZ1Bvc3QiLCJwb3N0IiwicG9zdFRpdGxlIiwidGl0bGUiLCJwb3N0VXJsIiwiQkxPR19VUkwiLCJzbHVnIiwicG9zdEltYWdlIiwiV0VCU0lURV9VUkwiLCJpbWFnZSIsImtleXdvcmRzIiwiam9pbiIsImRlc2NyaXB0aW9uIiwiRGF0ZSIsImRhdGUiLCJ0b0RhdGVTdHJpbmciLCJfX2h0bWwiLCJodG1sIiwibWVtbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBR0E7QUFDQTtBQUNBOztBQTBCQSxTQUFTQSxRQUFULE9BQTRDO0FBQUEsTUFBeEJDLElBQXdCLFFBQXhCQSxJQUF3QjtBQUMxQyxNQUFNQyxTQUFTLGFBQU1ELElBQUksQ0FBQ0UsS0FBWCwyQkFBZjtBQUNBLE1BQU1DLE9BQU8sYUFBTUMsbURBQU4sY0FBa0JKLElBQUksQ0FBQ0ssSUFBdkIsQ0FBYjtBQUNBLE1BQU1DLFNBQVMsYUFBTUMsc0RBQU4sY0FBcUJQLElBQUksQ0FBQ1EsS0FBMUIsQ0FBZjtBQUNBLE1BQU1DLFFBQVEsR0FBRyxDQUFFVCxJQUFJLENBQUNTLFFBQUwsSUFBaUIsRUFBbkIsRUFBb0NDLElBQXBDLENBQXlDLElBQXpDLENBQWpCO0FBRUEsU0FDRSxNQUFDLG9EQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDB3QkFERixFQW9ERSxNQUFDLDJEQUFEO0FBQ0UsU0FBSyxFQUFFVCxTQURUO0FBRUUsZUFBVyxFQUFFRCxJQUFJLENBQUNXLFdBRnBCO0FBR0UsWUFBUSxFQUFFTCxTQUhaO0FBSUUsV0FBTyxFQUFFSCxPQUpYO0FBS0UsWUFBUSxFQUFFTSxRQUxaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFwREYsRUE0REU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFLVCxJQUFJLENBQUNFLEtBQVYsQ0E1REYsRUE2REU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsR0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFERixDQURGLEVBR1UsR0FIVixPQUlJLEdBSkosRUFLRSxNQUFDLGdEQUFEO0FBQU0sUUFBSSxFQUFDLE9BQVg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixDQUxGLEVBT1UsR0FQVixRQVFLLElBQUlVLElBQUosQ0FBU1osSUFBSSxDQUFDYSxJQUFkLEVBQW9CQyxZQUFwQixFQVJMLEVBU0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVRGLEVBVUdMLFFBVkgsQ0E3REYsRUEwRUU7QUFDRSxhQUFTLEVBQUMsU0FEWjtBQUVFLDJCQUF1QixFQUFFO0FBQUVNLFlBQU0sRUFBRWYsSUFBSSxDQUFDZ0I7QUFBZixLQUYzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBMUVGLENBREY7QUFpRkQ7O0tBdkZRakIsUTs7QUF5Rk0scUVBQUFrQixrREFBSSxDQUFDbEIsUUFBRCxDQUFuQiIsImZpbGUiOiIuL3NyYy9wYWdlcy9ibG9nL1tzbHVnXS50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgbWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBCTE9HX1VSTCwgV0VCU0lURV9VUkwgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5cbmltcG9ydCB7IGdldEJsb2dQb3N0cywgSUJsb2dQb3N0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2Jsb2dcIjtcbmltcG9ydCBTZW9UYWdzIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL1Nlb1RhZ3NcIjtcbmltcG9ydCBCbG9nTGF5b3V0IGZyb20gXCIuLi8uLi9sYXlvdXQvYmxvZ1wiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUGF0aHMoKSB7XG4gIGNvbnN0IHBvc3RzID0gZ2V0QmxvZ1Bvc3RzKCk7XG4gIGNvbnN0IHBhdGhzID0gcG9zdHMubWFwKChzKSA9PiAoeyBwYXJhbXM6IHsgc2x1Zzogcy5zbHVnIH0gfSkpO1xuXG4gIHJldHVybiB7XG4gICAgcGF0aHMsXG4gICAgZmFsbGJhY2s6IGZhbHNlLFxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoY29udGV4dDogeyBwYXJhbXM6IHsgc2x1Zzogc3RyaW5nIH0gfSkge1xuICBjb25zdCBwb3N0ID0gZ2V0QmxvZ1Bvc3RzKCkuZmluZCgocCkgPT4ge1xuICAgIHJldHVybiBwLnNsdWcgPT09IGNvbnRleHQucGFyYW1zLnNsdWc7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHsgcG9zdCB9LFxuICB9O1xufVxuXG5pbnRlcmZhY2UgSUJsb2dQb3N0UHJvcHMge1xuICBwb3N0OiBJQmxvZ1Bvc3Q7XG59XG5cbmZ1bmN0aW9uIEJsb2dQb3N0KHsgcG9zdCB9OiBJQmxvZ1Bvc3RQcm9wcykge1xuICBjb25zdCBwb3N0VGl0bGUgPSBgJHtwb3N0LnRpdGxlfSB8IEJsb2cgfCBEaXZqb3QgU2luZ2hgO1xuICBjb25zdCBwb3N0VXJsID0gYCR7QkxPR19VUkx9LyR7cG9zdC5zbHVnfWA7XG4gIGNvbnN0IHBvc3RJbWFnZSA9IGAke1dFQlNJVEVfVVJMfS8ke3Bvc3QuaW1hZ2V9YDtcbiAgY29uc3Qga2V5d29yZHMgPSAoKHBvc3Qua2V5d29yZHMgfHwgW10pIGFzIHN0cmluZ1tdKS5qb2luKFwiLCBcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8QmxvZ0xheW91dD5cbiAgICAgIDxzdHlsZT5cbiAgICAgICAge2BcbiAgLmNvbnRlbnQgaDIge1xuICAgIGZvbnQtc2l6ZTogMS40ZW07XG4gICAgbWFyZ2luOiAxZW0gMDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG5cbiAgLmNvbnRlbnQgaDMge1xuICAgIGZvbnQtc2l6ZTogMS4yZW07XG4gICAgbWFyZ2luOiAwLjhlbSAwO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cblxuICAuY29udGVudCBpbWcsXG4gIC5jb250ZW50IGg0IHtcbiAgICBtYXJnaW46IDFlbSAwO1xuICB9XG5cbiAgLmNvbnRlbnQgcHJlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gICAgcGFkZGluZzogMC41ZW07XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIG92ZXJmbG93LXg6IGF1dG87XG4gIH1cblxuICAuY29udGVudCBwcmUgY29kZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIEBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcbiAgICAuY29udGVudCBwcmUge1xuICAgICAgY29sb3I6IGJsYWNrO1xuICAgIH1cbiAgfVxuXG4gIC5jb250ZW50IHVsIHtcbiAgICBsaW5lLWhlaWdodDogMS41O1xuICB9XG5cbiAgLmNvbnRlbnQgbGkge1xuICAgIG1hcmdpbjogMCAwIDAuNWVtIDA7XG4gIH1cbiAgaDQge1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgIG1hcmdpbi1ib3R0b206IDJlbTtcbiAgfWB9XG4gICAgICA8L3N0eWxlPlxuXG4gICAgICA8U2VvVGFnc1xuICAgICAgICB0aXRsZT17cG9zdFRpdGxlfVxuICAgICAgICBkZXNjcmlwdGlvbj17cG9zdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgaW1hZ2VVcmw9e3Bvc3RJbWFnZX1cbiAgICAgICAgcGFnZVVybD17cG9zdFVybH1cbiAgICAgICAga2V5d29yZHM9e2tleXdvcmRzfVxuICAgICAgLz5cblxuICAgICAgPGgxPntwb3N0LnRpdGxlfTwvaDE+XG4gICAgICA8aDQ+XG4gICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgICAgPGE+RGl2am90IFNpbmdoPC9hPlxuICAgICAgICA8L0xpbms+e1wiIFwifVxuICAgICAgICB8e1wiIFwifVxuICAgICAgICA8TGluayBocmVmPVwiL2Jsb2dcIj5cbiAgICAgICAgICA8YT5CbG9nPC9hPlxuICAgICAgICA8L0xpbms+e1wiIFwifVxuICAgICAgICB8IHtuZXcgRGF0ZShwb3N0LmRhdGUpLnRvRGF0ZVN0cmluZygpfVxuICAgICAgICA8YnIgLz5cbiAgICAgICAge2tleXdvcmRzfVxuICAgICAgPC9oND5cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJjb250ZW50XCJcbiAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBwb3N0Lmh0bWwgfX1cbiAgICAgIC8+XG4gICAgPC9CbG9nTGF5b3V0PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZW1vKEJsb2dQb3N0KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/blog/[slug].tsx\n");

/***/ })

})