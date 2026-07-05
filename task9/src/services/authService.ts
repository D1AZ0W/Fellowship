import type { User } from "#/types/userType";
import { api } from "./api";

type LoginRequest = Pick<User, "username" | "password">;

type LoginResponse = {
  token: string;
};

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", credentials);
  return res.data;
};

export const register = async (registerField: User): Promise<LoginResponse> => {
  const res = await api.post("/users", registerField);
  return res.data;
};
