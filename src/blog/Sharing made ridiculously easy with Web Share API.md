---
title: Sharing made ridiculously easy with Web Share API
description:
  With growing mobile usage, performance and leanness (yeah, that’s a word) is
  becoming top priority for web apps. Oddly enough, sharing has…
date: "2017-09-22T16:27:20.946Z"
categories: []
keywords: [web share api, web apis, browser, DOM, PWA, web apps]
slug: /@bogas04/sharing-made-ridiculously-easy-with-web-share-api-33f6c9189d04
---

![Image with icons of social media platforms](/img/blog/1__qp3z0ij8v372R__DVbuJB6Q.jpeg)

> With growing mobile usage, performance and leanness (yeah, that’s a word) is becoming top priority for web apps. Oddly enough, sharing has never worked out well for web, until now (hopefully).

#### History time

Since the social network explosion, ad revenue on page views and obsession with [digg](http://digg.com/)\-ing websites, social sharing “widgets” have polluted our browsing experience with numerous flaws:

![](/img/blog/1__rW9LubrRX5l06KUeRoCzsA.png)

- They came with a dozen of JavaScript SDK files for every-single-social-network.
- They were usually “sticky”, because that’s so cool.
- They were hard to style, always looking pretty off from your website’s look and feel.
- They almost always lacked one social network which was big in your region or for your audience.

All these flaws became more prominent with rise of smartphones. SDKs burdened (and [still do](https://medium.freecodecamp.org/why-16-of-the-code-on-the-average-site-belongs-to-facebook-and-what-that-means-68956cd731be)) the network and CPU, “sticky” widgets janked scrolling, and became unsurprisingly [very annoying](http://thinksem.com/blog/floating-social-media-share-bar-good-or-bad/) at smaller resolutions (like they weren’t otherwise). And they certainly weren’t meant for everyone.

While solutions like lazy-loading and simpler designs helped a lot, it still is a painful job to find the right widget for your website, tweak it till the point it isn’t an eye-sore, only to find out that the users aren’t digg-ing it anymore (shameless pun-intended), and want to share it on XYZ messenger, which doesn’t have an [intent](https://faq.whatsapp.com/en/android/28000012) URL yet.

![1990s called and it wants you to reply back.](/img/blog/1__4xpPKwDeI__BomsMMRntRTw.png)
1990s called and it wants you to reply back.

Sadly, browsers haven’t cared enough to innovate much in this space lately. There were several attempts by Mozilla, Chrome and even [Windows 8](http://www.lovemysurface.net/using-windows-8-share-charm-surface/). While they still let you “email” your website on Desktop, and share to your favorite app on mobile, but that’s about it. Developer has no control over the shared title, content or the URL, which is a bigger problem when we talk about SPAs with fancy URLs.

#### tl;dr

And this changes with [Web Share API](https://developers.google.com/web/updates/2016/09/navigator-share). Wow, that’s quite a lot of build up for a simple API, isn’t it ? But this API is remarkable !

And that’s it ! In order to use it, you need to meet following conditions though:

> Your site must be served over [HTTPS](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features).

> You can only invoke the API in response to a user action, such as a click (e.g., you can’t call `navigator.share` as part of the page load).

> You can also share any URL, not just URLs under your website’s current scope: and you may also share `text` without a URL.

> You should feature-detect it in case it’s not available on your users’ platform (e.g., via `'share' in navigator`)

The API is still a proposal, however it’s implemented in Chrome 61, which is the latest stable version at time of writing. Which means, in next 6 weeks, this API would be available on almost every other Android phone. If you’re still not sold and think intents are the way to go, you can head over to the [FAQ](https://github.com/WICG/web-share/blob/master/docs/explainer.md#frequently-asked-questions) section of the proposal to learn about some decent arguments.

The [awesome PWA](http://mobile.twitter.com/) of [Twitter](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3) already uses ![Web Share API for sharing tweets.](/img/blog/1__tGS6QdpXiL7m21oPm25v7A.png)

#### Future

Did I say that’s it? Because that isn’t it yet.

- The share data (title, url and text presently) isn’t just limited to current set. There [would](https://wicg.github.io/web-share/#extensibility-of-this-api) be additions to it in future, `image` being one for example.
- There’s a sibling API, [Web Share Target](https://github.com/mgiuca/web-share-target), which allows a [PWA](https://developers.google.com/web/progressive-web-apps/) to be listed in the native app share drawer. This brings web apps way closer to the native experience. Learn more about that proposal [here](https://github.com/mgiuca/web-share-target/blob/master/docs/explainer.md).

#### Contribute

So start adding support to this awesome API right now, and if you would like to have this API well supported please follow/vote/share/contribute to the bug numbers I’m listing below;

- [Firefox Bug 1402369](https://bugzilla.mozilla.org/show_bug.cgi?id=1402369)
- [Webkit Bug 171100](https://bugs.webkit.org/show_bug.cgi?id=171100)
- [Edge User Voice](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/31563175-implement-web-share-api)
