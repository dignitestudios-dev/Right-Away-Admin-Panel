"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NotificationDetailModalProps {
  notification: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDetailModal({ notification, isOpen, onClose }: NotificationDetailModalProps) {
  if (!notification) return null;

  const statusColor = notification.status === "Unread" ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>{notification.title}</DialogTitle>
          <p className="text-sm text-muted-foreground">{notification.createdAt}</p>
        </DialogHeader>

        <div className="mt-4 space-y-3 ">
         <div className="space-x-4s">
             <Badge className={`font-semibold px-3 py-1 ${statusColor}`}>{notification.status}</Badge>
          <Badge className="bg-blue-50 text-blue-600 px-3 py-1">{notification.type}</Badge>
         </div>
        </div>
          <p className="text-gray-700">{notification.message}</p>

        <div className="mt-6 flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="default">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
