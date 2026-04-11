// src/components/landing/HeroSection.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  CheckCircle2,
  Fuel,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { formatCompactNumber } from "@/lib/utils";

// Animated counter component
function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : formatCompactNumber(Math.floor(count));

  return (
    <span className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// Live price ticker item type
interface PriceItem {
  product: "AGO" | "PMS" | "DPK";
  price: number;
  change: number;
  depot: string;
  stockLevel: number; // percentage
}

// Live price ticker component with simulated updates
function LivePriceTicker() {
  const [prices, setPrices] = useState<PriceItem[]>([
    { product: "AGO", price: 1150, change: +5, depot: "Pinnacle Oil", stockLevel: 78 },
    { product: "PMS", price: 890, change: -3, depot: "Matrix Energy", stockLevel: 45 },
    { product: "AGO", price: 1145, change: +8, depot: "Sahara Terminal", stockLevel: 92 },
    { product: "DPK", price: 1100, change: 0, depot: "Oando Depot", stockLevel: 23 },
    { product: "PMS", price: 885, change: +2, depot: "MRS Terminal", stockLevel: 67 },
    { product: "AGO", price: 1148, change: -4, depot: "Ardova Depot", stockLevel: 54 },
  ]);

  // Simulate price updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((item) => {
          const fluctuation = Math.floor(Math.random() * 11) - 5; // -5 to +5
          return {
            ...item,
            price: item.price + fluctuation,
            change: fluctuation,
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getProductColor = (product: string) => {
    switch (product) {
      case "AGO": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "PMS": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "DPK": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      default: return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  const getStockColor = (level: number) => {
    if (level >= 70) return "bg-emerald-400";
    if (level >= 40) return "bg-amber-400";
    if (level >= 15) return "bg-orange-400";
    return "bg-red-400";
  };

  return (
    <div className="relative overflow-hidden">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-primary-900/80 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-primary-900/80 to-transparent z-10" />
      
      <motion.div
        className="flex items-center gap-4"
        animate={{ x: [0, -1200] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...prices, ...prices, ...prices].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 whitespace-nowrap min-w-fit"
          >
            {/* Product Badge */}
            <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${getProductColor(item.product)}`}>
              {item.product}
            </span>
            
            {/* Price */}
            <span className="font-bold text-white">₦{item.price.toLocaleString()}</span>
            
            {/* Change */}
            <span
              className={`flex items-center gap-0.5 text-sm font-medium ${
                item.change > 0
                  ? "text-emerald-400"
                  : item.change < 0
                  ? "text-red-400"
                  : "text-white/50"
              }`}
            >
              {item.change > 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : item.change < 0 ? (
                <TrendingDown className="w-3 h-3" />
              ) : null}
              {item.change > 0 ? "+" : ""}{item.change}
            </span>
            
            {/* Stock Level Indicator */}
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getStockColor(item.stockLevel)}`}
                  style={{ width: `${item.stockLevel}%` }}
                />
              </div>
              <span className="text-white/40 text-xs">{item.stockLevel}%</span>
            </div>
            
            {/* Depot Name */}
            <span className="text-white/50 text-sm">{item.depot}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Brent Crude Ticker Component
function BrentCrudeTicker() {
  const [brentData, setBrentData] = useState({
    price: 82.45,
    change: 1.23,
    changePercent: 1.51,
    exchangeRate: 1550,
  });

  // Simulate Brent crude updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBrentData((prev) => {
        const priceChange = (Math.random() - 0.5) * 2; // -1 to +1
        const newPrice = Math.max(70, Math.min(100, prev.price + priceChange));
        return {
          ...prev,
          price: newPrice,
          change: priceChange,
          changePercent: (priceChange / prev.price) * 100,
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-secondary-400" />
        <span className="text-white/60 text-sm">Brent Crude:</span>
      </div>
      <span className="font-bold text-white">${brentData.price.toFixed(2)}</span>
      <span
        className={`text-sm font-medium ${
          brentData.change >= 0 ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {brentData.change >= 0 ? "+" : ""}{brentData.changePercent.toFixed(2)}%
      </span>
      <div className="h-4 w-px bg-white/20" />
      <div className="flex items-center gap-1.5">
        <span className="text-white/60 text-sm">USD/NGN:</span>
        <span className="font-semibold text-white">₦{brentData.exchangeRate.toLocaleString()}</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-800 to-primary-950" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-400/20 rounded-full blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary-500/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-accent-500/10 rounded-full blur-[80px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Brent Crude Ticker - Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <BrentCrudeTicker />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge
                variant="secondary"
                size="lg"
                className="mb-6 bg-secondary-500/20 text-secondary-300 border border-secondary-500/30"
                icon={<Zap className="w-4 h-4" />}
              >
                Nigeria&apos;s #1 Petroleum Trading Platform
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              The Digital{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 via-accent-400 to-secondary-400 animate-gradient">
                  Nervous System
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>{" "}
              for Petroleum Trading
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
              Real-time depot prices, verified stock levels, and secure escrow
              payments. Transform how you buy and sell petroleum products across
              Nigeria.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: TrendingUp, text: "Live Prices" },
                { icon: Shield, text: "Escrow Protected" },
                { icon: CheckCircle2, text: "Verified Stock" },
                { icon: Fuel, text: "50k/Litre Fee" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <feature.icon className="w-4 h-4 text-secondary-400" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="text-base shadow-2xl shadow-secondary-500/30"
              >
                Start Trading Now
              </Button>
              <Button
                variant="ghost"
                size="lg"
                leftIcon={<Play className="w-5 h-5 fill-current" />}
                className="text-white border border-white/20 hover:bg-white/10"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <p className="text-white/40 text-sm mb-4 uppercase tracking-wider">
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                {["IPMAN", "MOMAN", "NUPENG", "NMDPRA"].map((name, index) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-white/30 hover:text-white/50 font-bold text-base sm:text-lg tracking-widest transition-colors cursor-default"
                  >
                    {name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Transaction Volume */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/[0.12] transition-colors"
              >
                <div className="text-white/50 text-sm font-medium mb-2">
                  Transaction Volume
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  ₦<AnimatedCounter value={58.5} suffix="B" decimals={1} />
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">+23% this month</span>
                </div>
              </motion.div>

              {/* Active Depots */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/[0.12] transition-colors"
              >
                <div className="text-white/50 text-sm font-medium mb-2">
                  Active Depots
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter value={127} />
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-medium">Verified & Live</span>
                </div>
              </motion.div>

              {/* Registered Marketers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/[0.12] transition-colors"
              >
                <div className="text-white/50 text-sm font-medium mb-2">
                  Marketers
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter value={3456} suffix="+" />
                </div>
                <div className="flex items-center gap-1.5 text-secondary-400 text-sm">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">Growing daily</span>
                </div>
              </motion.div>

              {/* Platform Fee */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-secondary-500/30 to-secondary-600/20 backdrop-blur-lg rounded-2xl p-6 border border-secondary-500/30 hover:from-secondary-500/40 transition-colors"
              >
                <div className="text-white/70 text-sm font-medium mb-2">
                  Platform Fee
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  50 kobo<span className="text-lg font-normal text-white/60">/L</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Simple & Transparent</span>
                </div>
              </motion.div>
            </div>

            {/* Live Price Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-6 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60 text-sm font-medium">Live Depot Prices</span>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Live</span>
                </div>
              </div>
              <LivePriceTicker />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-400/20 rounded-full blur-[50px] pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}