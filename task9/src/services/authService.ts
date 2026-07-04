import type { User } from "#/types/user";
import { api } from "./api";

type LoginRequest = Pick<User, "username" | "password">;

type LoginResponse = {
  token: string;
};

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};
