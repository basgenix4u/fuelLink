// src/app/driver/orders/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { cn, formatNumber } from "@/lib/utils";

const activeOrders = [
  {
    id: "ORD-2025-001234",
    depot: "Pinnacle Oil & Gas Terminal",
    address: "Apapa, Lagos",
    product: "AGO",
    quantity: 33000,
    status: "loading",
    time: "Loading now",
    priority: "high",
  },
  {
    id: "ORD-2025-001235",
    depot: "Matrix Energy Depot",
    address: "Apapa, Lagos",
    product: "PMS",
    quantity: 45000,
    status: "assigned",
    time: "Pickup at 2:00 PM",
    priority: "normal",
  },
];

const statusConfig: Record<string, { color: string; icon: any }> = {
  assigned: { color: "bg-warning-100 text-warning-600", icon: Clock },
  "in-transit": { color: "bg-accent-100 text-accent-600", icon: Truck },
  "at-depot": { color: "bg-primary-100 text-primary-600", icon: MapPin },
  loading: { color: "bg-secondary-100 text-secondary-600", icon: Package },
  completed: { color: "bg-success-100 text-success-600", icon: CheckCircle2 },
};

export default function DriverOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Active Orders</h1>
        <p className="text-slate-500">Your current assignments</p>
      </div>

      {activeOrders.length > 0 ? (
        <div className="space-y-4">
          {activeOrders.map((order, index) => {
            const status = statusConfig[order.status] || statusConfig.assigned;
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/driver/orders/${order.id}`}>
                  <div
                    className={cn(
                      "bg-white rounded-2xl shadow-sm border overflow-hidden",
                      order.priority === "high"
                        ? "border-accent-300"
                        : "border-slate-100"
                    )}
                  >
                    {order.priority === "high" && (
                      <div className="bg-accent-500 text-white text-center py-2 text-sm font-medium flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Priority Order
                      </div>
                    )}

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {order.id}
                          </h3>
                          <p className="text-sm text-slate-600">{order.depot}</p>
                        </div>
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            status.color
                          )}
                        >
                          <StatusIcon className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {order.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {formatNumber(order.quantity)}L
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="primary">{order.product}</Badge>
                          <Badge variant="default">{order.status}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          {order.time}
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">
                        View Details
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
          <Truck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 mb-1">
            No Active Orders
          </h3>
          <p className="text-slate-500 text-sm">
            You&apos;ll be notified when assigned a new order
          </p>
        </div>
      )}
    </div>
  );
}