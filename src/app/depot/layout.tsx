// src/app/depot/layout.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  DollarSign,
  Package,
  ShoppingCart,
  QrCode,
  BarChart3,
  Wallet,
  Star,
  Settings,
  HelpCircle,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  Building2,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Badge } from "@/components/shared/Badge";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { label: "Dashboard", href: "/depot", icon: LayoutDashboard },
  { label: "Price Management", href: "/depot/prices", icon: DollarSign },
  { label: "Inventory", href: "/depot/inventory", icon: Package },
  { label: "Orders", href: "/depot/orders", icon: ShoppingCart, badge: "5" },
  { label: "QR Verification", href: "/depot/verify", icon: QrCode },
  { label: "Messages", href: "/depot/messages", icon: MessageSquare, badge: "2" },
  { label: "Analytics", href: "/depot/analytics", icon: BarChart3 },
  { label: "Wallet", href: "/depot/wallet", icon: Wallet },
  { label: "Disputes", href: "/depot/disputes", icon: AlertTriangle },
  { label: "Ratings", href: "/depot/ratings", icon: Star },
  { label: "Settings", href: "/depot/settings", icon: Settings },
];

export default function DepotLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const user = {
    name: "Pinnacle Oil & Gas",
    email: "operations@pinnacleoil.com",
    avatar: "P",
  };

  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      message: "Order #ORD-2025-001238 - 3 trucks, 111,000L AGO",
      time: "2 mins ago",
      unread: true,
      type: "order",
    },
    {
      id: 2,
      title: "Payment Received",
      message: "₦37,941,750 credited (after ₦8,250 platform fee)",
      time: "15 mins ago",
      unread: true,
      type: "payment",
    },
    {
      id: 3,
      title: "QR Code Scanned",
      message: "Truck ABC-123XY verified at gate",
      time: "30 mins ago",
      unread: false,
      type: "verification",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-slate-100">
          <Logo variant="default" size="md" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/depot" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <link.icon
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-primary-500" : "text-slate-400"
                  )}
                />
                <span className="flex-1">{link.label}</span>
                {link.badge && (
                  <Badge variant="danger" size="sm">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Fee Info */}
        <div className="p-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-800">Platform Fee</span>
            </div>
            <p className="text-xs text-amber-700">
              ₦0.25/litre deducted from settlements
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-500">Depot Owner</p>
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
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden flex flex-col"
            >
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
                    (link.href !== "/depot" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                        isActive
                          ? "bg-primary-50 text-primary-600"
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <link.icon
                        className={cn(
                          "w-5 h-5",
                          isActive ? "text-primary-500" : "text-slate-400"
                        )}
                      />
                      <span className="flex-1">{link.label}</span>
                      {link.badge && (
                        <Badge variant="danger" size="sm">{link.badge}</Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500">Depot Owner</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between h-full px-4 sm:px-6">
            {/* Left */}
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
                  placeholder="Search orders, customers..."
                  className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  {notifications.filter((n) => n.unread).length > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Notifications</h3>
                        <Badge variant="primary" size="sm">
                          {notifications.filter((n) => n.unread).length} new
                        </Badge>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={cn(
                              "p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer",
                              notif.unread && "bg-primary-50/50"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              {notif.unread && (
                                <span className="w-2 h-2 mt-2 bg-primary-500 rounded-full flex-shrink-0" />
                              )}
                              <div className={cn("flex-1 min-w-0", !notif.unread && "ml-5")}>
                                <p className="font-medium text-slate-900 text-sm">{notif.title}</p>
                                <p className="text-slate-600 text-sm truncate">{notif.message}</p>
                                <p className="text-slate-400 text-xs mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-slate-100">
                        <Link
                          href="/depot/notifications"
                          className="block text-center text-sm font-medium text-primary-600 hover:text-primary-700"
                          onClick={() => setIsNotificationsOpen(false)}
                        >
                          View all notifications
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                    {user.avatar}
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-slate-500 hidden sm:block transition-transform",
                      isProfileOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100">
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/depot/profile"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/depot/settings"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Building2 className="w-4 h-4" />
                          <span>Depot Settings</span>
                        </Link>
                        <Link
                          href="/depot/wallet"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Wallet className="w-4 h-4" />
                          <span>Wallet & Fees</span>
                        </Link>
                      </div>
                      <div className="p-2 border-t border-slate-100">
                        <Link
                          href="/login"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
                          onClick={() => setIsProfileOpen(false)}
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

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Click outside to close dropdowns */}
      {(isNotificationsOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setIsNotificationsOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </div>
  );
}