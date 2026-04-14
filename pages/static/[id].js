import PageIDComponent from "@/components/PageIDComponent";
import { useRouter } from "next/router";

export default function StaticIdPage({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!post || !post.id) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <h1>Static - {post.id}</h1>
      <PageIDComponent posts={post} />
    </>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();

    const paths = posts.slice(0, 10).map((post) => ({
      params: { id: post.id.toString() },
    }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Failed to fetch posts for paths:", error);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`,
  );

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const post = await res.json();

  if (!post || !post.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}
