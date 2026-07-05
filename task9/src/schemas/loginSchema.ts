import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(4, "Username must be at least 4 characters"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
