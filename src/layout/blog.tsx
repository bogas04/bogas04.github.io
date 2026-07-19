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
}

const BlogLayout = ({
  children,
  breadcrumbs,
  readingTimeMinutes,
  title,
}: BlogLayoutProps) => {
  const [fontStep, setFontStep] = useState(0);
  const fontScale = Math.pow(1.1, fontStep);

  useEffect(() => {
    const storedStep = Number(window.localStorage.getItem("blog-font-step"));
    if (Number.isInteger(storedStep) && storedStep >= -10 && storedStep <= 10) {
      setFontStep(storedStep);
    }
  }, []);

  const updateFontStep = (amount: number) => {
    setFontStep((currentStep) => {
      const nextStep = Math.min(10, Math.max(-10, currentStep + amount));
      window.localStorage.setItem("blog-font-step", String(nextStep));
      return nextStep;
    });
  };

  const resetFontStep = () => {
    window.localStorage.removeItem("blog-font-step");
    setFontStep(0);
  };

  return (
    <>
      <style>{`
        main {
            position: relative;
            max-width: 56em;
            background-color: white;
            padding: 2em;
            margin: 0 auto;
            box-sizing: border-box;
        }

        img { width: 100%; }

        .blog-breadcrumbs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4em;
            margin: 0 0 0.75em;
            padding: 0;
            list-style: none;
            font-size: 1.17em;
            font-weight: bold;
        }

        .blog-breadcrumbs li { display: flex; align-items: center; }
        .blog-breadcrumbs li + li::before { content: "/"; margin-right: 0.4em; opacity: 0.65; }

        .text-size-controls {
            display: flex;
            align-items: center;
            gap: 0.5em;
            margin: 0 0 1.5em;
        }

        .text-size-controls button {
            min-width: auto;
            min-height: auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 0;
            border: 1px solid currentColor;
            padding: 0.15em 0.4em;
            color: inherit;
            background: transparent;
            font: 0.8em inherit;
            cursor: pointer;
        }

        .text-size-controls button:disabled { cursor: not-allowed; opacity: 0.5; }

        @media (prefers-color-scheme: dark) {
            body,
            main { background: #333; color: white; }
            a { color: lightsalmon; }
        }
      `}</style>
      <main
        style={{
          fontSize: `${fontScale}em`,
          maxWidth: "56rem",
          padding: "2rem",
        }}
      >
        {breadcrumbs && (
          <header>
            {title && <h1>{title}</h1>}
            <section
              className="text-size-controls"
              aria-label="Reading controls"
              style={{ fontSize: `${1 / fontScale}em` }}
            >
              {readingTimeMinutes && (
                <time dateTime={`PT${readingTimeMinutes}M`}>
                  {readingTimeMinutes} min read
                </time>
              )}
              {readingTimeMinutes && <span aria-hidden="true">|</span>}
              <button type="button" onClick={() => updateFontStep(-1)} disabled={fontStep <= -10} aria-label="Decrease text size">Aa−</button>
              <button type="button" onClick={() => updateFontStep(1)} disabled={fontStep >= 10} aria-label="Increase text size">Aa+</button>
              <button type="button" onClick={resetFontStep} disabled={fontStep === 0} aria-label="Reset text size">Reset</button>
            </section>
            <nav aria-label="Breadcrumb">
              <ol className="blog-breadcrumbs">
                {breadcrumbs.map((item) => (
                  <li key={`${item.href || "current"}-${item.label}`}>
                    {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
                  </li>
                ))}
              </ol>
            </nav>
          </header>
        )}
        {children}
      </main>
    </>
  );
};

export default BlogLayout;
