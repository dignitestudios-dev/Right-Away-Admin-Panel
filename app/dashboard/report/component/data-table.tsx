"use client";

import { useEffect, useMemo, useState } from "react";
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
import { formatDate } from "@/lib/utils";
import { exportRevenueCSV } from "@/lib/api/adminRevenue.service";

interface Props {
  report: any[];
  onViewReport: (report: any) => void;
  setFilters: (filter: any) => void;
}

export function ReportsTable({ report, onViewReport, setFilters }: Props) {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [reportType, setReportType] = useState<string>("daily");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const pageSize = 5;

  const filteredReports = useMemo(() => {
    return status === "all"
      ? report
      : (report?.filter((r) => r.status === status) ?? []);
  }, [report, status]);

  const totalPages = Math.ceil(filteredReports.length / pageSize);

  const data = filteredReports.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => {
    const newFilters: any = {
      type: reportType,
    };

    // sirf tab add karo jab dono dates hon
    if (dateRange.start && dateRange.end) {
      newFilters.startDate = dateRange.start;
      newFilters.endDate = dateRange.end;
    }

    setFilters(newFilters);
  }, [reportType, dateRange.start, dateRange.end]);

  const onExport = () => {
    exportRevenueCSV({
      type: reportType,
      startDate: dateRange.start,
      endDate: dateRange.end,
    });
  };
  return (
    <div className="w-full space-y-4">
      {/* Filter */}
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
      <div className="rounded-md  border ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Revenue (USD)</TableHead>
              <TableHead>Orders</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length ? (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Join Date */}
                  <TableCell>
                    <span className="text-sm">{formatDate(row.createdAt)}</span>
                  </TableCell>

                  <TableCell className="">
                    {" "}
                    <p className="text-sm">{row.total}</p>{" "}
                  </TableCell>
                  <TableCell className=""> {row.orderId} </TableCell>
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
    </div>
  );
}
