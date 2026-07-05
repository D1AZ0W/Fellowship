import { register } from "#/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate({ to: "/products" });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
