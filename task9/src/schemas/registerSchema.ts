import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, "Username must be at least 4 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password should be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (
      data.password.toLowerCase().includes(data.username.toLowerCase()) &&
      data.username.length > 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password cannot contain your username",
        path: ["password"],
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
