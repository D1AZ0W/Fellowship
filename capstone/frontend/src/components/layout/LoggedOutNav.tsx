import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

export const LoggedOutNav = () => {
  const activeClass =
    '[&.active>button]:bg-primary-foreground [&.active>button]:text-primary'

  return (
    <nav className="bg-sidebar-primary text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          <img src="/logo512.png" alt="Logo" className="h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/" activeOptions={{ exact: true }} className={activeClass}>
            <Button variant="ghost">Home</Button>
          </Link>

          <Link
            to="/login"
            activeOptions={{ exact: true }}
            className={activeClass}
          >
            <Button variant="ghost">Login</Button>
          </Link>

          <Link
            to="/register"
            activeOptions={{ exact: true }}
            className={activeClass}
          >
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
