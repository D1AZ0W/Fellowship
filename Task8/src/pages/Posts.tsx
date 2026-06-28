import { GoBack } from "../components/GoBackButton";
import { PostsSkeleton } from "../components/UI/LoadingSkeleton";
import { PostCard } from "../components/PostCard";
import type { Post } from "../data/data";
import { fetchAllPosts, fetchPosts } from "../data/data";
import { useState, useEffect } from "react";
export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchPosts()
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
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchAllPosts()
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
  }, []);
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
    </div>
  );
};
