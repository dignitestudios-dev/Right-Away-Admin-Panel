"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Calendar, 
  MapPin, 
  Truck, 
  FileText, 
  User, 
  Mail, 
  Phone,
  X
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface OrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  order: any;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ open, onClose, order }) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "text-green-700 border-green-200";
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[110vh] overflow-hidden p-0 ">
        {/* Header with custom color background */}
        <DialogHeader className="p-6 pb-4" style={{ backgroundColor: '#def5e4' }}>
          <div className="flex items-center justify-between px-3.5">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Order Details
            </DialogTitle>
            <div className="flex items-center gap-3">
              <Badge className={`${getStatusColor(order.status)} border px-4 py-1.5 text-sm font-semibold`} style={{ backgroundColor: '#def5e4' }}>
                {order.status}
              </Badge>
             
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] px-6 pb-6">
          {/* Order Items Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
            </div>
            
            <div className="space-y-4">
              {order.items?.map((item: any, index: number) => (
                <div 
                  key={item.id || index} 
                  className="flex gap-4 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ backgroundColor: '#f8fdf9' }}
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <p className="text-gray-600">
                        <span className="text-gray-500">Category:</span>{" "}
                        <span className="font-medium text-gray-900">{item.category}</span>
                      </p>
                      <p className="text-gray-600">
                        <span className="text-gray-500">Sub Category:</span>{" "}
                        <span className="font-medium text-gray-900">{item.subCategory}</span>
                      </p>
                      <p className="text-gray-600">
                        <span className="text-gray-500">Qty:</span>{" "}
                        <span className="font-medium text-gray-900">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Order Information Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Order Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Order ID */}
              <div className="p-4 rounded-lg border" style={{ backgroundColor: '#def5e4', borderColor: '#c5ecd3' }}>
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="font-mono font-semibold text-gray-900 text-sm break-all">
                      {order.orderId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Date */}
              <div className="p-4 rounded-lg border" style={{ backgroundColor: '#def5e4', borderColor: '#c5ecd3' }}>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                    <p className="font-semibold text-gray-900">{order.orderDate}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Type */}
              <div className="p-4 rounded-lg border" style={{ backgroundColor: '#def5e4', borderColor: '#c5ecd3' }}>
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Delivery Type</p>
                    <p className="font-semibold text-gray-900">{order.deliveryType}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="p-4 rounded-lg border" style={{ backgroundColor: '#def5e4', borderColor: '#c5ecd3' }}>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                    <p className="font-semibold text-gray-900">{order.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              {order.specialInstructions && (
                <div className="col-span-1 md:col-span-2 p-4 rounded-lg border" style={{ backgroundColor: '#def5e4', borderColor: '#c5ecd3' }}>
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Special Instructions</p>
                      <p className="font-medium text-gray-900">{order.specialInstructions}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Customer Information Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
            </div>
            
            <div className="p-4 rounded-lg border" style={{ backgroundColor: '#def5e4', borderColor: '#c5ecd3' }}>
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  {order.user?.image ? (
                    <Image
                      src={order.user.image}
                      alt={order.name}
                      fill
                      className="rounded-full object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center border-2 border-white shadow-md">
                      <User className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>

                {/* User Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-semibold text-gray-900">{order.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <a 
                        href={`mailto:${order.email}`}
                        className="text-green-600 hover:underline font-medium"
                      >
                        {order.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <a 
                        href={`tel:${order.phone}`}
                        className="text-green-600 hover:underline font-medium"
                      >
                        {order.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Rider Information Section */}
          {order.rider && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Rider Information</h3>
              </div>
              
              <div className="p-6 rounded-lg border" style={{ backgroundColor: '#def5e4', borderColor: '#c5ecd3' }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {/* Rider Avatar */}
                    <div className="relative w-14 h-14 flex-shrink-0">
                      {order.rider.image ? (
                        <Image
                          src={order.rider.image}
                          alt={order.rider.name}
                          fill
                          className="rounded-full object-cover border-2 border-white shadow-md"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center border-2 border-white shadow-md">
                          <User className="h-7 w-7 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{order.rider.name}</h4>
                    </div>
                  </div>
                  
                  {/* Chat Button */}
                  <button className="w-10 h-10 rounded-lg bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
                    <Mail className="h-5 w-5 text-white" />
                  </button>
                </div>

                {/* Rider Details Grid */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-0.5">Contact Number</p>
                      <a 
                        href={`tel:${order.rider.phone}`}
                        className="font-semibold text-gray-900 hover:text-green-600"
                      >
                        {order.rider.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-0.5">Email Address</p>
                      <a 
                        href={`mailto:${order.rider.email}`}
                        className="font-semibold text-gray-900 hover:text-green-600"
                      >
                        {order.rider.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-0.5">Vehicle Type</p>
                      <p className="font-semibold text-gray-900">{order.rider.vehicleType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-0.5">Vehicle Number</p>
                      <p className="font-semibold text-gray-900">{order.rider.vehicleNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t px-6 py-4 flex justify-end gap-3" style={{ backgroundColor: '#f8fdf9' }}>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-6"
          >
            Close
          </Button>
    
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;