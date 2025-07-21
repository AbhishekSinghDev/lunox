"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Github, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SignupSchema } from "@/lib/zod";
import { authClient } from "@/server/auth/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUpForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Very Weak", color: "bg-red-500" },
      { strength: 2, label: "Weak", color: "bg-orange-500" },
      { strength: 3, label: "Fair", color: "bg-yellow-500" },
      { strength: 4, label: "Good", color: "bg-green-500" },
      { strength: 5, label: "Strong", color: "bg-green-600" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    setIsSubmitting(true);
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.username,
        image: "",
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          router.push("/");
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          toast.error(ctx.error.message || "Failed to create account");
        },
      },
    );
  };

  const handleGoogleSignUp = async () => {
    // Add your Google OAuth logic here
    console.log("Google sign-up clicked");
  };

  const handleGithubSignUp = async () => {
    // Add your GitHub OAuth logic here
    console.log("GitHub sign-up clicked");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                        <Input
                          placeholder="Enter your username"
                          className={cn(
                            "pl-10",
                            form.formState.errors.username &&
                              "border-destructive focus-visible:ring-destructive",
                          )}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className={cn(
                            "pl-10",
                            form.formState.errors.email &&
                              "border-destructive focus-visible:ring-destructive",
                          )}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className={cn(
                            "pr-10 pl-10",
                            form.formState.errors.password &&
                              "border-destructive focus-visible:ring-destructive",
                          )}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    {password && (
                      <div className="mt-2">
                        <div className="mb-1 flex items-center gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={cn(
                                  "h-1 w-6 rounded-full transition-colors",
                                  level <= (passwordStrength?.strength ?? 0)
                                    ? passwordStrength?.color
                                    : "bg-muted",
                                )}
                              />
                            ))}
                          </div>
                          <span
                            className={cn(
                              "text-xs transition-colors",
                              (passwordStrength?.strength ?? 0) >= 4
                                ? "text-green-600"
                                : "text-muted-foreground",
                            )}
                          >
                            {passwordStrength?.label}
                          </span>
                        </div>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className={cn(
                            "pr-10 pl-10",
                            form.formState.errors.confirmPassword &&
                              "border-destructive focus-visible:ring-destructive",
                          )}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={cn(
                  "w-full",
                  isSubmitting && "cursor-not-allowed opacity-50",
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="border-primary-foreground h-4 w-4 animate-spin rounded-full border-b-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="border-border w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card text-muted-foreground px-2">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={handleGithubSignUp}
                className="w-full"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
