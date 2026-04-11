// src/app/driver/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  Clock,
  Phone,
  Navigation,
  QrCode,
  CheckCircle2,
  Truck,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { cn, formatNumber, formatCurrency } from "@/lib/utils";

const activeOrders = [
  {
    id: "ORD-2025-001234",
    depot: "Pinnacle Oil & Gas Terminal",
    address: "Plot 15, Apapa Tank Farm Complex, Apapa, Lagos",
    product: "AGO",
    quantity: 33000,
    status: "loading",
    priority: "high",
    time: "Loading now",
  },
  {
    id: "ORD-2025-001235",
    depot: "Matrix Energy Depot",
    address: "Marine Road, Apapa, Lagos",
    product: "PMS",
    quantity: 45000,
    status: "pending",
    priority: "normal",
    time: "Pickup in 2 hours",
  },
];

const statusSteps = [
  { id: "assigned", label: "Assigned", icon: Package },
  { id: "in-transit", label: "In Transit", icon: Truck },
  { id: "at-depot", label: "At Depot", icon: MapPin },
  { id: "loading", label: "Loading", icon: Package },
  { id: "completed", label: "Complete", icon: CheckCircle2 },
];

export default function DriverHomePage() {
  const user = {
    name: "Musa Ibrahim",
    truck: "ABC-123XY",
    completedToday: 3,
    totalEarnings: 45000,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-xl font-bold mb-1">Hello, {user.name.split(" ")[0]}!</h1>
        <p className="text-white/80 mb-4">Truck: {user.truck}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white/70 text-sm">Trips Today</p>
            <p className="text-2xl font-bold">{user.completedToday}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white/70 text-sm">Earnings</p>
            <p className="text-2xl font-bold">₦{formatNumber(user.totalEarnings)}</p>
          </div>
        </div>
      </motion.div>

      {/* Active Orders */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Orders</h2>

        {activeOrders.length > 0 ? (
          <div className="space-y-4">
            {activeOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/driver/orders/${order.id}`}>
                  <div className={cn(
                    "bg-white rounded-2xl shadow-sm border overflow-hidden",
                    order.priority === "high" ? "border-accent-200" : "border-slate-100"
                  )}>
                    {order.priority === "high" && (
                      <div className="bg-accent-500 text-white text-center py-1 text-sm font-medium">
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                        Current Order - {order.time}
                      </div>
                    )}

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900">{order.id}</h3>
                            <Badge variant="primary">{order.product}</Badge>
                          </div>
                          <p className="text-sm text-slate-600">{order.depot}</p>
                        </div>
                        <Badge
                          variant={order.status === "loading" ? "secondary" : "warning"}
                        >
                          {order.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{order.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                        <Package className="w-4 h-4" />
                        <span>{formatNumber(order.quantity)} litres</span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Navigation className="w-4 h-4 mr-1" />
                          Navigate
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1">
                          <QrCode className="w-4 h-4 mr-1" />
                          QR Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
            <Truck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-1">No Active Orders</h3>
            <p className="text-slate-500 text-sm">You&apos;ll be notified when you&apos;re assigned a new order</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <h3 className="font-semibold text-slate-900 mb-4">This Week</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-xs text-slate-500">Trips</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">396K</p>
            <p className="text-xs text-slate-500">Litres</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success-600">100%</p>
            <p className="text-xs text-slate-500">On Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}