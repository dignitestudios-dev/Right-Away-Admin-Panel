"use client";

import { useState } from "react";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<void>;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onSubmit,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!currentPassword)
      newErrors.currentPassword = "Current password is required";

    if (!newPassword)
      newErrors.newPassword = "New password is required";
    else if (newPassword.length < 8)
      newErrors.newPassword = "Password must be at least 8 characters";

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== newPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await onSubmit?.({ currentPassword, newPassword, confirmPassword });

      // Reset form after success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-[561px] rounded-3xl bg-white p-10 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute right-6 top-6 text-[#181818] hover:opacity-70 disabled:opacity-40"
        >
          <X size={24} />
        </button>

        <div className="mx-auto flex w-[360px] flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#181818] capitalize">
              Change Password
            </h2>
            <p className="text-[16px] leading-[19px] text-[#565656]">
              You must enter current password in order to update password.
            </p>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-6">
            <PasswordInput
              label="Current Password"
              placeholder="Enter password here"
              value={currentPassword}
              onChange={setCurrentPassword}
              error={errors.currentPassword}
            />

            <PasswordInput
              label="New Password"
              placeholder="Enter new password here"
              value={newPassword}
              onChange={setNewPassword}
              error={errors.newPassword}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Re enter password here"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={errors.confirmPassword}
            />

            {/* Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex h-[44px] w-full items-center justify-center gap-2 rounded-[15px] bg-gradient-to-r from-[#03958A] to-[#22B573] text-[13px] font-bold capitalize text-white transition hover:opacity-90 disabled:opacity-70"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= */
/* Reusable Password Input   */
/* ========================= */

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  error,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-medium capitalize text-[#181818]">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-[40px] w-full rounded-[15px] border px-3 text-[12px] outline-none transition
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-[#BEBEBE] focus:border-[#03958A]"
          }`}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#181818]/60"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <p className="text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}