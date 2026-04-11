// src/components/landing/PricingSection.tsx

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import {
  Check,
  Sparkles,
  Calculator,
  HelpCircle,
  Fuel,
  Shield,
  Zap,
  Building2,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { cn, formatCurrency } from "@/lib/utils";

// Fee calculator component
function FeeCalculator() {
  const [volume, setVolume] = useState(33000);
  const FEE_PER_LITRE = 0.50; // Total fee (25k marketer + 25k depot)
  const FEE_PER_PARTY = 0.25;
  
  const totalFee = volume * FEE_PER_LITRE;
  const feePerParty = volume * FEE_PER_PARTY;

  const presets = [
    { label: "33,000L", value: 33000 },
    { label: "45,000L", value: 45000 },
    { label: "100,000L", value: 100000 },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary-600" />
        <h4 className="font-semibold text-slate-900">Fee Calculator</h4>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => setVolume(preset.value)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              volume === preset.value
                ? "bg-primary-500 text-white shadow-lg"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom Input */}
      <div className="mb-5">
        <label className="block text-sm text-slate-600 mb-2">
          Custom volume (litres)
        </label>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-lg font-semibold"
          placeholder="Enter volume"
        />
      </div>

      {/* Result */}
      <div className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-xl p-5 border border-primary-100">
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-primary-200/50">
            <span className="text-slate-600">Volume</span>
            <span className="font-bold text-slate-900">{volume.toLocaleString()} L</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-secondary-500" />
              <span className="text-slate-600">Marketer pays</span>
            </div>
            <span className="font-semibold text-slate-900">{formatCurrency(feePerParty)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary-500" />
              <span className="text-slate-600">Depot pays</span>
            </div>
            <span className="font-semibold text-slate-900">{formatCurrency(feePerParty)}</span>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-primary-200/50">
            <span className="font-semibold text-slate-900">Platform Total</span>
            <span className="text-xl font-bold text-primary-600">{formatCurrency(totalFee)}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-4 flex items-start gap-1.5">
        <HelpCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
        Fee is automatically calculated and deducted when transactions complete.
      </p>
    </div>
  );
}

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = {
    marketer: [
      "Access all depot prices in real-time",
      "Escrow protection on every transaction",
      "QR code verification for pickups",
      "In-app messaging with depots",
      "Order tracking & history",
      "Price alerts & notifications",
      "Dispute resolution support",
    ],
    depot: [
      "Broadcast prices to all marketers instantly",
      "Receive orders with guaranteed payment",
      "QR verification system for loading",
      "In-app messaging with buyers",
      "Analytics & insights dashboard",
      "Inventory tracking tools",
      "Customer ratings & reviews",
    ],
  };

  return (
    <section ref={ref} id="pricing" className="py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <Container size="wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Simple Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              One Simple Fee.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Fair for Everyone.
              </span>
            </h2>
            <p className="text-lg text-slate-600">
              No subscriptions. No hidden charges. No monthly fees.<br />
              Just <span className="font-bold text-primary-600">₦0.25 per litre</span> from each party when a transaction completes.
            </p>
          </motion.div>
        </div>

        {/* Main Pricing Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                  <Fuel className="w-5 h-5 text-secondary-400" />
                  <span className="text-white/90 font-medium">Transaction-Based Pricing</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  ₦0.25<span className="text-2xl font-normal text-white/70">/litre</span>
                </h3>
                <p className="text-xl text-white/80 mb-6">
                  per party, per transaction
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Marketers pay ₦0.25/L</p>
                      <p className="text-sm text-white/70">Added to order total</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Depots pay ₦0.25/L</p>
                      <p className="text-sm text-white/70">Deducted from settlement</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/80">
                  <Shield className="w-5 h-5" />
                  <span>Only charged when transactions complete successfully</span>
                </div>
              </div>
              
              <FeeCalculator />
            </div>
          </div>
        </motion.div>

        {/* What You Get - Two Columns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* For Marketers */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-secondary-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">For Marketers</h3>
                <p className="text-slate-500">Everything you need to buy</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {benefits.marketer.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button variant="secondary" size="lg" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
              Start as Marketer
            </Button>
          </div>

          {/* For Depot Owners */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">For Depot Owners</h3>
                <p className="text-slate-500">Everything you need to sell</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {benefits.depot.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
              Start as Depot
            </Button>
          </div>
        </motion.div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-100 rounded-2xl p-8 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-slate-900 mb-2">
              Why 25 kobo from each party?
            </h4>
            <p className="text-slate-600 mb-4">
              We believe in fair value exchange. Both marketers and depots benefit from FuelLink - 
              marketers get price transparency and security, depots get exposure and guaranteed payments. 
              Splitting the fee means both parties invest equally in the platform that serves them both.
            </p>
            <Button variant="ghost" size="md">
              Read FAQs
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}