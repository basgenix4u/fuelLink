// src/app/marketer/layout.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  Building2,
  ShoppingCart,
  Wallet,
  Bell as BellIcon,
  Calculator,
  Truck,
  Settings,
  HelpCircle,
  Menu,
  X,
  Search,
  ChevronDown,
  LogOut,
  User,
  Factory,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Badge } from "@/components/shared/Badge";
import { LivePriceTicker } from "@/components/marketer/LivePriceTicker";
import { FloatingCalculator } from "@/components/marketer/FloatingCalculator";
import { CalculatorToggle } from "@/components/marketer/CalculatorToggle";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { label: "Dashboard", href: "/marketer", icon: LayoutDashboard },
  { label: "Live Prices", href: "/marketer/prices", icon: TrendingUp },
  { label: "Refineries", href: "/marketer/refineries", icon: Factory },
  { label: "Depots", href: "/marketer/depots", icon: Building2 },
  { label: "My Orders", href: "/marketer/orders", icon: ShoppingCart, badge: "3" },
  { label: "Wallet", href: "/marketer/wallet", icon: Wallet },
  { label: "Price Alerts", href: "/marketer/alerts", icon: BellIcon },
  { label: "My Fleet", href: "/marketer/fleet", icon: Truck },
  { label: "Settings", href: "/marketer/settings", icon: Settings },
];

export default function MarketerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const user = {
    name: "Sahara Energy Resources",
    email: "orders@saharaenergy.ng",
    avatar: "S",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Live Price Ticker - Always on Top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LivePriceTicker />
      </div>

      {/* Sidebar - Desktop */}
      <aside className="fixed top-[40px] left-0 bottom-0 z-40 w-64 bg-white border-r border-slate-200 hidden lg:block">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-slate-100">
            <Logo variant="default" size="md" />
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/marketer" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                    isActive
                      ? "bg-secondary-50 text-secondary-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <link.icon
                    className={cn(
                      "w-5 h-5",
                      isActive ? "text-secondary-500" : "text-slate-400"
                    )}
                  />
                  <span className="flex-1">{link.label}</span>
                  {link.badge && (
                    <Badge variant="secondary" size="sm">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Calculator Quick Access */}
          <div className="p-4 border-t border-slate-100">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-medium hover:shadow-lg transition-shadow"
            >
              <Calculator className="w-5 h-5" />
              <span>Profit Calculator</span>
            </button>
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500">Marketer</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden"
            >
              <div className="flex flex-col h-full pt-[40px]">
                <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
                  <Logo variant="default" size="md" />
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  {sidebarLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/marketer" && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                          isActive
                            ? "bg-secondary-50 text-secondary-600"
                            : "text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        <link.icon
                          className={cn(
                            "w-5 h-5",
                            isActive ? "text-secondary-500" : "text-slate-400"
                          )}
                        />
                        <span className="flex-1">{link.label}</span>
                        {link.badge && (
                          <Badge variant="secondary" size="sm">
                            {link.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pl-64 pt-[40px]">
        {/* Header */}
        <header className="sticky top-[40px] z-30 h-16 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between h-full px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search depots, products..."
                  className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Quick Calculator Button */}
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-secondary-50 text-secondary-600 rounded-xl hover:bg-secondary-100 transition-colors"
              >
                <Calculator className="w-4 h-4" />
                <span className="text-sm font-medium">Calculator</span>
              </button>

              <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger-500 rounded-full border-2 border-white" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                    {user.avatar}
                  </div>
                  <ChevronDown className={cn("w-4 h-4 text-slate-500 hidden sm:block", isProfileOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100">
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/marketer/settings"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/marketer/settings"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                      </div>
                      <div className="p-2 border-t border-slate-100">
                        <Link
                          href="/login"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-danger-600 hover:bg-danger-50"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Floating Calculator */}
      <FloatingCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Calculator Toggle Button (Mobile) */}
      <CalculatorToggle
        onClick={() => setIsCalculatorOpen(true)}
        isOpen={isCalculatorOpen}
      />

      {isProfileOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setIsProfileOpen(false)} />
      )}
    </div>
  );
}
/* git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/basgenix4u/fuelLink.git
git push -u origin main */


