"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./component/data-table";
import { API } from "@/lib/api/axios";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refech, SetRefech] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });

  const fetchReports = async (
    page = pagination.currentPage,
    limit = pagination.itemsPerPage,
  ) => {
    try {
      setLoading(true);

      const res = await API.get("/admin/reports", {
        params: {
          page,
          limit,
        },
      });

      setReports(res.data?.data || []);

      if (res.data?.pagination) {
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [refech, pagination.currentPage, pagination.itemsPerPage]);

  return (
    <div>
      <h1 className="text-2xl font-bold py-4">Reports</h1>

      <DataTable
        reports={reports as any}
        loading={loading}
        pagination={pagination}
        onPageChange={(page) =>
          setPagination((p) => ({ ...p, currentPage: page }))
        }
        onPageSizeChange={(size) =>
          setPagination((p) => ({
            ...p,
            itemsPerPage: size,
            currentPage: 1,
          }))
        }
        SetRefech={SetRefech}
      />
    </div>
  );
};

export default ReportsPage;
