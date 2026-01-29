"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  ShoppingBag,
  User,
  Ban,
  CheckCircle,
  Eye,
  FastForward,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OrderDetailModal from "../components/order-detail";
import { useParams, useSearchParams } from "next/navigation";
import { getUserById, getUserOrders } from "@/lib/api/adminUsers";
import { Skeleton } from "@/components/ui/skeleton";

const UserDetailPage = () => {
  const [user, setUser] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // "user" | "rider" | null
  const userId = params?.id as string;
  const handleBlockToggle = () => {
    setUser((prev) => ({
      ...prev,
      isBlocked: !prev.isBlocked,
      status: !prev.isBlocked ? "Blocked" : "Active",
    }));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const profileRes = await getUserById(userId, role);
        const ordersRes = await getUserOrders(userId, role);
        setUser(profileRes.user);
        setAddress(profileRes.address);
        setReviews(profileRes.Reviews);
        setOrders(ordersRes || []);
      } catch (error) {
        console.error("Failed to load user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Filtered & Paginated Orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order?.user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    setTotalPages(Math.ceil(filteredOrders.length / pageSize));
    setCurrentPage(1);
  }, [filteredOrders.length, pageSize]);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handleViewOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setOpenOrderDetail(true);
  };
  console.log(reviews, "user---record");

  return (
    <div className="p-2 min-h-screen space-y-6">
      {/* Header Card */}

      {loading ? (
        <div className="flex items-start justify-between mb-6 gap-6">
          <Skeleton className="w-32 h-32 rounded-full" /> {/* Avatar */}
          <div className="flex-1 space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ) : (
        <Card className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-6">
              <Avatar className="w-32 h-32 border-4 border-[#1bae77] shadow-md">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{user?.name}</h1>

                  <Badge
                    variant={
                      user?.isBlocked ? "destructive" : ("success" as any)
                    }
                  >
                    {user?.isBlocked ? "Blocked" : "Active"}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  {/* <div className="flex items-center gap-2 text-gray-600">
                  <User size={18} className="text-gray-400" />
                  <span className="font-mono text-sm">{user?.id}</span>
                </div> */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={18} className="text-gray-400" />
                    <a href={`mailto:${user?.email}`}>{user?.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={18} className="text-gray-400" />
                    <a href={`tel:${user?.phone}`}>{user?.phone}</a>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleBlockToggle}
              variant={user?.isBlocked ? "default" : "destructive"}
              className="flex items-center gap-2 px-6 py-3"
            >
              {user?.isBlocked ? (
                <>
                  <CheckCircle size={20} />
                  Unblock User
                </>
              ) : (
                <>
                  <Ban size={20} />
                  Block User
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 flex items-center gap-4">
          <div className="bg-[#1bae77] p-4 rounded-full">
            <ShoppingBag size={32} className="text-white" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Total Orders
            </p>
            <p className="text-3xl font-bold text-center text-gray-900">
              {orders.length}
            </p>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-4">
          <div className="bg-[#1bae77] p-4 rounded-full">
            <Calendar size={32} className="text-white" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Member Since
            </p>
            <p className="text-xl font-bold">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* Address Section */}

        <Card className="p-6 flex items-start gap-3">
          <div className="bg-[#1bae77] p-3 rounded-full shrink-0">
            <MapPin size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Address</h2>
            <p className="text-gray-600">
              {address?.address || "No address found"}
            </p>
          </div>
        </Card>

        <Card className="p-6 flex items-start gap-3">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-xl font-semibold">Reviews</h2>

            {/* Rating Number */}
            <p className="text-4xl font-bold flex items-center gap-1">
              {reviews?.rating ?? 0}
            </p>

            {/* ⭐ Dynamic Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`text-2xl ${
                    index < (reviews?.rating ?? 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-600">
              {reviews?.reviews || "No review provided"}
            </p>
          </div>
        </Card>
      </div>

      {/* Account Info */}
      {/* <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Account Information
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="border-l-4 border-[#1bae77] pl-4">
            <p className="text-sm text-gray-500 mb-1">User ID</p>
            <p className="text-lg font-semibold text-gray-900 font-mono">
              {user?.id}
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-sm text-gray-500 mb-1">Account Status</p>
            <p className="text-lg font-semibold text-gray-900">
              {user?.status}
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-lg font-semibold text-gray-900">
              {user?.totalOrders} Orders
            </p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <p className="text-sm text-gray-500 mb-1">Join Date</p>
            <p className="text-lg font-semibold text-gray-900">
              {user?.joinDate}
            </p>
          </div>
        </div>
      </Card> */}

      {/* Orders Table */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Orders</h2>

        {/* Filter */}
        <div className="flex gap-4 mb-4 items-center">
          <Input
            placeholder="Search by Order ID or Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Label>Status:</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length ? (
                paginatedOrders.map((order) => (
                  <TableRow key={order?._id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order?.user?.name}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "completed"
                            ? ("success" as any)
                            : order.status === "Cancelled"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleViewOrderDetail(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </Card>
      <OrderDetailModal
        open={openOrderDetail}
        onClose={() => setOpenOrderDetail(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default UserDetailPage;
