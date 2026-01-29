"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { resendOTP } from "@/lib/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>(); // ✅ Use typed dispatch
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the forgot password function
    handleForgotPassword();
  };

  const handleForgotPassword = async () => {
    try {
      await dispatch(resendOTP({ email, role: "admin" })).unwrap();
      router.push(`/auth/verification?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      console.error("Failed to resend OTP:", err);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-600">
          Enter your email address and we'll send you an OTP to reset your
          password
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-sm text-primary hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
