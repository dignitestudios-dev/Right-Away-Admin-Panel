"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  Download,
  Search,
  Filter,
  CheckCircle,
  Ban,
  Package,
  Check,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";


import { useRouter } from "next/navigation";
import EnhancedReportsModal from "./viewmodal";
import { Label } from "@/components/ui/label";



interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  plan: string;
  billing: string;
  status: string;
}

interface UserFormValues {
  name: string;
  email: string;
  role: string;
  plan: string;
  billing: string;
  status: string;
}

interface DataTableProps {
  reports: User[];
 
 
}

export function DataTable({reports}: DataTableProps) {

  /* ================= STATES ================= */
 
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [openViewModal, setOpenViewModal] = useState(false);
const [selectedRequest, setSelectedRequest] = useState(null);

const router = useRouter();
  /* ================= FILTER LOGIC ================= */
  const filteredUsers = reports.filter((reports) => {
  if (statusFilter === "all") return true;
  return reports.status.toLowerCase() === statusFilter.toLowerCase();
});

  /* ================= PAGINATION ================= */
  useEffect(() => {
    setTotalPages(Math.ceil(filteredUsers.length / pageSize));
    setCurrentPage(1);
  }, [filteredUsers.length, pageSize]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  /* ================= STATUS BADGE ================= */



const handleViewOrderHistory = (user: User) => {
  console.log("View orders for:", user.name);
};

const handleView = (report) => {
  setSelectedRequest(report);
  setOpenViewModal(true);
};

  /* ================= UI ================= */
  return (
    <div className="w-full space-y-4">

      {/* Header */}
     

    
      {/* Table */}
 <div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Reporter</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Reported User</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {reports.length ? (
        reports.map((report) => (
          <TableRow key={report.id}>

            {/* Reporter */}
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {/* {report.reporterName.charAt(0)} */}
                </div>
                {/* <p className="font-medium">{report.reporterName}</p> */}
              </div>
            </TableCell>

            {/* Reporter Email */}
            <TableCell className="text-sm">
              {/* {report.reporterEmail} */}
            </TableCell>

            {/* Reported User */}
            <TableCell>
              {/* <p className="font-medium">{report.reportedUserName}</p> */}
              <p className="text-xs text-gray-500">
                {/* {report.reportedUserEmail} */}
              </p>
            </TableCell>

            {/* Date */}
            {/* <TableCell>{report.date}</TableCell> */}

            {/* Status */}
        

            {/* Actions */}
            <TableCell className="text-right">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleView(report)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>

          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center">
            No reports found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</div>



      {/* Pagination */}
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <Label>Show</Label>
          <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(Number(v))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
         
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>

  {openViewModal && selectedRequest && (
  <EnhancedReportsModal 
    selectedRequest={selectedRequest} 
    onClose={() => setOpenViewModal(false)} 
  />
)}


    </div>
  );
}
