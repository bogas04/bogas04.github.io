webpackHotUpdate("static/development/pages/index.js",{

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_SeoTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/SeoTags */ "./src/components/SeoTags/index.ts");
/* harmony import */ var _components_icons_twitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/icons/twitter */ "./src/components/icons/twitter.tsx");
/* harmony import */ var _components_icons_blog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/icons/blog */ "./src/components/icons/blog.tsx");
/* harmony import */ var _components_icons_linkedin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/icons/linkedin */ "./src/components/icons/linkedin.tsx");
/* harmony import */ var _components_icons_github__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/icons/github */ "./src/components/icons/github.tsx");
var _jsxFileName = "/Users/divjot.singh/Work/bogas04.github.io/src/pages/index.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;








function HomePage() {
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    window.onkeypress = function (e) {
      this.currentSection = this.currentSection || 0;
      this.$sections = this.$sections || document.getElementsByClassName("section");

      if ((e.charCode === 106 || e.keyCode === 40) && this.currentSection < this.$sections.length - 1) {
        window.scrollTo(0, this.$sections[++this.currentSection].offsetTop);
        return false;
      } else if ((e.charCode === 107 || e.keyCode === 38) && this.currentSection > 0) {
        window.scrollTo(0, this.$sections[--this.currentSection].offsetTop);
        return false;
      }
    };
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("style", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }, "\n  #main-title {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  #main-title img {\n    background-image: url(//github.com/bogas04.png);\n    border-radius: 50%;\n    border: 5px solid white;\n    min-width: 100px;\n    min-height: 100px;\n    width: 1.5em;\n    height: 1.5em;\n    position: relative;\n  }\n\n  .row {\n    background-color: transparent;\n    border: none;\n  }\n\n  a {\n    color: #3493f2;\n  }\n\n  .social-icons {\n    width: 100%;\n    display: flex;\n    justify-content: space-between;\n    padding: 2em;\n  }\n  .social-icons a {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    color: white;\n    text-transform: lowercase;\n  }\n\n  .social-icons-svg {\n    filter: invert(100%);\n    margin-bottom: 0.5em;\n  }\n\n  .uses {\n    font-size: 2rem;\n    display: block;\n    font-style: italic;\n    color: #ffc600;\n    text-decoration: underline #eb4471;\n    text-align: center;\n    width: 100%;\n    position: absolute;\n    left: 0;\n    bottom: 10vh;\n  }\n\n  .talks {\n    display: grid;\n    grid-gap: 50px;\n    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));\n    width: 100%;\n  }\n\n  .talk-video img,\n  .talk-image {\n    height: 50vh;\n    width: 100%;\n    object-fit: cover;\n  }\n\n  .talk-video {\n    position: relative;\n  }\n\n  .talk-video:hover::after {\n    transform: scale(5);\n    background: rgba(100, 100, 100, 0.6);\n  }\n\n  .talk-video::after {\n    content: \"\u25B6\";\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    color: white;\n    border-radius: 50%;\n    background: rgba(100, 100, 100, 0.4);\n    transform: scale(4.7);\n    height: 2em;\n    width: 2em;\n    display: flex;\n    justify-content: center;\n    transition: transform ease 0.2s;\n    align-items: center;\n  }\n\n  .social-grid .card-title {\n    height: 45vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .social-grid a {\n    color: inherit;\n  }\n\n  .card-title {\n    font-size: 154%;\n    font-weight: bold;\n    padding-bottom: 15px;\n    text-transform: uppercase;\n  }\n\n  #work .row.card {\n    box-shadow: -20px 0 0px -17px grey;\n    margin-left: -15px;\n    padding-left: 15px;\n    box-shadow: -20px 16px 0px -17px #808080;\n  }\n\n  #work .row.card::before {\n    content: \"\";\n    width: 20px;\n    height: 20px;\n    background: #939393;\n    display: block;\n    position: absolute;\n    left: -11px;\n    border-radius: 50%;\n    top: 8px;\n  }\n\n  #work .row.card:first-child::before {\n    background-color: #4dbf9a;\n  }\n\n  @media screen and (max-width: 750px) {\n    /* Better li padding for mobile */\n    dd ul {\n      padding-left: 10px !important;\n    }\n\n    #main-title {\n      align-items: flex-start;\n    }\n\n    .talks {\n      display: grid;\n      grid-gap: 50px;\n      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n    }\n\n    .talk-video,\n    .talk-image {\n      height: 50vh;\n      width: 100%;\n    }\n    .social-icons {\n      padding: 0.5em;\n    }\n\n    .social-icons-svg {\n      transform: scale(0.8);\n    }\n  }\n\n  /* Misc change to better align things */\n  dd ul {\n    padding-left: 20px;\n  }\n  "), __jsx(_components_SeoTags__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Divjot Singh | Frontend Engineer | Vegan | Sikh",
    description: "Frontend Engineer, Sikh & a Vegan residing in Bengaluru, India.",
    imageUrl: "https://github.com/bogas04.png",
    pageUrl: "https://bogas04.github.io/",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 7
    }
  }), __jsx("div", {
    className: "section",
    style: {
      zIndex: 10
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 220,
      columnNumber: 7
    }
  }, __jsx("h1", {
    id: "main-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 9
    }
  }, __jsx("img", {
    src: "//github.com/bogas04.png",
    alt: "\uD83D\uDC73\uD83C\uDFFD",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 11
    }
  }), "Divjot Singh"), __jsx("nav", {
    className: "social-icons",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226,
      columnNumber: 9
    }
  }, __jsx("a", {
    href: "https://linkedin.com/in/bogas04",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 227,
      columnNumber: 11
    }
  }, __jsx(_components_icons_linkedin__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "social-icons-svg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 232,
      columnNumber: 13
    }
  }), "LinkedIn"), __jsx("a", {
    href: "https://twitter.com/bogas04",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 11
    }
  }, __jsx(_components_icons_twitter__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "social-icons-svg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 13
    }
  }), "Twitter"), __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/blog",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 11
    }
  }, __jsx("a", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 245,
      columnNumber: 13
    }
  }, __jsx(_components_icons_blog__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "social-icons-svg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 15
    }
  }), "/blog")), __jsx("a", {
    href: "https://github.com/bogas04",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250,
      columnNumber: 11
    }
  }, __jsx(_components_icons_github__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "social-icons-svg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 13
    }
  }), "Github")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/uses",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 260,
      columnNumber: 9
    }
  }, __jsx("a", {
    className: "uses",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 11
    }
  }, "/uses"))), __jsx("div", {
    className: "section grey",
    style: {
      zIndex: 12
    },
    id: "work",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 7
    }
  }, __jsx("h3", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 9
    }
  }, "Such Work"), __jsx("div", {
    className: "container-fluid",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 268,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 269,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 270,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://udaan.com",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 15
    }
  }, "Udaan, Bengaluru"), ", Software Engineer"), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 280,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 281,
      columnNumber: 15
    }
  }, "Duration:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 282,
      columnNumber: 15
    }
  }, "April 2020 - Present"))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 286,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 287,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://swiggy.com",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 288,
      columnNumber: 15
    }
  }, "Swiggy, Bengaluru"), ", Software Development Engineer III"), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 297,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 298,
      columnNumber: 15
    }
  }, "Duration:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 299,
      columnNumber: 15
    }
  }, "November 2019 - April 2020"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 300,
      columnNumber: 15
    }
  }, "Team:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 301,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "https://www.twitter.com/SwiggyTech",
    rel: "noopener noreferrer",
    target: "_blank",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 302,
      columnNumber: 17
    }
  }, "@SwiggyTech"), " ", "- New Initiatives Team (Web)"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 311,
      columnNumber: 15
    }
  }, "Projects:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 312,
      columnNumber: 15
    }
  }, __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 313,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 314,
      columnNumber: 19
    }
  }, "Lead the release of Timeline shareability on Swiggy Go."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 317,
      columnNumber: 19
    }
  }, "Lead the release of Swiggy Stores PWA."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 318,
      columnNumber: 19
    }
  }, "Lead the release of Swiggy Single Page Checkout for Food."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 321,
      columnNumber: 19
    }
  }, "Developed new PL driven UI for Swiggy Stores."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 322,
      columnNumber: 19
    }
  }, "Developed new Swiggy Genie."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 323,
      columnNumber: 19
    }
  }, "Developed a system for incorporating Origin Trials for our PWAs, starting with", " ", __jsx("a", {
    href: "https://web.dev/sms-receiver-api-announcement/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 326,
      columnNumber: 21
    }
  }, "SMS Receiver API"), " ", "&", " ", __jsx("a", {
    href: "https://web.dev/contact-picker/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 334,
      columnNumber: 21
    }
  }, "Contacts API"), "."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 343,
      columnNumber: 19
    }
  }, "Deprecated legacy systems and ported the same to modern services."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 347,
      columnNumber: 19
    }
  }, "Regularly worked with and maintained HAProxy configuration."))))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 355,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 356,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://swiggy.com",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 357,
      columnNumber: 15
    }
  }, "Swiggy, Bengaluru"), ", Software Development Engineer II"), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 366,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 367,
      columnNumber: 15
    }
  }, "Duration:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 368,
      columnNumber: 15
    }
  }, "January 2018 - November 2019"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 369,
      columnNumber: 15
    }
  }, "Team:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 370,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "https://www.twitter.com/SwiggyTech",
    rel: "noopener noreferrer",
    target: "_blank",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 371,
      columnNumber: 17
    }
  }, "@SwiggyTech"), " ", "- Web Team"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 380,
      columnNumber: 15
    }
  }, "Projects:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 381,
      columnNumber: 15
    }
  }, __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 382,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 383,
      columnNumber: 19
    }
  }, "Designed and developed multi-tenant payments module"), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 384,
      columnNumber: 19
    }
  }, "Designed and developed website generator (Gauntlet). 10+ dashboards."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 388,
      columnNumber: 19
    }
  }, "Designed and developed static site serving system for legal pages."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 392,
      columnNumber: 19
    }
  }, "Designed Hotstar-Pop integration and scaled codepath for 120k RPM."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 396,
      columnNumber: 19
    }
  }, "Moved codebase to a monorepo for improved developer experience."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 400,
      columnNumber: 19
    }
  }, "Developed automatic UA based asset serving system for smaller bundle sizes. (20%)"), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 404,
      columnNumber: 19
    }
  }, "Developed Restaurant Hygiene Pages for PWA and as webview for apps."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 408,
      columnNumber: 19
    }
  }, "Developed Everyday Offers Feature for mobile PWA."))), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 411,
      columnNumber: 15
    }
  }, "Major Achievements:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 412,
      columnNumber: 15
    }
  }, __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 413,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 414,
      columnNumber: 19
    }
  }, "Awards: MVP (Oct 2018)"))))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 420,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 421,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://housing.com",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 422,
      columnNumber: 15
    }
  }, "Housing.com, Mumbai"), ", Senior Software Development Engineer"), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 431,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 432,
      columnNumber: 15
    }
  }, "Duration:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 433,
      columnNumber: 15
    }
  }, "October 2017 - January 2018"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 434,
      columnNumber: 15
    }
  }, "Team:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 435,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "https://twitter.com/HousingEngg",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 436,
      columnNumber: 17
    }
  }, "@HousingEngg"), " ", "- Frontend team"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 445,
      columnNumber: 15
    }
  }, "Description:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 446,
      columnNumber: 15
    }
  }, "As part of frontend team, I worked on improving performance of housing PWA. This was achieved by following enhancements;", __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 449,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 450,
      columnNumber: 19
    }
  }, "Migrated to React 16 from version 15. 50% win for", " ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 452,
      columnNumber: 21
    }
  }, "renderToString"), " completion time."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 454,
      columnNumber: 19
    }
  }, "Migrated to NodeJS version 8 from version 6 gave another 50% win for above."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 458,
      columnNumber: 19
    }
  }, "Reduced asset size by roughly 20% using Brotli compression."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 461,
      columnNumber: 19
    }
  }, "Optimized PNGs, JPEGs, converted to SVGs wherever possible to reduce overall page size."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 465,
      columnNumber: 19
    }
  }, "Improved scroll performance of listing page by using", " ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 467,
      columnNumber: 21
    }
  }, "will-change"), " CSS rule, along with disabling", " ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 468,
      columnNumber: 21
    }
  }, "pointer-events"), " on scroll."))))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 475,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 476,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "http://www.samsung.com/in/aboutsamsung/samsungelectronics/india/rnd.html",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 477,
      columnNumber: 15
    }
  }, "Samsung R&D Institute, Bengaluru"), ", Software Developer"), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 486,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 487,
      columnNumber: 15
    }
  }, "Duration:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 488,
      columnNumber: 15
    }
  }, "June 2016 - October 2017"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 489,
      columnNumber: 15
    }
  }, "Team:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 490,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "https://twitter.com/SamsungInternet",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 491,
      columnNumber: 17
    }
  }, "@SamsungInternet"), " ", "team"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 500,
      columnNumber: 15
    }
  }, "Projects:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 501,
      columnNumber: 15
    }
  }, __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 502,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 503,
      columnNumber: 19
    }
  }, __jsx("strong", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 504,
      columnNumber: 21
    }
  }, __jsx("a", {
    href: "https://chrome.google.com/webstore/detail/samsung-internet/epejdmjgfibjaffbmojllapapjejipkh",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 505,
      columnNumber: 23
    }
  }, "Samsung Internet PC Extension"), " "), "Starting June 2016", __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 514,
      columnNumber: 21
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 515,
      columnNumber: 23
    }
  }, "Revamped the extension codebase by switching to modern JavaScript paradigms, UI overhaul and performance optimizations. Improved localization of strings and helped in", " ", __jsx("a", {
    href: "https://medium.com/samsung-internet-dev/release-of-samsung-internet-chrome-extension-v2-644e7b97096e",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 520,
      columnNumber: 25
    }
  }, "rebranding"), " ", "for version 2.0."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 529,
      columnNumber: 23
    }
  }, "Successfully shipped version 2.0 in March which received great response (chrome web store rating increased from 2.7 to 3.7 post launch)."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 534,
      columnNumber: 23
    }
  }, "Currently working on adding new features and improving sync performance."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 538,
      columnNumber: 23
    }
  }, "Userbase increased from 8,000 to 60,000 monthly active users (~8x) within 4 months of 2.0 release."))), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 545,
      columnNumber: 19
    }
  }, __jsx("strong", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 546,
      columnNumber: 21
    }
  }, __jsx("a", {
    href: "https://www.tizenexperts.com/2017/06/galaxy-update-samsung-z2-z3-brings-samsung-z4-galaxy-app-features/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 547,
      columnNumber: 23
    }
  }, "Gaana Web App"), " "), "Starting March 2017", __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 556,
      columnNumber: 21
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 557,
      columnNumber: 23
    }
  }, "Designed and developed the web application in ReactJS + Redux +", " ", __jsx("a", {
    href: "https://github.com/styled-components/styled-components",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 560,
      columnNumber: 25
    }
  }, "Styled-Components"), " ", "(later replaced with", " ", __jsx("a", {
    href: "https://github.com/tkstrong4/emotion",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 568,
      columnNumber: 25
    }
  }, "Emotion"), " ", "for perf wins)."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 577,
      columnNumber: 23
    }
  }, "Challenges like performance on low end devices, inter-op between Tizen APIs and Web Platform were tackled along with the team."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 582,
      columnNumber: 23
    }
  }, "Successfully launched first phase of app within MyGalaxy on Tizen in Late May."))), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 589,
      columnNumber: 19
    }
  }, __jsx("strong", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 590,
      columnNumber: 21
    }
  }, __jsx("a", {
    href: "https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 591,
      columnNumber: 23
    }
  }, "Samsung Internet"), " ", "-", " ", __jsx("a", {
    href: "http://www.samsung.com/global/galaxy/apps/bixby/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 599,
      columnNumber: 23
    }
  }, "Bixby"), " "), "April 2017 \u2013 July 2017", __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 608,
      columnNumber: 21
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 609,
      columnNumber: 23
    }
  }, "Wrote JSGF gram files for Samsung Internet domain. [", __jsx("a", {
    href: "https://www.youtube.com/watch?v=k2IM_wHrSQ8",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 611,
      columnNumber: 25
    }
  }, "video"), "]"), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 620,
      columnNumber: 23
    }
  }, "Helped in bringing accuracy to 95%+ for Bixby US launch."))))), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 627,
      columnNumber: 15
    }
  }, "Major Achievements:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 628,
      columnNumber: 15
    }
  }, __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 629,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 630,
      columnNumber: 19
    }
  }, __jsx("strong", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 631,
      columnNumber: 21
    }
  }, "Employee of the Month (December 2016)"), " ", "Awarded as Employee of the Month for supporting and developing Samsung Internet PC Extension v2.0 in HQ."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 635,
      columnNumber: 19
    }
  }, __jsx("strong", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 636,
      columnNumber: 21
    }
  }, "Samsung Citizen Award (March 2017)"), " ", __jsx("em", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 637,
      columnNumber: 21
    }
  }, "\"Though a fresher and new to product development, [he] took up one of the key components of Samsung Internet browser, viz Samsung Internet Extension for Chrome and commercialized it flawlessly. All through the project, [he] has displayed enormous passion with a clear goal of making it much better.\"")))))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 651,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 652,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "http://chefsbasket.com",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 653,
      columnNumber: 15
    }
  }, "Fizzy Food Lab's, Mumbai"), ", Fullstack JavaScript Developer"), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 662,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 663,
      columnNumber: 15
    }
  }, "Duration:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 664,
      columnNumber: 15
    }
  }, "December 2015 - January 2016"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 665,
      columnNumber: 15
    }
  }, "Description:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 666,
      columnNumber: 15
    }
  }, __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 667,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 668,
      columnNumber: 19
    }
  }, "Developed an", " ", __jsx("a", {
    href: "http://chefsbasket.herokuapp.com",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 670,
      columnNumber: 21
    }
  }, "SPA"), " ", "using ReactJS, NodeJS and Postgresql"))))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 684,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 685,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//www.samsung.com/in/sri-b/siso.html",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 686,
      columnNumber: 15
    }
  }, "Samsung Research Institute, Bengaluru"), ", Student Trainee"), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 695,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 696,
      columnNumber: 15
    }
  }, "Duration:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 697,
      columnNumber: 15
    }
  }, "June 2015 - August 2015"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 698,
      columnNumber: 15
    }
  }, "Description:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 699,
      columnNumber: 15
    }
  }, __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 700,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 701,
      columnNumber: 19
    }
  }, "Developed tile based map server using NodeJS, mapnik and TileMill"), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 705,
      columnNumber: 19
    }
  }, "Set up Mongodb cluster (3 systems), developed scripts to convert data from mongodb to CSVs and CSVs to JSON to-and-from a Hadoop cluster, and a web app to display results of the road anlaysis done by Hadoop."))))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 716,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 717,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//refiral.com",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 718,
      columnNumber: 15
    }
  }, "Refiral, New Delhi"), ", Product Developer"), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 723,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 724,
      columnNumber: 15
    }
  }, "Duration:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 725,
      columnNumber: 15
    }
  }, "October 2013 - October 2014"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 726,
      columnNumber: 15
    }
  }, "Description:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 727,
      columnNumber: 15
    }
  }, "Co-founding team member. Managed JavaScript head of the tool.", __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 729,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 730,
      columnNumber: 19
    }
  }, "Health Report tool for analyzes all clients statistically and constantly check for API health status, hence benefiting in tracking downtimes and losses."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 735,
      columnNumber: 19
    }
  }, "Performance improvements by deploying faster routes to server calls. (300-400ms win)"), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 739,
      columnNumber: 19
    }
  }, "Expanding support to several e-commerce platforms."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 740,
      columnNumber: 19
    }
  }, "Extending help in creating the internal API. Made its use to make several customizable popouts, providing more options than industry."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 745,
      columnNumber: 19
    }
  }, "Integration with social networks to enable the tool. Studied Facebook documentation to leverage best out of its Graph API."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 750,
      columnNumber: 19
    }
  }, "Helped in strategy and planning of the tool in its initial phase."))))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 758,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 759,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//frrole.com",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 760,
      columnNumber: 15
    }
  }, "Frrole, Remote"), ", Frontend Development Intern"), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 765,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 766,
      columnNumber: 15
    }
  }, "Duration:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 767,
      columnNumber: 15
    }
  }, "November 2013 - January 2014"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 768,
      columnNumber: 15
    }
  }, "Description:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 769,
      columnNumber: 15
    }
  }, "Buzzometer - Created an interactive and responsive web app using the APIs of Frrole using jQuery, PHP and XML for analyzing the buzz created by a particular movie."))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 777,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 778,
      columnNumber: 13
    }
  }, "And much more, meet up for a \u2615 coffee if my work interests you")))), __jsx("div", {
    className: "section yellow",
    style: {
      zIndex: 11
    },
    id: "education",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 786,
      columnNumber: 7
    }
  }, __jsx("h3", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 787,
      columnNumber: 9
    }
  }, "Much Education"), __jsx("div", {
    className: "container-fluid",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 789,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 790,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 791,
      columnNumber: 13
    }
  }, __jsx("a", {
    href: "https://linkedin.com/in/bogas04",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 792,
      columnNumber: 15
    }
  }, "Professionally Me")), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 801,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 802,
      columnNumber: 15
    }
  }, "Resume:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 803,
      columnNumber: 15
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "/resume",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 804,
      columnNumber: 17
    }
  }, "Download resume")), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 808,
      columnNumber: 15
    }
  }, "Programming Languages:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 809,
      columnNumber: 15
    }
  }, "C, TypeScript, JavaScript (ES2015+), PHP, Java,"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 810,
      columnNumber: 15
    }
  }, "Stacks/Technologies:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 811,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "https://preactjs.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 812,
      columnNumber: 17
    }
  }, "(P)"), __jsx("a", {
    href: "https://facebook.github.io/react/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 819,
      columnNumber: 17
    }
  }, "ReactJS"), " ", ",", " ", __jsx("a", {
    href: "https://redux.js.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 827,
      columnNumber: 17
    }
  }, "Redux"), " ", ",", " ", __jsx("a", {
    href: "https://angularjs.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 835,
      columnNumber: 17
    }
  }, "AngularJS"), " ", ",", " ", __jsx("a", {
    href: "https://getbootstrap.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 843,
      columnNumber: 17
    }
  }, "BootStrap"), " ", ",", " ", __jsx("a", {
    href: "https://jquery.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 851,
      columnNumber: 17
    }
  }, "jQuery"), " ", ",", " ", __jsx("a", {
    href: "httpss://nodejs.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 859,
      columnNumber: 17
    }
  }, "NodeJS"), " ", ",", " ", __jsx("a", {
    href: "https://expressjs.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 867,
      columnNumber: 17
    }
  }, "ExpressJS"), " ", ",", " ", __jsx("a", {
    href: "https://www.slimframework.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 875,
      columnNumber: 17
    }
  }, "Slim MicroFramework")), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 883,
      columnNumber: 15
    }
  }, "Databases"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 884,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "https://www.postgresql.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 885,
      columnNumber: 17
    }
  }, "PostgreSQL"), " ", ",", " ", __jsx("a", {
    href: "https://www.mysql.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 893,
      columnNumber: 17
    }
  }, "MySQL"), " ", ",", " ", __jsx("a", {
    href: "https://www.mongodb.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 901,
      columnNumber: 17
    }
  }, "MongoDB")), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 909,
      columnNumber: 15
    }
  }, "Tools"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 910,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "https://www.npmjs.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 911,
      columnNumber: 17
    }
  }, "npm"), " ", ",", " ", __jsx("a", {
    href: "https://git-scm.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 919,
      columnNumber: 17
    }
  }, "git"), " ", ",", " ", __jsx("a", {
    href: "http://webpack.js.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 927,
      columnNumber: 17
    }
  }, "webpack"), " ", ",", " ", __jsx("a", {
    href: "https://rollupjs.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 935,
      columnNumber: 17
    }
  }, "rollup"), " ", ",", " ", __jsx("a", {
    href: "http://babeljs.io/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 943,
      columnNumber: 17
    }
  }, "babel"), " ", ",", " ", __jsx("a", {
    href: "https://jestjs.io/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 951,
      columnNumber: 17
    }
  }, "Jest"), " ", ",", " ", __jsx("a", {
    href: "https://react-styleguidist.js.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 959,
      columnNumber: 17
    }
  }, "Styleguidist"), " ", ",", " ", __jsx("a", {
    href: "https://www.heroku.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 967,
      columnNumber: 17
    }
  }, "heroku"), " ", ",", " ", __jsx("a", {
    href: "https://gruntjs.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 975,
      columnNumber: 17
    }
  }, "grunt"), " ", ",", " ", __jsx("a", {
    href: "https://lerna.js.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 983,
      columnNumber: 17
    }
  }, "lerna"), " ", ",", " ", __jsx("a", {
    href: "https://gulpjs.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 991,
      columnNumber: 17
    }
  }, "gulp"), " ", ",", " ", __jsx("a", {
    href: "https://bower.io/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 999,
      columnNumber: 17
    }
  }, "bower"), " ", ",", " ", __jsx("a", {
    href: "https://code.visualstudio.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1007,
      columnNumber: 17
    }
  }, "Visual Studio Code"), " ", ",", " ", __jsx("a", {
    href: "https://vim.sourceforge.io/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1015,
      columnNumber: 17
    }
  }, "Vim"), " ", ",", " ", __jsx("a", {
    href: "https://www.jetbrains.com/idea/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1023,
      columnNumber: 17
    }
  }, "IntelliJ IDEA"), " ", ",", " ", __jsx("a", {
    href: "https://www.eclipse.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1031,
      columnNumber: 17
    }
  }, "Eclipse")), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1039,
      columnNumber: 15
    }
  }, "Other Languages \uD83E\uDD37\u200D\u2642\uFE0F :"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1040,
      columnNumber: 15
    }
  }, "HTML, CSS, XML, YAML, Stylus"))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1044,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1045,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//nsit.ac.in/",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1046,
      columnNumber: 15
    }
  }, "Netaji Subhas Institute of Technology")), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1050,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1051,
      columnNumber: 15
    }
  }, "Batch:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1052,
      columnNumber: 15
    }
  }, "2012 - 2016"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1053,
      columnNumber: 15
    }
  }, "Performance:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1054,
      columnNumber: 15
    }
  }, "79.48%", __jsx("small", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1056,
      columnNumber: 17
    }
  }, "5", __jsx("sup", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1057,
      columnNumber: 20
    }
  }, "th"), "position in entire department (~190 students)")), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1061,
      columnNumber: 15
    }
  }, "Majored In:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1062,
      columnNumber: 15
    }
  }, "Computer Engineering"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1063,
      columnNumber: 15
    }
  }, "Major Achievements:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1064,
      columnNumber: 15
    }
  }, __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1065,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1066,
      columnNumber: 19
    }
  }, "Granted merit scholarship for all four years."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1067,
      columnNumber: 19
    }
  }, "Consistently stood in top 10 performing students of the department."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1071,
      columnNumber: 19
    }
  }, "Mentored class of 30 in an IEEE NSIT SIG for Web Development and Design"), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1075,
      columnNumber: 19
    }
  }, "Wrote a report on ", __jsx("a", {
    href: "/Rapes.pdf",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1076,
      columnNumber: 39
    }
  }, "Rapes")), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1078,
      columnNumber: 19
    }
  }, "Successfully completed projects like :", " ", __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//github.com/bogas04/mvp-generator",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1080,
      columnNumber: 21
    }
  }, "MVP Generator"), " ", "|", " ", __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//github.com/bogas04/collnet",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1088,
      columnNumber: 21
    }
  }, "CollNet"), " ", "|", " ", __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//github.com/bogas04/cloudkeeper",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1096,
      columnNumber: 21
    }
  }, "CloudKeeper"), " ", "|", " ", __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//github.com/bogas04/Attendance-System",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1104,
      columnNumber: 21
    }
  }, "Student Attendance System"), " ", ", and more..."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1113,
      columnNumber: 19
    }
  }, "Worked on a research project under Vidhi Khanduja (Assistant Professor) on a database watermarking scheme."))), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1119,
      columnNumber: 15
    }
  }, "Societies:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1120,
      columnNumber: 15
    }
  }, __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1121,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1122,
      columnNumber: 19
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//ieeensit.org",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1123,
      columnNumber: 21
    }
  }, "IEEE NSIT"), "- Web Developer"), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1132,
      columnNumber: 19
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//junoonnsit.com",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1133,
      columnNumber: 21
    }
  }, "Junoon - The Official Photography Club"), "- Core Member"), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1142,
      columnNumber: 19
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//collegespace.in",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1143,
      columnNumber: 21
    }
  }, "CollegeSpace"), "- Tech Head"))))), __jsx("div", {
    className: "row card",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1157,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1158,
      columnNumber: 13
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "http://www.stmarysschooldwarka.com/",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1159,
      columnNumber: 15
    }
  }, "St. Mary's School")), __jsx("dl", {
    className: "dl-horizontal",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1167,
      columnNumber: 13
    }
  }, __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1168,
      columnNumber: 15
    }
  }, "Batch:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1169,
      columnNumber: 15
    }
  }, "2002- 2012"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1170,
      columnNumber: 15
    }
  }, "Board:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1171,
      columnNumber: 15
    }
  }, "CBSE"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1172,
      columnNumber: 15
    }
  }, "Performance in 12", __jsx("sup", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1174,
      columnNumber: 17
    }
  }, "th")), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1176,
      columnNumber: 15
    }
  }, "95.2%"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1177,
      columnNumber: 15
    }
  }, "Performance in 10", __jsx("sup", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1179,
      columnNumber: 17
    }
  }, "th")), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1181,
      columnNumber: 15
    }
  }, "9.8 CGPA ~ 93.1%"), __jsx("dt", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1182,
      columnNumber: 15
    }
  }, "Major Achievements:"), __jsx("dd", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1183,
      columnNumber: 15
    }
  }, __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1184,
      columnNumber: 17
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1185,
      columnNumber: 19
    }
  }, "Granted merit scholarship for 3 years: 10", __jsx("sup", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1187,
      columnNumber: 21
    }
  }, "th"), "- 12", __jsx("sup", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1188,
      columnNumber: 21
    }
  }, "th"), "grades"), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1191,
      columnNumber: 19
    }
  }, "Topped Science department in 12", __jsx("sup", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1193,
      columnNumber: 21
    }
  }, "th"), "Grade"))))))), __jsx("div", {
    className: "section green",
    style: {
      zIndex: 13
    },
    id: "talks",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1203,
      columnNumber: 7
    }
  }, __jsx("h3", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1204,
      columnNumber: 9
    }
  }, "So Talkative"), __jsx("div", {
    className: "container-fluid",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1205,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "row",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1206,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "talks",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1207,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "talk",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1208,
      columnNumber: 15
    }
  }, __jsx("img", {
    className: "talk-image",
    loading: "lazy",
    src: "/img/blazing-fast-web.png",
    alt: "Banner image for the talk",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1209,
      columnNumber: 17
    }
  }), __jsx("h6", {
    className: "talk-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1215,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "http://bit.ly/web-performance-2019",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1216,
      columnNumber: 19
    }
  }, "Web Performance in 2019"), " ", "at", " ", __jsx("a", {
    href: "https://www.hellomeets.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1220,
      columnNumber: 19
    }
  }, "Hello Meets, Swiggy Office"))), __jsx("div", {
    className: "talk",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1230,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "https://www.youtube.com/watch?v=2mX8hmefCRI",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "talk-video",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1231,
      columnNumber: 17
    }
  }, __jsx("img", {
    loading: "lazy",
    alt: "Video of the talk",
    src: "https://ytimg.googleusercontent.com/vi/2mX8hmefCRI/maxresdefault.jpg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1237,
      columnNumber: 19
    }
  })), __jsx("h6", {
    className: "talk-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1243,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "https://www.swiggy.com",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1244,
      columnNumber: 19
    }
  }, "Swiggy \u2665\uFE0F Web"), " at", " ", __jsx("a", {
    href: "https://www.youtube.com/watch?time_continue=450&v=2mX8hmefCRI&feature=emb_title",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1245,
      columnNumber: 19
    }
  }, "Keynote, Google for Mobile India 2019"))), __jsx("div", {
    className: "talk",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1255,
      columnNumber: 15
    }
  }, __jsx("img", {
    loading: "lazy",
    className: "talk-image",
    src: "/img/react-2019.png",
    alt: "Banner image for the talk",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1256,
      columnNumber: 17
    }
  }), __jsx("h6", {
    className: "talk-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1262,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "http://bit.ly/react-2019",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1263,
      columnNumber: 19
    }
  }, "React in 2019"), " at", " ", __jsx("a", {
    href: "https://www.meetup.com/ReactJS-Bangalore/events/255737841/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1264,
      columnNumber: 19
    }
  }, "ReactJS Bangalore #41"))), __jsx("div", {
    className: "talk",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1274,
      columnNumber: 15
    }
  }, __jsx("img", {
    loading: "lazy",
    className: "talk-image",
    src: "img/testing-with-jest.png",
    alt: "Banner image for the talk",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1275,
      columnNumber: 17
    }
  }), __jsx("h6", {
    className: "talk-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1281,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "http://bit.ly/jest-04-2018",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1282,
      columnNumber: 19
    }
  }, "Testing with Jest"), " at", " ", __jsx("a", {
    href: "https://www.meetup.com/ReactJS-Bangalore/events/247773928/",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1283,
      columnNumber: 19
    }
  }, "ReactJS Bangalore #32"))), __jsx("div", {
    className: "talk",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1293,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "https://www.youtube.com/watch?v=lN8b_fXRC_A",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "talk-video",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1294,
      columnNumber: 17
    }
  }, __jsx("img", {
    loading: "lazy",
    alt: "Video of the talk",
    src: "https://ytimg.googleusercontent.com/vi/lN8b_fXRC_A/maxresdefault.jpg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1300,
      columnNumber: 19
    }
  })), __jsx("h6", {
    className: "talk-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1307,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "http://bit.ly/gddx-dec2017",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1308,
      columnNumber: 19
    }
  }, "Delivering Fast Web-apps Fast"), " ", "at", " ", __jsx("a", {
    href: "https://www.meetup.com/GDG-Mumbai/events/245206006/?_cookie-check=hdmhnBaW7ejxNONA",
    target: "_blank",
    rel: "noopener noreferrer",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1312,
      columnNumber: 19
    }
  }, "Google Developers' Day, Extended (Mumbai)"))))))), __jsx("div", {
    className: "section blue",
    style: {
      zIndex: 13
    },
    id: "social",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1326,
      columnNumber: 7
    }
  }, __jsx("h3", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1327,
      columnNumber: 9
    }
  }, "Very Social"), __jsx("div", {
    className: "container-fluid",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1328,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "row social-grid",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1329,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "col-md-6 text-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1330,
      columnNumber: 13
    }
  }, __jsx("p", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1331,
      columnNumber: 15
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//twitter.com/bogas04",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1332,
      columnNumber: 17
    }
  }, "Twitter")), __jsx("p", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1340,
      columnNumber: 15
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//instagram.com/bogas04",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1341,
      columnNumber: 17
    }
  }, "Instagram"))), __jsx("div", {
    className: "col-md-6 text-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1351,
      columnNumber: 13
    }
  }, __jsx("p", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1352,
      columnNumber: 15
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "//youtube.com/divjotbogas",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1353,
      columnNumber: 17
    }
  }, "YouTube")), __jsx("p", {
    className: "card-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1361,
      columnNumber: 15
    }
  }, __jsx("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://medium.com/@bogas04",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1362,
      columnNumber: 17
    }
  }, "Medium")))))));
}

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(HomePage));

/***/ })

})
//# sourceMappingURL=index.js.1fd811eabe29047fdc7a.hot-update.js.map