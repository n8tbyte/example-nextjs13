import PageIDComponent from "@/components/PageIDComponent";

export default function SSRIdPage({ post }) {
  return (
    <>
      <h1>SSR - {post.id}</h1>
      <PageIDComponent posts={post} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`,
  );
  if (!res.ok) {
    return { notFound: true };
  }
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}
