---
title: Frontend Routing at udaan
description: sdsf
date: "2026-10-13T12:00:00.000Z"
categories: []
keywords: []
---

# Cross-platform routing is a compromise. Here is why ours has held up

> React gives us shared UI. Routing still lives in two worlds.
>
> At udaan, React Native has been part of our stack since 2016. This routing abstraction has evolved alongside it since 2019.

> insert: Abstract illustration of a shared navigation contract connecting a blue browser route to a coral native stack and tab route.

At udaan, we use [React Native](https://reactnative.dev/) for native apps and [React Native Web](https://necolas.github.io/react-native-web/) for the web. We share all of our screen and business logic across platforms.

Routing is where the split becomes impossible to ignore. Our web app uses [React Router](https://reactrouter.com/), while our native apps use [React Navigation](https://reactnavigation.org/). We believe in using the right tool for the right platform. For a long time, and arguably still today, React Router has been a robust choice for the web, while React Navigation has been the natural choice for React Native. We had to make those choices before newer universal routing options had matured.

In practice, we had two real platforms, two routing models, and a large set of screens we wanted to keep sharing. One router would have had to smooth over too many meaningful differences between browser URLs and native navigation trees.

This post is for teams that cannot make one router fit both platforms cleanly. Maybe Expo Router does not fit the web surface, React Router does not express the native navigation tree, or React Navigation does not meet the web requirements. Whatever the reason, a provider boundary can let an existing app keep the strengths of each platform while giving shared screens one contract.

## TL;DR

We kept React Router for the web and React Navigation for native. A provider gives shared screens one `navigateTo(...)` API and translates that intent for each host.

Suppose an app has 200 shared screens, with React Router on the web and React Navigation on native. Screens navigate between one another throughout the product. This is where the tradeoff shows up:

|                         | Without a provider                                            | With a provider                                              |
| ----------------------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| Screen navigation       | Each screen calls React Router or React Navigation directly   | Each screen calls `navigateTo(...)` with `navigationOptions` |
| Platform behavior       | URLs, history, stacks, tabs, and deep links reach screen code | Hosts translate one destination into platform behavior       |
| 200-screen upgrade      | An API change can reach many screen files and call sites      | Update the provider and test the adapters                    |
| React Navigation 5 to 7 | Version changes can spread through native screen code         | Version-specific work stays in the native host               |
| Main cost               | Router knowledge leaks into shared code                       | Adapters, contract tests, and feature mapping                |

## The problem: the same destination has different meanings

Web and native routers expose different method names because they model navigation differently.

| Web                                                                                                                 | Native                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| A route is usually a URL that can be bookmarked, refreshed, shared, indexed, and revisited through browser history. | A route is usually a screen inside a navigation tree, such as a screen in a stack nested inside a tab. |
| Params can become path segments, query parameters, or browser history state.                                        | Params live on a route and may be combined with stack, tab, or deep-link actions.                      |
| A transition usually changes the browser location.                                                                  | A transition may push a screen, replace a stack entry, switch tabs, or reset a nested navigator.       |

That difference creates a few predictable problems when screen code talks to both routers directly:

1. **API sprawl**: shared code learns about browser history, native navigation objects, and platform-specific hooks.
2. **Semantic drift**: `params`, `replace`, `back`, and `navigate` do not have exactly the same behavior on every router.
3. **Policy leaks**: auth redirects, legacy links, tab selection, deep links, and presentation choices spread across individual screens.

The bigger cost is uncertainty. A developer changes a navigation call and has to remember which platform rules it is also changing.

## Why not choose one router?

We considered the same obvious answers that most cross-platform teams consider.

Using the web router everywhere would give us a strong URL model, but it would not naturally express the native navigation tree. Tabs, nested stacks, tab resets, and native presentation styles would still need a second layer.

Using the native router everywhere can make shared navigation look simpler, but the web has its own requirements. URLs should remain first-class. Refresh, browser history, server rendering, SEO, and link sharing should not be treated as afterthoughts.

Newer tools reduce some of this tension. Expo Router brings a file-based model to React Native and web. TanStack Router explores a strong type system for route and search-parameter APIs. Those are useful directions, but adopting a new route model in an existing app still has a cost. The useful question became whether the migration was worth interrupting product work and rewriting a large network of screens.

Our deployment model makes that decision harder. We are JavaScript-first: we often ship through CodePush or other over-the-air updates before releasing a new native binary, and we have gone months without a native release. Users can therefore be running different generations of a native shell while receiving JavaScript updates. A native router migration has to work during that overlap, with users moving to new binaries over time.

So we kept the routers and introduced a smaller boundary between them.

## The idea: screens declare intent, hosts translate it

The screen should say where it wants to go, not how the current platform implements that move. The difference is easiest to see at the call site.

Without a boundary, a shared screen needs separate router knowledge:

```tsx
// Web with React Router
navigate(`/products/${productId}`);

// Native with React Navigation
navigation.navigate("ProductDetails", { productId });
```

Those calls carry different identities, parameter formats, and history behavior. The screen also needs access to two router APIs.

Now imagine an app with 200 screens and potentially 200 navigation call sites. When React Router or React Navigation changes its API, every one of those call sites becomes part of the upgrade. That is when the itch to introduce an abstraction becomes hard to ignore.

With the boundary, the shared screen has one call:

```tsx
ProductDetails.navigationOptions = {
  screenName: "ProductDetails",
  path: "/products/:productId",
  allowLoggedOut: false,
};

const { navigateTo } = useNavigate();
const { productId } = useParams<{ productId: string }>().getParams();

navigateTo(ProductDetails.navigationOptions, NavType.PUSH, { productId });
```

The destination is a reference, not a string assembled at the call site. The metadata gives each host the information it needs:

- `screenName` identifies the destination in the native navigation tree.
- `path` describes the web URL and gives deep links a common shape.
- `allowLoggedOut` lets the host apply authentication policy before rendering the screen.
- `screenAnimation` can describe a presentation hint without importing a native router into shared code.

The screen-facing API only needs a few operations:

```typescript
interface Navigation {
  navigateTo(
    destination: NavigationOptions,
    type: NavType,
    params?: NavigationParams,
  ): void;
  navigateBack(): void;
  useParams<T>(): {
    getParams(): Partial<T>;
    setParams(newParams: Partial<T>, isReplace?: boolean): void;
  };
}
```

The provider is where the translation happens. On the web, it turns a destination into a path, query string, or browser state and uses React Router. On native, it turns the same destination into a screen name, route params, stack action, tab action, or deep-link action and uses the version of React Navigation provided by the app host.

The provider-level code is platform-specific by design:

```tsx
// Web provider: React Router
navigate(path, {
  replace: type === NavType.REPLACE,
  state: stateParams,
});

// Native provider: React Navigation
navigation.dispatch(
  CommonActions.navigate({
    name: options.screenName,
    params: newParams,
  }),
);
```

React Navigation 5 and 7 have separate native hosts in our codebase. Their providers own the navigator packages, route trees, tab actions, reset behavior, and transition configuration. A migration between those versions can change that host code while the shared screen keeps calling `navigateTo(ProductDetails.navigationOptions, NavType.PUSH, {productId})`.

> insert: Diagram showing a shared navigateTo call entering the NavigationProvider, then resolving to React Router on web, React Navigation on native, or a future router behind the same screen contract.

This does not hide every difference. It gives those differences a home. Shared screens use a stable vocabulary, while hosts keep the rules that only they can know.

## What the boundary absorbs

### Parameters and browser state

The same logical value may have different representations. A product ID may be a path segment on the web, a query parameter in another flow, or a route param on native. The host owns that translation so screens can read a common params object without serializing URLs themselves.

This also gives us one place to document and test how params merge, when a navigation replaces the current entry, and what the back button means. The contract is shared, but the implementation is allowed to be platform-specific.

### Auth redirects and deep links

Authentication is another policy that should not be copied into every screen. The host can inspect `allowLoggedOut`, redirect an unauthenticated user to Login, remember the original destination, and resume it after authentication.

The same route metadata can also produce a sitemap of public links. Public visibility, login requirements, and URL shape can be described near the route, which avoids a separate SEO or infrastructure route list.

Deep links expose the difference between the platforms even more clearly. A web link can usually match a path directly. A native link may need to open a tab, construct a nested stack, or hand an unknown external link to a web view. That logic belongs near the navigation tree, not inside the destination screen.

### Tabs and nested navigation

Native navigation has a hierarchy that the web does not: a root stack, a bottom-tab navigator, and screens nested inside those tabs. A shared call to `navigateTo(...)` can therefore mean a normal route transition on the web and a tab switch or nested reset on native.

>insert: Diagram showing a shared navigateTo call entering the NavigationProvider, then resolving to a React Router route on web or a root stack, tab navigator, and nested screen stack on native.

We learned this while changing the Home experience based on a session experiment. On the app, Home lived inside a tab navigator. Rendering it as an ordinary stack screen left users with the Home content and no tabs around it.

Our first attempt handled this imperatively at each call site. Every place that navigated to Home had to inspect the session, choose the right tab, and build the correct nested navigation action. It worked, but it spread app-specific navigation knowledge across shared code.

We moved that decision into the navigation provider. Call sites stayed declarative and continued to navigate to `Home.navigationOptions`. The native provider inspected the session-selected home tab and dispatched the right tab or reset action. On the web, the same destination remained a normal route transition.

This was an unexpected benefit of the abstraction. We wanted to keep router APIs out of screens, but we also got a central place to correct navigation when a destination’s meaning depended on session state and the native navigation hierarchy.

### Presentation and animation

Search is a smaller example of the same idea. It opens with a different transition from ordinary screens, but the choice is still declared on the destination:

```tsx
const searchNavigationOptions = {
  screenName: "BoltQuerySearch",
  path: "/bolt-query-search",
  screenAnimation: "slide-from-bottom",
};
```

The web implementation can ignore this hint. The native host maps it to React Navigation transition configuration. On iOS this becomes a modal slide-from-bottom preset; on Android it becomes `slide_from_bottom`. Other screens keep the default transition.

The video shows the Home screen and Search opening with a slide-from-bottom transition.

<video controls loop muted playsinline width="320">
  <source src="./assets/animation.mp4" type="video/mp4" />
</video>

The screen declares the interaction once. The host decides how to express it using the platform’s animation API.

## One route manifest, several consumers

The route declaration is useful beyond navigation calls. We keep a central list of registered screens that acts as a route manifest. It can feed several consumers:

- The web shell maps paths to rendered screens.
- The native host maps screen identities to its navigator tree.
- Deep-link handling uses the same route metadata.
- Auth and product-context checks can run before a screen is rendered.

The web side can remain simple:

```tsx
routeManifest.map((screen) => (
  <Route
    key={screen.screenName}
    path={screen.navigationOptions.path}
    element={<RenderScreen screen={screen} />}
  />
));
```

The manifest is not a universal route tree. Web and native still build different trees and apply different policies. It is a common source of truth that prevents every consumer from inventing its own route list.

## Where it paid off

The value of an abstraction like this is difficult to show with a benchmark. It shows up when the platform changes and shared product work does not have to stop.

First, our native hosts span two generations of React Navigation, including versions 5 and 7. Shared screens continued to call `useNavigate()` and `useParams()`. The host providers and navigator setups changed, but the navigation contract remained stable. Because JavaScript updates can reach older native shells, that compatibility has to hold long after migration week.

Second, an experimental new vertical launched in a 30-day window with a screen bundle containing 28 screens. Those screens covered search, product details, cart, account, address management, verification, payments, deliveries, order details, and web-view content.

The value came from connecting a network of screens that could move from home to search, product details, cart, payment, order confirmation, and delivery flows through the same contract. We could focus on the new product behavior while the platform hosts handled routing, deep links, tabs, and presentation details.

For us, these changes are practical evidence that the seam is paying for itself in this codebase. Every codebase has a different balance between router features, migration cost, and shared code.

## The costs are real

This pattern is not free, and the wrapper should not be marketed as one.

The provider can become a policy monolith. If every new platform rule is added to one central class without structure, the seam simply becomes a different kind of coupling point.

The contract can also lag behind the routers. File-based routing, automatic code splitting, data loading, and advanced type-safe route APIs are easier to adopt when the app is built around them from the start. A compatibility layer may need extra work to expose them without changing the screen model.

The type safety is incomplete today. `useParams<T>()` gives a screen a typed view of the params it reads, but the destination and its params are not fully inferred from a single route declaration. Our next goal is more practical autocomplete: `navigateTo(...)` should suggest registered destinations, and `useParams()` should suggest the params available to the current screen.

We are still exploring whether generated types from the route manifest or a TanStack-style `createXyz` API gives us the best result. [TanStack Router](https://tanstack.com/router/latest) is useful inspiration for typed route and search-parameter APIs. [Expo Router](https://docs.expo.dev/router/introduction/) is another direction to watch, especially for file-based routing across native and web.

We are not committing to either today. The point of the abstraction is that we can evaluate a future router or borrow ideas from one without turning the decision into a screen-by-screen rewrite.

## What we would choose today

Our approach is shaped by history. udaan has used React Native since 2016, and this abstraction has evolved since 2019. `useNavigate()` and `useParams()` grew over time on top of an existing navigation provider. As the system matured, `useParams()` gained typed access to the params a screen reads.

Our apps predate the strong web support in newer React Navigation releases and the broader Expo Router model. For a new universal app today, an integrated router may be the better starting point.

For an existing cross-platform app, the answer is different. If shared screens are already a meaningful product asset, and the web and native routers have already diverged, a small provider boundary can be a safer investment than forcing one router to pretend the platforms are the same.

This was a response to two real platforms and shared screen and business logic. The provider gives both platforms room to evolve without repeating the same migration across every screen.

## Conclusion: choose the seam that fits

There are two reasonable answers to cross-platform routing. Use a router that understands the nuances of both web and native well enough for your product, or put a small adapter boundary around the routers you already have.

Routing has been a hard problem for a long time. React Router supported native apps through `react-router-native` in v5 and v6, then removed that package in v7 as part of its package restructuring. The [v5 native documentation](https://v5.reactrouter.com/native/guides/quick-start), [v6 native link documentation](https://reactrouter.com/docs/en/v6/components/link-native), and [v7 changelog](https://reactrouter.com/home/changelog) show that progression. React Navigation’s [first web support announcement in May 2020](https://reactnavigation.org/blog/2020/05/16/web-support/) described web support as preliminary. By 2026, [React Navigation 8’s web support guide](https://reactnavigation.org/docs/8.x/web-support/) documents Web as a supported platform, including browser URLs, history, links, and accessibility.

Newer projects have taken different approaches. [Expo Router](https://docs.expo.dev/router/introduction/) uses a file-based model across native and web, while [TanStack Router’s type-safety model](https://tanstack.com/router/latest/docs/guide/type-safety) pushes route-aware `useParams`, `useSearch`, and `useNavigate` APIs. Web URLs and native navigation trees remain genuinely different models.

React Native is moving closer to Web APIs too. Its [New Architecture](https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here) aligns parts of the event loop with web specifications, and [recent releases](https://reactnative.dev/blog/2025/12/10/react-native-0.83) have added APIs such as Web Performance and `IntersectionObserver`. Maybe the perfect cross-platform router is arriving **anytime now**™.

We never planned to take on all of routing ourselves. The abstraction lets us pick and choose: keep React Router’s URL model, keep React Navigation’s native stack and tab behavior, borrow stronger type-safety ideas, and replace a provider when a better cross-platform solution fits.

Web and native can remain different. The important part is keeping those differences in a visible, testable boundary while leaving room to change our minds.
