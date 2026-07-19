import BlogRoute from "../../[year]";
import {
  getBlogPost,
  getBlogPostSummaries,
  IBlogPost,
} from "../../../../utils/blog";
import { getBlogDateParts } from "../../../../utils/blogDate";

export async function getStaticPaths() {
  return {
    paths: getBlogPostSummaries().flatMap((post) => {
      const dateParts = getBlogDateParts(post.date);
      return dateParts
        ? [{ params: { ...dateParts, slug: post.slug } }]
        : [];
    }),
    fallback: false,
  };
}

export async function getStaticProps(context: {
  params: { year: string; month: string; slug: string };
}) {
  const { year, month, slug } = context.params;
  const postSummary = getBlogPostSummaries(true).find((candidate) => {
    const dateParts = getBlogDateParts(candidate.date);
    return (
      candidate.slug === slug &&
      dateParts?.year === year &&
      dateParts.month === month
    );
  });

  if (!postSummary) return { notFound: true };
  const post = getBlogPost(postSummary.fileName);
  if (!post) return { notFound: true };
  const tagCounts = getBlogPostSummaries().reduce<Record<string, number>>(
    (counts, candidate) => {
      ((candidate.keywords || []) as string[]).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
      return counts;
    },
    {}
  );

  return { props: { post, tagCounts } };
}

interface BlogPostPageProps {
  post: IBlogPost;
  tagCounts: Record<string, number>;
}

export default function BlogPostPage({ post, tagCounts }: BlogPostPageProps) {
  return <BlogRoute post={post} tagCounts={tagCounts} />;
}
