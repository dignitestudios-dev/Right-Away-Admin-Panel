"use client";

import { useState } from "react";
import { CSVLink } from "react-csv";
import initialReportData from "./data.json";
import { Button } from "@/components/ui/button";

import { ReportsTable } from "./component/data-table";
import { ReportDetailModal } from "./component/reportdetailmodal";
import { StatCards } from "./component/stat-cards";

export default function ReportsPage() {
  const [report, setReport] = useState(initialReportData);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  // Export CSV
  const headers = [
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Type", key: "type" },
    { label: "Status", key: "status" },
    { label: "Created At", key: "createdAt" },
  ];

  return (
    <div className="flex flex-col gap-4 px-4 mt-2">

        <h1 className="text-2xl font-bold p">Report</h1>
      <div className="card">
        <StatCards />
      </div>

      <ReportsTable report={report} onViewReport={handleViewReport} />

      <ReportDetailModal report={selectedReport} open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
