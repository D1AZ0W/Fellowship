import { createContext } from "react";

type ContextType = {
  token: string | null;
  isAuth: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext(null);
