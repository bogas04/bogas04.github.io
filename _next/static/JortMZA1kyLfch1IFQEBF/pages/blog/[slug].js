(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"/0+H":function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n("q1tI")),a=n("lwAK");function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.ampFirst,n=void 0!==e&&e,r=t.hybrid,o=void 0!==r&&r,a=t.hasQuery;return n||o&&(void 0!==a&&a)}e.isInAmpMode=i,e.useAmp=function(){return i(o.default.useContext(a.AmpStateContext))}},"7W2i":function(t,e,n){var r=n("SksO");t.exports=function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}},"8Kt/":function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n("q1tI")),a=r(n("Xuae")),i=n("lwAK"),u=n("FYa8"),c=n("/0+H");function l(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=[o.default.createElement("meta",{charSet:"utf-8"})];return t||e.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),e}function f(t,e){return"string"===typeof e||"number"===typeof e?t:e.type===o.default.Fragment?t.concat(o.default.Children.toArray(e.props.children).reduce((function(t,e){return"string"===typeof e||"number"===typeof e?t:t.concat(e)}),[])):t.concat(e)}e.defaultHead=l;var s=["name","httpEquiv","charSet","itemProp"];function p(t,e){return t.reduce((function(t,e){var n=o.default.Children.toArray(e.props.children);return t.concat(n)}),[]).reduce(f,[]).reverse().concat(l(e.inAmpMode)).filter(function(){var t=new Set,e=new Set,n=new Set,r={};return function(o){var a=!0;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){var i=o.key.slice(o.key.indexOf("$")+1);t.has(i)?a=!1:t.add(i)}switch(o.type){case"title":case"base":e.has(o.type)?a=!1:e.add(o.type);break;case"meta":for(var u=0,c=s.length;u<c;u++){var l=s[u];if(o.props.hasOwnProperty(l))if("charSet"===l)n.has(l)?a=!1:n.add(l);else{var f=o.props[l],p=r[l]||new Set;p.has(f)?a=!1:(p.add(f),r[l]=p)}}}return a}}()).reverse().map((function(t,e){var n=t.key||e;return o.default.cloneElement(t,{key:n})}))}var d=a.default();function m(t){var e=t.children;return o.default.createElement(i.AmpStateContext.Consumer,null,(function(t){return o.default.createElement(u.HeadManagerContext.Consumer,null,(function(n){return o.default.createElement(d,{reduceComponentsToState:p,handleStateChange:n,inAmpMode:c.isInAmpMode(t)},e)}))}))}m.rewind=d.rewind,e.default=m},Bnag:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},EbDI:function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},FYa8:function(t,e,n){"use strict";var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n("q1tI"));e.HeadManagerContext=o.createContext(null)},HDwi:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/[slug]",function(){return n("XLqZ")}])},Ijbi:function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}},Nsbk:function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},PJYZ:function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},Qetd:function(t,e,n){"use strict";var r=Object.assign.bind(Object);t.exports=r,t.exports.default=t.exports},RIqP:function(t,e,n){var r=n("Ijbi"),o=n("EbDI"),a=n("Bnag");t.exports=function(t){return r(t)||o(t)||a()}},SksO:function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},VaIn:function(t,e,n){"use strict";var r=n("q1tI"),o=n.n(r),a=o.a.createElement;e.a=function(t){var e=t.children;return a(o.a.Fragment,null,a("style",null,"\n        main {\n            position: relative;\n            max-width: 56em;\n            background-color: white;\n            padding: 2em;\n            margin: 0 auto;\n            box-sizing: border-box;\n        }\n\n        img {\n            width: 100%;\n        }\n\n        @media (prefers-color-scheme: dark) {\n            body,\n            main {\n                background: #333;\n                color: white;\n            }\n\n            a {\n                color: lightsalmon;\n            }\n        }\n    "),a("main",null,e))}},W8MJ:function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}},XLqZ:function(t,e,n){"use strict";n.r(e),n.d(e,"__N_SSG",(function(){return l}));var r=n("q1tI"),o=n.n(r),a=n("jxKE"),i=n("b9KT"),u=n("VaIn"),c=o.a.createElement;var l=!0;e.default=Object(r.memo)((function(t){var e=t.post,n="".concat(e.title," | Blog | Divjot Singh"),r="".concat(a.a,"/").concat(e.slug),o="".concat(a.b,"/").concat(e.image),l=(e.keywords||[]).join(", ");return c(u.a,null,c("style",null,"\n  .content h2 {\n    font-size: 1.4em;\n    font-weight: 500;\n  }\n  .content img,\n  .content h4 {\n    margin: 1em 0;\n  }\n\n  .content pre {\n    background-color: #f9f9f9;\n    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);\n    padding: 0.5em;\n    border-radius: 2px;\n    overflow-x: auto;\n  }\n\n  .content pre code {\n    background-color: transparent;\n    padding: 0;\n  }\n\n  @media (prefers-color-scheme: dark) {\n    .content pre {\n      color: black;\n    }\n  }\n\n  .content ul {\n    line-height: 1.5;\n  }\n\n  .content li {\n    margin: 0 0 0.5em 0;\n  }\n  h4 {\n    text-transform: capitalize;\n    margin-bottom: 2em;\n  }"),c(i.a,{title:n,description:e.description,imageUrl:o,pageUrl:r,keywords:l}),c("h1",null,e.title),c("h4",null,c("a",{href:"/"},"Divjot Singh")," | ",c("a",{href:"/blog"},"Blog")," |"," ",new Date(e.date).toDateString(),c("br",null),l),c("div",{className:"content",dangerouslySetInnerHTML:{__html:e.html}}))}))},Xuae:function(t,e,n){"use strict";var r=n("lwsE"),o=n("PJYZ"),a=n("W8MJ"),i=n("7W2i"),u=n("a1gu"),c=n("Nsbk"),l=n("RIqP");function f(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}Object.defineProperty(e,"__esModule",{value:!0});var s=n("q1tI"),p=!1;e.default=function(){var t,e=new Set;function n(n){t=n.props.reduceComponentsToState(l(e),n.props),n.props.handleStateChange&&n.props.handleStateChange(t)}return function(l){i(m,l);var s,d=(s=m,function(){var t,e=c(s);if(f()){var n=c(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return u(this,t)});function m(t){var a;return r(this,m),a=d.call(this,t),p&&(e.add(o(a)),n(o(a))),a}return a(m,null,[{key:"rewind",value:function(){var n=t;return t=void 0,e.clear(),n}}]),a(m,[{key:"componentDidMount",value:function(){e.add(this),n(this)}},{key:"componentDidUpdate",value:function(){n(this)}},{key:"componentWillUnmount",value:function(){e.delete(this),n(this)}},{key:"render",value:function(){return null}}]),m}(s.Component)}},a1gu:function(t,e,n){var r=n("cDf5"),o=n("PJYZ");t.exports=function(t,e){return!e||"object"!==r(e)&&"function"!==typeof e?o(t):e}},b9KT:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n("q1tI"),o=n.n(r),a=n("8Kt/"),i=n.n(a),u=o.a.createElement;var c=Object(r.memo)((function(t){var e=t.title,n=t.keywords,r=t.pageUrl,o=t.description,a=t.imageUrl;return u(i.a,null,u("title",null,e),u("meta",{name:"title",content:e}),u("meta",{name:"description",content:o}),n&&0!==n.length&&u("meta",{name:"keywords",content:n}),u("meta",{property:"og:type",content:"website"}),u("meta",{property:"og:url",content:r}),u("meta",{property:"og:title",content:e}),u("meta",{property:"og:description",content:o}),u("meta",{property:"og:image",content:a}),u("meta",{property:"twitter:card",content:"summary_large_image"}),u("meta",{property:"twitter:url",content:r}),u("meta",{property:"twitter:title",content:e}),u("meta",{property:"twitter:description",content:o}),u("meta",{property:"twitter:image",content:a}))}))},cDf5:function(t,e){function n(t){return(n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(e){return"function"===typeof Symbol&&"symbol"===n(Symbol.iterator)?t.exports=r=function(t){return n(t)}:t.exports=r=function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":n(t)},r(e)}t.exports=r},jxKE:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return o}));var r="https://bogas04.github.io",o="https://bogas04.github.io/blog"},lwAK:function(t,e,n){"use strict";var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n("q1tI"));e.AmpStateContext=o.createContext({})},lwsE:function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}}},[["HDwi",0,1]]]);