// src/app/depot/prices/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Save,
  RefreshCcw,
  History,
  AlertCircle,
  CheckCircle2,
  Radio,
  Fuel,
  Info,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge, StockLevelBadge } from "@/components/shared/Badge";
import { cn, formatCurrency, formatNumber, formatRelativeTime } from "@/lib/utils";
import toast from "react-hot-toast";

interface Product {
  id: string;
  type: "AGO" | "PMS" | "DPK" | "LPG";
  name: string;
  currentPrice: number;
  previousPrice: number;
  newPrice: number;
  stockPercentage: number; // 0-100
  tankCapacity: number;
  lastUpdated: string;
  priceHistory: { price: number; timestamp: string }[];
}

const initialProducts: Product[] = [
  {
    id: "prod-001",
    type: "AGO",
    name: "Automotive Gas Oil (Diesel)",
    currentPrice: 1150,
    previousPrice: 1145,
    newPrice: 1150,
    stockPercentage: 70,
    tankCapacity: 5000000,
    lastUpdated: "2025-02-19T08:30:00Z",
    priceHistory: [
      { price: 1150, timestamp: "2025-02-19T08:30:00Z" },
      { price: 1145, timestamp: "2025-02-18T16:00:00Z" },
      { price: 1140, timestamp: "2025-02-18T08:00:00Z" },
      { price: 1135, timestamp: "2025-02-17T08:00:00Z" },
    ],
  },
  {
    id: "prod-002",
    type: "PMS",
    name: "Premium Motor Spirit (Petrol)",
    currentPrice: 890,
    previousPrice: 885,
    newPrice: 890,
    stockPercentage: 85,
    tankCapacity: 4000000,
    lastUpdated: "2025-02-19T08:15:00Z",
    priceHistory: [
      { price: 890, timestamp: "2025-02-19T08:15:00Z" },
      { price: 885, timestamp: "2025-02-18T16:00:00Z" },
      { price: 880, timestamp: "2025-02-18T08:00:00Z" },
    ],
  },
  {
    id: "prod-003",
    type: "DPK",
    name: "Dual Purpose Kerosene",
    currentPrice: 1100,
    previousPrice: 1100,
    newPrice: 1100,
    stockPercentage: 45,
    tankCapacity: 1500000,
    lastUpdated: "2025-02-18T16:00:00Z",
    priceHistory: [
      { price: 1100, timestamp: "2025-02-18T16:00:00Z" },
      { price: 1095, timestamp: "2025-02-17T08:00:00Z" },
    ],
  },
  {
    id: "prod-004",
    type: "LPG",
    name: "Liquefied Petroleum Gas",
    currentPrice: 1250,
    previousPrice: 1250,
    newPrice: 1250,
    stockPercentage: 12,
    tankCapacity: 1000000,
    lastUpdated: "2025-02-17T12:00:00Z",
    priceHistory: [
      { price: 1250, timestamp: "2025-02-17T12:00:00Z" },
    ],
  },
];

const productColors: Record<string, string> = {
  AGO: "from-amber-500 to-amber-600",
  PMS: "from-blue-500 to-blue-600",
  DPK: "from-cyan-500 to-cyan-600",
  LPG: "from-purple-500 to-purple-600",
};

