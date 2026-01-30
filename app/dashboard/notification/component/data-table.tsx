"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkeletonRow } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { Pagination } from "@/components/ui/pagination";

interface Notification {
  _id: number;
  title: string;
  description: string;
  type: string;
  status: "Read" | "Unread";
  createdAt: string;
}

interface NotificationsTableProps {
  notifications: Notification[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  statusFilter: "all" | "Read" | "Unread";
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onStatusFilterChange: (status: "all" | "Read" | "Unread") => void;
  onViewNotification: (notif: Notification) => void;
}

export function NotificationsTable({
  notifications,
  loading,
  currentPage,
  totalPages,
  pageSize,
  statusFilter,
  onPageChange,
  onPageSizeChange,
  onStatusFilterChange,
  onViewNotification,
}: NotificationsTableProps) {
  const getStatusColor = (status: string) =>
    status === "Unread"
      ? "bg-orange-50 text-orange-600"
      : "bg-green-50 text-green-600";
  console.log(totalPages, "table");
  return (
    <div className="w-full space-y-4">
      {/* Filters */}
      <div className="flex items-center space-x-2 mb-2">
        <Label htmlFor="status-filter" className="text-sm font-medium">
          Status
        </Label>
        <Select
          value={statusFilter}
          onValueChange={(v) => onStatusFilterChange(v as any)}
        >
          <SelectTrigger id="status-filter" className="w-40 cursor-pointer">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Read">Read</SelectItem>
            <SelectItem value="Unread">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <SkeletonRow index={i} key={i} />
              ))
            ) : notifications.length ? (
              notifications.map((notif) => (
                <TableRow key={notif._id}>
                  <TableCell>{notif.title}</TableCell>
                  <TableCell>{notif.description}</TableCell>
                  <TableCell>{notif.type}</TableCell>
                  <TableCell>
                    <span className={getStatusColor(notif.status)}>
                      {notif.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(notif.createdAt)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewNotification(notif)}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No notifications.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        {/* Page size */}
        <div className="flex items-center space-x-2">
          <Label htmlFor="page-size" className="text-sm font-medium">
            Show
          </Label>
          <Select
            value={pageSize.toString()}
            onValueChange={(v) => onPageSizeChange(Number(v))}
          >
            <SelectTrigger id="page-size" className="w-20 cursor-pointer">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => onPageChange(currentPage - 1)}
          onNext={() => onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
}
