export function getBlogDate(date?: string): Date | null {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

export function getBlogDateParts(date?: string): {
  year: string;
  month: string;
} | null {
  const parsedDate = getBlogDate(date);
  if (!parsedDate) return null;

  return {
    year: String(parsedDate.getUTCFullYear()),
    month: String(parsedDate.getUTCMonth() + 1).padStart(2, "0"),
  };
}

export function getBlogPostPath(post: { date?: string; slug?: string }): string {
  const dateParts = getBlogDateParts(post.date);
  if (!dateParts) return `/blog/${post.slug || ""}`;

  return `/blog/${dateParts.year}/${dateParts.month}/${post.slug || ""}`;
}

export function getBlogMonthName(date?: string): string {
  const parsedDate = getBlogDate(date);
  if (!parsedDate) return "";

  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    timeZone: "UTC",
  }).format(parsedDate);
}

export function formatBlogDatePath(date?: string): string {
  const dateParts = getBlogDateParts(date);
  return dateParts ? `${dateParts.year} / ${dateParts.month}` : "Unknown date";
}

export function formatBlogDate(date?: string): string {
  const parsedDate = getBlogDate(date);
  if (!parsedDate) return "Unknown date";

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
}
