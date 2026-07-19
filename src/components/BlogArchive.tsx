import BlogListing from "../pages/blog";
import type { BlogBreadcrumbItem } from "../layout/blog";
import type { IBlogPostSummary } from "../utils/blog";
import type { ReactNode } from "react";

interface BlogArchiveProps {
  heading: ReactNode;
  posts: IBlogPostSummary[];
  breadcrumbs?: BlogBreadcrumbItem[];
}

export default function BlogArchive({ heading, posts, breadcrumbs }: BlogArchiveProps) {
  return <BlogListing heading={heading} posts={posts} breadcrumbs={breadcrumbs} />;
}
