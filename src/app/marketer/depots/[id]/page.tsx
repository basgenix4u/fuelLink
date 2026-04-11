// src/app/marketer/depots/[id]/page.tsx

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Shield,
  TrendingUp,
  TrendingDown,
  Package,
  Droplets,
  ShoppingCart,
  MessageSquare,
  Share2,
  Heart,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { cn, formatNumber, formatRelativeTime } from "@/lib/utils";

const depotData = {
  id: "depot-001",
  name: "Pinnacle Oil & Gas Terminal",
  address: "Plot 15, Apapa Tank Farm Complex, Apapa",
  state: "Lagos",
  lga: "Apapa",
  phone: "+234 801 234 5678",
  email: "operations@pinnacleoil.com",
  operatingHours: "24/7",
  rating: 4.8,
  reviewCount: 342,
  isVerified: true,
  description: "Pinnacle Oil & Gas Terminal is one of Lagos' premier petroleum storage and distribution facilities. We offer competitive pricing, fast loading times, and excellent customer service. Our 24/7 operations ensure you can always access products when you need them.",
  stats: {
    totalOrders: 2156,
    completedOrders: 2089,
    averageLoadingTime: "35 mins",
    onTimeRate: 96.8,
  },
  products: [
    {
      id: "prod-001",
      type: "AGO",
      name: "Automotive Gas Oil (Diesel)",
      price: 1150,
      previousPrice: 1145,
      stockLevel: "high",
      stockLitres: 3500000,
      specifications: {
        color: "Clear Straw",
        colorCode: "#F4E04D",
        density: "845 kg/m³",
        source: "Dangote Refinery",
        testDate: "2025-02-18",
        sulfurContent: "10 ppm",
        flashPoint: "66°C",
      },
      updatedAt: "2025-02-19T08:30:00Z",
    },
    {
      id: "prod-002",
      type: "PMS",
      name: "Premium Motor Spirit (Petrol)",
      price: 890,
      previousPrice: 885,
      stockLevel: "high",
      stockLitres: 2800000,
      specifications: {
        color: "Clear",
        colorCode: "#FAFAFA",
        density: "720 kg/m³",
        source: "Dangote Refinery",
        testDate: "2025-02-18",
        octaneRating: "91 RON",
      },
      updatedAt: "2025-02-19T08:15:00Z",
    },
    {
      id: "prod-003",
      type: "DPK",
      name: "Dual Purpose Kerosene",
      price: 1100,
      previousPrice: 1100,
      stockLevel: "medium",
      stockLitres: 800000,
      specifications: {
        color: "Water White",
        colorCode: "#E0F7FA",
        density: "780 kg/m³",
        source: "NNPC Import",
        testDate: "2025-02-17",
        flashPoint: "38°C",
      },
      updatedAt: "2025-02-18T16:00:00Z",
    },
  ],
  recentReviews: [
    {
      id: "rev-1",
      customer: "Sahara Energy",
      rating: 5,
      comment: "Excellent service! Fast loading and competitive prices.",
      date: "2025-02-18",
    },
    {
      id: "rev-2",
      customer: "Matrix Petroleum",
      rating: 4,
      comment: "Good experience. Would appreciate faster gate processing.",
      date: "2025-02-17",
    },
    {
      id: "rev-3",
      customer: "Golden Oil",
      rating: 5,
      comment: "Best depot in Apapa. Always reliable.",
      date: "2025-02-16",
    },
  ],
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-5 h-5",
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"
          )}
        />
      ))}
    </div>
  );
}

function getStockColor(level: string) {
  switch (level) {
    case "high": return "text-success-600 bg-success-100";
    case "medium": return "text-warning-600 bg-warning-100";
    case "low": return "text-danger-600 bg-danger-100";
    default: return "text-slate-600 bg-slate-100";
  }
}

