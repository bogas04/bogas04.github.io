!function(){"use strict";const g=["client/resume.719fa9bf.js","client/_layout.ad74f01f.js","client/[slug].6f3903b4.js","client/index.d3587d44.js","client/index.ebe125b1.js","client/client.d7a27083.js","client/index.c102f813.js"].concat(["service-worker-index.html","Rapes.pdf","global.css","img/blazing-fast-web.png","img/blog/0__pLB__t2lROZfPlJML.jpg","img/blog/1__0WjBWfdkbcob39FMklwp7A.png","img/blog/1__3sVFY7SBNW9xRiFmSFF__uA.png","img/blog/1__4xpPKwDeI__BomsMMRntRTw.png","img/blog/1__7emoMCCIFij0dncEASB94g.gif","img/blog/1__AW6KCuaBBSUSWKu8dIrmLA.png","img/blog/1__B3QKpZdPXxmFaDsc9XQbdg.png","img/blog/1__BrdQH1cUwbrbO6MO7QF__aQ.jpeg","img/blog/1__EmZytUAuspI__mycZ__o9OGw.png","img/blog/1__HlLIbHI0Bxf6tRiDMtqBaA.gif","img/blog/1__KvkZ__uwm7oa3ENgorLT5ug.jpeg","img/blog/1__O3UIYiDjYTXMAZd7GBMwVg.png","img/blog/1__OHlYFf__A8U689ORGveNMHA.png","img/blog/1__QDe5rZ2qH__fLP2L1wfjW3w.gif","img/blog/1__RDHDZhOnDTUKypNH__vp1wQ.jpeg","img/blog/1__UFCQ__sve25zCXqzQc__rYxA.png","img/blog/1__WFkALvcY68HD__PaoixgiiQ.png","img/blog/1__ZzlBaQH6w1BgwZdo3bIYRQ.png","img/blog/1____L__bUfSLVT6EboXRO7SSGg.png","img/blog/1____g5l9BybNJiUO22dNPEeYg.jpeg","img/blog/1__axarHRa8ZbcIwJwJr2xGoA.jpeg","img/blog/1__d6bWg__Yhi2DyDM0JSZdrjA.png","img/blog/1__e16MS4BgBe8e__DtlF666JA.png","img/blog/1__hE8PGhNMYIhyt3WsuEF50Q.png","img/blog/1__jyjt1qAnIltmgTFsitTGFg.png","img/blog/1__kvwGrM__62LBXWLHxH__QwGw.png","img/blog/1__ng__tz1ZRfUcuEaSPWdKFdQ.jpeg","img/blog/1__qDzv5NoBmcDetWPiftOj__A.jpeg","img/blog/1__qYPi94TVyTF1p1aX1BCW9g.gif","img/blog/1__qp3z0ij8v372R__DVbuJB6Q.jpeg","img/blog/1__rW9LubrRX5l06KUeRoCzsA.png","img/blog/1__sCPawDEOQs9dTX5wPN4e__A.jpeg","img/blog/1__tG9r8R94VFoKyde0oAws__g.gif","img/blog/1__tGS6QdpXiL7m21oPm25v7A.png","img/blog/1__x9oZ2fWNHKVWgEap__5YoCA.jpeg","img/blog/1__zRKNo__JVjQFn2EOCwQ1QNA.gif","img/blog/1__zWhHZUDWuxJwfEoumC1__OQ.png","img/chefs-basket.png","img/errors/404.png","img/errors/500.png","img/github.svg","img/housing.png","img/linkedin.png","img/medium.svg","img/react-2019.png","img/samsung.png","img/swiggy.png","img/testing-with-jest.png","img/twitter.png","manifest.json"]),_=new Set(g);self.addEventListener("install",_=>{_.waitUntil(caches.open("cache1579545225191").then(_=>_.addAll(g)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",g=>{g.waitUntil(caches.keys().then(async g=>{for(const _ of g)"cache1579545225191"!==_&&await caches.delete(_);self.clients.claim()}))}),self.addEventListener("fetch",g=>{if("GET"!==g.request.method||g.request.headers.has("range"))return;const e=new URL(g.request.url);e.protocol.startsWith("http")&&(e.hostname===self.location.hostname&&e.port!==self.location.port||(e.host===self.location.host&&_.has(e.pathname)?g.respondWith(caches.match(g.request)):"only-if-cached"!==g.request.cache&&g.respondWith(caches.open("offline1579545225191").then(async _=>{try{const e=await fetch(g.request);return _.put(g.request,e.clone()),e}catch(e){const i=await _.match(g.request);if(i)return i;throw e}}))))})}();
