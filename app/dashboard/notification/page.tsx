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
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await getAdminNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleCreateNotification = async (formData: any) => {
    try {
      await createNotification({ ...formData, role: "company" }); // assuming admin creates for "company"
      fetchNotifications(); // refresh table
    } catch (err) {
      console.error("Error creating notification:", err);
    }
  };

  const handleCloseModal = () => {
    setNotificationView(false);
  };

  const handleViewNotification = (notif: Notification) => {
    setNotificationView(true);
    setSelectedNotification(notif);
    // Optional: call API to mark as "Read" here
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Notifications</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          Create Notification
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <NotificationsTable
          notifications={notifications}
          onViewNotification={handleViewNotification}
        />
      )}

      <CreateNotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateNotification}
      />
      <NotificationDetailModal
        notification={selectedNotification}
        isOpen={notificationView}
        onClose={handleCloseModal}
      />
    </div>
  );
}
