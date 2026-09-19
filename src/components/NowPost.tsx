import Link from "next/link";

import SeoTags from "./SeoTags";
import { WEBSITE_URL } from "../constants";
import BlogLayout from "../layout/blog";
import type { IBlogPost } from "../utils/blog";

interface NowPostProps {
  post?: IBlogPost;
  previousPost?: IBlogPost;
}

function formatNowPageUpdate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
}

export default function NowPost({ post, previousPost }: NowPostProps) {
  if (!post) {
    return (
      <BlogLayout
        title="now"
        breadcrumbs={[{ href: "/", label: "divjot" }, { label: "now" }]}
      >
        <SeoTags
          title="now | divjot"
          description="What I am up to right now."
          pageUrl={`${WEBSITE_URL}/now`}
        />
        <p>Nothing here yet.</p>
      </BlogLayout>
    );
  }

  const postUrl = `${WEBSITE_URL}/now/${post.slug}`;
  const updatedAt = formatNowPageUpdate(post.date);

  return (
    <BlogLayout transitionSlug={post.slug}>
      <SeoTags
        title="Right here, right now | divjot"
        description={post.description}
        imageUrl={post.image ? `${WEBSITE_URL}${post.image}` : undefined}
        pageUrl={postUrl}
        keywords="now"
        noIndex={post.isDraft}
      />

      <header className="mb-10 border-b border-slate-200 pb-8 dark:border-white/15">
        <nav aria-label="Breadcrumb">
          <ol className="mb-10 flex list-none flex-wrap gap-[0.4em] p-0 text-sm font-medium lowercase text-slate-500 dark:text-slate-300 [&_li]:flex [&_li]:items-center [&_li+li]:before:mr-[0.4em] [&_li+li]:before:content-['/'] [&_li+li]:before:opacity-65">
            <li>
              <Link href="/" className="no-underline">
                divjot
              </Link>
            </li>
            <li>now</li>
          </ol>
        </nav>
        <svg
          aria-hidden="true"
          className="mb-2 h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        <h1 className="mb-3 text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
          right here, right now
        </h1>
        <p className="mb-0 text-base text-slate-600 dark:text-slate-200">
          What&apos;s this?{" "}
          <a href="https://nownownow.com/about">Read more here now</a>
        </p>
        {updatedAt && (
          <p className="mb-0 mt-5 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-300">
            <time dateTime={post.date}>
              This now page was last updated on {updatedAt}
            </time>
          </p>
        )}
      </header>

      <h2 className="mb-2 text-2xl font-semibold leading-snug tracking-[-0.02em]">
        {post.title}
      </h2>
      <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-200">
        {post.description}
      </p>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {previousPost && (
        <nav
          className="mt-12 border-t border-slate-200 pt-6 dark:border-white/15"
          aria-label="Now post navigation"
        >
          <Link href={`/now/${previousPost.slug}`} className="no-underline">
            ← before
          </Link>
        </nav>
      )}
    </BlogLayout>
  );
}