export default function PriceManagementPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePriceChange = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, newPrice: Math.max(0, newPrice) } : p
      )
    );
    setHasChanges(true);
  };

  const handleStockChange = (productId: string, newPercentage: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId 
          ? { ...p, stockPercentage: Math.min(100, Math.max(0, newPercentage)) } 
          : p
      )
    );
    setHasChanges(true);
  };

  const handleSavePrice = async (productId: string) => {
    setIsSaving(true);
    const product = products.find((p) => p.id === productId);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              previousPrice: p.currentPrice,
              currentPrice: p.newPrice,
              lastUpdated: new Date().toISOString(),
              priceHistory: [
                { price: p.newPrice, timestamp: new Date().toISOString() },
                ...p.priceHistory.slice(0, 9), // Keep last 10
              ],
            }
          : p
      )
    );

    toast.success(
      <div>
        <span className="font-semibold">{product?.type}</span> price updated to{" "}
        <span className="font-semibold">₦{product?.newPrice?.toLocaleString()}</span>
      </div>
    );
    setIsSaving(false);
  };

  const handleBroadcastAll = async () => {
    setIsSaving(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const updatedCount = products.filter(p => p.newPrice !== p.currentPrice).length;

    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        previousPrice: p.currentPrice,
        currentPrice: p.newPrice,
        lastUpdated: new Date().toISOString(),
        priceHistory: [
          { price: p.newPrice, timestamp: new Date().toISOString() },
          ...p.priceHistory.slice(0, 9),
        ],
      }))
    );

    toast.success(`${updatedCount} price${updatedCount !== 1 ? 's' : ''} updated and broadcasted to all marketers!`);
    setIsSaving(false);
    setHasChanges(false);
  };

  const handleResetPrices = () => {
    setProducts((prev) =>
      prev.map((p) => ({ ...p, newPrice: p.currentPrice }))
    );
    setHasChanges(false);
    toast.success("Prices reset to current values");
  };

  const changedProducts = products.filter(p => p.newPrice !== p.currentPrice);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Price Management</h1>
          <p className="text-slate-500 mt-1">
            Update your product prices in real-time. Changes are instantly broadcast to all marketers.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {hasChanges && (
            <Button variant="ghost" size="md" onClick={handleResetPrices}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Reset Changes
            </Button>
          )}
          <Button
            variant="primary"
            size="md"
            onClick={handleBroadcastAll}
            isLoading={isSaving}
            disabled={!hasChanges}
            leftIcon={<Radio className="w-4 h-4" />}
          >
            Broadcast All Prices {changedProducts.length > 0 && `(${changedProducts.length})`}
          </Button>
        </div>
      </div>

      {/* Platform Fee Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-5 flex items-start gap-4"
      >
        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
          <Fuel className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-green-900 mb-1">
            Platform Fee: ₦0.25 per litre
          </h3>
          <p className="text-sm text-green-700">
            This fee is automatically deducted from your settlement when orders are completed. 
            Marketers also pay ₦0.25/litre, making it a fair split.
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-green-600 uppercase tracking-wider">Example</p>
          <p className="text-lg font-bold text-green-800">33,000L = ₦8,250</p>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {products.map((product, index) => {
          const priceChange = product.newPrice - product.currentPrice;
          const percentChange =
            product.currentPrice > 0
              ? ((priceChange / product.currentPrice) * 100).toFixed(1)
              : "0.0";
          const isChanged = product.newPrice !== product.currentPrice;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all duration-200",
                isChanged
                  ? "border-secondary-400 shadow-lg shadow-secondary-500/10"
                  : "border-slate-100 hover:border-slate-200"
              )}
            >
              {/* Product Color Bar */}
              <div className={cn(
                "h-1.5 bg-gradient-to-r",
                productColors[product.type]
              )} />

              {/* Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r",
                        productColors[product.type]
                      )}>
                        {product.type}
                      </span>
                      <StockLevelBadge 
                        percentage={product.stockPercentage} 
                        showPercentage={true}
                      />
                    </div>
                    <p className="text-slate-600 text-sm">{product.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Current Price</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ₦{formatNumber(product.currentPrice)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price & Stock Input */}
              <div className="p-6 space-y-5">
                {/* Price Input */}
                <div>
                  <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
                    <span>New Price (₦ per litre)</span>
                    {isChanged && (
                      <span className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full",
                        priceChange > 0 
                          ? "bg-red-100 text-red-600" 
                          : "bg-green-100 text-green-600"
                      )}>
                        {priceChange > 0 ? "↑" : "↓"} ₦{Math.abs(priceChange)} ({percentChange}%)
                      </span>
                    )}
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₦</span>
                      <input
                        type="number"
                        value={product.newPrice}
                        onChange={(e) => handlePriceChange(product.id, Number(e.target.value))}
                        className={cn(
                          "w-full pl-10 pr-4 py-3 border rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 transition-all",
                          isChanged
                            ? "border-secondary-300 bg-secondary-50 focus:ring-secondary-500"
                            : "border-slate-200 bg-white focus:ring-primary-500"
                        )}
                        min="0"
                        step="1"
                      />
                    </div>
                    <Button
                      variant={isChanged ? "secondary" : "outline"}
                      size="lg"
                      onClick={() => handleSavePrice(product.id)}
                      disabled={!isChanged || isSaving}
                      className="px-4"
                    >
                      <Save className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Stock Level Slider */}
                <div>
                  <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-3">
                    <span>Tank Stock Level</span>
                    <span className="text-slate-500">{product.stockPercentage}%</span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={product.stockPercentage}
                      onChange={(e) => handleStockChange(product.id, Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary-500"
                    />
                    {/* Visual bar under slider */}
                    <div className="absolute top-0 left-0 h-3 rounded-full pointer-events-none overflow-hidden w-full">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all",
                          product.stockPercentage >= 70 && "bg-emerald-500",
                          product.stockPercentage >= 40 && product.stockPercentage < 70 && "bg-amber-500",
                          product.stockPercentage >= 15 && product.stockPercentage < 40 && "bg-orange-500",
                          product.stockPercentage < 15 && "bg-red-500"
                        )}
                        style={{ width: `${product.stockPercentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Empty</span>
                    <span>Full</span>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center justify-between text-sm text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Updated {formatRelativeTime(product.lastUpdated)}
                  </span>
                  <button
                    onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                    className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <History className="w-4 h-4" />
                    {selectedProduct === product.id ? "Hide History" : "Price History"}
                  </button>
                </div>

                {/* Price History */}
                {selectedProduct === product.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-slate-100"
                  >
                    <div className="space-y-2">
                      {product.priceHistory.slice(0, 5).map((history, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "flex items-center justify-between py-2 px-3 rounded-lg",
                            idx === 0 ? "bg-primary-50" : "bg-slate-50"
                          )}
                        >
                          <span className={cn(
                            "font-semibold",
                            idx === 0 ? "text-primary-700" : "text-slate-700"
                          )}>
                            ₦{formatNumber(history.price)}
                          </span>
                          <span className="text-sm text-slate-500">
                            {formatRelativeTime(history.timestamp)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Price Adjustment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Quick Adjustment</h2>
            <p className="text-sm text-slate-500">Apply a percentage change to all products at once</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {[-10, -5, -2, -1, 1, 2, 5, 10].map((percent) => (
            <button
              key={percent}
              onClick={() => {
                setProducts((prev) =>
                  prev.map((p) => ({
                    ...p,
                    newPrice: Math.round(p.currentPrice * (1 + percent / 100)),
                  }))
                );
                setHasChanges(true);
                toast.success(`Applied ${percent > 0 ? "+" : ""}${percent}% to all prices`);
              }}
              className={cn(
                "px-5 py-2.5 rounded-xl font-semibold transition-all",
                percent > 0
                  ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                  : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
              )}
            >
              {percent > 0 ? "+" : ""}{percent}%
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
