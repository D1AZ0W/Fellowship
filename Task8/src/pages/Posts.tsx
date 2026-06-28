import { GoBack } from "../components/GoBackButton";
import { PostsSkeleton } from "../components/UI/LoadingSkeleton";
import { PostCard } from "../components/PostCard";
import type { Post } from "../data/data";
import { fetchPosts } from "../data/data";
import { useState, useEffect } from "react";
export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    let mounted = true;
    fetchPosts(pageNumber)
      .then((data) => {
        if (mounted) setPosts(data);
      })
      .catch(() => {
        if (mounted) setError(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [pageNumber]);

  if (error) {
    return (
      <div className="p-6 text-sm text-red-600">
        Couldn't load posts. Try again later.
      </div>
    );
  }
  return (
    <div>
      <GoBack />
      <h1 className="py-3">Posts</h1>
      {loading && <PostsSkeleton />}
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="my-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber == 1 ? true : false}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <input
          type="number"
          min={1}
          max={13}
          value={pageNumber}
          onChange={(e) => setPageNumber(Number(e.target.value))}
          className="w-20 rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-semibold"
        />

        <button
          type="button"
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={pageNumber == 13 ? true : false}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
