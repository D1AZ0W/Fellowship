import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export const NavBar = () => {
  return (
    <div>
      <nav className="items-center justify-center flex bg-sidebar-primary-foreground text-white space-x-5 py-5">
        <img
          src="public/logo.svg"
          className="w-30 h-30 flex absolute left-3"
        ></img>
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
        >
          <Button variant="link" className="bg-sidebar-primary-foreground">
            Home
          </Button>
        </Link>
        <Link
          to="/products"
          activeOptions={{ exact: true }}
          className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
        >
          <Button variant="link" className="bg-sidebar-primary-foreground">
            Products
          </Button>
        </Link>
        <Link
          to="/login"
          activeOptions={{ exact: true }}
          className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
        >
          <Button variant="link" className="bg-sidebar-primary-foreground">
            Login
          </Button>
        </Link>
      </nav>
    </div>
  );
};
