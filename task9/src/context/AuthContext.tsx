import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

/*
This causes a problem where useAuth could be used by non children of AuthContext
const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
*/
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const login = (tokenR: string) => {
    setToken(tokenR);
    localStorage.setItem("token", tokenR);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
