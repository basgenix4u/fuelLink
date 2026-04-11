// src/app/driver/layout.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Package,
  Clock,
  User,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Badge } from "@/components/shared/Badge";
import { cn } from "@/lib/utils";

const bottomNavLinks = [
  { label: "Home", href: "/driver", icon: Home },
  { label: "Active", href: "/driver/orders", icon: Package, badge: "2" },
  { label: "History", href: "/driver/history", icon: Clock },
  { label: "Profile", href: "/driver/profile", icon: User },
];

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const user = {
    name: "Musa Ibrahim",
    phone: "+234 803 456 7890",
    avatar: "M",
  };

  const notifications = [
    { id: 1, title: "New Order Assigned", message: "Order #ORD-2025-001237", time: "Just now", unread: true },
    { id: 2, title: "Order Updated", message: "Proceed to loading bay", time: "10 mins ago", unread: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo variant="default" size="sm" />
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold">
              {user.avatar}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-30">
        <div className="flex items-center justify-around">
          {bottomNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center py-2 px-4 rounded-xl transition-colors relative",
                  isActive
                    ? "text-accent-600"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                <link.icon className={cn("w-6 h-6", isActive && "text-accent-500")} />
                <span className="text-xs mt-1 font-medium">{link.label}</span>
                {link.badge && (
                  <span className="absolute -top-1 right-2 w-5 h-5 bg-danger-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Notifications Drawer */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setShowNotifications(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-white shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900">Notifications</h2>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      "p-4",
                      notif.unread && "bg-accent-50/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {notif.unread && (
                        <span className="w-2 h-2 mt-2 bg-accent-500 rounded-full" />
                      )}
                      <div>
                        <p className="font-medium text-slate-900">{notif.title}</p>
                        <p className="text-sm text-slate-500">{notif.message}</p>
                        <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}