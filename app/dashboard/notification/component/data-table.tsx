"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge, Eye } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  status: "Read" | "Unread";
  createdAt: string;
}

interface NotificationsTableProps {
  notifications: Notification[];
  onViewNotification: (notification: Notification) => void;
}

export function NotificationsTable({ notifications, onViewNotification }: NotificationsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter notifications by status
  const filteredNotifications = notifications.filter((notif) => {
    if (statusFilter === "all") return true;
    return notif.status === statusFilter;
  });

  const totalPages = Math.ceil(filteredNotifications.length / pageSize);

  // Pagination
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getStatusColor = (status: string) =>
    status === "Unread" ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600";

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="status-filter" className="text-sm font-medium">Status</Label>
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
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
            {paginatedNotifications.length ? (
              paginatedNotifications.map((notif) => (
                <TableRow key={notif.id}>
                  <TableCell>{notif.title}</TableCell>
                  <TableCell>{notif.message}</TableCell>
                  <TableCell>
                    {notif.type}
                  </TableCell>
                  <TableCell>
  <span className={getStatusColor(notif.status)} >
    {notif.status}
  </span>
</TableCell>

                  <TableCell>{notif.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => onViewNotification(notif)}>
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
          <div className="flex items-center space-x-2">
          <Label htmlFor="page-size" className="text-sm font-medium">Show</Label>
          <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
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
        <div className="flex gap-4">
          <div className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage <= 1}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage >= totalPages}>
            Next
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
