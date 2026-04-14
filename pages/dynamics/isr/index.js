import PageComponent from "@/components/PageComponent";

export default function ISRPage({ posts }) {
  return (
    <>
      <h1>ISR</h1>
      {posts.map((post) => (
        <PageComponent key={post.id} posts={post} link="/dynamics/isr" />
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
    revalidate: 60,
  };
}
