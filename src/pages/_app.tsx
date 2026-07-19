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
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
  useEffect(() => {
    Router.beforePopState(({ as }) => {
      const sourcePostSlug = document.querySelector<HTMLElement>(
        "[data-blog-transition-slug]"
      )?.dataset.blogTransitionSlug;
      const viewTransitionDocument = document as Document & {
        startViewTransition?: (
          update: () => Promise<boolean>
        ) => NativeViewTransition;
      };

      if (
        !sourcePostSlug ||
        !as.startsWith("/blog") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !viewTransitionDocument.startViewTransition
      ) {
        return true;
      }

      setPendingBlogPostTransition(sourcePostSlug);
      document.documentElement.dataset.blogViewTransition = "true";
      const transition = viewTransitionDocument.startViewTransition(async () => {
        const navigated = await Router.replace(as, as, { scroll: false });
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return navigated;
      });
      void transition.finished.then(
        () => delete document.documentElement.dataset.blogViewTransition,
        () => delete document.documentElement.dataset.blogViewTransition
      );

      return false;
    });

    return () => Router.beforePopState(() => true);
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
