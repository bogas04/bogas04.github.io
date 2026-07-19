import { memo, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";
import { BLOG_URL } from "../../constants";
import SeoTags from "../../components/SeoTags";
import { getBlogPostSummaries, IBlogPostSummary } from "../../utils/blog";
import { getBlogPostPath } from "../../utils/blogDate";
import { getBlogTagColors, getBlogTagSlug } from "../../utils/blogTag";
import { consumePendingBlogPostTransition } from "../../utils/blogViewTransition";
import BlogLayout, { BlogBreadcrumbItem } from "../../layout/blog";

import Link from "next/link";
import { flushSync } from "react-dom";

export async function getStaticProps() {
  const posts = getBlogPostSummaries();

  return {
    props: { posts },
  };
}

export interface IBlogListingProps {
  posts: IBlogPostSummary[];
  heading?: ReactNode;
  breadcrumbs?: BlogBreadcrumbItem[];
}

const formatBlogPreviewDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

const getBlogPreviewTags = (keywords: IBlogPostSummary["keywords"]) =>
  Array.isArray(keywords) ? keywords : keywords ? [keywords] : [];

export function BlogListing({ posts, heading, breadcrumbs }: IBlogListingProps) {
  const router = useRouter();
  const showDrafts = router.query["be-more-vulnerable"] === "1";
  const [drafts, setDrafts] = useState<IBlogPostSummary[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<IBlogPostSummary | null>(
    null
  );
  const [transitioningPostSlug, setTransitioningPostSlug] = useState<string | null>(
    consumePendingBlogPostTransition
  );

  useEffect(() => {
    if (!showDrafts) return;

    fetch("/_be-more-vulnerable.json")
      .then((response) => response.json())
      .then(setDrafts)
      .catch(() => setDrafts([]));
  }, [showDrafts]);

  const visiblePosts = showDrafts
    ? [...posts, ...drafts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : posts;
  const selectedDraftUrl = selectedDraft
    ? `https://github.com/bogas04/bogas04.github.io/blob/main/src/blog/${encodeURIComponent(selectedDraft.fileName)}`
    : "";

  return (
    <BlogLayout
      breadcrumbs={breadcrumbs || [
        { href: "/", label: "Divjot Singh" },
        { label: "Blog" },
      ]}
    >
      <SeoTags
        title="Blog | Divjot Singh"
        description="My thoughts on work, life and world."
        imageUrl=""
        pageUrl={BLOG_URL}
      />

      {heading && <p>{heading}</p>}

      <ul className="mx-0 my-[2em] p-0 leading-normal">
        {visiblePosts.map((post) => {
          const tags = getBlogPreviewTags(post.keywords);
          const articleHref = getBlogPostPath(post);
          const handlePostClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
            if (post.isDraft) {
              event.preventDefault();
              setSelectedDraft(post);
              return;
            }
            flushSync(() => setTransitioningPostSlug(post.slug));
          };

          return (
          <li
            className="my-[1em] list-none overflow-hidden rounded-[5px] border border-[#cbcbcb] dark:border-[#555]"
            key={post.title}
          >
            <div className="flex flex-col-reverse items-start justify-between p-[1em] transition-colors hover:bg-black/10 focus-within:bg-black/10 dark:hover:bg-black/50 dark:focus-within:bg-black/50 min-[801px]:flex-row">
              <div className="flex flex-col content-between">
                <Link
                  href={articleHref}
                  data-blog-transition={!post.isDraft || undefined}
                  className="no-underline"
                  onClick={handlePostClick}
                >
                  <h2
                    className="flex items-center pb-2 font-bold"
                    style={
                      transitioningPostSlug === post.slug
                        ? { viewTransitionName: "blog-title" }
                        : undefined
                    }
                  >
                    {post.title} {post.isDraft && <small className="ml-2.5 bg-yellow-400 p-1 text-[8px] font-bold uppercase text-black">draft</small>}
                  </h2>
                </Link>

                {tags.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1.5" aria-label="Tags">
                    {tags.map((tag) => {
                      const colors = getBlogTagColors(tag);
                      return (
                        <Link
                          href={`/blog/tags/${getBlogTagSlug(tag)}`}
                          className="blog-preview-tag"
                          key={tag}
                          style={{
                            "--tag-background-color": colors.backgroundColor,
                            "--tag-text-color": colors.textColor,
                            "--tag-background-color-dark": colors.darkBackgroundColor,
                            "--tag-text-color-dark": colors.darkTextColor,
                          } as React.CSSProperties}
                        >
                          {tag}
                        </Link>
                      );
                    })}
                  </div>
                )}

                <Link href={articleHref} data-blog-transition={!post.isDraft || undefined} className="no-underline" onClick={handlePostClick}>
                  <p className="dark:text-white">{post.description}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-200">
                    <time className="rounded-full bg-slate-100 px-2 py-1 dark:bg-white/10" dateTime={post.date}>
                      {formatBlogPreviewDate(post.date)}
                    </time>
                    <time
                      className="rounded-full bg-slate-100 px-2 py-1 dark:bg-white/10"
                      dateTime={`PT${post.readingTimeMinutes}M`}
                      aria-label={`${post.readingTimeMinutes} ${post.readingTimeMinutes === 1 ? "minute" : "minutes"} estimated reading time`}
                    >
                      {post.readingTimeMinutes} {post.readingTimeMinutes === 1 ? "min" : "mins"} read
                    </time>
                  </div>
                </Link>
              </div>
              <Link href={articleHref} data-blog-transition={!post.isDraft || undefined} className="mb-[1em] h-[300px] w-[calc(100%+2em)] max-w-[calc(100%+2em)] -mx-[1em] min-[801px]:m-0 min-[801px]:h-auto min-[801px]:min-w-[30%] min-[801px]:max-w-[30%]" onClick={handlePostClick}>
                <img
                  className="h-full w-full object-cover"
                  style={
                    transitioningPostSlug === post.slug
                      ? { viewTransitionName: "blog-image" }
                      : undefined
                  }
                  src={post.image || "/img/travel/uk/uk-14.jpg"}
                  alt={`Image for ${post.title}`}
                />
              </Link>
            </div>
          </li>
          );
        })}
      </ul>

      {selectedDraft && (
        <div
          className="fixed inset-0 z-10 grid place-items-center bg-black/55 p-4"
          role="presentation"
          onMouseDown={() => setSelectedDraft(null)}
        >
          <section
            className="w-full max-w-[30rem] border-2 border-current bg-[Canvas] p-6 text-[CanvasText] shadow-[8px_8px_0_rgba(0,0,0,0.3)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="draft-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h2 id="draft-modal-title" className="mt-0">Uh-uh-uh!</h2>
            <p>You are attempting to read a draft, which would be unpolished.</p>
            <p>Are you sure you want to read it?</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="cursor-pointer border border-current bg-[CanvasText] px-3 py-2 no-underline text-[Canvas]" href={selectedDraftUrl}>Yes, take me to the draft</a>
              <button className="cursor-pointer rounded-none border border-current bg-transparent px-3 py-2 font-inherit text-inherit" type="button" onClick={() => setSelectedDraft(null)}>
                No, take me back
              </button>
            </div>
          </section>
        </div>
      )}
    </BlogLayout>
  );
}

export default memo(BlogListing);
