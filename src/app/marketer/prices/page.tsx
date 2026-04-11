"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  MapPin,
  Star,
  Package,
  ArrowUpDown,
  RefreshCcw,
  Bell,
  Eye,
  Info,
  Beaker,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { cn, formatNumber, formatRelativeTime } from "@/lib/utils";

interface ProductSpec {
  color: string;
  colorCode: string;
  density: number;
  source: string;
  flashPoint?: string;
  sulfurContent?: string;
}

interface Product {
  id: string;
  type: string;
  name: string;
  price: number;
  previousPrice: number;
  stock: "high" | "medium" | "low" | "out";
  updatedAt: string;
  specs: ProductSpec;
}

interface DepotPrice {
  id: string;
  depot: string;
  location: string;
  state: string;
  products: Product[];
  rating: number;
  reviewCount: number;
  verified: boolean;
}

const depotPrices: DepotPrice[] = [
  {
    id: "depot-001",
    depot: "Pinnacle Oil & Gas Terminal",
    location: "Apapa Tank Farm, Lagos",
    state: "Lagos",
    products: [
      {
        id: "p1",
        type: "AGO",
        name: "Diesel",
        price: 1150,
        previousPrice: 1145,
        stock: "high",
        updatedAt: "2025-02-19T08:30:00Z",
        specs: {
          color: "Clear Straw",
          colorCode: "#F4E04D",
          density: 845,
          source: "Dangote Refinery",
          sulfurContent: "10 ppm",
          flashPoint: "66°C",
        },
      },
      {
        id: "p2",
        type: "PMS",
        name: "Petrol",
        price: 890,
        previousPrice: 885,
        stock: "high",
        updatedAt: "2025-02-19T08:15:00Z",
        specs: {
          color: "Clear",
          colorCode: "#FAFAFA",
          density: 720,
          source: "Dangote Refinery",
        },
      },
    ],
    rating: 4.8,
    reviewCount: 342,
    verified: true,
  },
  {
    id: "depot-002",
    depot: "Matrix Energy Depot",
    location: "Marine Road, Apapa, Lagos",
    state: "Lagos",
    products: [
      {
        id: "p3",
        type: "AGO",
        name: "Diesel",
        price: 1145,
        previousPrice: 1150,
        stock: "high",
        updatedAt: "2025-02-19T07:45:00Z",
        specs: {
          color: "Light Amber",
          colorCode: "#FBBF24",
          density: 842,
          source: "Import (Rotterdam)",
          sulfurContent: "50 ppm",
        },
      },
    ],
    rating: 4.6,
    reviewCount: 287,
    verified: true,
  },
  {
    id: "depot-003",
    depot: "Oando Supply Terminal",
    location: "Creek Road, Apapa, Lagos",
    state: "Lagos",
    products: [
      {
        id: "p4",
        type: "PMS",
        name: "Petrol",
        price: 892,
        previousPrice: 895,
        stock: "medium",
        updatedAt: "2025-02-19T06:30:00Z",
        specs: {
          color: "Clear",
          colorCode: "#FAFAFA",
          density: 725,
          source: "NNPC Import",
        },
      },
    ],
    rating: 4.5,
    reviewCount: 198,
    verified: true,
  },
  {
    id: "depot-004",
    depot: "MRS Oil Terminal",
    location: "Warri, Delta",
    state: "Delta",
    products: [
      {
        id: "p5",
        type: "AGO",
        name: "Diesel",
        price: 1140,
        previousPrice: 1140,
        stock: "medium",
        updatedAt: "2025-02-19T05:00:00Z",
        specs: {
          color: "Clear Straw",
          colorCode: "#F4E04D",
          density: 840,
          source: "Local Refinery",
          sulfurContent: "15 ppm",
          flashPoint: "65°C",
        },
      },
      {
        id: "p6",
        type: "DPK",
        name: "Kerosene",
        price: 1050,
        previousPrice: 1060,
        stock: "high",
        updatedAt: "2025-02-19T04:30:00Z",
        specs: {
          color: "Water White",
          colorCode: "#F8FAFC",
          density: 790,
          source: "Import",
        },
      },
    ],
    rating: 4.4,
    reviewCount: 156,
    verified: true,
  },
  {
    id: "depot-005",
    depot: "Sahara Energy Terminal",
    location: "Port Harcourt, Rivers",
    state: "Rivers",
    products: [
      {
        id: "p7",
        type: "PMS",
        name: "Petrol",
        price: 885,
        previousPrice: 880,
        stock: "high",
        updatedAt: "2025-02-19T07:00:00Z",
        specs: {
          color: "Clear",
          colorCode: "#FAFAFA",
          density: 722,
          source: "Dangote Refinery",
        },
      },
      {
        id: "p8",
        type: "AGO",
        name: "Diesel",
        price: 1155,
        previousPrice: 1160,
        stock: "low",
        updatedAt: "2025-02-19T06:45:00Z",
        specs: {
          color: "Light Amber",
          colorCode: "#FBBF24",
          density: 843,
          source: "Import (Houston)",
          sulfurContent: "20 ppm",
          flashPoint: "68°C",
        },
      },
    ],
    rating: 4.7,
    reviewCount: 234,
    verified: true,
  },
];

const productFilters = ["All", "AGO", "PMS", "DPK", "LPG"];
const stateFilters = ["All States", "Lagos", "Rivers", "Delta"];

