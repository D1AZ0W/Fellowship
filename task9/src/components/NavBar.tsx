import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export const NavBar = () => {
  return (
    <nav className="bg-sidebar-primary-foreground text-white px-4 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 ">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="h-15 w-auto" />
        </Link>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
          >
            <Button variant="link">Home</Button>
          </Link>

          <Link
            to="/products"
            activeOptions={{ exact: true }}
            className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
          >
            <Button variant="link">Products</Button>
          </Link>

          <Link
            to="/login"
            activeOptions={{ exact: true }}
            className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
          >
            <Button variant="link">Login</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
