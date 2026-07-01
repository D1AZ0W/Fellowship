import { useParams } from "react-router-dom";
import { fetchIndv, type User, type Post, searchPosts } from "../data/data";
import { useEffect, useState } from "react";
import { GoBack } from "../components/GoBackButton";
import { PostCard } from "../components/PostCard";
import { PostsSkeleton } from "../components/UI/LoadingSkeleton";

export const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    const getIndvUser = async () => {
      try {
        if (!id) return;
        const dataUser = await fetchIndv(Number(id));
        const dataPost = await searchPosts("", Number(id));
        setUser(dataUser);
        setPosts(dataPost);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getIndvUser();
  }, [id]);
  if (error) {
    return (
      <div className="p-6 text-sm text-red-600">
        Couldn't load user info. Try again later.
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <GoBack />
      {loading && (
        <div className="flex flex-col">
          <h1 className="py-3 ">User Details</h1>
          <div className="mx-10 mt-5 flex flex-col justify-center rounded-xl shadow-2xl p-5 max-w-full">
            <div className="flex items-center gap-2 justify-center font-bold text-2xl">
              <label>ID:</label>
              <div>______</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 p-10 gap-5">
              <div className="flex gap-2">
                <label>Name:</label>
                <div>______</div>
              </div>
              <div className="flex gap-2 ">
                <label>Username:</label>
                <div>______</div>
              </div>
              <div className="flex gap-2">
                <label>Email:</label>
                <div>______</div>
              </div>
              <div className="flex gap-2">
                <label>Phone:</label>
                <div>______</div>
              </div>
              <div className="flex gap-2">
                <label>Website:</label>
                <div>______</div>
              </div>
              <div className="flex gap-2 ">
                <label>Company:</label>
                <div>______</div>
              </div>
            </div>
          </div>
          <h2 className="flex justify-center mt-10">
            Posts by User {user?.id}:
          </h2>
          <PostsSkeleton />
        </div>
      )}
      <h1 className="py-3">User Details</h1>
      <h2 className="flex justify-center text-blue-950">
        Welcome to {user?.name}'s page
      </h2>
      <div className="mx-10 mt-5 flex flex-col justify-center rounded-xl shadow-2xl p-5 max-w-full">
        <div className="flex items-center gap-2 justify-center font-bold text-2xl">
          <label>ID:</label>
          <div>{user?.id}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 p-10 gap-5">
          <div className="flex gap-2">
            <label>Name:</label>
            <div>{user?.name}</div>
          </div>
          <div className="flex gap-2 ">
            <label>Username:</label>
            <div>{user?.username}</div>
          </div>
          <div className="flex gap-2">
            <label>Email:</label>
            <div>{user?.email}</div>
          </div>
          <div className="flex gap-2">
            <label>Phone:</label>
            <div>{user?.phone}</div>
          </div>
          <div className="flex gap-2">
            <label>Website:</label>
            <div>{user?.website}</div>
          </div>
          <div className="flex gap-2 ">
            <label>Company:</label>
            <div>{user?.company.name}</div>
          </div>
        </div>
      </div>
      <h2 className="flex justify-center mt-10">Posts by User {user?.id}:</h2>
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
