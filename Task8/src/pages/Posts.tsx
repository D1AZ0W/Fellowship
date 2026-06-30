import { GoBack } from "../components/GoBackButton";
import { PostsSkeleton } from "../components/UI/LoadingSkeleton";
import { PostCard } from "../components/PostCard";
import type { Post } from "../data/data";
import {
  fetchPosts,
  deletePost,
  updatePost,
  searchPosts,
  createPost,
} from "../data/data";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CreatePost } from "../components/CreatePost";
import { Filters } from "../components/Filters";
import { Errors } from "../components/UI/Error";
import { PageHandle } from "../components/UI/PageHandle";
export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get("page") || 1),
  );

  useEffect(() => {
    let mounted = true;
    fetchPosts(pageNumber)
      .then((data) => {
        if (mounted) setPosts(data);
      })
      .catch(() => {
        if (mounted) setError("Error fetching data");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [pageNumber]);

  useEffect(() => {
    setSearchParams({ page: pageNumber.toString() });
  }, [pageNumber, setSearchParams]);

  function handlePage(next: boolean): void;
  function handlePage(page: number): void;

  function handlePage(value: boolean | number) {
    setLoading(true);
    if (typeof value === "boolean") {
      if (value) {
        setPageNumber((prev) => prev + 1);
      } else {
        setPageNumber((prev) => prev - 1);
      }
    } else {
      if (value >= 1 && value <= 13) {
        setPageNumber(value);
      }
    }
  }
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Delete this post?");
    if (!confirmDelete) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch {
      alert("Failed to delete post.");
    }
  };
  const handleUpdate = async (post: Post) => {
    const title = prompt("Title", post.title);
    if (!title) return;

    const body = prompt("Body", post.body);
    if (!body) return;
    try {
      const updatedPost = await updatePost({
        ...post,
        title,
        body,
      });
      setPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
      );
    } catch {
      alert("Failed to update post.");
    }
  };
  const handleSearch = async (query: string, userId?: number) => {
    setLoading(true);
    try {
      const filteredPosts = await searchPosts(query, userId);
      setPosts(filteredPosts);
      if (filteredPosts.length === 0) {
        setError("No such Data..");
      } else {
        setError("");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = async (formField: Omit<Post, "id">): Promise<void> => {
    const previousPosts = posts;

    const optimistic: Post = {
      id: 0,
      ...formField,
    };
    setPosts((prev) => [optimistic, ...prev.slice(0, 7)]);

    try {
      const createdPost = await createPost(formField);
      setPosts((prev) =>
        prev.map((post) => (post.id === 0 ? createdPost : post)),
      );
    } catch {
      setPosts(previousPosts);
      alert("Failed to create post.");
    }
  };
  return (
    <div>
      <GoBack />
      <h1 className="py-3">Posts</h1>
      <div className="space-x-3 ml-6 flex">
        <CreatePost handleCreate={handleCreate} />
        <Filters handleSearch={handleSearch} />
      </div>

      {loading && <PostsSkeleton />}
      {!loading && error && <Errors error={error} />}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </>
      )}
      <PageHandle pageNumber={pageNumber} handlePage={handlePage} />
    </div>
  );
};
