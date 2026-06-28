import { NavLink } from "react-router-dom";
export const Header = () => {
  return (
    <div>
      <nav className="items-center justify-center flex bg-blue-950 text-white space-x-5">
        <NavLink to="/" className="navLink">
          Home
        </NavLink>
        <NavLink to="/users" className="navLink">
          Users
        </NavLink>
        <NavLink to="/posts" className="navLink">
          Posts
        </NavLink>
      </nav>
    </div>
  );
};
