import{n as e,s as t,S as s,i as r,c as n,g as o,a,t as l,b as c,e as i,d as u,f as p,h as f,j as m,k as h,l as d,m as g,o as $,p as v,q as y,r as b,u as S,v as _,w as E,x as w,y as x,z as P,A as R,B as C,C as L,D as A,E as j,F as k}from"./index.d3587d44.js";const O=[];function U(s,r=e){let n;const o=[];function a(e){if(t(s,e)&&(s=e,n)){const e=!O.length;for(let e=0;e<o.length;e+=1){const t=o[e];t[1](),O.push(t,s)}if(e){for(let e=0;e<O.length;e+=2)O[e][0](O[e+1]);O.length=0}}}return{set:a,update:function(e){a(e(s))},subscribe:function(t,l=e){const c=[t,l];return o.push(c),1===o.length&&(n=r(a)||e),t(s),()=>{const e=o.indexOf(c);-1!==e&&o.splice(e,1),0===o.length&&(n(),n=null)}}}}const q={},N=()=>({});function D(e){let t;const s=e[1].default,r=n(s,e,e[0],null);return{c(){r&&r.c()},l(e){r&&r.l(e)},m(e,s){r&&r.m(e,s),t=!0},p(e,[t]){r&&r.p&&1&t&&r.p(o(s,e,e[0],null),a(s,e[0],t,null))},i(e){t||(l(r,e),t=!0)},o(e){c(r,e),t=!1},d(e){r&&r.d(e)}}}function I(e,t,s){let{$$slots:r={},$$scope:n}=t;return e.$set=(e=>{"$$scope"in e&&s(0,n=e.$$scope)}),[n,r]}class H extends s{constructor(e){super(),r(this,e,I,D,t,{})}}function B(e){let t,s,r=e[1].stack+"";return{c(){t=i("pre"),s=u(r)},l(e){t=p(e,"PRE",{});var n=f(t);s=m(n,r),n.forEach(h)},m(e,r){d(e,t,r),g(t,s)},p(e,t){2&t&&r!==(r=e[1].stack+"")&&$(s,r)},d(e){e&&h(t)}}}function J(t){let s,r,n,o,a,l,c,_,E,w,x,P,R,C,L,A,j=t[1].message+"";document.title=s=t[0];let k=t[4]&&t[1].stack&&B(t);return{c(){r=v(),n=i("main"),o=i("h1"),a=u(t[0]),l=v(),c=i("img"),w=v(),x=i("p"),P=u(t[2]),R=v(),C=i("p"),L=u(j),A=v(),k&&k.c(),this.h()},l(e){y('[data-svelte="svelte-1moakz"]',document.head).forEach(h),r=b(e),n=p(e,"MAIN",{class:!0});var s=f(n);o=p(s,"H1",{class:!0});var i=f(o);a=m(i,t[0]),i.forEach(h),l=b(s),c=p(s,"IMG",{src:!0,alt:!0,class:!0}),w=b(s),x=p(s,"P",{class:!0});var u=f(x);P=m(u,t[2]),u.forEach(h),R=b(s),C=p(s,"P",{class:!0});var d=f(C);L=m(d,j),d.forEach(h),A=b(s),k&&k.l(s),s.forEach(h),this.h()},h(){S(o,"class","svelte-xr6kli"),c.src!==(_=t[3])&&S(c,"src",_),S(c,"alt",E=t[0]+" error code"),S(c,"class","svelte-xr6kli"),S(x,"class","svelte-xr6kli"),S(C,"class","svelte-xr6kli"),S(n,"class","svelte-xr6kli")},m(e,t){d(e,r,t),d(e,n,t),g(n,o),g(o,a),g(n,l),g(n,c),g(n,w),g(n,x),g(x,P),g(n,R),g(n,C),g(C,L),g(n,A),k&&k.m(n,null)},p(e,[t]){1&t&&s!==(s=e[0])&&(document.title=s),1&t&&$(a,e[0]),8&t&&c.src!==(_=e[3])&&S(c,"src",_),1&t&&E!==(E=e[0]+" error code")&&S(c,"alt",E),4&t&&$(P,e[2]),2&t&&j!==(j=e[1].message+"")&&$(L,j),e[4]&&e[1].stack?k?k.p(e,t):((k=B(e)).c(),k.m(n,null)):k&&(k.d(1),k=null)},i:e,o:e,d(e){e&&h(r),e&&h(n),k&&k.d()}}}function K(e,t,s){let{status:r}=t,{error:n}=t,{message:o=(404===r?"Oopsie dooppsie this page is poopsie!":"Uh-oh! You broke our site.")}=t,{image:a=(404===r?"img/errors/404.png":"img/errors/500.png")}=t;return e.$set=(e=>{"status"in e&&s(0,r=e.status),"error"in e&&s(1,n=e.error),"message"in e&&s(2,o=e.message),"image"in e&&s(3,a=e.image)}),[r,n,o,a,!1]}class T extends s{constructor(e){super(),r(this,e,K,J,t,{status:0,error:1,message:2,image:3})}}function V(e){let t,s;const r=[{segment:e[2][1]},e[4].props];var n=e[4].component;function o(e){let t={$$slots:{default:[M]},$$scope:{ctx:e}};for(let e=0;e<r.length;e+=1)t=_(t,r[e]);return{props:t}}if(n)var a=new n(o(e));return{c(){a&&E(a.$$.fragment),t=A()},l(e){a&&w(a.$$.fragment,e),t=A()},m(e,r){a&&x(a,e,r),d(e,t,r),s=!0},p(e,s){const i=20&s?P(r,[4&s&&{segment:e[2][1]},16&s&&R(e[4].props)]):{};if(160&s&&(i.$$scope={dirty:s,ctx:e}),n!==(n=e[4].component)){if(a){j();const e=a;c(e.$$.fragment,1,0,()=>{C(e,1)}),k()}n?(a=new n(o(e)),E(a.$$.fragment),l(a.$$.fragment,1),x(a,t.parentNode,t)):a=null}else n&&a.$set(i)},i(e){s||(a&&l(a.$$.fragment,e),s=!0)},o(e){a&&c(a.$$.fragment,e),s=!1},d(e){e&&h(t),a&&C(a,e)}}}function z(e){let t;const s=new T({props:{error:e[0],status:e[1]}});return{c(){E(s.$$.fragment)},l(e){w(s.$$.fragment,e)},m(e,r){x(s,e,r),t=!0},p(e,t){const r={};1&t&&(r.error=e[0]),2&t&&(r.status=e[1]),s.$set(r)},i(e){t||(l(s.$$.fragment,e),t=!0)},o(e){c(s.$$.fragment,e),t=!1},d(e){C(s,e)}}}function G(e){let t,s;const r=[e[5].props];var n=e[5].component;function o(e){let t={};for(let e=0;e<r.length;e+=1)t=_(t,r[e]);return{props:t}}if(n)var a=new n(o());return{c(){a&&E(a.$$.fragment),t=A()},l(e){a&&w(a.$$.fragment,e),t=A()},m(e,r){a&&x(a,e,r),d(e,t,r),s=!0},p(e,s){const i=32&s?P(r,[R(e[5].props)]):{};if(n!==(n=e[5].component)){if(a){j();const e=a;c(e.$$.fragment,1,0,()=>{C(e,1)}),k()}n?(a=new n(o()),E(a.$$.fragment),l(a.$$.fragment,1),x(a,t.parentNode,t)):a=null}else n&&a.$set(i)},i(e){s||(a&&l(a.$$.fragment,e),s=!0)},o(e){a&&c(a.$$.fragment,e),s=!1},d(e){e&&h(t),a&&C(a,e)}}}function M(e){let t,s,r=e[5]&&G(e);return{c(){r&&r.c(),t=A()},l(e){r&&r.l(e),t=A()},m(e,n){r&&r.m(e,n),d(e,t,n),s=!0},p(e,s){e[5]?r?(r.p(e,s),l(r,1)):((r=G(e)).c(),l(r,1),r.m(t.parentNode,t)):r&&(j(),c(r,1,1,()=>{r=null}),k())},i(e){s||(l(r),s=!0)},o(e){c(r),s=!1},d(e){r&&r.d(e),e&&h(t)}}}function Y(e){let t,s,r,n;const o=[z,V],a=[];function i(e,t){return e[0]?0:1}return t=i(e),s=a[t]=o[t](e),{c(){s.c(),r=A()},l(e){s.l(e),r=A()},m(e,s){a[t].m(e,s),d(e,r,s),n=!0},p(e,n){let u=t;(t=i(e))===u?a[t].p(e,n):(j(),c(a[u],1,1,()=>{a[u]=null}),k(),(s=a[t])||(s=a[t]=o[t](e)).c(),l(s,1),s.m(r.parentNode,r))},i(e){n||(l(s),n=!0)},o(e){c(s),n=!1},d(e){a[t].d(e),e&&h(r)}}}function F(e){let t;const s=[{segment:e[2][0]},e[3].props];let r={$$slots:{default:[Y]},$$scope:{ctx:e}};for(let e=0;e<s.length;e+=1)r=_(r,s[e]);const n=new H({props:r});return{c(){E(n.$$.fragment)},l(e){w(n.$$.fragment,e)},m(e,s){x(n,e,s),t=!0},p(e,[t]){const r=12&t?P(s,[4&t&&{segment:e[2][0]},8&t&&R(e[3].props)]):{};183&t&&(r.$$scope={dirty:t,ctx:e}),n.$set(r)},i(e){t||(l(n.$$.fragment,e),t=!0)},o(e){c(n.$$.fragment,e),t=!1},d(e){C(n,e)}}}function W(e,t,s){let{stores:r}=t,{error:n}=t,{status:o}=t,{segments:a}=t,{level0:l}=t,{level1:c=null}=t,{level2:i=null}=t;return L(q,r),e.$set=(e=>{"stores"in e&&s(6,r=e.stores),"error"in e&&s(0,n=e.error),"status"in e&&s(1,o=e.status),"segments"in e&&s(2,a=e.segments),"level0"in e&&s(3,l=e.level0),"level1"in e&&s(4,c=e.level1),"level2"in e&&s(5,i=e.level2)}),[n,o,a,l,c,i,r]}class X extends s{constructor(e){super(),r(this,e,W,F,t,{stores:6,error:0,status:1,segments:2,level0:3,level1:4,level2:5})}}const Q=[/^\/blog.json$/,/^\/blog\/([^\/]+?).json$/],Z=[{js:()=>import("./index.c102f813.js"),css:["index.c102f813.css"]},{js:()=>import("./resume.719fa9bf.js"),css:[]},{js:()=>import("./_layout.ad74f01f.js"),css:["_layout.ad74f01f.css"]},{js:()=>import("./index.ebe125b1.js"),css:["index.ebe125b1.css"]},{js:()=>import("./[slug].6f3903b4.js"),css:["[slug].6f3903b4.css"]}],ee=(e=>[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/resume\/?$/,parts:[{i:1}]},{pattern:/^\/blog\/?$/,parts:[{i:2},{i:3}]},{pattern:/^\/blog\/([^\/]+?)\/?$/,parts:[{i:2},{i:4,params:t=>({slug:e(t[1])})}]}])(decodeURIComponent);const te="undefined"!=typeof __SAPPER__&&__SAPPER__;let se,re,ne,oe=!1,ae=[],le="{}";const ce={page:U({}),preloading:U(null),session:U(te&&te.session)};let ie,ue;ce.session.subscribe(async e=>{if(ie=e,!oe)return;ue=!0;const t=ve(new URL(location.href)),s=re={},{redirect:r,props:n,branch:o}=await _e(t);s===re&&await Se(r,o,n,t.page)});let pe,fe=null;let me,he=1;const de="undefined"!=typeof history?history:{pushState:(e,t,s)=>{},replaceState:(e,t,s)=>{},scrollRestoration:""},ge={};function $e(e){const t=Object.create(null);return e.length>0&&e.slice(1).split("&").forEach(e=>{let[,s,r=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(e.replace(/\+/g," ")));"string"==typeof t[s]&&(t[s]=[t[s]]),"object"==typeof t[s]?t[s].push(r):t[s]=r}),t}function ve(e){if(e.origin!==location.origin)return null;if(!e.pathname.startsWith(te.baseUrl))return null;let t=e.pathname.slice(te.baseUrl.length);if(""===t&&(t="/"),!Q.some(e=>e.test(t)))for(let s=0;s<ee.length;s+=1){const r=ee[s],n=r.pattern.exec(t);if(n){const s=$e(e.search),o=r.parts[r.parts.length-1],a=o.params?o.params(n):{},l={host:location.host,path:t,query:s,params:a};return{href:e.href,route:r,match:n,page:l}}}}function ye(){return{x:pageXOffset,y:pageYOffset}}async function be(e,t,s,r){if(t)me=t;else{const e=ye();ge[me]=e,t=me=++he,ge[me]=s?e:{x:0,y:0}}me=t,se&&ce.preloading.set(!0);const n=fe&&fe.href===e.href?fe.promise:_e(e);fe=null;const o=re={},{redirect:a,props:l,branch:c}=await n;if(o===re&&(await Se(a,c,l,e.page),document.activeElement&&document.activeElement.blur(),!s)){let e=ge[t];if(r){const t=document.getElementById(r.slice(1));t&&(e={x:0,y:t.getBoundingClientRect().top})}ge[me]=e,e&&scrollTo(e.x,e.y)}}async function Se(e,t,s,r){if(e)return function(e,t={replaceState:!1}){const s=ve(new URL(e,document.baseURI));return s?(de[t.replaceState?"replaceState":"pushState"]({id:me},"",e),be(s,null).then(()=>{})):(location.href=e,new Promise(e=>{}))}(e.location,{replaceState:!0});if(ce.page.set(r),ce.preloading.set(!1),se)se.$set(s);else{s.stores={page:{subscribe:ce.page.subscribe},preloading:{subscribe:ce.preloading.subscribe},session:ce.session},s.level0={props:await ne};const e=document.querySelector("#sapper-head-start"),t=document.querySelector("#sapper-head-end");if(e&&t){for(;e.nextSibling!==t;)we(e.nextSibling);we(e),we(t)}se=new X({target:pe,props:s,hydrate:!0})}ae=t,le=JSON.stringify(r.query),oe=!0,ue=!1}async function _e(e){const{route:t,page:s}=e,r=s.path.split("/").filter(Boolean);let n=null;const o={error:null,status:200,segments:[r[0]]},a={fetch:(e,t)=>fetch(e,t),redirect:(e,t)=>{if(n&&(n.statusCode!==e||n.location!==t))throw new Error("Conflicting redirects");n={statusCode:e,location:t}},error:(e,t)=>{o.error="string"==typeof t?new Error(t):t,o.status=e}};let l;ne||(ne=te.preloaded[0]||N.call(a,{host:s.host,path:s.path,query:s.query,params:{}},ie));let c=1;try{const n=JSON.stringify(s.query),i=t.pattern.exec(s.path);let u=!1;l=await Promise.all(t.parts.map(async(t,l)=>{const p=r[l];if(function(e,t,s,r){if(r!==le)return!0;const n=ae[e];return!!n&&(t!==n.segment||!(!n.match||JSON.stringify(n.match.slice(1,e+2))===JSON.stringify(s.slice(1,e+2)))||void 0)}(l,p,i,n)&&(u=!0),o.segments[c]=r[l+1],!t)return{segment:p};const f=c++;if(!ue&&!u&&ae[l]&&ae[l].part===t.i)return ae[l];u=!1;const{default:m,preload:h}=await function(e){const t="string"==typeof e.css?[]:e.css.map(Ee);return t.unshift(e.js()),Promise.all(t).then(e=>e[0])}(Z[t.i]);let d;return d=oe||!te.preloaded[l+1]?h?await h.call(a,{host:s.host,path:s.path,query:s.query,params:t.params?t.params(e.match):{}},ie):{}:te.preloaded[l+1],o[`level${f}`]={component:m,props:d,segment:p,match:i,part:t.i}}))}catch(e){o.error=e,o.status=500,l=[]}return{redirect:n,props:o,branch:l}}function Ee(e){const t=`client/${e}`;if(!document.querySelector(`link[href="${t}"]`))return new Promise((e,s)=>{const r=document.createElement("link");r.rel="stylesheet",r.href=t,r.onload=(()=>e()),r.onerror=s,document.head.appendChild(r)})}function we(e){e.parentNode.removeChild(e)}function xe(e){const t=ve(new URL(e,document.baseURI));if(t)return fe&&e===fe.href||function(e,t){fe={href:e,promise:t}}(e,_e(t)),fe.promise}let Pe;function Re(e){clearTimeout(Pe),Pe=setTimeout(()=>{Ce(e)},20)}function Ce(e){const t=Ae(e.target);t&&"prefetch"===t.rel&&xe(t.href)}function Le(e){if(1!==function(e){return null===e.which?e.button:e.which}(e))return;if(e.metaKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;const t=Ae(e.target);if(!t)return;if(!t.href)return;const s="object"==typeof t.href&&"SVGAnimatedString"===t.href.constructor.name,r=String(s?t.href.baseVal:t.href);if(r===location.href)return void(location.hash||e.preventDefault());if(t.hasAttribute("download")||"external"===t.getAttribute("rel"))return;if(s?t.target.baseVal:t.target)return;const n=new URL(r);if(n.pathname===location.pathname&&n.search===location.search)return;const o=ve(n);if(o){be(o,null,t.hasAttribute("sapper-noscroll"),n.hash),e.preventDefault(),de.pushState({id:me},"",n.href)}}function Ae(e){for(;e&&"A"!==e.nodeName.toUpperCase();)e=e.parentNode;return e}function je(e){if(ge[me]=ye(),e.state){const t=ve(new URL(location.href));t?be(t,e.state.id):location.href=location.href}else(function(e){me=e})(he=he+1),de.replaceState({id:me},"",location.href)}!function(e){var t;"scrollRestoration"in de&&(de.scrollRestoration="manual"),t=e.target,pe=t,addEventListener("click",Le),addEventListener("popstate",je),addEventListener("touchstart",Ce),addEventListener("mousemove",Re),Promise.resolve().then(()=>{const{hash:e,href:t}=location;de.replaceState({id:he},"",t);const s=new URL(location.href);if(te.error)return function(e){const{host:t,pathname:s,search:r}=location,{session:n,preloaded:o,status:a,error:l}=te;ne||(ne=o&&o[0]),Se(null,[],{error:l,status:a,session:n,level0:{props:ne},level1:{props:{status:a,error:l},component:T},segments:o},{host:t,path:s,query:$e(r),params:{}})}();const r=ve(s);return r?be(r,he,!0,e):void 0})}({target:document.querySelector("#sapper")});
