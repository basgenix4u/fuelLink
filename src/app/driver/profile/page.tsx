// src/app/driver/profile/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Truck,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Package,
  TrendingUp,
  Edit,
  Camera,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { cn, formatNumber } from "@/lib/utils";

const driverData = {
  name: "Musa Ibrahim",
  phone: "+234 803 456 7890",
  email: "musa.ibrahim@email.com",
  licenseNumber: "DRV-2024-78901",
  truck: {
    plateNumber: "ABC-123XY",
    capacity: 33000,
    type: "Tanker Truck",
  },
  marketer: "Sahara Energy Resources",
  rating: 4.9,
  totalTrips: 156,
  totalVolume: 5148000,
  memberSince: "March 2024",
};

const menuItems = [
  { label: "Edit Profile", icon: Edit, href: "/driver/profile/edit" },
  { label: "My Truck", icon: Truck, href: "/driver/profile/truck" },
  { label: "Notifications", icon: Bell, href: "/driver/profile/notifications" },
  { label: "Security", icon: Shield, href: "/driver/profile/security" },
  { label: "Help & Support", icon: HelpCircle, href: "/driver/profile/help" },
];

export default function DriverProfilePage() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-accent-500 flex items-center justify-center text-white text-2xl font-bold">
              {driverData.name.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
              <Camera className="w-4 h-4 text-slate-600" />
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{driverData.name}</h1>
            <p className="text-slate-500">{driverData.marketer}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-slate-900">{driverData.rating}</span>
              <span className="text-slate-400">rating</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <Package className="w-5 h-5 text-primary-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">{driverData.totalTrips}</p>
            <p className="text-xs text-slate-500">Total Trips</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <TrendingUp className="w-5 h-5 text-success-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">
              {(driverData.totalVolume / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-slate-500">Litres Moved</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <Star className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">100%</p>
            <p className="text-xs text-slate-500">On Time</p>
          </div>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <h2 className="font-semibold text-slate-900 mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Phone</p>
              <p className="font-medium text-slate-900">{driverData.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Email</p>
              <p className="font-medium text-slate-900">{driverData.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500">License Number</p>
              <p className="font-medium text-slate-900">{driverData.licenseNumber}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Truck Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <h2 className="font-semibold text-slate-900 mb-4">Assigned Truck</h2>
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
          <div className="w-14 h-14 rounded-xl bg-accent-100 flex items-center justify-center">
            <Truck className="w-7 h-7 text-accent-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900">{driverData.truck.plateNumber}</p>
            <p className="text-sm text-slate-500">{driverData.truck.type}</p>
            <p className="text-sm text-slate-500">
              Capacity: {formatNumber(driverData.truck.capacity)}L
            </p>
          </div>
        </div>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      >
        {menuItems.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center justify-between p-4 hover:bg-slate-50 transition-colors",
              index < menuItems.length - 1 && "border-b border-slate-100"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-slate-600" />
              </div>
              <span className="font-medium text-slate-900">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>
        ))}
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/login">
          <Button variant="outline" size="lg" className="w-full text-danger-600 border-danger-200 hover:bg-danger-50">
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </Link>
      </motion.div>

      {/* Version */}
      <p className="text-center text-xs text-slate-400">
        FuelLink Driver App v1.0.0
      </p>
    </div>
  );
}