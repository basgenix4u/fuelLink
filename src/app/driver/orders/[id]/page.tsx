// src/app/driver/orders/[id]/page.tsx

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Navigation,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  QrCode,
  AlertCircle,
  Copy,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { cn, formatNumber } from "@/lib/utils";
import toast from "react-hot-toast";

const orderData = {
  id: "ORD-2025-001234",
  depot: {
    name: "Pinnacle Oil & Gas Terminal",
    address: "Plot 15, Apapa Tank Farm Complex, Apapa, Lagos",
    phone: "+234 801 234 5678",
    contactPerson: "Mr. Adebayo",
  },
  product: {
    type: "AGO",
    name: "Diesel",
    quantity: 33000,
  },
  status: "at-depot",
  qrCode: "FUELLINK-ORD2025001234-VERIFY",
  timeline: [
    { status: "assigned", label: "Order Assigned", time: "08:00 AM", completed: true },
    { status: "in-transit", label: "In Transit to Depot", time: "09:30 AM", completed: true },
    { status: "at-depot", label: "Arrived at Depot", time: "11:45 AM", completed: true, current: true },
    { status: "loading", label: "Loading in Progress", time: null, completed: false },
    { status: "completed", label: "Loading Complete", time: null, completed: false },
  ],
};

const statusActions: Record<string, { label: string; nextStatus: string }> = {
  assigned: { label: "Start Trip", nextStatus: "in-transit" },
  "in-transit": { label: "Arrived at Depot", nextStatus: "at-depot" },
  "at-depot": { label: "Start Loading", nextStatus: "loading" },
  loading: { label: "Confirm Loading Complete", nextStatus: "completed" },
};

export default function DriverOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const order = orderData;
  const currentAction = statusActions[order.status];

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Status updated successfully!");
    setIsUpdating(false);
  };

  const copyQRCode = () => {
    navigator.clipboard.writeText(order.qrCode);
    toast.success("QR code copied!");
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-white border border-slate-200"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-slate-900">{order.id}</h1>
          <Badge variant="secondary">{order.status.replace("-", " ")}</Badge>
        </div>
      </div>

      {/* QR Code Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900">Verification QR Code</h2>
          <button
            onClick={() => setShowQR(!showQR)}
            className="text-sm font-medium text-accent-600"
          >
            {showQR ? "Hide" : "Show"} QR
          </button>
        </div>

        {showQR ? (
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 mb-4">
              <QRCodeSVG
                value={order.qrCode}
                size={200}
                level="H"
                includeMargin
              />
            </div>
            <p className="text-sm text-slate-500 text-center mb-2">
              Show this QR code at the depot gate
            </p>
            <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg">
              <code className="text-xs font-mono text-slate-600">
                {order.qrCode}
              </code>
              <button onClick={copyQRCode} className="p-1 hover:bg-slate-200 rounded">
                <Copy className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        ) : (
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => setShowQR(true)}
          >
            <QrCode className="w-5 h-5 mr-2" />
            Show QR Code for Verification
          </Button>
        )}
      </motion.div>

      {/* Order Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <h2 className="font-semibold text-slate-900 mb-4">Order Details</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Product</p>
              <p className="font-semibold text-slate-900">
                {order.product.type} - {order.product.name}
              </p>
              <p className="text-sm text-slate-600">
                {formatNumber(order.product.quantity)} litres
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Depot Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <h2 className="font-semibold text-slate-900 mb-4">Depot Information</h2>

        <div className="space-y-4">
          <div>
            <p className="text-lg font-semibold text-slate-900">{order.depot.name}</p>
            <p className="text-sm text-slate-500">Contact: {order.depot.contactPerson}</p>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
            <p className="text-slate-600 flex-1">{order.depot.address}</p>
          </div>

          <div className="flex gap-3">
            <a href={`tel:${order.depot.phone}`} className="flex-1">
              <Button variant="outline" size="md" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Call Depot
              </Button>
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(order.depot.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="md" className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                Navigate
              </Button>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <h2 className="font-semibold text-slate-900 mb-4">Order Timeline</h2>

        <div className="space-y-4">
          {order.timeline.map((step, index) => {
            const isLast = index === order.timeline.length - 1;
            return (
              <div key={step.status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      step.completed
                        ? "bg-success-500 text-white"
                        : step.current
                        ? "bg-accent-500 text-white"
                        : "bg-slate-200 text-slate-400"
                    )}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={cn(
                        "w-0.5 h-8 mt-2",
                        step.completed ? "bg-success-500" : "bg-slate-200"
                      )}
                    />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p
                    className={cn(
                      "font-medium",
                      step.current ? "text-accent-600" : "text-slate-900"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.time && (
                    <p className="text-sm text-slate-500">{step.time}</p>
                  )}
                  {step.current && (
                    <Badge variant="secondary" className="mt-2">
                      Current Step
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Fixed Bottom Action */}
      {currentAction && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-slate-200">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={handleUpdateStatus}
            isLoading={isUpdating}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            {currentAction.label}
          </Button>
        </div>
      )}
    </div>
  );
}
