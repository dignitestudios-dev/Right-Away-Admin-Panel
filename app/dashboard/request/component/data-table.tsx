"use client";

import { useState, useEffect } from "react";
import { Eye, Download, Filter, Check, X } from "lucide-react";
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

import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import EnhancedRequestModal from "./viewmodal";
import { formatDate } from "@/lib/utils";
import {
  getRequestById,
  updateRequestStatus,
} from "@/lib/api/adminRequests.service";
import { SkeletonRow } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string;
//   plan: string;
//   billing: string;
//   status: string;
// }

interface UserFormValues {
  name: string;
  email: string;
  role: string;
  plan: string;
  billing: string;
  status: string;
}

interface DataTableProps {
  users: any;
  onStatusChange?: (status: any) => void;
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

export function DataTable({
  users,
  onStatusChange,
  loading,
  pagination,
  onPageChange,
  setPagination,
}: DataTableProps) {
  /* ================= STATES ================= */

  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const router = useRouter();
  /* ================= FILTER LOGIC ================= */
  const filteredUsers = users.filter((user) => {
    if (statusFilter === "all") return true;
    return user.profileStatus === statusFilter;
  });

  /* ================= PAGINATION ================= */
  useEffect(() => {
    setTotalPages(Math.ceil(filteredUsers.length / pageSize));
    setCurrentPage(1);
  }, [filteredUsers.length, pageSize]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  /* ================= STATUS BADGE ================= */

  const handleAccept = async (id: string) => {
    await updateRequestStatus(id, true);
  };

  const handleReject = async (id: string) => {
    await updateRequestStatus(id, false);
  };
  const handleViewOrderHistory = (user: any) => {
    console.log("View orders for:", user.name);
  };

  const handleView = async (item: any) => {
    const detail = await getRequestById(item._id);
    setSelectedRequest(detail);
    setOpenViewModal(true);
  };
  console.log(users, "filteredUser");
  const onPageSizeChange = (size: number) => {
    setPageSize(size);
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: size,
      currentPage: 1,
    }));
    onPageChange(1, size); // ✅ pass size dynamically
  };
  /* ================= UI ================= */
  return (
    <div className="w-full space-y-4">
      {/* Header */}
      {/* <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div> */}

      {/* Filters */}
      <Card>
        <CardContent className="">
          <div className="flex flex-wrap gap-4">
            {/* Search */}

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-muted-foreground h-5 w-5" />
              <Select
                value={statusFilter}
                onValueChange={(e) => {
                  setStatusFilter(e);
                  onStatusChange(e);
                }}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
            ) : paginatedUsers.length ? (
              paginatedUsers.map((item: any) => (
                <TableRow key={item._id}>
                  {/* Person */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={item.profilePicture}
                        alt={item.name}
                        className="h-10 w-10 rounded-full object-cover border-2 border-[#1bae77]"
                      />
                      <p className="font-medium">{item.name}</p>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">{item.email}</TableCell>

                  <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                  </TableCell>

                  <TableCell>{formatDate(item.createdAt)}</TableCell>

                  <TableCell>
                    <Badge
                      className={
                        item.profileStatus === "in-review"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.profileStatus === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {item.profileStatus}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleView(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {item.profileStatus === "in-review" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600"
                            onClick={() => handleAccept(item._id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(item._id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No requests found
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
          <Select
            value={pageSize.toString()}
            onValueChange={(v) => onPageSizeChange(Number(v))}
          >
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

        {/* Pagination buttons */}
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPrevious={() => onPageChange(pagination.currentPage - 1, pageSize)}
          onNext={() => onPageChange(pagination.currentPage + 1, pageSize)}
        />
      </div>

      {openViewModal && selectedRequest && (
        <EnhancedRequestModal
          selectedRequest={selectedRequest}
          onClose={() => setOpenViewModal(false)}
        />
      )}
    </div>
  );
}