export default function LivePricesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedState, setSelectedState] = useState("All States");
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const filteredDepots = depotPrices.filter((depot) => {
    const matchesSearch = depot.depot
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesProduct =
      selectedProduct === "All" ||
      depot.products.some((p) => p.type === selectedProduct);
    const matchesState =
      selectedState === "All States" || depot.state === selectedState;
    return matchesSearch && matchesProduct && matchesState;
  });

  const getStockColor = (stock: string) => {
    switch (stock) {
      case "high":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-red-600 bg-red-100";
      case "out":
        return "text-slate-600 bg-slate-100";
      default:
        return "text-slate-600 bg-slate-100";
    }
  };

  const getStockLabel = (stock: string) => {
    switch (stock) {
      case "high":
        return "In Stock";
      case "medium":
        return "Medium";
      case "low":
        return "Low Stock";
      case "out":
        return "Out of Stock";
      default:
        return stock;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Live Prices</h1>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live
            </div>
          </div>
          <p className="text-slate-500 mt-1">
            Real-time depot prices with product specifications
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="md">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="secondary" size="md">
            <Bell className="w-4 h-4 mr-2" />
            Set Alert
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search depots..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Product Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {productFilters.map((product) => (
              <button
                key={product}
                onClick={() => setSelectedProduct(product)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap",
                  selectedProduct === product
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {product}
              </button>
            ))}
          </div>

          {/* State Filter */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {stateFilters.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-900">{filteredDepots.length}</span> depots
        </p>
        <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowUpDown className="w-4 h-4" />
          Sort by Price
        </button>
      </div>

      {/* Price Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredDepots.map((depot, index) => (
          <motion.div
            key={depot.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Depot Header */}
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900">
                      {depot.depot}
                    </h3>
                    {depot.verified && (
                      <Badge variant="success" size="sm">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {depot.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-slate-900">
                    {depot.rating}
                  </span>
                  <span className="text-slate-400">({depot.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="p-5">
              <div className="space-y-4">
                {depot.products
                  .filter(
                    (p) => selectedProduct === "All" || p.type === selectedProduct
                  )
                  .map((product) => {
                    const priceChange = product.price - product.previousPrice;
                    const isExpanded = expandedProduct === product.id;

                    return (
                      <div
                        key={product.id}
                        className="rounded-xl border border-slate-200 overflow-hidden transition-all"
                      >
                        {/* Product Summary Row */}
                        <div
                          className="p-4 bg-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() =>
                            setExpandedProduct(isExpanded ? null : product.id)
                          }
                        >
                          <div className="flex items-center gap-3">
                            {/* Color Indicator */}
                            <div
                              className="w-10 h-10 rounded-lg border-2 flex-shrink-0 shadow-sm"
                              style={{
                                backgroundColor: product.specs.colorCode,
                                borderColor: product.specs.colorCode,
                              }}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge variant="primary">{product.type}</Badge>
                                <span className="font-medium text-slate-900">
                                  {product.name}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                Density: {product.specs.density} kg/m³ •{" "}
                                {product.specs.source}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-slate-900">
                              ₦{formatNumber(product.price)}
                              <span className="text-sm font-normal text-slate-500">
                                /ltr
                              </span>
                            </p>
                            <div className="flex items-center justify-end gap-2 mt-1">
                              {priceChange !== 0 && (
                                <span
                                  className={cn(
                                    "text-xs font-medium flex items-center gap-0.5",
                                    priceChange > 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  )}
                                >
                                  {priceChange > 0 ? (
                                    <TrendingUp className="w-3 h-3" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3" />
                                  )}
                                  {priceChange > 0 ? "+" : ""}₦
                                  {Math.abs(priceChange)}
                                </span>
                              )}
                              <Badge
                                size="sm"
                                className={getStockColor(product.stock)}
                              >
                                {getStockLabel(product.stock)}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Product Details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-white"
                            >
                              <div className="p-4 border-t border-slate-200">
                                {/* Specs Header */}
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <Beaker className="w-3 h-3" />
                                  Product Quality & Specifications
                                </h4>

                                {/* Specs Grid */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-slate-500 block text-xs">
                                      Source
                                    </span>
                                    <span className="font-medium text-slate-900">
                                      {product.specs.source}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500 block text-xs">
                                      Density
                                    </span>
                                    <span className="font-medium text-slate-900">
                                      {product.specs.density} kg/m³
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500 block text-xs">
                                      Color
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className="w-3 h-3 rounded-full border border-slate-200"
                                        style={{
                                          backgroundColor:
                                            product.specs.colorCode,
                                        }}
                                      />
                                      <span className="font-medium text-slate-900">
                                        {product.specs.color}
                                      </span>
                                    </div>
                                  </div>
                                  {product.specs.sulfurContent && (
                                    <div>
                                      <span className="text-slate-500 block text-xs">
                                        Sulfur Content
                                      </span>
                                      <span className="font-medium text-slate-900">
                                        {product.specs.sulfurContent}
                                      </span>
                                    </div>
                                  )}
                                  {product.specs.flashPoint && (
                                    <div>
                                      <span className="text-slate-500 block text-xs">
                                        Flash Point
                                      </span>
                                      <span className="font-medium text-slate-900">
                                        {product.specs.flashPoint}
                                      </span>
                                    </div>
                                  )}
                                  <div>
                                    <span className="text-slate-500 block text-xs">
                                      Last Updated
                                    </span>
                                    <span className="font-medium text-slate-900">
                                      {formatRelativeTime(product.updatedAt)}
                                    </span>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
                                  <Link
                                    href={`/marketer/orders/new?depot=${depot.id}&product=${product.id}`}
                                    className="flex-1"
                                  >
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      className="w-full"
                                    >
                                      <Package className="w-4 h-4 mr-2" />
                                      Place Order
                                    </Button>
                                  </Link>
                                  <Link
                                    href={`/marketer/depots/${depot.id}`}
                                    className="flex-1"
                                  >
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-full"
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Depot
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDepots.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No depots found
          </h3>
          <p className="text-slate-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedProduct("All");
              setSelectedState("All States");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
