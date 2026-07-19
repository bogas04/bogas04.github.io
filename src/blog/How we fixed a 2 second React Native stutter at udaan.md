---
title: How we fixed a 2-second React Native stutter at udaan
description: A small, careful debugging effort that made a painful interaction feel responsive again.
date: "2025-07-30T00:00:00Z"
categories: []
keywords: [react-native, react, performance, debugging, udaan]
slug: ""
---

![React Native re-rendering investigation](/img/blog/udaan-react-render-stutter.png)

I recently wrote about one of the more satisfying debugging efforts I have been part of at udaan: [how we solved a 2s+ stutter caused by re-rendering React components](https://medium.com/engineering-udaan/how-we-solved-a-2s-stutter-caused-by-re-rendering-react-components-5b852ca1852a).

The problem looked deceptively small: tapping Add to Cart could leave the UI visibly stuck for more than two seconds. The fun part was getting from that symptom to the underlying cause without turning the fix into a rewrite.

We used simple visual measurements to see the repeated renders, then narrowed the blast radius with smaller hooks, selectors, and batching. Each change was surgical: reduce the work that was actually happening instead of papering over it with a loading state or a new state-management migration.

The result was a much smoother interaction and a reminder I keep coming back to: performance debugging gets much easier once the measurement is concrete enough to make the bottleneck obvious.

Read the full story on [udaan engineering](https://medium.com/engineering-udaan/how-we-solved-a-2s-stutter-caused-by-re-rendering-react-components-5b852ca1852a).
