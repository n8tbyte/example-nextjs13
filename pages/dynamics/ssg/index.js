import PageComponent from "@/components/PageComponent";

export default function SSGPage({ posts }) {
  return (
    <>
      <h1>SSG</h1>
      {posts.map((post) => (
        <PageComponent key={post.id} posts={post} link="/dynamics/ssg" />
      ))}
    </>
  );
}

export async function getStaticProps() {
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
