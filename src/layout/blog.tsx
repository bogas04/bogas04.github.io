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
        className="blog-page relative mx-auto box-border max-w-[56rem] bg-white p-8 dark:bg-[#333] dark:text-white [&_a]:dark:text-[lightsalmon] [&_img]:w-full"
        data-blog-transition-slug={transitionSlug}
        style={{
          fontSize: `${fontScale}em`,
          maxWidth: "56rem",
          padding: "2rem",
        }}
      >
        {breadcrumbs && (
          <header>
            {title && <h1 className="blog-view-title pb-2 font-bold leading-[1.25]">{title}</h1>}
            <section
              className="blog-view-reading-controls mb-6 flex items-center gap-2"
              aria-label="Reading controls"
              style={{ fontSize: `${1 / fontScale}em` }}
            >
              {readingTimeMinutes && (
                <time dateTime={`PT${readingTimeMinutes}M`}>
                  {readingTimeMinutes} min read
                </time>
              )}
              {readingTimeMinutes && <span aria-hidden="true">|</span>}
              <button className="inline-flex min-h-0 min-w-0 items-center justify-center rounded-none border border-current bg-transparent px-[0.4em] py-[0.15em] text-[0.8em] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => updateFontStep(-1)} disabled={fontStep <= -10} aria-label="Decrease text size">Aa−</button>
              <button className="inline-flex min-h-0 min-w-0 items-center justify-center rounded-none border border-current bg-transparent px-[0.4em] py-[0.15em] text-[0.8em] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => updateFontStep(1)} disabled={fontStep >= 10} aria-label="Increase text size">Aa+</button>
              <button className="inline-flex min-h-0 min-w-0 items-center justify-center rounded-none border border-current bg-transparent px-[0.4em] py-[0.15em] text-[0.8em] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={resetFontStep} disabled={fontStep === 0} aria-label="Reset text size">Reset</button>
            </section>
            <nav aria-label="Breadcrumb">
              <ol className="blog-view-breadcrumbs mb-3 flex list-none flex-wrap gap-[0.4em] p-0 text-[1.17em] font-bold [&_li]:flex [&_li]:items-center [&_li+li]:before:mr-[0.4em] [&_li+li]:before:content-['/'] [&_li+li]:before:opacity-65">
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
