import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageIDComponent from "@/components/PageIDComponent";

export default function CsrIdPage() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
          {
            signal: controller.signal,
          },
        );

        if (!res.ok) throw new Error(res.statusText);
        setData(await res.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    return () => controller.abort();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>CSR - {id}</h1>
      <PageIDComponent posts={data} />
    </>
  );
}
