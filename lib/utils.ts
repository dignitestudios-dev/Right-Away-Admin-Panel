import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// utils/chartTransform.ts
export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });


  export const mapUsersForTable = (users: any[]) =>
  users.map((u) => ({
    id: u._id,
    name: u.name || "N/A",
    email: u.email,
    phone: u.phone || "-",
    avatar: u.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase(),
    status: u.isBlocked ? "Blocked" : "Active",
    joinedDate: u.createdAt,
  }));
