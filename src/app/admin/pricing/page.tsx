// src/app/admin/pricing/page.tsx

"use client";

import { useState } from "react";
import { Save, Factory, Globe } from "lucide-react";
import { Button } from "@/components/shared/Button";
import toast from "react-hot-toast";

export default function PricingControlPage() {
  const [brent, setBrent] = useState(82.50);
  const [exchange, setExchange] = useState(1550);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success("Market parameters updated & broadcasted");
    setSaving(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Market Pricing Control</h1>
          <p className="text-slate-500">Set ground truth data for the platform</p>
        </div>
        <Button variant="primary" onClick={handleSave} isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>
          Update Market
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Global Indicators */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg"><Globe className="w-5 h-5 text-blue-600" /></div>
            <h2 className="font-bold text-slate-900">Global Indicators</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Brent Crude Price ($/bbl)</label>
              <input type="number" value={brent} onChange={e => setBrent(Number(e.target.value))} className="w-full p-3 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Exchange Rate (₦/$)</label>
              <input type="number" value={exchange} onChange={e => setExchange(Number(e.target.value))} className="w-full p-3 border rounded-xl" />
            </div>
          </div>
        </div>

        {/* Refinery Ex-Depot Prices */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg"><Factory className="w-5 h-5 text-indigo-600" /></div>
            <h2 className="font-bold text-slate-900">Refinery Prices (Ex-Depot)</h2>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-medium text-slate-900 mb-2">Dangote Refinery</p>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="PMS" className="p-2 border rounded-lg text-sm" defaultValue={860} />
                <input type="number" placeholder="AGO" className="p-2 border rounded-lg text-sm" defaultValue={1120} />
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-medium text-slate-900 mb-2">PH Refinery</p>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="PMS" className="p-2 border rounded-lg text-sm" defaultValue={865} />
                <input type="number" placeholder="AGO" className="p-2 border rounded-lg text-sm" defaultValue={1125} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}