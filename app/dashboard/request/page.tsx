"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./component/data-table";
import { getRequests } from "@/lib/api/adminRequests.service";

const Request = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [status, setStatus] = useState<"approved" | "rejected" | "in-review">(
    "in-review",
  );

  useEffect(() => {
    getRequests({ profileStatus: status })
      .then(setRequests)
      .catch(console.error);
  }, [status]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Request</h1>
      <DataTable users={requests} onStatusChange={setStatus} />
    </div>
  );
};

export default Request;
