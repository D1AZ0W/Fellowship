import { login } from "#/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate({ to: "/products" });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
