import NowPost from "../../components/NowPost";
import { getBlogPost, getBlogPostSummaries, getNowPostSummaries } from "../../utils/blog";
import { getGalleryManifest } from "../../utils/gallery-server";

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
  if (!post) return { notFound: true };

  return {
    props: {
      post,
      nowPostCount: posts.length,
      photoCount: getGalleryManifest().images.length,
      blogPostCount: getBlogPostSummaries().length,
    },
  };
}

export default NowPost;