export default function DepotDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(depotData.products[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  const depot = depotData;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{depot.name}</h1>
          <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {depot.address}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              "p-2 rounded-xl border transition-colors",
              isFavorite
                ? "bg-danger-50 border-danger-200 text-danger-500"
                : "bg-white border-slate-200 text-slate-400 hover:text-danger-500"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
          <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-600">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Depot Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {depot.isVerified && (
                <Badge variant="success" className="gap-1">
                  <Shield className="w-3 h-3" />
                  Verified Depot
                </Badge>
              )}
              <div className="flex items-center gap-2">
                <StarRating rating={Math.round(depot.rating)} />
                <span className="font-semibold text-slate-900">{depot.rating}</span>
                <span className="text-slate-500">({depot.reviewCount} reviews)</span>
              </div>
            </div>

            <p className="text-slate-600 mb-6">{depot.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 text-center">
                <p className="text-2xl font-bold text-slate-900">{depot.stats.totalOrders.toLocaleString()}</p>
                <p className="text-sm text-slate-500">Total Orders</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 text-center">
                <p className="text-2xl font-bold text-success-600">{depot.stats.onTimeRate}%</p>
                <p className="text-sm text-slate-500">On-Time Rate</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 text-center">
                <p className="text-2xl font-bold text-slate-900">{depot.stats.averageLoadingTime}</p>
                <p className="text-sm text-slate-500">Avg. Loading</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 text-center">
                <p className="text-2xl font-bold text-slate-900">{depot.operatingHours}</p>
                <p className="text-sm text-slate-500">Operating</p>
              </div>
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900">Available Products</h2>
            </div>

            <div className="divide-y divide-slate-100">
              {depot.products.map((product) => {
                const priceChange = product.price - product.previousPrice;
                const isSelected = selectedProduct.id === product.id;

                return (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={cn(
                      "p-6 cursor-pointer transition-colors",
                      isSelected ? "bg-secondary-50" : "hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl border-2"
                          style={{
                            backgroundColor: product.specifications.colorCode,
                            borderColor: product.specifications.colorCode,
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="primary">{product.type}</Badge>
                            <Badge size="sm" className={getStockColor(product.stockLevel)}>
                              {product.stockLevel.toUpperCase()}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-slate-900">{product.name}</h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {formatNumber(product.stockLitres)} litres available
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900">
                          ₦{formatNumber(product.price)}
                        </p>
                        <p className="text-sm text-slate-500">per litre</p>
                        {priceChange !== 0 && (
                          <div className={cn(
                            "flex items-center justify-end gap-1 text-sm mt-1",
                            priceChange > 0 ? "text-success-600" : "text-danger-600"
                          )}>
                            {priceChange > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            {priceChange > 0 ? "+" : ""}₦{priceChange}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Specifications (show when selected) */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-slate-200"
                      >
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Product Specifications</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {Object.entries(product.specifications).map(([key, value]) => {
                            if (key === "colorCode") return null;
                            return (
                              <div key={key}>
                                <p className="text-xs text-slate-500 capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </p>
                                <p className="font-medium text-slate-900">{value}</p>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Recent Reviews</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>

            <div className="divide-y divide-slate-100">
              {depot.recentReviews.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">{review.customer}</p>
                      <p className="text-sm text-slate-500">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-slate-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Order Card */}
        <div className="space-y-6">
          {/* Quick Order Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Place Order</h2>

            <div className="p-4 rounded-xl bg-slate-50 mb-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="primary">{selectedProduct.type}</Badge>
                <Badge size="sm" className={getStockColor(selectedProduct.stockLevel)}>
                  {selectedProduct.stockLevel}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                ₦{formatNumber(selectedProduct.price)}/L
              </p>
              <p className="text-sm text-slate-500">{selectedProduct.name}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-success-500" />
                <span className="text-slate-600">Escrow protected transaction</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-success-500" />
                <span className="text-slate-600">QR verification at loading</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-success-500" />
                <span className="text-slate-600">Real-time order tracking</span>
              </div>
            </div>

            <Link href={`/marketer/orders/new?depot=${depot.id}&product=${selectedProduct.id}`}>
              <Button variant="secondary" size="lg" className="w-full">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order {selectedProduct.type}
              </Button>
            </Link>

            <Button variant="outline" size="md" className="w-full mt-3">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Depot
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <a href={`tel:${depot.phone}`} className="font-medium text-slate-900 hover:text-primary-600">
                    {depot.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <a href={`mailto:${depot.email}`} className="font-medium text-slate-900 hover:text-primary-600">
                    {depot.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Operating Hours</p>
                  <p className="font-medium text-slate-900">{depot.operatingHours}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}