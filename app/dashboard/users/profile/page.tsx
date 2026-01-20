"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Calendar, MapPin, ShoppingBag, User, Ban, CheckCircle, Eye, FastForward, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OrderDetailModal from "../components/order-detail";

const UserDetailPage = () => {
  const [user, setUser] = useState({
    id: "USR-12345",
    name: "Patricia Mills",
    email: "patricia.mills@example.com",
    phone: "+1 (555) 123-4567",
    totalOrders: 47,
    joinDate: "January 15, 2023",
    address: "123 Main Street, Apartment 4B, New York, NY 10001, United States",
    status: "Active",
    isBlocked: false,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia"
  });

  const handleBlockToggle = () => {
    setUser(prev => ({
      ...prev,
      isBlocked: !prev.isBlocked,
      status: !prev.isBlocked ? "Blocked" : "Active"
    }));
  };

  // Example orders for this user
  const [orders, setOrders] = useState([
    { id: "ORD-001", name: "Order 1", date: "2026-01-01", status: "Pending" },
    { id: "ORD-002", name: "Order 2", date: "2026-01-02", status: "Processing" },
    { id: "ORD-003", name: "Order 3", date: "2026-01-03", status: "Completed" },
    { id: "ORD-004", name: "Order 4", date: "2026-01-04", status: "Cancelled" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Filtered & Paginated Orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    setTotalPages(Math.ceil(filteredOrders.length / pageSize));
    setCurrentPage(1);
  }, [filteredOrders.length, pageSize]);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

const handleViewOrderDetail = (order: any) => {
  setSelectedOrder(order);
  setOpenOrderDetail(true);
};

  return (
    <div className="p-2 min-h-screen space-y-6">

      {/* Header Card */}
      <Card className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex gap-6">
            <Avatar className="w-32 h-32 border-4 border-[#1bae77] shadow-md">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-3 mb-2">
  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
  <Badge variant={user.isBlocked ? "destructive" : ("success" as any)}>
    {user.status}
  </Badge>
</div>


              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={18} className="text-gray-400" />
                  <span className="font-mono text-sm">{user.id}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={18} className="text-gray-400" />
                  <a href={`mailto:${user.email}`} className="hover:text-blue-600 hover:underline">{user.email}</a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={18} className="text-gray-400" />
                  <a href={`tel:${user.phone}`} className="hover:text-blue-600 hover:underline">{user.phone}</a>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={handleBlockToggle} variant={user.isBlocked ? "default" : "destructive"} className="flex items-center gap-2 px-6 py-3">
            {user.isBlocked ? <><CheckCircle size={20} />Unblock User</> : <><Ban size={20} />Block User</>}
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 flex items-center gap-4">
          <div className="bg-[#1bae77] p-4 rounded-full">
            <ShoppingBag size={32} className="text-white" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">{user.totalOrders}</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-4">
          <div className="bg-[#1bae77] p-4 rounded-full">
            <Calendar size={32} className="text-white" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Member Since</p>
            <p className="text-xl font-bold text-gray-900">{user.joinDate}</p>
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
          <p className="text-gray-600 leading-relaxed">{user.address}</p>
        </div>
      </Card>

       <Card className="p-6 flex items-start gap-3">
        <div className="flex flex-col items-start space-x-4 mb-4  gap-2">
        <h2 className="text-xl font-semibold "> Reviews</h2>
          <p className="text-4xl font-bold flex items-center gap-1">4.5 </p>
          <div className="flex items-center gap-1">

          <Star className="text-yellow-400 text-2xl" />
          <Star className="text-yellow-400 text-2xl" />
          <Star className="text-yellow-400 text-2xl" />
          <Star className="text-yellow-400 text-2xl" />
          <Star className="text-yellow-400 text-2xl" />
          </div>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa vero officia omnis labore aliquam blanditiis quae nemo. Ipsam deserunt, eum iste aspernatur quis debitis ad quas at sapiente rem perferendis.</p>
        </div>
        </Card>
     
     </div>

      {/* Account Info */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="border-l-4 border-[#1bae77] pl-4">
            <p className="text-sm text-gray-500 mb-1">User ID</p>
            <p className="text-lg font-semibold text-gray-900 font-mono">{user.id}</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-sm text-gray-500 mb-1">Account Status</p>
            <p className="text-lg font-semibold text-gray-900">{user.status}</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-lg font-semibold text-gray-900">{user.totalOrders} Orders</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <p className="text-sm text-gray-500 mb-1">Join Date</p>
            <p className="text-lg font-semibold text-gray-900">{user.joinDate}</p>
          </div>
        </div>
      </Card>

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
                paginatedOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                    <Badge variant={
  order.status === "Completed" ? ("success" as any) :
  order.status === "Cancelled" ? "destructive" : "secondary"
}>
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
                  <TableCell colSpan={5} className="h-24 text-center">No orders found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center py-4">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
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
