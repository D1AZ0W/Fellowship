import { login } from "#/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./useAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      auth.login(data.token);
      navigate({ to: "/products" });
    },
  });
};
