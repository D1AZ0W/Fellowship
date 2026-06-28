import type { Post } from "../data/data";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <header className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
        <div>
          <h3 className="text-sm font-semibold text-black">Post #{post.id}</h3>
          <p className="text-xs text-gray-500">User {post.userId}</p>
        </div>
      </header>

      <div className="flex flex-1 flex-col">
        <h4 className="line-clamp-2 text-sm font-semibold capitalize text-gray-900">
          {post.title}
        </h4>

        <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">
          {post.body}
        </p>
      </div>
    </div>
  );
};
