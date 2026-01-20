"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";


export function ReportDetailModal({ report, open, onClose }) {
  if (!report) return null;

  const statusColor = {
    Pending: "bg-orange-50 text-orange-600",
    Completed: "bg-green-50 text-green-600",
    Failed: "bg-red-50 text-red-600",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{report.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <p>{report.description}</p>
          <p>
            Type: <strong>{report.type}</strong>
          </p>
          <p>
            Status: <Badge className={statusColor[report.status]}>{report.status}</Badge>
          </p>
          <p>
            Created At: <strong>{report.createdAt}</strong>
          </p>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
