import NowPost from "../../components/NowPost";
import { getBlogPost, getNowPostSummaries } from "../../utils/blog";

export async function getStaticProps() {
  const [latestPost, previousPost] = getNowPostSummaries();

  return {
    props: {
      post: latestPost ? getBlogPost(latestPost.fileName) : null,
      previousPost: previousPost ? getBlogPost(previousPost.fileName) : null,
    },
  };
}

export default NowPost;
