"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return !newErrors.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle password reset logic here
      console.log("Password reset requested for", formData.email);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-4">
        <Card variant="elevated" className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
                <span className="text-4xl">✓</span>
              </div>
            </div>
            <Heading level="h1" size="xl">
              Check Your Email
            </Heading>
            <p className="text-muted-foreground">
              We've sent a password reset link to{" "}
              <span className="font-medium text-foreground">{formData.email}</span>
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                The link will expire in 24 hours. If you don't receive the email, please check your spam folder.
              </p>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Try Another Email
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 text-center">
            <Link
              href="/auth/login"
              className="text-brand hover:underline font-medium"
            >
              ← Back to Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-4">
      <Card variant="elevated" className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand">
              <span className="text-brand-foreground font-bold text-2xl">L</span>
            </div>
          </div>
          <Heading level="h1" size="xl">
            Forgot Password?
          </Heading>
          <p className="text-muted-foreground">
            No worries, we'll send you reset instructions
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Email"
              error={errors.email}
              required
            >
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!errors.email}
              />
            </FormField>

            <Button type="submit" variant="brand" size="lg" className="w-full">
              Send Reset Link
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center">
          <Link
            href="/auth/login"
            className="text-brand hover:underline font-medium"
          >
            ← Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
