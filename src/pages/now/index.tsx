import NowPost from "../../components/NowPost";
import { getBlogPostSummaries, getNowPosts } from "../../utils/blog";
import { getGalleryManifest } from "../../utils/gallery-server";

export async function getStaticProps() {
  const nowPosts = getNowPosts();
  const [latestPost] = nowPosts;

  return {
    props: {
      post: latestPost || null,
      nowPosts,
      nowPostCount: nowPosts.length,
      photoCount: getGalleryManifest().images.length,
      blogPostCount: getBlogPostSummaries().length,
    },
  };
}

export default NowPost;
