import { login } from "#/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

export const useLogin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Successful Login!!!");
      auth.login(data.token);
      navigate({ to: "/products" });
    },
    onError: () => {
      toast.error("Error occured while logging in..");
    },
  });
};
