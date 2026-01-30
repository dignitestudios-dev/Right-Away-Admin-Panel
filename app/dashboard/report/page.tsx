"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { ReportsTable } from "./component/data-table";
import { ReportDetailModal } from "./component/reportdetailmodal";
import { StatCards } from "./component/stat-cards";
import { getRevenueReport } from "@/lib/api/adminRevenue.service";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [report, setReport] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchReports = async (page = 1, limit?: number) => {
    setLoading(true);
    try {
      const res = await getRevenueReport({
        ...filters,
        page,
        limit: limit || pagination.itemsPerPage, // use limit if passed
      });
      setReport(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(1); // fetch first page on filter change
  }, [filters]);

  const handleViewReport = (item: any) => {
    setSelectedReport(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className="flex flex-col gap-4 px-4 mt-2">
      <h1 className="text-2xl font-bold">Report</h1>
      <div className="card">
        <StatCards />
      </div>

      <ReportsTable
        loading={loading}
        report={report}
        pagination={pagination}
        setFilters={setFilters}
        onViewReport={handleViewReport}
        setPagination={setPagination}
        // Pass limit dynamically
        onPageChange={(page: number, limit?: number) =>
          fetchReports(page, limit)
        }
      />

      <ReportDetailModal
        report={selectedReport}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
