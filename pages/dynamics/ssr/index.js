import PageComponent from "@/components/PageComponent";

export default function SSRPage({ posts }) {
  return (
    <>
      <h1>SSR</h1>
      {posts.map((post) => (
        <PageComponent key={post.id} posts={post} link="/dynamics/ssr" />
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?_limit=10`);
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
