// src/components/landing/HowItWorksSection.tsx

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import {
  Building2,
  ShoppingCart,
  Search,
  FileCheck,
  CreditCard,
  QrCode,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Package,
  Shield,
  Send,
  Truck,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

type UserType = "marketer" | "depot";

const userTabs: { id: UserType; label: string; description: string; icon: React.ElementType }[] = [
  { 
    id: "marketer", 
    label: "For Marketers", 
    description: "Buy petroleum products securely",
    icon: ShoppingCart 
  },
  { 
    id: "depot", 
    label: "For Depot Owners", 
    description: "Sell and manage inventory",
    icon: Building2 
  },
];

const steps: Record<UserType, { icon: React.ElementType; title: string; description: string; highlight?: string }[]> = {
  marketer: [
    {
      icon: Search,
      title: "Browse Live Prices",
      description: "See real-time prices from all participating depots. Compare by product type, location, stock level, and rating.",
      highlight: "Real-time updates every 30 seconds",
    },
    {
      icon: TrendingUp,
      title: "Compare & Analyze",
      description: "View detailed depot profiles with product specifications, current stock levels (%), and verified customer reviews.",
      highlight: "Stock levels shown as percentages",
    },
    {
      icon: CreditCard,
      title: "Place Secure Order",
      description: "Select volume, enter truck details, and pay securely. Your payment is held in escrow until loading is confirmed.",
      highlight: "Only ₦0.25/litre platform fee",
    },
    {
      icon: QrCode,
      title: "Get Your QR Code",
      description: "Receive a unique QR code for each order. Give this to your driver for depot verification and loading authorization.",
      highlight: "One QR code per truck/order",
    },
    {
      icon: CheckCircle2,
      title: "Confirm & Complete",
      description: "Once loading is verified at the depot, confirm receipt to release payment. Rate your experience to help other traders.",
      highlight: "Escrow releases automatically",
    },
  ],
  depot: [
    {
      icon: TrendingUp,
      title: "Update Your Prices",
      description: "Set and update prices instantly from your dashboard. Broadcast to all marketers across Nigeria in real-time.",
      highlight: "One-click price broadcasting",
    },
    {
      icon: Package,
      title: "Manage Inventory",
      description: "Track tank capacity as percentages, set low-stock alerts, and manage capacity across all your products.",
      highlight: "Visual tank level indicators",
    },
    {
      icon: Shield,
      title: "Receive Secured Orders",
      description: "Get instant notifications for new orders. Payment is already secured in escrow before you accept—no payment risk.",
      highlight: "100% payment guaranteed",
    },
    {
      icon: QrCode,
      title: "Verify & Load",
      description: "Scan the driver's QR code to verify authorization instantly. System confirms order details, volume, and payment status.",
      highlight: "Tamper-proof verification",
    },
    {
      icon: Send,
      title: "Confirm & Get Paid",
      description: "Confirm loading completion to trigger instant payment release to your FuelLink wallet. Withdraw anytime.",
      highlight: "Instant settlement",
    },
  ],
};

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<UserType>("marketer");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-slate-50 overflow-hidden" id="how-it-works">
      <Container size="wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Simple Steps to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Smarter Trading
              </span>
            </h2>
            <p className="text-lg text-slate-600">
              Whether you&apos;re buying or selling, FuelLink makes petroleum trading 
              effortless, secure, and transparent.
            </p>
          </motion.div>
        </div>

        {/* User Type Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-xl border border-slate-100 gap-2">
            {userTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className={cn(
                    "text-xs font-normal",
                    activeTab === tab.id ? "text-white/70" : "text-slate-400"
                  )}>
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Steps Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Desktop: Horizontal Steps */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-5 gap-4 relative">
                {/* Connecting Line */}
                <div className="absolute top-20 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

                {steps[activeTab].map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Step Circle */}
                    <div className="flex justify-center mb-8">
                      <div className="relative">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center z-10 relative border-2 border-primary-100 group-hover:border-primary-300 group-hover:shadow-2xl transition-all duration-300">
                          <step.icon className="w-8 h-8 text-primary-500" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 group-hover:shadow-xl group-hover:border-primary-100 transition-all duration-300 h-full">
                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>
                      {step.highlight && (
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-full px-3 py-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {step.highlight}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile: Vertical Steps */}
            <div className="lg:hidden space-y-4">
              {steps[activeTab].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  {/* Left: Icon & Line */}
                  <div className="flex flex-col items-center">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center border-2 border-primary-100">
                        <step.icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                        {index + 1}
                      </div>
                    </div>
                    {index < steps[activeTab].length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-300 to-primary-100 mt-4 rounded-full" />
                    )}
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>
                      {step.highlight && (
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-full px-3 py-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {step.highlight}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-3 border-white flex items-center justify-center text-white text-sm font-bold shadow-lg"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <p className="font-bold text-slate-900 text-lg">
                  Join 3,000+ traders already on FuelLink
                </p>
                <p className="text-slate-500">
                  Start trading in less than 5 minutes
                </p>
              </div>
              <Button 
                variant="primary" 
                size="lg" 
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="whitespace-nowrap"
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}