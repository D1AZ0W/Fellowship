import { useAuth } from '#/hooks/authHooks/useAuth'

export const Navbar = () => {
  const { isAuthenticated } = useAuth()

  return (
    <header>
      <img src="logo512.png" />
      {/* {isAuthenticated ? <LoggedInNav /> : <LoggedOutNav />} */}
    </header>
  )
}
