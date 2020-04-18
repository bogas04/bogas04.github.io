webpackHotUpdate("static/development/pages/blog.js",{

/***/ "./src/pages/blog/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/blog/index.tsx ***!
  \**********************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSG", function() { return __N_SSG; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./src/constants/index.ts");
/* harmony import */ var _components_SeoTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/SeoTags */ "./src/components/SeoTags/index.ts");
/* harmony import */ var _layout_blog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../layout/blog */ "./src/layout/blog.tsx");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/Users/divjot.singh/Work/bogas04.github.io/src/pages/blog/index.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






function BlogListing(_ref) {
  var _this = this;

  var posts = _ref.posts;
  return __jsx(_layout_blog__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }, __jsx("style", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }, "\n  ul {\n    margin: 2em 1em;\n    padding: 0;\n    line-height: 1.5;\n  }\n\n  .post {\n    list-style: none;\n    border-radius: 5px;\n    overflow: hidden;\n    border: 1px solid #cbcbcb;\n    margin: 1em;\n    transition: all 0.2s;\n  }\n\n  .post a {\n    text-decoration: none;\n    padding: 1em;\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n  }\n\n  .post a:hover,\n  .post a:focus {\n    background-color: rgba(0, 0, 0, 0.1);\n  }\n\n  .post img {\n    margin: 0;\n    min-width: 30%;\n    max-width: 30%;\n  }\n\n  .post-body {\n    display: flex;\n    flex-direction: column;\n    align-content: space-between;\n  }\n\n  .post-body p,\n  .post-body span {\n    color: initial;\n  }\n\n  @media (prefers-color-scheme: dark) {\n    .post-body p,\n    .post-body span {\n      color: white;\n    }\n\n    .post:hover,\n    .post:focus {\n      box-shadow: none;\n    }\n\n    .post a:hover,\n    .post a:focus {\n      background-color: rgba(0, 0, 0, 0.5);\n    }\n  }\n\n  @media (max-width: 800px) {\n    ul {\n      margin: 2em -1em;\n    }\n    .post a {\n      flex-direction: column-reverse;\n    }\n    .post img {\n      min-width: calc(100% + 2em);\n      padding: 0;\n      margin: -1em -1em 1em;\n      height: 300px;\n      object-fit: cover;\n    }\n  }"), __jsx(_components_SeoTags__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Blog | Divjot Singh",
    description: "My thoughts on work, life and world.",
    imageUrl: "",
    pageUrl: _constants__WEBPACK_IMPORTED_MODULE_1__["BLOG_URL"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 7
    }
  }), __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 7
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
    href: "/",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 9
    }
  }, __jsx("a", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 11
    }
  }, "Divjot Singh")), " ", "| Blog"), __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 7
    }
  }, posts.map(function (post) {
    return __jsx("li", {
      className: "post",
      key: post.title,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 11
      }
    }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
      href: "blog/[slug]",
      as: "blog/".concat(post.slug),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 13
      }
    }, __jsx("a", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 123,
        columnNumber: 15
      }
    }, __jsx("div", {
      className: "post-body",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 17
      }
    }, __jsx("h2", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 19
      }
    }, post.title), __jsx("p", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 19
      }
    }, post.description), __jsx("span", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 19
      }
    }, new Date(post.date).toDateString())), post.image && __jsx("img", {
      src: post.image,
      alt: "Image for the post",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 19
      }
    }))));
  })));
}

var __N_SSG = true;
/* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(BlogListing));

/***/ })

})
//# sourceMappingURL=blog.js.d2ce9e25275000cb1ae8.hot-update.js.map