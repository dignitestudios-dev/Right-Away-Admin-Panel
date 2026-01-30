"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";
import { exportRevenueCSV } from "@/lib/api/adminRevenue.service";
import { SkeletonRow } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";

interface Props {
  report: any[];
  onViewReport: (report: any) => void;
  setFilters: (filters: any) => void;
  loading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
  setPagination;
  onPageChange: (page: number, limit?: number) => void;
}

export function ReportsTable({
  report,
  onViewReport,
  setFilters,
  loading,
  pagination,
  onPageChange,
  setPagination,
}: Props) {
  const [reportType, setReportType] = useState("daily");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [pageSize, setPageSize] = useState(pagination.itemsPerPage);

  // Update filters when report type or date changes
  useEffect(() => {
    const newFilters: any = { type: reportType };
    if (dateRange.start && dateRange.end) {
      newFilters.startDate = dateRange.start;
      newFilters.endDate = dateRange.end;
    }
    setFilters(newFilters);
  }, [reportType, dateRange.start, dateRange.end]);

  const onPageSizeChange = (size: number) => {
    setPageSize(size);
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: size,
      currentPage: 1,
    }));
    onPageChange(1, size); // ✅ pass size dynamically
  };

  // Export CSV
  const onExport = () => {
    exportRevenueCSV({
      type: reportType,
      startDate: dateRange.start,
      endDate: dateRange.end,
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger>
            <SelectValue placeholder="Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
        />
        <Input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />

        <Button onClick={() => setFilters({})}>Reset Filters</Button>
        <Button onClick={onExport}>
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Revenue (USD)</TableHead>
              <TableHead>Orders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
            ) : report.length ? (
              report.map((row) => (
                <TableRow key={row._id} className="hover:bg-gray-50">
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.orderId}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center h-24">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        {/* Page size selector */}
        <div className="flex items-center space-x-2">
          <Label htmlFor="page-size" className="text-sm font-medium">
            Show
          </Label>
          <Select
            value={pageSize.toString()}
            onValueChange={(v) => onPageSizeChange(Number(v))}
          >
            <SelectTrigger id="page-size" className="w-20 cursor-pointer">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pagination buttons */}
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPrevious={() => onPageChange(pagination.currentPage - 1, pageSize)}
          onNext={() => onPageChange(pagination.currentPage + 1, pageSize)}
        />
      </div>
    </div>
  );
}
