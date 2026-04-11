// src/components/marketer/FloatingPriceAlert.tsx

"use client";

import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { Bell, X, GripHorizontal, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface FloatingPriceAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FloatingPriceAlert({ isOpen, onClose }: FloatingPriceAlertProps) {
  const dragControls = useDragControls();
  const [isMinimized, setIsMinimized] = useState(false);
  const [formData, setFormData] = useState({
    product: "AGO",
    targetPrice: "",
    condition: "below"
  });

  const handleSubmit = () => {
    if (!formData.targetPrice) return;
    toast.success(`Alert set for ${formData.product} ${formData.condition} ₦${formData.targetPrice}`);
    setFormData({ product: "AGO", targetPrice: "", condition: "below" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      initial={{ opacity: 0, y: 50, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "fixed z-50 bg-white rounded-2xl shadow-2xl border-2 border-slate-100 overflow-hidden",
        isMinimized ? "w-64" : "w-80"
      )}
      style={{ right: 20, bottom: 100 }} // Initial position
    >
      {/* Draggable Header */}
      <div 
        className="bg-primary-600 p-3 flex items-center justify-between cursor-move"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2 text-white">
          <Bell className="w-4 h-4" />
          <span className="font-semibold text-sm">Set Price Alert</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded text-white"
          >
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded text-white"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Product</label>
            <div className="grid grid-cols-3 gap-2">
              {["AGO", "PMS", "DPK"].map(p => (
                <button
                  key={p}
                  onClick={() => setFormData({...formData, product: p})}
                  className={cn(
                    "text-xs py-1.5 rounded border transition-colors",
                    formData.product === p 
                      ? "bg-primary-50 border-primary-500 text-primary-700 font-medium" 
                      : "border-slate-200 text-slate-600"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Condition</label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setFormData({...formData, condition: "below"})}
                className={cn(
                  "flex-1 text-xs py-1.5 rounded transition-all",
                  formData.condition === "below" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"
                )}
              >
                Below
              </button>
              <button
                onClick={() => setFormData({...formData, condition: "above"})}
                className={cn(
                  "flex-1 text-xs py-1.5 rounded transition-all",
                  formData.condition === "above" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"
                )}
              >
                Above
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Target Price (₦)</label>
            <input 
              type="number" 
              value={formData.targetPrice}
              onChange={(e) => setFormData({...formData, targetPrice: e.target.value})}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. 1100"
            />
          </div>

          <Button size="sm" className="w-full" onClick={handleSubmit}>
            Create Alert
          </Button>
        </div>
      )}
    </motion.div>
  );
}
