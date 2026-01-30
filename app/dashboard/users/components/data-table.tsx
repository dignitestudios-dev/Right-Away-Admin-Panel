"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Download, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SkeletonRow } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination"; // ✅ Import global pagination
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { exportUsersCSV, getUsers } from "@/lib/api/adminUsers";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  createdAt: string;
  isDeactivatedByAdmin: boolean;
  role: string;
}

interface DataTableProps {
  role: "user" | "rider" | "company";
}

export function DataTable({ role }: DataTableProps) {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* ================= FETCH USERS FROM API ================= */
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers({
        role,
        page: currentPage,
        limit: pageSize,
        search: searchQuery,
        status: statusFilter,
      });

      setUsers(res.users);
      setTotalPages(res.pagination.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage, pageSize, searchQuery, statusFilter, role]);

  /* ================= HANDLERS ================= */
  const handlePreviousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages));

  const handleViewProfile = (user: User) =>
    router.push(`/dashboard/users/${user._id}?role=${role}`);

  /* ================= FILTER & SEARCH ================= */
  // You can still optionally filter client-side if needed
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => exportUsersCSV(role)}>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[280px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="text-muted-foreground h-5 w-5" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} index={i} />
              ))
            ) : filteredUsers.length ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.phone}
                    </p>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">
                      {formatDate(user.createdAt)}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        user.isDeactivatedByAdmin === false
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {user.isDeactivatedByAdmin ? "Blocked" : "Active"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleViewProfile(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="page-size" className="text-sm font-medium">
            Show
          </Label>
          <Select
            value={pageSize.toString()}
            onValueChange={(v) => setPageSize(Number(v))}
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      </div>
    </div>
  );
}
