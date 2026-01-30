"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  createNotification,
  getAdminNotifications,
} from "@/lib/api/notifications";
import { NotificationsTable } from "./component/data-table";
import { CreateNotificationModal } from "./component/create-notification";
import NotificationDetailModal from "./detail/page";

interface Notification {
  id: number;
  title: string;
  description: string;
  type: string;
  status: "Read" | "Unread";
  createdAt: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationView, setNotificationView] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification>();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "Read" | "Unread">(
    "all",
  );

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await getAdminNotifications({
        page: currentPage,
        limit: pageSize,
        status: statusFilter,
      });
      setNotifications(res.notifications);
      setTotalPages(res.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentPage, pageSize, statusFilter]);

  const handleCreateNotification = async (formData: any) => {
    try {
      await createNotification({ ...formData, role: "company" });
      fetchNotifications(); // refresh table
    } catch (err) {
      console.error("Error creating notification:", err);
    }
  };

  const handleViewNotification = (notif: Notification) => {
    setNotificationView(true);
    setSelectedNotification(notif);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Notifications</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          Create Notification
        </Button>
      </div>

      <NotificationsTable
        notifications={notifications}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onViewNotification={handleViewNotification}
      />

      <CreateNotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateNotification}
      />

      <NotificationDetailModal
        notification={selectedNotification}
        isOpen={notificationView}
        onClose={() => setNotificationView(false)}
      />
    </div>
  );
}
