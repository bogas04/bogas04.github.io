import Link from "next/link";
import { useEffect, useState } from "react";

export interface BlogBreadcrumbItem {
  href?: string;
  label: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BlogBreadcrumbItem[];
  readingTimeMinutes?: number;
  title?: string;
  transitionSlug?: string;
}

let cachedFontStep = 0;

const BlogLayout = ({
  children,
  breadcrumbs,
  readingTimeMinutes,
  title,
  transitionSlug,
}: BlogLayoutProps) => {
  const [fontStep, setFontStep] = useState(() => cachedFontStep);
  const fontScale = Math.pow(1.1, fontStep);

  useEffect(() => {
    const storedStep = Number(window.localStorage.getItem("blog-font-step"));
    if (Number.isInteger(storedStep) && storedStep >= -10 && storedStep <= 10) {
      cachedFontStep = storedStep;
      setFontStep(storedStep);
    }
  }, []);

  const updateFontStep = (amount: number) => {
    setFontStep((currentStep) => {
      const nextStep = Math.min(10, Math.max(-10, currentStep + amount));
      cachedFontStep = nextStep;
      window.localStorage.setItem("blog-font-step", String(nextStep));
      return nextStep;
    });
  };

  const resetFontStep = () => {
    window.localStorage.removeItem("blog-font-step");
    cachedFontStep = 0;
    setFontStep(0);
  };

  return (
    <main
        className="blog-page relative mx-auto box-border max-w-[46rem] bg-white px-6 py-10 text-slate-800 dark:bg-[#333] dark:text-white [&_a]:dark:text-[lightsalmon] [&_img]:w-full sm:px-10"
        data-blog-transition-slug={transitionSlug}
        style={{
          fontSize: `${fontScale}em`,
        }}
      >
        {breadcrumbs && (
          <header>
            {title && <h1 className="blog-view-title pb-2 font-bold leading-[1.25]">{title}</h1>}
            <section
              className="blog-view-reading-controls mb-5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300"
              aria-label="Reading controls"
              style={{ fontSize: `${1 / fontScale}em` }}
            >
              {readingTimeMinutes && (
                <time dateTime={`PT${readingTimeMinutes}M`}>
                  {readingTimeMinutes} min read
                </time>
              )}
              {readingTimeMinutes && <span aria-hidden="true">|</span>}
              <button className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md bg-slate-100 px-2 text-[0.8em] transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/10 dark:hover:bg-white/20" type="button" onClick={() => updateFontStep(-1)} disabled={fontStep <= -10} aria-label="Decrease text size">Aa−</button>
              <button className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md bg-slate-100 px-2 text-[0.8em] transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/10 dark:hover:bg-white/20" type="button" onClick={() => updateFontStep(1)} disabled={fontStep >= 10} aria-label="Increase text size">Aa+</button>
              <button className="inline-flex min-h-8 items-center justify-center rounded-md px-2 text-[0.8em] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/10" type="button" onClick={resetFontStep} disabled={fontStep === 0} aria-label="Reset text size">reset</button>
            </section>
            <nav aria-label="Breadcrumb">
              <ol className="blog-view-breadcrumbs mb-6 flex list-none flex-wrap gap-[0.4em] p-0 text-sm font-medium lowercase text-slate-500 dark:text-slate-300 [&_li]:flex [&_li]:items-center [&_li+li]:before:mr-[0.4em] [&_li+li]:before:content-['/'] [&_li+li]:before:opacity-65">
                {breadcrumbs.map((item) => (
                  <li key={`${item.href || "current"}-${item.label}`}>
                    {item.href ? <Link href={item.href} data-blog-transition className="no-underline">{item.label}</Link> : item.label}
                  </li>
                ))}
              </ol>
            </nav>
          </header>
        )}
        {children}
    </main>
  );
};

export default BlogLayout;
