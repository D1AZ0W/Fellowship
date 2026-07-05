import type { User } from "#/types/user";
import type { RegisterFormData } from "#/schemas/registerSchema";
import { registerSchema } from "#/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { useRegister } from "#/hooks/useRegister";

export function RegisterCard() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      phone: "",
      street: "",
      city: "",
    },
  });

  const registerMutation = useRegister();

  const onSubmit = (data: RegisterFormData) => {
    const user: User = {
      id: 0,
      username: data.username,
      email: data.email,
      password: data.password,
      phone: data.phone,
      name: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      address: {
        street: data.street,
        city: data.city,
      },
    };

    registerMutation.mutate(user);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>

        <CardDescription>
          Fill in the details below to create an account.
        </CardDescription>

        <CardAction>
          <Button variant="link" onClick={() => navigate({ to: "/login" })}>
            Login
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              placeholder="First name"
              {...register("firstname")}
            />
            {errors.firstname && (
              <p className="text-sm text-red-500">{errors.firstname.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              placeholder="Last name"
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className="text-sm text-red-500">{errors.lastname.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Phone number"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="street">Street</Label>
            <Input id="street" placeholder="Street" {...register("street")} />
            {errors.street && (
              <p className="text-sm text-red-500">{errors.street.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" {...register("city")} />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending
              ? "Creating Account..."
              : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
