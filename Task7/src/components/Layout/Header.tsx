import { NavLink } from "react-router-dom";
export const Header = () => {
  return (
    <div className=" bg-slate-900 text-slate-100">
      <div className="p-4 items-center justify-center flex">
        <h1 className="text-4xl bold px-3">Task7</h1>
      </div>
      <nav className="px-4 m-4 items-center justify-around flex bg-blue-200 text-black rounded-lg">
        <NavLink to="/" className="px-2 m-2 text-xl sm:text-lg">
          Home
        </NavLink>
        <NavLink to="/form1" className="px-2 m-2 text-xl sm:text-lg">
          Form1
        </NavLink>
        <NavLink to="/form2" className="px-2 m-2 text-xl sm:text-lg">
          Form2
        </NavLink>
        <NavLink to="/profile" className="px-2 m-2 text-xl sm:text-lg">
          Profile
        </NavLink>
      </nav>
    </div>
  );
};
