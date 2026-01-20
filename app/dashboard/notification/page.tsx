"use client";

import { useState } from "react";
import initialNotificationData from "./data.json";
import { NotificationsTable } from "./component/data-table";
import { NotificationDetailModal } from "./detail/page";
import { CreateNotificationModal } from "./component/create-notification";
import { Button } from "@/components/ui/button";


interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  status: "Read" | "Unread";
  createdAt: string;
}

export default function NotificationsPage() {
       const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotificationData);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold py-3">Notification</h1>

<CreateNotificationModal
  open={open}
  onClose={() => setOpen(false)}
  onCreate={(data) => {
    console.log("New Notification:", data);
  }}
/>
<div className="flex items-end justify-end">

<Button  onClick={() => setOpen(true)}>
  Create Notification
</Button>
</div>

      <div className="@container/main px-4  mt-2 ">
        <NotificationsTable 
          notifications={notifications} 
          onViewNotification={handleViewNotification} 
        />
      </div>

      <NotificationDetailModal
        notification={selectedNotification}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
