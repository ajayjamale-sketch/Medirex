import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Pill, Plus, MapPin, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

const INITIAL_PRESCRIPTIONS = [
  { id: 1, name: 'Amoxicillin 500mg', dosage: '1 capsule 3 times daily', doctor: 'Dr. Sarah Mitchell', refills: 2, rxNumber: 'RX-77291' },
  { id: 2, name: 'Atorvastatin 20mg', dosage: '1 tablet daily at bedtime', doctor: 'Dr. Evelyn Vance', refills: 5, rxNumber: 'RX-52210' },
  { id: 3, name: 'Lisinopril 10mg', dosage: '1 tablet daily in the morning', doctor: 'Dr. Priya Sharma', refills: 0, rxNumber: 'RX-12903' },
];

export default function Pharmacy() {
  const [prescriptions, setPrescriptions] = useState(INITIAL_PRESCRIPTIONS);
  const [selectedRx, setSelectedRx] = useState(1);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [refillStatus, setRefillStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [trackerStep, setTrackerStep] = useState(2); // 1 = Received, 2 = Preparing, 3 = Dispatched, 4 = Delivered

  const handleRefillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rx = prescriptions.find(p => p.id === selectedRx);
    if (rx && rx.refills > 0) {
      // Decrease refills remaining by 1
      setPrescriptions(prescriptions.map(p => p.id === selectedRx ? { ...p, refills: p.refills - 1 } : p));
      setRefillStatus('success');
      setTrackerStep(1); // Reset tracker to Received
    } else {
      setRefillStatus('failed');
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">

        {/* Section 1: Page Header & Refills Summary */}
        <section className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-3xl p-6 shadow-medical relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 translate-x-10 translate-y-[-10px]">
            <Pill className="w-64 h-64" />
          </div>
          <div className="relative space-y-2">
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">E-Pharmacy</span>
            <h1 className="text-2xl font-bold font-display">Prescriptions & Courier Deliveries</h1>
            <p className="text-amber-50 text-xs max-w-md">Verify active prescription charts, order refills to your door, and track dispatch status in real-time.</p>
          </div>
        </section>

        {/* Section 2: Active Prescriptions List */}
        <section className="bg-white p-5 rounded-2xl border border-slate-150 space-y-4">
          <h3 className="font-bold text-gray-900 text-sm font-display flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-amber-500" /> Active E-Prescriptions
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {prescriptions.map(rx => (
              <div
                key={rx.id}
                onClick={() => setSelectedRx(rx.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedRx === rx.id ? 'border-amber-500 bg-amber-50/20' : 'border-slate-100 hover:border-slate-200 bg-slate-50'}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded">{rx.rxNumber}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${rx.refills > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {rx.refills} Refills left
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 text-xs mt-2.5">{rx.name}</h4>
                <p className="text-slate-500 text-[10px] mt-0.5 italic">{rx.dosage}</p>
                <p className="text-slate-400 text-[9px] mt-2">Prescribed by: {rx.doctor}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Interactive Refill Request Form */}
        <section className="bg-white p-5 rounded-2xl border border-slate-150 space-y-4">
          <h3 className="font-bold text-gray-900 text-sm font-display">Order a Refill Dispatch</h3>
          {refillStatus === 'success' ? (
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-2 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-emerald-800">Refill Request Submitted!</p>
              <p className="text-[10px] text-slate-500">Order successfully matched. Check Section 4 below to monitor delivery status.</p>
              <button onClick={() => setRefillStatus('idle')} className="btn-primary bg-emerald-600 hover:bg-emerald-700 text-[10px] py-1.5 px-3">Order another refill</button>
            </div>
          ) : refillStatus === 'failed' ? (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl space-y-2 text-center">
              <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
              <p className="text-xs font-bold text-red-800">No Refills Remaining</p>
              <p className="text-[10px] text-slate-500">This prescription has 0 refills remaining. You must request a renewal from the prescribing doctor.</p>
              <button onClick={() => setRefillStatus('idle')} className="btn-ghost border border-slate-200 text-[10px] py-1.5 px-3">Back to form</button>
            </div>
          ) : (
            <form onSubmit={handleRefillSubmit} className="grid sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Selected Drug</label>
                <select
                  value={selectedRx}
                  onChange={e => setSelectedRx(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                >
                  {prescriptions.map(rx => (
                    <option key={rx.id} value={rx.id}>{rx.name} ({rx.refills} refills left)</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Delivery Method</label>
                <select
                  value={deliveryType}
                  onChange={e => setDeliveryType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                >
                  <option value="delivery">Home Delivery Courier</option>
                  <option value="pickup">Partner Pharmacy Pickup</option>
                </select>
              </div>
              <button type="submit" className="btn-primary text-xs py-2 px-4 justify-center bg-amber-600 hover:bg-amber-700 border-amber-600">
                Submit Refill Request
              </button>
            </form>
          )}
        </section>

        {/* Section 4: Live Delivery Tracker */}
        <section className="bg-white p-5 rounded-2xl border border-slate-150 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm font-display flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-primary-600" /> Delivery Status Tracker
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">Order #{prescriptions.find(p => p.id === selectedRx)?.rxNumber}</span>
          </div>

          <div className="relative">
            <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-slate-100 -z-10" />
            <div className="grid grid-cols-4 text-center">
              {[
                { step: 1, label: 'Order Placed' },
                { step: 2, label: 'Prepared' },
                { step: 3, label: 'Dispatched' },
                { step: 4, label: 'Delivered' },
              ].map(s => (
                <div key={s.step} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${trackerStep >= s.step ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {s.step}
                  </div>
                  <span className={`text-[10px] font-bold ${trackerStep >= s.step ? 'text-primary-700' : 'text-slate-400'}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 pt-2 border-t border-slate-50">
            <span className="text-[10px] font-bold text-slate-500">Adjust Delivery Tracker Step:</span>
            {[1, 2, 3, 4].map(step => (
              <button
                key={step}
                onClick={() => setTrackerStep(step)}
                className={`w-5 h-5 rounded text-[10px] font-bold transition-all ${trackerStep === step ? 'bg-primary-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
              >
                {step}
              </button>
            ))}
          </div>
        </section>

        {/* Section 5: Nearby Partner Pharmacies */}
        <section className="bg-white p-5 rounded-2xl border border-slate-150 space-y-4">
          <h3 className="font-bold text-gray-900 text-sm font-display flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-red-500" /> Partner Pharmacies Directory
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-xs">PharmaNow - Boston Central</h4>
                <p className="text-slate-500 text-[10px] mt-0.5">102 Tremont Street • Open 24 Hours</p>
                <p className="text-slate-400 text-[9px]">Distance: 0.8 miles away</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-xs">CVS Pharmacy - Commonwealth</h4>
                <p className="text-slate-500 text-[10px] mt-0.5">640 Commonwealth Ave • Closes at 10 PM</p>
                <p className="text-slate-400 text-[9px]">Distance: 1.4 miles away</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
