import{n as e,s as t,S as s,i as n,c as r,g as o,a,t as l,b as c,e as i,d as u,f as p,h as f,j as m,k as h,l as d,m as g,o as $,p as v,q as y,r as b,u as S,v as _,w as E,x as w,y as P,z as R,A as x,B as C,C as L,D as A,E as j,F as O}from"./index.d3587d44.js";const U=[];function q(s,n=e){let r;const o=[];function a(e){if(t(s,e)&&(s=e,r)){const e=!U.length;for(let e=0;e<o.length;e+=1){const t=o[e];t[1](),U.push(t,s)}if(e){for(let e=0;e<U.length;e+=2)U[e][0](U[e+1]);U.length=0}}}return{set:a,update:function(e){a(e(s))},subscribe:function(t,l=e){const c=[t,l];return o.push(c),1===o.length&&(r=n(a)||e),t(s),()=>{const e=o.indexOf(c);-1!==e&&o.splice(e,1),0===o.length&&(r(),r=null)}}}}const N={},k=()=>({});function D(e){let t;const s=e[1].default,n=r(s,e,e[0],null);return{c(){n&&n.c()},l(e){n&&n.l(e)},m(e,s){n&&n.m(e,s),t=!0},p(e,[t]){n&&n.p&&1&t&&n.p(o(s,e,e[0],null),a(s,e[0],t,null))},i(e){t||(l(n,e),t=!0)},o(e){c(n,e),t=!1},d(e){n&&n.d(e)}}}function I(e,t,s){let{$$slots:n={},$$scope:r}=t;return e.$set=(e=>{"$$scope"in e&&s(0,r=e.$$scope)}),[r,n]}class H extends s{constructor(e){super(),n(this,e,I,D,t,{})}}function B(e){let t,s,n=e[1].stack+"";return{c(){t=i("pre"),s=u(n)},l(e){t=p(e,"PRE",{});var r=f(t);s=m(r,n),r.forEach(h)},m(e,n){d(e,t,n),g(t,s)},p(e,t){2&t&&n!==(n=e[1].stack+"")&&$(s,n)},d(e){e&&h(t)}}}function J(t){let s,n,r,o,a,l,c,_,E,w,P,R,x;document.title=s=t[0];let C=t[4]&&t[1].stack&&B(t);return{c(){n=v(),r=i("main"),o=i("h1"),a=u(t[0]),l=v(),c=i("img"),w=v(),P=i("p"),R=u(t[2]),x=v(),C&&C.c(),this.h()},l(e){y('[data-svelte="svelte-1moakz"]',document.head).forEach(h),n=b(e),r=p(e,"MAIN",{class:!0});var s=f(r);o=p(s,"H1",{class:!0});var i=f(o);a=m(i,t[0]),i.forEach(h),l=b(s),c=p(s,"IMG",{src:!0,alt:!0,class:!0}),w=b(s),P=p(s,"P",{class:!0});var u=f(P);R=m(u,t[2]),u.forEach(h),x=b(s),C&&C.l(s),s.forEach(h),this.h()},h(){S(o,"class","svelte-1h49el0"),c.src!==(_=t[3])&&S(c,"src",_),S(c,"alt",E=t[0]+" error code"),S(c,"class","svelte-1h49el0"),S(P,"class","svelte-1h49el0"),S(r,"class","svelte-1h49el0")},m(e,t){d(e,n,t),d(e,r,t),g(r,o),g(o,a),g(r,l),g(r,c),g(r,w),g(r,P),g(P,R),g(r,x),C&&C.m(r,null)},p(e,[t]){1&t&&s!==(s=e[0])&&(document.title=s),1&t&&$(a,e[0]),8&t&&c.src!==(_=e[3])&&S(c,"src",_),1&t&&E!==(E=e[0]+" error code")&&S(c,"alt",E),4&t&&$(R,e[2]),e[4]&&e[1].stack?C?C.p(e,t):((C=B(e)).c(),C.m(r,null)):C&&(C.d(1),C=null)},i:e,o:e,d(e){e&&h(n),e&&h(r),C&&C.d()}}}function K(e,t,s){let{status:n}=t,{error:r}=t,{message:o=(404===n?"Oopsie dooppsie this page is poopsie!":"Uh-oh! You broke our site.")}=t,{image:a=(404===n?"img/errors/404.png":"img/errors/500.png")}=t;return e.$set=(e=>{"status"in e&&s(0,n=e.status),"error"in e&&s(1,r=e.error),"message"in e&&s(2,o=e.message),"image"in e&&s(3,a=e.image)}),[n,r,o,a,!1]}class T extends s{constructor(e){super(),n(this,e,K,J,t,{status:0,error:1,message:2,image:3})}}function V(e){let t,s;const n=[{segment:e[2][1]},e[4].props];var r=e[4].component;function o(e){let t={$$slots:{default:[M]},$$scope:{ctx:e}};for(let e=0;e<n.length;e+=1)t=_(t,n[e]);return{props:t}}if(r)var a=new r(o(e));return{c(){a&&E(a.$$.fragment),t=A()},l(e){a&&w(a.$$.fragment,e),t=A()},m(e,n){a&&P(a,e,n),d(e,t,n),s=!0},p(e,s){const i=20&s?R(n,[4&s&&{segment:e[2][1]},16&s&&x(e[4].props)]):{};if(160&s&&(i.$$scope={dirty:s,ctx:e}),r!==(r=e[4].component)){if(a){j();const e=a;c(e.$$.fragment,1,0,()=>{C(e,1)}),O()}r?(a=new r(o(e)),E(a.$$.fragment),l(a.$$.fragment,1),P(a,t.parentNode,t)):a=null}else r&&a.$set(i)},i(e){s||(a&&l(a.$$.fragment,e),s=!0)},o(e){a&&c(a.$$.fragment,e),s=!1},d(e){e&&h(t),a&&C(a,e)}}}function z(e){let t;const s=new T({props:{error:e[0],status:e[1]}});return{c(){E(s.$$.fragment)},l(e){w(s.$$.fragment,e)},m(e,n){P(s,e,n),t=!0},p(e,t){const n={};1&t&&(n.error=e[0]),2&t&&(n.status=e[1]),s.$set(n)},i(e){t||(l(s.$$.fragment,e),t=!0)},o(e){c(s.$$.fragment,e),t=!1},d(e){C(s,e)}}}function G(e){let t,s;const n=[e[5].props];var r=e[5].component;function o(e){let t={};for(let e=0;e<n.length;e+=1)t=_(t,n[e]);return{props:t}}if(r)var a=new r(o());return{c(){a&&E(a.$$.fragment),t=A()},l(e){a&&w(a.$$.fragment,e),t=A()},m(e,n){a&&P(a,e,n),d(e,t,n),s=!0},p(e,s){const i=32&s?R(n,[x(e[5].props)]):{};if(r!==(r=e[5].component)){if(a){j();const e=a;c(e.$$.fragment,1,0,()=>{C(e,1)}),O()}r?(a=new r(o()),E(a.$$.fragment),l(a.$$.fragment,1),P(a,t.parentNode,t)):a=null}else r&&a.$set(i)},i(e){s||(a&&l(a.$$.fragment,e),s=!0)},o(e){a&&c(a.$$.fragment,e),s=!1},d(e){e&&h(t),a&&C(a,e)}}}function M(e){let t,s,n=e[5]&&G(e);return{c(){n&&n.c(),t=A()},l(e){n&&n.l(e),t=A()},m(e,r){n&&n.m(e,r),d(e,t,r),s=!0},p(e,s){e[5]?n?(n.p(e,s),l(n,1)):((n=G(e)).c(),l(n,1),n.m(t.parentNode,t)):n&&(j(),c(n,1,1,()=>{n=null}),O())},i(e){s||(l(n),s=!0)},o(e){c(n),s=!1},d(e){n&&n.d(e),e&&h(t)}}}function Y(e){let t,s,n,r;const o=[z,V],a=[];function i(e,t){return e[0]?0:1}return t=i(e),s=a[t]=o[t](e),{c(){s.c(),n=A()},l(e){s.l(e),n=A()},m(e,s){a[t].m(e,s),d(e,n,s),r=!0},p(e,r){let u=t;(t=i(e))===u?a[t].p(e,r):(j(),c(a[u],1,1,()=>{a[u]=null}),O(),(s=a[t])||(s=a[t]=o[t](e)).c(),l(s,1),s.m(n.parentNode,n))},i(e){r||(l(s),r=!0)},o(e){c(s),r=!1},d(e){a[t].d(e),e&&h(n)}}}function F(e){let t;const s=[{segment:e[2][0]},e[3].props];let n={$$slots:{default:[Y]},$$scope:{ctx:e}};for(let e=0;e<s.length;e+=1)n=_(n,s[e]);const r=new H({props:n});return{c(){E(r.$$.fragment)},l(e){w(r.$$.fragment,e)},m(e,s){P(r,e,s),t=!0},p(e,[t]){const n=12&t?R(s,[4&t&&{segment:e[2][0]},8&t&&x(e[3].props)]):{};183&t&&(n.$$scope={dirty:t,ctx:e}),r.$set(n)},i(e){t||(l(r.$$.fragment,e),t=!0)},o(e){c(r.$$.fragment,e),t=!1},d(e){C(r,e)}}}function W(e,t,s){let{stores:n}=t,{error:r}=t,{status:o}=t,{segments:a}=t,{level0:l}=t,{level1:c=null}=t,{level2:i=null}=t;return L(N,n),e.$set=(e=>{"stores"in e&&s(6,n=e.stores),"error"in e&&s(0,r=e.error),"status"in e&&s(1,o=e.status),"segments"in e&&s(2,a=e.segments),"level0"in e&&s(3,l=e.level0),"level1"in e&&s(4,c=e.level1),"level2"in e&&s(5,i=e.level2)}),[r,o,a,l,c,i,n]}class X extends s{constructor(e){super(),n(this,e,W,F,t,{stores:6,error:0,status:1,segments:2,level0:3,level1:4,level2:5})}}const Q=[/^\/blog.json$/,/^\/blog\/([^\/]+?).json$/],Z=[{js:()=>import("./index.c102f813.js"),css:["index.c102f813.css"]},{js:()=>import("./resume.719fa9bf.js"),css:[]},{js:()=>import("./_layout.ad74f01f.js"),css:["_layout.ad74f01f.css"]},{js:()=>import("./index.ebe125b1.js"),css:["index.ebe125b1.css"]},{js:()=>import("./[slug].96f7d463.js"),css:["[slug].96f7d463.css"]}],ee=(e=>[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/resume\/?$/,parts:[{i:1}]},{pattern:/^\/blog\/?$/,parts:[{i:2},{i:3}]},{pattern:/^\/blog\/([^\/]+?)\/?$/,parts:[{i:2},{i:4,params:t=>({slug:e(t[1])})}]}])(decodeURIComponent);const te="undefined"!=typeof __SAPPER__&&__SAPPER__;let se,ne,re,oe=!1,ae=[],le="{}";const ce={page:q({}),preloading:q(null),session:q(te&&te.session)};let ie,ue;ce.session.subscribe(async e=>{if(ie=e,!oe)return;ue=!0;const t=ve(new URL(location.href)),s=ne={},{redirect:n,props:r,branch:o}=await _e(t);s===ne&&await Se(n,o,r,t.page)});let pe,fe=null;let me,he=1;const de="undefined"!=typeof history?history:{pushState:(e,t,s)=>{},replaceState:(e,t,s)=>{},scrollRestoration:""},ge={};function $e(e){const t=Object.create(null);return e.length>0&&e.slice(1).split("&").forEach(e=>{let[,s,n=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(e.replace(/\+/g," ")));"string"==typeof t[s]&&(t[s]=[t[s]]),"object"==typeof t[s]?t[s].push(n):t[s]=n}),t}function ve(e){if(e.origin!==location.origin)return null;if(!e.pathname.startsWith(te.baseUrl))return null;let t=e.pathname.slice(te.baseUrl.length);if(""===t&&(t="/"),!Q.some(e=>e.test(t)))for(let s=0;s<ee.length;s+=1){const n=ee[s],r=n.pattern.exec(t);if(r){const s=$e(e.search),o=n.parts[n.parts.length-1],a=o.params?o.params(r):{},l={host:location.host,path:t,query:s,params:a};return{href:e.href,route:n,match:r,page:l}}}}function ye(){return{x:pageXOffset,y:pageYOffset}}async function be(e,t,s,n){if(t)me=t;else{const e=ye();ge[me]=e,t=me=++he,ge[me]=s?e:{x:0,y:0}}me=t,se&&ce.preloading.set(!0);const r=fe&&fe.href===e.href?fe.promise:_e(e);fe=null;const o=ne={},{redirect:a,props:l,branch:c}=await r;if(o===ne&&(await Se(a,c,l,e.page),document.activeElement&&document.activeElement.blur(),!s)){let e=ge[t];if(n){const t=document.getElementById(n.slice(1));t&&(e={x:0,y:t.getBoundingClientRect().top})}ge[me]=e,e&&scrollTo(e.x,e.y)}}async function Se(e,t,s,n){if(e)return function(e,t={replaceState:!1}){const s=ve(new URL(e,document.baseURI));return s?(de[t.replaceState?"replaceState":"pushState"]({id:me},"",e),be(s,null).then(()=>{})):(location.href=e,new Promise(e=>{}))}(e.location,{replaceState:!0});if(ce.page.set(n),ce.preloading.set(!1),se)se.$set(s);else{s.stores={page:{subscribe:ce.page.subscribe},preloading:{subscribe:ce.preloading.subscribe},session:ce.session},s.level0={props:await re};const e=document.querySelector("#sapper-head-start"),t=document.querySelector("#sapper-head-end");if(e&&t){for(;e.nextSibling!==t;)we(e.nextSibling);we(e),we(t)}se=new X({target:pe,props:s,hydrate:!0})}ae=t,le=JSON.stringify(n.query),oe=!0,ue=!1}async function _e(e){const{route:t,page:s}=e,n=s.path.split("/").filter(Boolean);let r=null;const o={error:null,status:200,segments:[n[0]]},a={fetch:(e,t)=>fetch(e,t),redirect:(e,t)=>{if(r&&(r.statusCode!==e||r.location!==t))throw new Error("Conflicting redirects");r={statusCode:e,location:t}},error:(e,t)=>{o.error="string"==typeof t?new Error(t):t,o.status=e}};let l;re||(re=te.preloaded[0]||k.call(a,{host:s.host,path:s.path,query:s.query,params:{}},ie));let c=1;try{const r=JSON.stringify(s.query),i=t.pattern.exec(s.path);let u=!1;l=await Promise.all(t.parts.map(async(t,l)=>{const p=n[l];if(function(e,t,s,n){if(n!==le)return!0;const r=ae[e];return!!r&&(t!==r.segment||!(!r.match||JSON.stringify(r.match.slice(1,e+2))===JSON.stringify(s.slice(1,e+2)))||void 0)}(l,p,i,r)&&(u=!0),o.segments[c]=n[l+1],!t)return{segment:p};const f=c++;if(!ue&&!u&&ae[l]&&ae[l].part===t.i)return ae[l];u=!1;const{default:m,preload:h}=await function(e){const t="string"==typeof e.css?[]:e.css.map(Ee);return t.unshift(e.js()),Promise.all(t).then(e=>e[0])}(Z[t.i]);let d;return d=oe||!te.preloaded[l+1]?h?await h.call(a,{host:s.host,path:s.path,query:s.query,params:t.params?t.params(e.match):{}},ie):{}:te.preloaded[l+1],o[`level${f}`]={component:m,props:d,segment:p,match:i,part:t.i}}))}catch(e){o.error=e,o.status=500,l=[]}return{redirect:r,props:o,branch:l}}function Ee(e){const t=`client/${e}`;if(!document.querySelector(`link[href="${t}"]`))return new Promise((e,s)=>{const n=document.createElement("link");n.rel="stylesheet",n.href=t,n.onload=(()=>e()),n.onerror=s,document.head.appendChild(n)})}function we(e){e.parentNode.removeChild(e)}function Pe(e){const t=ve(new URL(e,document.baseURI));if(t)return fe&&e===fe.href||function(e,t){fe={href:e,promise:t}}(e,_e(t)),fe.promise}let Re;function xe(e){clearTimeout(Re),Re=setTimeout(()=>{Ce(e)},20)}function Ce(e){const t=Ae(e.target);t&&"prefetch"===t.rel&&Pe(t.href)}function Le(e){if(1!==function(e){return null===e.which?e.button:e.which}(e))return;if(e.metaKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;const t=Ae(e.target);if(!t)return;if(!t.href)return;const s="object"==typeof t.href&&"SVGAnimatedString"===t.href.constructor.name,n=String(s?t.href.baseVal:t.href);if(n===location.href)return void(location.hash||e.preventDefault());if(t.hasAttribute("download")||"external"===t.getAttribute("rel"))return;if(s?t.target.baseVal:t.target)return;const r=new URL(n);if(r.pathname===location.pathname&&r.search===location.search)return;const o=ve(r);if(o){be(o,null,t.hasAttribute("sapper-noscroll"),r.hash),e.preventDefault(),de.pushState({id:me},"",r.href)}}function Ae(e){for(;e&&"A"!==e.nodeName.toUpperCase();)e=e.parentNode;return e}function je(e){if(ge[me]=ye(),e.state){const t=ve(new URL(location.href));t?be(t,e.state.id):location.href=location.href}else(function(e){me=e})(he=he+1),de.replaceState({id:me},"",location.href)}!function(e){var t;"scrollRestoration"in de&&(de.scrollRestoration="manual"),t=e.target,pe=t,addEventListener("click",Le),addEventListener("popstate",je),addEventListener("touchstart",Ce),addEventListener("mousemove",xe),Promise.resolve().then(()=>{const{hash:e,href:t}=location;de.replaceState({id:he},"",t);const s=new URL(location.href);if(te.error)return function(e){const{host:t,pathname:s,search:n}=location,{session:r,preloaded:o,status:a,error:l}=te;re||(re=o&&o[0]),Se(null,[],{error:l,status:a,session:r,level0:{props:re},level1:{props:{status:a,error:l},component:T},segments:o},{host:t,path:s,query:$e(n),params:{}})}();const n=ve(s);return n?be(n,he,!0,e):void 0})}({target:document.querySelector("#sapper")});
