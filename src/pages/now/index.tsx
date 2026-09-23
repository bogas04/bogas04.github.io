import NowPost from "../../components/NowPost";
import { getBlogPost, getBlogPostSummaries, getNowPostSummaries } from "../../utils/blog";
import { getGalleryManifest } from "../../utils/gallery-server";

export async function getStaticProps() {
  const nowPosts = getNowPostSummaries();
  const [latestPost, previousPost] = nowPosts;

  return {
    props: {
      post: latestPost ? getBlogPost(latestPost.fileName) : null,
      previousPost: previousPost ? getBlogPost(previousPost.fileName) : null,
      nowPostCount: nowPosts.length,
      photoCount: getGalleryManifest().images.length,
      blogPostCount: getBlogPostSummaries().length,
    },
  };
}

export default NowPost;
