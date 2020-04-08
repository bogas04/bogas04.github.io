---
title: Release of Samsung Internet Chrome Extension v2
description:
  Update Oct 2017: Since the release of v2 (March 2017), we saw a 9.3x increase
  in our monthly active users (~8k to 75k). We also observed…
date: "2017-03-09T06:02:13.793Z"
categories: []
keywords: [google chrome, chrome extension, samsung, samsung internet, bookmarks]
slug: /@bogas04/release-of-samsung-internet-chrome-extension-v2-644e7b97096e
---

> **Update Oct 2017:** Since the release of v2 (March 2017), we saw a **9.3x increase** in our monthly active users (~8k to 75k). We also observed **35% jump** in the rating. Thank you so much for using & liking our extension, stay tuned for more updates!

![](/img/blog/1__e16MS4BgBe8e__DtlF666JA.png)

Today we are very glad to release the much awaited [version 2](https://chrome.google.com/webstore/detail/samsung-internet/epejdmjgfibjaffbmojllapapjejipkh) of our Chrome Extension. [Install](https://chrome.google.com/webstore/detail/samsung-internet/epejdmjgfibjaffbmojllapapjejipkh) it today to sync bookmarks across your Chrome browser on PC and Samsung Internet.

The Samsung Internet extension, earlier known as Samsung Sync (v1.4), not only sports a new name but also comes with tonnes of features and a massive UI overhaul. I’ll walk-through the new additions in the article.

> Drastic improvements to first-sync performance.

First-sync performance was the number one complaint in our web store reviews, usually leaving users to never actually getting around to use our extension. We hit the heart of the issue with a dagger by rewriting several modules and chaining network requests, database queries and DOM updates in a much more optimized manner. With this release, you can now not only see the progress of sync, but also the fetched bookmarks as and when they arrive. We feel this will solve the top complaint and allow users to enjoy the extension.

![](/img/blog/1__qYPi94TVyTF1p1aX1BCW9g.gif)

> Consistent UI with [Samsung Internet on Android.](https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser)

We are proud of our UX team’s efforts in offering a very modern look and feel to the extension. The small 600 x 400 screen real estate makes it much harder to add features while keeping the interface user-friendly. After several iterations, I think we’ve pretty much nailed it. From a progress bar to show sync status to modals for bookmark management, the UI even though offering several functionalities doesn’t overwhelm the user.

![Live loading of bookmarks, top requested feature.](/img/blog/1__hE8PGhNMYIhyt3WsuEF50Q.png)
Live loading of bookmarks, top requested feature.

> Enhanced bookmark management.

The previous version (1.4) was bit limiting in the sense users could only edit title or delete a bookmark. We felt that the extension can offer much more than that and with today’s release, not only basic create / update / delete / move is supported, but users can also import Chrome bookmarks into their Samsung account. We feel that this brings the control back to the user.

![Improved Bookmark Management](/img/blog/1__d6bWg__Yhi2DyDM0JSZdrjA.png)
Improved Bookmark Management

> And much more…

The feature list just doesn’t stop here ! Some of the other miscellaneous changes:

- Context menu support to bookmark current tab with a single click.  
  _Pro tip: You can use_ **_Ctrl/Cmd + Shift + Y_** _combination to bookmark instantly._
- Improved internationalization for supported languages.
- Improved keyboard accessibility, you can tab your way through all items.

> **Update April 2017:** Version 2.0.5 is now released to Chrome Web Store that fixes login related issues faced by certain users with the previous version (2.0.3).

Let us know if you run into issues, or just want to give us some feedback. We’ll follow up soon with our plans for releasing the extension for other browsers. Make sure you follow [Samsung Internet Developers](https://medium.com/samsung-internet-dev) on [twitter](https://twitter.com/samsunginternet).

**Note:** The Sync functionality is only available for phones logged in with a Samsung Account on a stable release of Samsung Internet, which means that it won’t work with [Samsung Internet Beta](https://medium.com/samsung-internet-dev/samsung-internet-beta-now-available-without-sign-up-e0d5d4010838#.ntaxejovf) (v5.4) on non-samsung phones, just yet.
