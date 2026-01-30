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
export const formatMonthYear = (year: number, month: number) => {
  const date = new Date(year, month - 1, 1); // month is 0-based
  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
};


export const mapUsersForTable = (users: any[]) =>
  users?.map((u) => ({
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


export const getChartLabel = (
  item: any,
  type: "daily" | "weekly" | "monthly"
) => {
  // DAILY
  if (type === "daily" && item.date) {
    return new Date(item.date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
  }

  // WEEKLY
  if (type === "weekly" && item.startDate && item.endDate) {
    const start = new Date(item.startDate).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
    const end = new Date(item.endDate).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
    return `${start} - ${end}`;
  }

  // MONTHLY
  if (type === "monthly" && item.year && item.month) {
    const date = new Date(item.year, item.month - 1, 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  return "-";
};
