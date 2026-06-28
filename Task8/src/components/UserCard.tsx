import type { User } from "../../data/data";

type UserCardProps = {
  user: User;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <header className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-black">{user.name}</h3>
          <p className="text-xs text-gray-500">@{user.username}</p>
        </div>
      </header>

      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="text-gray-500">ID</dt>
          <dd className="text-right text-black">{user.id}</dd>
        </div>

        <div className="flex justify-between gap-2">
          <dt className="text-gray-500">Email</dt>
          <dd className="text-right text-black">{user.email}</dd>
        </div>

        <div className="flex justify-between gap-2">
          <dt className="text-gray-500">Phone</dt>
          <dd className="text-right text-black">{user.phone}</dd>
        </div>

        <div className="flex justify-between gap-2">
          <dt className="text-gray-500">Website</dt>
          <dd className="text-right text-black">
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {user.website}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
};
