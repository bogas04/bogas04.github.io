import { getBlogPostSummaries, IBlogPostSummary } from "../../../utils/blog";
import { getBlogDateParts } from "../../../utils/blogDate";
import BlogArchive from "../../../components/BlogArchive";

export async function getStaticPaths() {
  const paths = Array.from(
    new Set(
      getBlogPostSummaries().map((post) => {
        const dateParts = getBlogDateParts(post.date);
        return dateParts && `${dateParts.year}/${dateParts.month}`;
      })
    )
  ).map((path) => {
    const [year, month] = path.split("/");
    return { params: { year, month } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context: {
  params: { year: string; month: string };
}) {
  const { year, month } = context.params;
  const posts = getBlogPostSummaries().filter((post) => {
    const dateParts = getBlogDateParts(post.date);
    return dateParts?.year === year && dateParts.month === month;
  });
  const monthName = new Date(`${year}-${month}-01T00:00:00Z`).toLocaleString(
    "en-US",
    { month: "long", year: "numeric", timeZone: "UTC" }
  );

  return { props: { posts, monthName, year, month } };
}

interface MonthArchiveProps {
  posts: IBlogPostSummary[];
  monthName: string;
  year: string;
  month: string;
}

function MonthArchive({ posts, monthName, year, month }: MonthArchiveProps) {
  return (
    <BlogArchive
      heading={`Posts from ${monthName}`}
      posts={posts}
      breadcrumbs={[
        { href: "/", label: "Divjot Singh" },
        { href: "/blog", label: "Blog" },
        { href: `/blog/${year}`, label: year },
        { label: month },
      ]}
    />
  );
}

export default MonthArchive;
