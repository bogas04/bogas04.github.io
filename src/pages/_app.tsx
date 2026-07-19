import Head from "next/head";
import { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";
import { setPendingBlogPostTransition } from "../utils/blogViewTransition";

import "../app.css";

type NativeViewTransition = {
  finished: Promise<void>;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // remove all sws
    if (window.navigator.serviceWorker) {
      navigator.serviceWorker
        .getRegistrations()
        .then((sws) => sws.map((sw) => sw.unregister()));
    }
  }, []);
  useEffect(() => {
    const handleBlogNavigation = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[data-blog-transition]");
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target
      ) return;

      const href = link.getAttribute("href");
      if (!href?.startsWith("/blog")) return;
      event.preventDefault();

      const sourcePostSlug = link.closest<HTMLElement>(
        "[data-blog-transition-slug]"
      )?.dataset.blogTransitionSlug;
      if (sourcePostSlug) setPendingBlogPostTransition(sourcePostSlug);

      const pushToBlog = async () => {
        const navigated = await Router.push(href, undefined, { scroll: false });
        // `behavior: "auto"` inherits the site's CSS `scroll-behavior`, which
        // is smooth. Temporarily override it so the new page starts at the top
        // before its view-transition snapshot is taken.
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        root.style.scrollBehavior = previousScrollBehavior;
        return navigated;
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        void pushToBlog();
        return;
      }

      // This runs during capture, before Next.js's Link handler. Mark the
      // source elements now so the native transition can snapshot them.
      const transitionScope = link.closest("li") || link;
      transitionScope.querySelector<HTMLElement>("h1, h2")?.style.setProperty(
        "view-transition-name",
        "blog-title"
      );
      transitionScope.querySelector<HTMLElement>("img")?.style.setProperty(
        "view-transition-name",
        "blog-image"
      );

      const viewTransitionDocument = document as Document & {
        startViewTransition?: (
          update: () => Promise<boolean>
        ) => NativeViewTransition;
      };
      if (viewTransitionDocument.startViewTransition) {
        document.documentElement.dataset.blogViewTransition = "true";
        const transition = viewTransitionDocument.startViewTransition(() =>
          pushToBlog()
        );
        void transition.finished.then(
          () => delete document.documentElement.dataset.blogViewTransition,
          () => delete document.documentElement.dataset.blogViewTransition
        );
      } else {
        void pushToBlog();
      }
    };
    document.addEventListener("click", handleBlogNavigation, true);
    return () => document.removeEventListener("click", handleBlogNavigation, true);
  }, []);
  return (
    <>
      <Component {...pageProps} />
      <Head>
        <meta
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
          name="viewport"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta content="#333333" name="theme-color" />
      </Head>
    </>
  );
}
