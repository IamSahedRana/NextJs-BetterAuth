'use client';

import React, { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn, signUp } from "@/app/lib/auth-client";
import dashboard from "@/app/dashboard/page";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries()) as Record<string, string>;

      const { data: resData, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      console.log("Sign up response:", resData, error);

      if (error) {
        setErrorMessage(error.message || "Failed to sign up");
      } else {
        console.log("Sign up successful:", resData);
        callbackUrl: "/dashboard"// Redirect to dashboard after successful sign-up
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard", 
      });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to sign in with Google");
    }
  };

  const handleGitHubSignIn = async () => {
    setErrorMessage(null);
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/dashboard", 
      });
    } catch (err) {
      console.error("GitHub sign-in error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to sign in with GitHub");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      {errorMessage && (
        <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md w-96">
          {errorMessage}
        </div>
      )}

      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        {/* Name Field */}
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
          <FieldError />
        </TextField>

        {/* Email Field */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="Enter your email" />
          <FieldError />
        </TextField>

        {/* Password Field */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit" isLoading={loading}>
            Submit
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>

      <p className="my-2 text-sm text-gray-500">OR</p>

      <Button
        className="w-96"
        onClick={handleGoogleSignIn}
        variant="bordered"
      >
        Sign Up with Google
      </Button>

      <Button
        className="w-96"
        onClick={handleGitHubSignIn}
        variant="bordered"
      >
        Sign Up with GitHub
      </Button>
    </div>
  );
};

export default SignUpPage;