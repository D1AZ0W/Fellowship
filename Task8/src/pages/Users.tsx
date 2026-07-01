import { GoBack } from "../components/GoBackButton";
import { UsersSkeleton } from "../components/UI/LoadingSkeleton";
import { type User, fetchUsers } from "../data/data";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserCard } from "../components/UserCard";
export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
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
          <Link to={`/users/${user.id}`}>
            <UserCard user={user} key={user.id} />
          </Link>
        ))}
      </div>
    </div>
  );
};
