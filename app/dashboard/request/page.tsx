"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./component/data-table";
import { getRequests } from "@/lib/api/adminRequests.service";

const Request = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [status, setStatus] = useState<"approved" | "rejected" | "in-review">(
    "in-review",
  );
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchRequests = async (page = 1, limit?: number, status="in-review") => {
    setLoading(true);
    try {
      const res = await getRequests({
        ...filters,
        page,
        profileStatus: status,
        limit: limit || pagination.itemsPerPage, // use limit if passed
      });
      setRequests(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRequests(1); // fetch first page on filter change
  }, [filters]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Request</h1>
      <DataTable
        users={requests}
        loading={loading}
        onStatusChange={setStatus}
        // Pass limit dynamically
        setPagination={setPagination}
        pagination={pagination}
        onPageChange={(page: number, limit?: number) =>
          fetchRequests(page, limit, status)
        }
      />
    </div>
  );
};

export default Request;
