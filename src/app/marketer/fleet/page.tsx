// src/app/marketer/fleet/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  User,
  Edit,
  Trash2,
  Phone,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Search,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { cn, formatNumber } from "@/lib/utils";
import { FloatingFleetForm } from "@/components/marketer/FloatingFleetForm";

interface Truck {
  id: string;
  plateNumber: string;
  capacity: number;
  type: string;
  status: "active" | "maintenance" | "inactive";
  assignedDriver?: string;
  totalTrips: number;
  lastTrip: string;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  status: "available" | "on-trip" | "off-duty";
  assignedTruck?: string;
  rating: number;
  totalTrips: number;
}

const trucks: Truck[] = [
  {
    id: "truck-1",
    plateNumber: "ABC-123XY",
    capacity: 33000,
    type: "Tanker Truck",
    status: "active",
    assignedDriver: "Musa Ibrahim",
    totalTrips: 156,
    lastTrip: "2 hours ago",
  },
  {
    id: "truck-2",
    plateNumber: "DEF-456AB",
    capacity: 45000,
    type: "Tanker Truck",
    status: "active",
    assignedDriver: "Chukwu Emmanuel",
    totalTrips: 134,
    lastTrip: "Yesterday",
  },
  {
    id: "truck-3",
    plateNumber: "GHI-789CD",
    capacity: 33000,
    type: "Tanker Truck",
    status: "maintenance",
    totalTrips: 98,
    lastTrip: "3 days ago",
  },
  {
    id: "truck-4",
    plateNumber: "JKL-012EF",
    capacity: 45000,
    type: "Tanker Truck",
    status: "active",
    assignedDriver: "Adamu Bello",
    totalTrips: 112,
    lastTrip: "5 hours ago",
  },
];

const drivers: Driver[] = [
  {
    id: "driver-1",
    name: "Musa Ibrahim",
    phone: "+234 803 456 7890",
    licenseNumber: "DRV-2024-78901",
    status: "on-trip",
    assignedTruck: "ABC-123XY",
    rating: 4.9,
    totalTrips: 156,
  },
  {
    id: "driver-2",
    name: "Chukwu Emmanuel",
    phone: "+234 804 567 8901",
    licenseNumber: "DRV-2024-78902",
    status: "available",
    assignedTruck: "DEF-456AB",
    rating: 4.7,
    totalTrips: 134,
  },
  {
    id: "driver-3",
    name: "Adamu Bello",
    phone: "+234 805 678 9012",
    licenseNumber: "DRV-2024-78903",
    status: "on-trip",
    assignedTruck: "JKL-012EF",
    rating: 4.8,
    totalTrips: 112,
  },
  {
    id: "driver-4",
    name: "Okonkwo James",
    phone: "+234 806 789 0123",
    licenseNumber: "DRV-2024-78904",
    status: "off-duty",
    rating: 4.6,
    totalTrips: 87,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
    case "available":
      return "success";
    case "maintenance":
    case "off-duty":
      return "warning";
    case "on-trip":
      return "secondary";
    case "inactive":
      return "danger";
    default:
      return "default";
  }
};

export default function FleetPage() {
  const [activeTab, setActiveTab] = useState<"trucks" | "drivers">("trucks");
  const [searchQuery, setSearchQuery] = useState("");
  const [formType, setFormType] = useState<"truck" | "driver" | null>(null);

  const filteredTrucks = trucks.filter((truck) =>
    truck.plateNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fleet Management</h1>
          <p className="text-slate-500">Manage your trucks and drivers</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="md" onClick={() => setFormType("driver")}>
            <User className="w-4 h-4 mr-2" />
            Add Driver
          </Button>
          <Button variant="secondary" size="md" onClick={() => setFormType("truck")}>
            <Truck className="w-4 h-4 mr-2" />
            Add Truck
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{trucks.length}</p>
              <p className="text-sm text-slate-500">Total Trucks</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {trucks.filter((t) => t.status === "active").length}
              </p>
              <p className="text-sm text-slate-500">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center">
              <User className="w-5 h-5 text-secondary-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{drivers.length}</p>
              <p className="text-sm text-slate-500">Total Drivers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-accent-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {drivers.filter((d) => d.status === "on-trip").length}
              </p>
              <p className="text-sm text-slate-500">On Trip</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="border-b border-slate-100 px-4 flex items-center justify-between">
          <div className="flex">
            <button
              onClick={() => setActiveTab("trucks")}
              className={cn(
                "px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === "trucks"
                  ? "border-secondary-500 text-secondary-600"
                  : "border-transparent text-slate-500"
              )}
            >
              <Truck className="w-4 h-4" />
              Trucks ({trucks.length})
            </button>
            <button
              onClick={() => setActiveTab("drivers")}
              className={cn(
                "px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === "drivers"
                  ? "border-secondary-500 text-secondary-600"
                  : "border-transparent text-slate-500"
              )}
            >
              <User className="w-4 h-4" />
              Drivers ({drivers.length})
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === "trucks" ? "Search trucks..." : "Search drivers..."}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
          </div>
        </div>

        {/* Trucks List */}
        {activeTab === "trucks" && (
          <div className="divide-y divide-slate-100">
            {filteredTrucks.map((truck) => (
              <motion.div
                key={truck.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center">
                      <Truck className="w-7 h-7 text-primary-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{truck.plateNumber}</h3>
                        <Badge variant={getStatusColor(truck.status) as any}>
                          {truck.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500">
                        {truck.type} • {formatNumber(truck.capacity)}L capacity
                      </p>
                      {truck.assignedDriver && (
                        <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                          <User className="w-3 h-3" />
                          {truck.assignedDriver}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">
                      {truck.totalTrips} trips
                    </p>
                    <p className="text-xs text-slate-400">
                      Last: {truck.lastTrip}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-danger-50 text-slate-400 hover:text-danger-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Drivers List */}
        {activeTab === "drivers" && (
          <div className="divide-y divide-slate-100">
            {filteredDrivers.map((driver) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center">
                      <span className="text-xl font-bold text-secondary-600">
                        {driver.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{driver.name}</h3>
                        <Badge variant={getStatusColor(driver.status) as any}>
                          {driver.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        {driver.phone}
                      </p>
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <CreditCard className="w-3 h-3" />
                        {driver.licenseNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 mb-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold">{driver.rating}</span>
                    </div>
                    <p className="text-sm text-slate-500">{driver.totalTrips} trips</p>
                    {driver.assignedTruck && (
                      <p className="text-xs text-slate-400 flex items-center justify-end gap-1 mt-1">
                        <Truck className="w-3 h-3" />
                        {driver.assignedTruck}
                      </p>
                    )}
                    <div className="flex gap-2 mt-2 justify-end">
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-danger-50 text-slate-400 hover:text-danger-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <FloatingFleetForm 
        type={formType} 
        onClose={() => setFormType(null)} 
      />
    </div>
  );
}