import { register } from "#/services/authService";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { toast } from "react-toastify";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Sucessfully registered!!!");
      redirect({ to: "/login" });
    },
  });
};
