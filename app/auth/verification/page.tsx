"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { verifyOTP, resendOTP } from "@/lib/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { toast } from "sonner";

const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);
  const { verifyOTPError } = useSelector((state: RootState) => state.auth);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // ⏳ Countdown Timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");

    if (otpCode.length !== 4) return;

    try {
      await dispatch(
        verifyOTP({
          email,
          otp: otpCode,
          role: "admin",
        }),
      ).unwrap();

      toast.success("OTP Verified Successfully");
      router.push("/auth/reset-password");
    } catch (err: any) {
      toast.error(err?.message || "Invalid OTP");
    }
  };

  // 🔁 Resend OTP Function
  const handleResendOTP = async () => {
    try {
      setResendLoading(true);

      await dispatch(resendOTP({ email, role: "admin" })).unwrap();

      toast.success("OTP Resent Successfully");
      setTimer(30); // restart timer
    } catch (err: any) {
      toast.error(err?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-600">
          We've sent a 4-digit code to your email address. Enter it below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none "
            />
          ))}
        </div>
          {verifyOTPError && (
            <p className="text-center text-red-500 mb-4">{verifyOTPError}</p>
          )}

        <Button type="submit" className="w-full" disabled={!isComplete}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        {/* 🔁 Resend Section */}
        <div className="text-center text-sm">
          {timer > 0 ? (
            <p className="text-gray-500">
              Resend OTP in <span className="font-semibold">{timer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendLoading}
              className="text-primary cursor-pointer font-medium hover:underline disabled:opacity-50"
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>

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

export default Verification;
