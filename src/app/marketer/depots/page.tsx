// src/app/marketer/depots/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Shield,
  Grid,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { cn } from "@/lib/utils";
import { mockDepots } from "@/lib/mock-data";

export default function DepotsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All States");

  const states = ["All States", "Lagos", "Rivers", "Delta", "Ogun"];

  const filteredDepots = mockDepots.filter((depot) => {
    const matchesSearch = depot.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === "All States" || depot.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Browse Depots</h1>
          <p className="text-slate-500">Find and compare petroleum depots across Nigeria</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "primary" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "primary" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search depots..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
          >
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <Button variant="outline" size="md">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className={cn(
        "gap-6",
        viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3" : "flex flex-col"
      )}>
        {filteredDepots.map((depot, index) => (
          <motion.div
            key={depot.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/marketer/depots/${depot.id}`}>
              <div className={cn(
                "bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow",
                viewMode === "list" && "flex"
              )}>
                {/* Image Placeholder */}
                <div className={cn(
                  "bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center",
                  viewMode === "grid" ? "h-40" : "w-48 h-full"
                )}>
                  <span className="text-4xl font-bold text-white/30">
                    {depot.name.charAt(0)}
                  </span>
                </div>

                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{depot.name}</h3>
                        {depot.isVerified && (
                          <Shield className="w-4 h-4 text-success-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="w-4 h-4" />
                        {depot.state}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{depot.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {depot.products.slice(0, 3).map((product) => (
                      <Badge key={product.id} variant="primary" size="sm">
                        {product.type}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <span className="text-sm text-slate-500">
                      {depot.reviewCount} reviews
                    </span>
                    <span className="text-sm font-medium text-secondary-600">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredDepots.length === 0 && (
        <div className="py-12 text-center">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">No depots found</h3>
          <p className="text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}