import NowPost from "../../components/NowPost";
import { getBlogPost, getNowPostSummaries } from "../../utils/blog";

export async function getStaticPaths() {
  return {
    paths: getNowPostSummaries().map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const posts = getNowPostSummaries();
  const currentIndex = posts.findIndex(
    (post) => post.slug === context.params.slug
  );

  if (currentIndex === -1) return { notFound: true };

  const post = getBlogPost(posts[currentIndex].fileName);
  const previousPost = posts[currentIndex + 1]
    ? getBlogPost(posts[currentIndex + 1].fileName)
    : null;

  if (!post) return { notFound: true };

  return { props: { post, previousPost } };
}

export default NowPost;
