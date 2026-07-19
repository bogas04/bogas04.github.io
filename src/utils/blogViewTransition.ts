let pendingPostSlug: string | null = null;

export const setPendingBlogPostTransition = (slug: string) => {
  pendingPostSlug = slug;
};

export const consumePendingBlogPostTransition = () => {
  const slug = pendingPostSlug;
  pendingPostSlug = null;
  return slug;
};
