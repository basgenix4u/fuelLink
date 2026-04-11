// src/components/marketer/LivePriceTicker.tsx

"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Radio } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const livePrices = [
  { depot: "Pinnacle Oil", product: "AGO", price: 1150, change: 5 },
  { depot: "Matrix Energy", product: "AGO", price: 1145, change: -5 },
  { depot: "Sahara Terminal", product: "PMS", price: 888, change: 3 },
  { depot: "Oando Depot", product: "AGO", price: 1155, change: 0 },
  { depot: "Ardova Depot", product: "PMS", price: 875, change: 5 },
  { depot: "MRS Terminal", product: "DPK", price: 1100, change: -2 },
  { depot: "Dangote Refinery", product: "AGO", price: 1120, change: 5 },
  { depot: "PHRC", product: "PMS", price: 865, change: 5 },
];

export function LivePriceTicker() {
  // Duplicate for seamless loop
  const duplicatedPrices = [...livePrices, ...livePrices, ...livePrices];

  return (
    <div className="bg-slate-900 text-white overflow-hidden">
      <div className="flex items-center">
        {/* Live Badge */}
        <div className="flex-shrink-0 px-4 py-2 bg-danger-500 flex items-center gap-2">
          <Radio className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-bold uppercase tracking-wider">Live</span>
        </div>

        {/* Scrolling Prices */}
        <div className="flex-1 overflow-hidden py-2">
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{
              x: ["0%", "-33.33%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedPrices.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4"
              >
                <span className="text-white/60 text-sm">{item.depot}</span>
                <span className="px-2 py-0.5 bg-white/10 rounded text-xs font-bold">
                  {item.product}
                </span>
                <span className="font-bold">₦{formatNumber(item.price)}</span>
                {item.change !== 0 && (
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-sm",
                      item.change > 0 ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {item.change > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {item.change > 0 ? "+" : ""}
                    {item.change}
                  </span>
                )}
                <span className="text-white/20">|</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}