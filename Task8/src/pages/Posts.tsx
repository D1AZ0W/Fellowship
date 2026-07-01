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
import { Filters } from "../components/Filters";
import { Errors } from "../components/UI/Error";
import { PageHandle } from "../components/UI/PageHandle";
import { FormModal } from "../components/UI/FormModal";

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get("page") || 1),
  );
  type Form = "create" | "edit" | null;
  const [view, setView] = useState<Form>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    const getPostData = async () => {
      try {
        const data = await fetchPosts(pageNumber);
        setPosts(data);
      } catch {
        setError("Error while fetching");
      } finally {
        setLoading(false);
      }
    };

    getPostData();
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
    const previousPosts = posts;

    const optimistic: Post = {
      ...post,
    };
    setPosts((prev) =>
      prev.map((p) => (p.id === optimistic.id ? optimistic : p)),
    );
    try {
      const updatedPost = await updatePost(post);

      setPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
      );
    } catch {
      setPosts(previousPosts);
      alert("Failed to update post.");
    }
  };

  const EditOpen = (post: Post) => {
    setView("edit");
    setEditingPost(post);
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

      setPosts((prev) => prev.map((p) => (p.id === 0 ? createdPost : p)));
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
        <button
          type="button"
          onClick={() => setView("create")}
          className="rounded-lg bg-blue-950 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          Create Post
        </button>
        <Filters handleSearch={handleSearch} />
      </div>

      {loading && <PostsSkeleton />}
      {!loading && error && <Errors error={error} />}
      {!loading && !error && (
        <>
          {view === "create" && (
            <FormModal
              key="create"
              mode="create"
              onCreate={handleCreate}
              onClose={() => setView(null)}
            />
          )}
          {view === "edit" && editingPost && (
            <FormModal
              key={editingPost.id}
              mode="edit"
              post={editingPost}
              onEdit={handleUpdate}
              onClose={() => {
                setView(null);
                setEditingPost(null);
              }}
            />
          )}
          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                onUpdate={EditOpen}
              />
            ))}
          </div>
        </>
      )}
      <PageHandle pageNumber={pageNumber} handlePage={handlePage} />
    </div>
  );
};
