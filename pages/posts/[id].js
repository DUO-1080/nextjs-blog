import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import { Date } from "../../components/date";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {/* {postData.date} */}
      <Date dateString={postData.date} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
    </Layout>
  );
}

export async function getStaticPaths() {
  console.log("[id] page getStaticPaths: ");
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log("[id] page getStaticProps: ", params.id);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
