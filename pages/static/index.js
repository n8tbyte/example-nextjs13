import PageComponent from "@/components/PageComponent";

export default function StaticPage({ posts }) {
  return (
    <>
      <h1>Static</h1>
      {posts.map((post) => (
        <PageComponent key={post.id} posts={post} link="/static" />
      ))}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?_limit=20`);
  if (!res.ok) {
    return { notFound: true };
  }
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}
