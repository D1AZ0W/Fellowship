import { GoBack } from "../components/GoBackButton";
import { UsersSkeleton } from "../components/UI/LoadingSkeleton";
import { type User, fetchUsers } from "../data/data";
import { useState, useEffect } from "react";
import { UserCard } from "../components/UserCard";
export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchUsers()
      .then((data) => {
        if (mounted) setUsers(data);
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
        Couldn't load users. Try again later.
      </div>
    );
  }
  return (
    <div>
      <GoBack />
      <h1 className="py-3">Users</h1>
      {loading && <UsersSkeleton />}
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-4">
        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};
