// src/components/landing/Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Building2, 
  ShoppingCart,
  BarChart3,
  Shield,
  MessageSquare,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  href: string;
  description: string;
  icon: React.ElementType;
}

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const navLinks: NavLink[] = [
  {
    label: "Solutions",
    href: "#solutions",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "For Marketers",
        href: "/solutions/marketer",
        description: "Find best prices & secure transactions",
        icon: ShoppingCart,
      },
      {
        label: "For Depot Owners",
        href: "/solutions/depot",
        description: "Manage inventory & receive orders",
        icon: Building2,
      },
      {
        label: "Market Intelligence",
        href: "/solutions/intelligence",
        description: "Real-time pricing & analytics",
        icon: BarChart3,
      },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-slate-900/5"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo variant={isScrolled ? "default" : "white"} size="md" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                      isScrolled
                        ? "text-slate-700 hover:text-primary-600 hover:bg-slate-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 pt-2"
                        >
                          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 min-w-[280px]">
                            {link.dropdownItems?.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                                  <item.icon className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                                    {item.label}
                                  </p>
                                  <p className="text-sm text-slate-500 mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA - Only ONE set of buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  isScrolled
                    ? "text-slate-700 hover:text-primary-600 hover:bg-slate-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                Sign In
              </Link>
              <Link href="/register/marketer">
                <Button
                  variant={isScrolled ? "primary" : "secondary"}
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isScrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <Logo variant="default" size="md" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <div key={link.label}>
                        {link.hasDropdown ? (
                          <>
                            <button
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === link.label ? null : link.label
                                )
                              }
                              className="flex items-center justify-between w-full p-4 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold transition-colors"
                            >
                              {link.label}
                              <ChevronDown
                                className={cn(
                                  "w-5 h-5 text-slate-400 transition-transform",
                                  activeDropdown === link.label && "rotate-180"
                                )}
                              />
                            </button>
                            <AnimatePresence>
                              {activeDropdown === link.label && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-4 space-y-1 py-2">
                                    {link.dropdownItems?.map((item) => (
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                                          <item.icon className="w-4 h-4 text-primary-600" />
                                        </div>
                                        <span className="font-medium">{item.label}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={link.href}
                            className="flex items-center p-4 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-5 border-t border-slate-100 space-y-3 bg-slate-50">
                  <Link href="/register/marketer" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="secondary"
                      size="lg"
                      fullWidth
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" size="lg" fullWidth>
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}