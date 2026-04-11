// src/app/driver/history/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Clock,
  Fuel,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { cn, formatNumber, formatCurrency } from "@/lib/utils";

const historyOrders = [
  {
    id: "ORD-2025-001233",
    depot: "Oando Supply Terminal",
    product: "DPK",
    quantity: 20000,
    date: "Feb 18, 2025",
    earnings: 15000,
    status: "completed",
  },
  {
    id: "ORD-2025-001232",
    depot: "Ardova Depot",
    product: "AGO",
    quantity: 45000,
    date: "Feb 17, 2025",
    earnings: 22500,
    status: "completed",
  },
  {
    id: "ORD-2025-001231",
    depot: "Sahara Energy Terminal",
    product: "AGO",
    quantity: 33000,
    date: "Feb 17, 2025",
    earnings: 16500,
    status: "completed",
  },
  {
    id: "ORD-2025-001230",
    depot: "Matrix Energy Depot",
    product: "PMS",
    quantity: 45000,
    date: "Feb 16, 2025",
    earnings: 22500,
    status: "completed",
  },
  {
    id: "ORD-2025-001229",
    depot: "Pinnacle Oil & Gas",
    product: "AGO",
    quantity: 33000,
    date: "Feb 16, 2025",
    earnings: 16500,
    status: "completed",
  },
  {
    id: "ORD-2025-001228",
    depot: "MRS Oil Terminal",
    product: "AGO",
    quantity: 33000,
    date: "Feb 15, 2025",
    earnings: 16500,
    status: "completed",
  },
];

const weeklyStats = {
  trips: 12,
  volume: 396000,
  earnings: 198000,
  onTimeRate: 100,
};

export default function DriverHistoryPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Trip History</h1>
        <p className="text-slate-500">Your completed trips</p>
      </div>

      {/* Weekly Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white"
      >
        <h2 className="font-semibold mb-4">This Week</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/70">Trips</span>
            </div>
            <p className="text-2xl font-bold">{weeklyStats.trips}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Fuel className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/70">Volume</span>
            </div>
            <p className="text-2xl font-bold">{formatNumber(weeklyStats.volume)}L</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/70">Earnings</span>
            </div>
            <p className="text-2xl font-bold">₦{formatNumber(weeklyStats.earnings)}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/70">On Time</span>
            </div>
            <p className="text-2xl font-bold">{weeklyStats.onTimeRate}%</p>
          </div>
        </div>
      </motion.div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "week", "month"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors",
              filter === f
                ? "bg-primary-500 text-white"
                : "bg-white text-slate-600 border border-slate-200"
            )}
          >
            {f === "all" ? "All Time" : `This ${f}`}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="space-y-3">
        {historyOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-success-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900">{order.id}</h3>
                    <Badge variant="primary" size="sm">
                      {order.product}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">{order.depot}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-success-600">
                  +₦{formatNumber(order.earnings)}
                </p>
                <p className="text-xs text-slate-400">{order.date}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span>{formatNumber(order.quantity)} litres</span>
              <Badge variant="success" size="sm">
                Completed
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}