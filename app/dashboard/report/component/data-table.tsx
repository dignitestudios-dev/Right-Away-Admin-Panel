"use client";

import { useMemo, useState } from "react";
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



import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Props {
  report: any[];
  onViewReport: (report: any) => void;
}

export function ReportsTable({ report, onViewReport }: Props) {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [reportType, setReportType] = useState("daily");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const pageSize = 5;

  const filteredReports = useMemo(() => {
   
return status === "all"
  ? report
  : report?.filter((r) => r.status === status) ?? [];

  }, [report, status]);

  const totalPages = Math.ceil(filteredReports.length / pageSize);

  const data = filteredReports.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
const onExport = () => {
  console.log("Export CSV clicked");
  // yaha ap CSV export logic likh sakte ho
};
  return (
    <div className="space-y-4">

      {/* Filter */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        onChange={(e) =>
          setDateRange({ ...dateRange, end: e.target.value })
        }
      />

      <Button onClick={onExport}>
        <Download className="h-4 w-4 mr-2" /> Export CSV
      </Button>
    </div>

      {/* Table */}
  <div className="rounded-md border overflow-x-auto">
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
              <TableRow key={row.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium">{row.date}</TableCell>
                <TableCell className="text-right">{row.revenue}</TableCell>
                <TableCell className="text-right">{row.orders}</TableCell>
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
