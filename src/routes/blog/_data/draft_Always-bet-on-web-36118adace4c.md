---
title: Always bet on web
description: >-
  Most companies don’t take the effort to build and maintain a good webapp. The
  focus has always been on getting your users to download a…
date: ""
categories: []
keywords: []
slug: ""
---

![A weird screenshot showing Swiggy’s Desktop website](img/blog/1__3sVFY7SBNW9xRiFmSFF__uA.png)
A weird screenshot showing Swiggy’s Desktop website

Most companies don’t take the effort to build and maintain a good webapp. The focus has always been on getting your users to download a huge piece of software to get maximum engagement. Only, it isn’t a very nice approach.

TODO: Pull off some random statistic comparing apps and PWAs.

#### PWA Quality

At Swiggy, web, consumer web especially, is taken quite seriously. In fact some of our own employees only use the PWA.

> We feel that PWA isn’t just a chore but rather a valid alternative to the app itself.

Asking to download the app before trying it is too much to ask from a consumer, and PWA gives them a good idea what they’re getting into before making such a commitment. Plus not everyone has smartphone with a lot of internal storage, or enough data to keep and update the app every few weeks. PWAs make it easy for a lurker to go through your app first and then decide whether they wish to use your service or not.

TODO: Side by side comparison of mweb and android app.

You can see both mobile website and our mobile app in above GIF. Can you make out which is which? Yup, we take our PWA that seriously.

Read more about the architecture of our PWA [here](https://bytes.swiggy.com/swiggy-diet-progressive-web-app-beccd248bf7b).

####

![](img/blog/1__tG9r8R94VFoKyde0oAws__g.gif)
![](img/blog/1__HlLIbHI0Bxf6tRiDMtqBaA.gif)

#### A comment on design

Humans don’t like abrupt changes, the “gaps” in a journey bother our brain too much. Consider tapping a button and suddenly seeing a white screen, clicking a drop down and suddenly seeing a new layout.

![](img/blog/1__jyjt1qAnIltmgTFsitTGFg.png)

When you design your PWA, or even your application, try to have subtle loading states to give feedback to your user that you did register their input.

![](img/blog/1__QDe5rZ2qH__fLP2L1wfjW3w.gif)

In our apps, you can see it everywhere. Tap a button and you might see a ripple, or a progress bar on top of page, or a loading within the button itself.

#### PWA in apps

Even though the PWA looks just like the App, the codebases aren’t sharing code. It’s true that this counts as double effort, but we’ve to realize that what works best on web probably doesn’t on a native app, and vice-versa. While it would be really neat, Swiggy is able to keep separate teams working on each app, optimizing for individual environments. At least when it comes to consumer facing applications, other apps (or pages within the app) where performance and smooth transitions aren’t of utmost priority, and on the fly changes are more crucial, we do use solutions like React Native, Webviews, or even just a PWA. For example;

- Super landing page
- Hygiene page on apps
- Support/Chat

#### PWA expanding the horizons

Another benefit of having a PWA is that you can scale it to run on various platforms, even those that you never planned for;

- iPad is mweb
- older iPhones that don’t support newer SDKs are running the PWAs
- SEO. AMP.
- Xbox/Xiomi TV/Apple TV demo?

#### PWA Numbers

TODO; Show good rising userbase of PWA.

Some analytics numbers of how PWA is doing great, without us promoting it much.

> Make your web app such that it’s almost impossible to tell them apart from your native apps. This experience gives them confidence & trust in your service.
