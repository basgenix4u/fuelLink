// src/components/landing/SolutionSection.tsx

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp,
  Shield,
  Gauge,
  QrCode,
  Bell,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/shared/Button";

const solutions = [
  {
    icon: TrendingUp,
    title: "Real-Time Pricing",
    description:
      "See live depot prices across Nigeria. No more phone calls. No more guesswork. Make informed decisions in seconds.",
    features: ["Live price updates", "Price history charts", "Price alerts"],
    color: "from-primary-500 to-primary-600",
    lightColor: "bg-primary-50",
    iconColor: "text-primary-500",
  },
  {
    icon: Gauge,
    title: "Verified Stock Levels",
    description:
      "Know exactly what's available before you dispatch. Real-time inventory tracking prevents wasted trips.",
    features: ["Tank level monitoring", "Stock alerts", "Availability status"],
    color: "from-secondary-500 to-secondary-600",
    lightColor: "bg-secondary-50",
    iconColor: "text-secondary-500",
  },
  {
    icon: Shield,
    title: "Escrow Protection",
    description:
      "Your money is safe until loading is confirmed. Bank-grade security for transactions worth millions.",
    features: ["Funds protection", "Dual confirmation", "Dispute resolution"],
    color: "from-accent-500 to-accent-600",
    lightColor: "bg-accent-50",
    iconColor: "text-accent-600",
  },
  {
    icon: QrCode,
    title: "QR Verification",
    description:
      "Unique QR codes for every order. Scan to verify trucks, prevent fraud, and create digital audit trails.",
    features: ["Instant verification", "Loading authorization", "Digital records"],
    color: "from-purple-500 to-purple-600",
    lightColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Set price targets and get notified instantly. Never miss a good deal again.",
    features: ["Price drop alerts", "Stock notifications", "Order updates"],
    color: "from-pink-500 to-pink-600",
    lightColor: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Powerful insights into market trends, your transaction history, and optimization opportunities.",
    features: ["Transaction history", "Market trends", "Profitability reports"],
    color: "from-cyan-500 to-cyan-600",
    lightColor: "bg-cyan-50",
    iconColor: "text-cyan-500",
  },
];

const comparisonData = [
  {
    metric: "Price Discovery",
    before: "2-4 hours",
    after: "< 30 seconds",
    improvement: "99%",
  },
  {
    metric: "Transaction Security",
    before: "None",
    after: "Escrow Protected",
    improvement: "100%",
  },
  {
    metric: "Stock Verification",
    before: "Trust-based",
    after: "Real-time",
    improvement: "100%",
  },
  {
    metric: "Payment Settlement",
    before: "24-72 hours",
    after: "Instant",
    improvement: "95%",
  },
];

export function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <Container size="wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              <Zap className="w-4 h-4" />
              The FuelLink Solution
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Transform{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Chaos into Clarity
              </span>
            </h2>
            <p className="text-lg text-slate-600">
              FuelLink provides everything you need to trade petroleum products
              with confidence, speed, and security.
            </p>
          </motion.div>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient Border on Hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${solution.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}
              />

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${solution.lightColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <solution.icon className={`w-7 h-7 ${solution.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {solution.title}
              </h3>
              <p className="text-slate-600 mb-6">{solution.description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {solution.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                The FuelLink Difference
              </h3>
              <p className="text-white/80 max-w-2xl mx-auto">
                See how FuelLink transforms every aspect of petroleum trading
              </p>
            </div>

            {/* Comparison Table */}
            <div className="grid md:grid-cols-4 gap-6">
              {comparisonData.map((item, index) => (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <p className="text-white/70 text-sm mb-4">{item.metric}</p>
                  
                  {/* Before */}
                  <div className="mb-4">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                      Before
                    </p>
                    <p className="text-lg font-semibold text-red-300 line-through decoration-red-400/50">
                      {item.before}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center mb-4">
                    <ArrowRight className="w-5 h-5 text-secondary-400 rotate-90" />
                  </div>

                  {/* After */}
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                      With FuelLink
                    </p>
                    <p className="text-lg font-bold text-secondary-400">
                      {item.after}
                    </p>
                  </div>

                  {/* Improvement Badge */}
                  <div className="mt-4 inline-flex items-center gap-1 bg-secondary-500/20 text-secondary-300 px-3 py-1 rounded-full text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    {item.improvement} better
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Button
                variant="white"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Start Your Transformation
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}