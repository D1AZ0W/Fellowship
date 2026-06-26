import { useNavigate } from "react-router-dom";
import { getUser, hasUser, type User, removeUser } from "../data/data";
export const Profile = () => {
  const navigate = useNavigate();
  if (hasUser()) {
    const user: User | null = getUser();
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="bg-slate-500 shadow-lg rounded-3xl p-8 max-w-md w-full">
          <h2>User Profile</h2>

          <div className="space-y-4 text-black mt-3">
            <div>
              <p className="formlabel">Username</p>
              <p className="font-semibold">{user?.username}</p>
            </div>

            <div>
              <p className="formlabel">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>

            <div>
              <p className="formlabel">Address</p>
              <p className="font-semibold">{user?.address}</p>
            </div>

            <div>
              <p className="formlabel">Phone Number</p>
              <p className="font-semibold">{user?.phone}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-900"
            >
              Home
            </button>

            <button
              onClick={() => {
                removeUser();
                navigate("/form1");
              }}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="bg-slate-600 rounded-3xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="font-bold mb-4 text-red-400">Not Registered</h2>

          <p className="text-white mb-6">Please register to see this page.</p>

          <button
            onClick={() => navigate("/form1")}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
          >
            Go to Register
          </button>
        </div>
      </div>
    );
  }
};
