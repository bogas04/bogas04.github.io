---
title: What startup performance at udaan taught me
description: A React Native performance investigation about telemetry, experiments, and choosing simpler fixes.
date: "2023-08-15T00:00:00Z"
categories: []
keywords: [react-native, performance, telemetry, experimentation, udaan]
slug: ""
---

![React Native startup performance investigation](/img/blog/udaan-react-native-startup-performance.jpg)

I also wrote about a much more persistent problem at udaan: [improving startup performance for a large React Native app](https://medium.com/engineering-udaan/reacting-to-change-tale-of-a-web-developer-improving-startup-performance-for-a-large-react-native-854f8a4850fd).

Startup performance is an awkward problem because the first question is usually not “how do we fix it?” but “what exactly are we measuring?” The investigation taught me the value of useful telemetry, small experiments, and being honest when the data contradicted an appealing explanation.

It was tempting to reach for a shiny migration or a sweeping upgrade. Instead, the valuable work was simplifying the startup path, validating one hypothesis at a time, and paying attention to how the app *felt* as well as what the numbers reported.

That approach made the work less glamorous, but much more reliable. It is a lesson I now carry into most performance work: simplify first, measure the change, and earn the complexity only when it is necessary.

Read the full story on [udaan engineering](https://medium.com/engineering-udaan/reacting-to-change-tale-of-a-web-developer-improving-startup-performance-for-a-large-react-native-854f8a4850fd).
