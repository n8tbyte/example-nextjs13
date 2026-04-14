import React, { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import PageComponent from "@/components/PageComponent";

export default function CsrPage() {
  const [data, setData] = useState([]);
  const [ref, inView] = useInView();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const fetchPosts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/posts?_page=${page}&_limit=10`;
      const response = await fetch(apiUrl, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPosts = await response.json();

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...newPosts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch posts:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      fetchPosts();
    }
  }, [inView, hasMore, isLoading, fetchPosts]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <>
      <h1>CSR</h1>
      {data.map((post) => (
        <PageComponent key={post.id} posts={post} link="/csr" />
      ))}
      {isLoading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Loading more posts...
        </div>
      )}
      {hasMore && !isLoading && <div ref={ref} style={{ height: "20px" }} />}
      {!hasMore && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          No more posts to load
        </div>
      )}
    </>
  );
}
