import { useAuth } from "#/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Logout } from "./Logout";

export const NavBar = () => {
  const auth = useAuth();

  return (
    <nav className="bg-sidebar-primary-foreground px-4 py-4 text-white">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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

          {!auth.isAuthenticated ? (
            <>
              <Link
                to="/login"
                activeOptions={{ exact: true }}
                className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
              >
                <Button variant="link">Login</Button>
              </Link>

              <Link
                to="/register"
                activeOptions={{ exact: true }}
                className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
              >
                <Button variant="link">Register</Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/cart"
                activeOptions={{ exact: true }}
                className="[&.active]:[&>button]:bg-primary [&.active]:[&>button]:text-primary-foreground"
              >
                <Button variant="link">Cart</Button>
              </Link>

              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
