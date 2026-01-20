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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserFormDialog } from "./user-form-dialog";

import { useRouter } from "next/navigation";


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
  users: User[];
 
 
}

export function DataTable({
  users,

 
}: DataTableProps) {

  /* ================= STATES ================= */
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
const [activeTab, setActiveTab] = useState("users");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
const router = useRouter();
  /* ================= FILTER LOGIC ================= */
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      user.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
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

const handleViewProfile = (item: User) => {
  // Navigate to detail page with id
  router.push(`/dashboard/users/profile`);
};

  /* ================= UI ================= */
  return (
    <div className="w-full space-y-4">

      {/* Header */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
    
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">

            {/* Search */}
            <div className="flex-1 min-w-[280px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-muted-foreground h-5 w-5" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
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
          <TableHead>
            {activeTab === "users" ? "User" : "Rider"}
          </TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {paginatedUsers.length ? (
          paginatedUsers.map((item) => (
            <TableRow key={item.id}>
              {/* User / Rider */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                  </div>
                </div>
              </TableCell>

              {/* Contact */}
              <TableCell>
                <p className="text-sm">{item.email}</p>
                <p className="text-xs text-muted-foreground">
                  {item.phone}
                </p>
              </TableCell>

              {/* Join Date */}
              <TableCell>
                <span className="text-sm">{item.joinDate}</span>
              </TableCell>

              {/* Orders */}
              <TableCell>
                <p className="font-medium text-sm">
                  {item.completedOrders} / {item.totalOrders}
                </p>
                <p className="text-xs text-muted-foreground">
                  Completed
                </p>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    item.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {item.status === "Active" ? "Active" : "Blocked"}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleViewProfile(item)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                 
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No data found
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

    </div>
  );
}
