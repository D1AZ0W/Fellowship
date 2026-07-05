import { register } from "#/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log("Successful login");
      navigate({ to: "/login" });
    },
  });
};
