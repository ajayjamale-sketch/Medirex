import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MOCK_BILLING } from '@/constants/mockData';
import { CreditCard, DollarSign, FileText, Download, Eye, Check, X, Plus, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';

const STATUS_STYLES: Record<string, string> = {
  Paid: 'badge-success', Pending: 'badge-warning', Partial: 'badge-primary', Overdue: 'badge-danger',
};

const REVENUE_DATA = [
  { month: 'Jan', revenue: 42000, collected: 38000 },
  { month: 'Feb', revenue: 39000, collected: 35000 },
  { month: 'Mar', revenue: 48000, collected: 43000 },
  { month: 'Apr', revenue: 52000, collected: 47000 },
  { month: 'May', revenue: 58000, collected: 52000 },
];

export default function Billing() {
  const [showInvoice, setShowInvoice] = useState<string | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { user } = useAuth();
  const isPatient = user?.role === 'patient';
  
  // Filter for patients
  const [billing, setBilling] = useState(
    isPatient ? MOCK_BILLING.filter(b => b.patientName === 'Sarah Johnson') : MOCK_BILLING
  );
  
  const [paymentForm, setPaymentForm] = useState({ method: 'Credit Card', amount: '', card: '', cvv: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const total = billing.reduce((s, b) => s + b.total, 0);
  const paid = billing.reduce((s, b) => s + b.paid, 0);
  const pending = billing.reduce((s, b) => s + b.balance, 0);
  const selectedBill = showInvoice ? billing.find(b => b.id === showInvoice) : null;

  const handlePayment = () => {
    if (!paymentForm.amount) { showToast('Please enter an amount'); return; }
    setShowPayModal(false);
    showToast('Payment processed successfully');
  };

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">{isPatient ? 'My Billing & Invoices' : 'Billing & Insurance'}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{isPatient ? 'View and pay your medical bills' : 'Invoices, payments, insurance claims & revenue analytics'}</p>
          </div>
          <div className="flex gap-3">
            {!isPatient && <button onClick={() => setShowNewInvoice(true)} className="btn-secondary text-sm py-2.5"><Plus className="w-4 h-4" /> New Invoice</button>}
            <button onClick={() => setShowPayModal(true)} className="btn-primary text-sm py-2.5"><CreditCard className="w-4 h-4" /> Make Payment</button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: isPatient ? 'Total Billed' : 'Total Billed (MTD)', value: `$${total.toLocaleString()}`, icon: DollarSign, color: 'text-gray-700 bg-gray-50' },
            { label: isPatient ? 'Total Paid' : 'Total Collected', value: `$${paid.toLocaleString()}`, icon: Check, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Outstanding Balance', value: `$${pending.toFixed(0)}`, icon: CreditCard, color: 'text-amber-600 bg-amber-50' },
            { label: 'Claims Submitted', value: String(billing.filter(b => b.insuranceClaim).length), icon: FileText, color: 'text-primary-600 bg-primary-50' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="medical-card p-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><Icon className="w-5 h-5" /></div>
                <p className="text-2xl font-bold text-gray-900 font-display">{s.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue Chart (Hidden for patients) */}
        {!isPatient && (
          <div className="medical-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 font-display">Revenue vs Collections (5 Months)</h2>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1.5"><span className="w-3 h-2 bg-primary-500 inline-block rounded" /><span className="text-gray-500">Revenue</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-2 bg-emerald-500 inline-block rounded" /><span className="text-gray-500">Collected</span></div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={REVENUE_DATA}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip formatter={(v: number) => [`$${(v/1000).toFixed(1)}K`]} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="revenue" fill="#0284C7" radius={[4,4,0,0]} name="Revenue" />
                <Bar dataKey="collected" fill="#10B981" radius={[4,4,0,0]} name="Collected" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Billing Table */}
        <div className="medical-card p-5">
          <h2 className="font-bold text-gray-900 font-display mb-4">Recent Invoices</h2>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr><th>Invoice</th>{!isPatient && <th>Patient</th>}<th>Date</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th><th>Insurance</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {billing.map(bill => (
                  <tr key={bill.id}>
                    <td className="font-mono text-xs text-gray-500 uppercase">{bill.id}</td>
                    {!isPatient && <td className="font-medium text-gray-900 text-sm">{bill.patientName}</td>}
                    <td className="text-xs text-gray-500">{bill.date}</td>
                    <td className="font-semibold text-gray-900">${bill.total.toFixed(2)}</td>
                    <td className="text-emerald-600 font-semibold">${bill.paid.toFixed(2)}</td>
                    <td className={`font-semibold ${bill.balance > 0 ? 'text-red-500' : 'text-gray-400'}`}>${bill.balance.toFixed(2)}</td>
                    <td><span className={`badge text-[10px] ${STATUS_STYLES[bill.status] || 'badge-primary'}`}>{bill.status}</span></td>
                    <td>
                      {bill.insuranceClaim && (
                        <span className={`badge text-[10px] ${bill.claimStatus === 'Approved' ? 'badge-success' : bill.claimStatus === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>{bill.claimStatus}</span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => setShowInvoice(bill.id)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                        <button onClick={() => showToast(`Invoice ${bill.id.toUpperCase()} downloaded`)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><Download className="w-3.5 h-3.5" /></button>
                        {bill.balance > 0 && (
                          <button onClick={() => setShowPayModal(true)} className="px-2 py-1 text-[10px] font-semibold text-primary-600 hover:bg-primary-50 rounded-lg">Pay</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insurance Claims Pipeline */}
        <div className="medical-card p-5">
          <h2 className="font-bold text-gray-900 font-display mb-4">Insurance Claims Pipeline</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { stage: 'Submitted', count: 1, color: 'bg-sky-50 text-sky-700 border-sky-100' },
              { stage: 'Processing', count: 1, color: 'bg-amber-50 text-amber-700 border-amber-100' },
              { stage: 'Approved', count: 1, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              { stage: 'Rejected', count: 0, color: 'bg-red-50 text-red-600 border-red-100' },
            ].map(stage => (
              <div key={stage.stage} className={`p-4 rounded-xl border text-center ${stage.color} cursor-pointer hover:scale-105 transition-all`} onClick={() => showToast(`Viewing ${stage.stage} claims`)}>
                <div className="text-3xl font-bold font-display">{stage.count}</div>
                <div className="text-sm font-semibold mt-1">{stage.stage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedBill && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowInvoice(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full animate-scale-in overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-display">Invoice {selectedBill.id.toUpperCase()}</h3>
              <div className="flex items-center gap-2">
                <span className={`badge ${STATUS_STYLES[selectedBill.status]}`}>{selectedBill.status}</span>
                <button onClick={() => setShowInvoice(null)}><X className="w-4 h-4 text-gray-400" /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-xl"><p className="text-xs text-gray-500 mb-0.5">Patient</p><p className="font-semibold">{selectedBill.patientName}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><p className="text-xs text-gray-500 mb-0.5">Date</p><p className="font-semibold">{selectedBill.date}</p></div>
            </div>
            <table className="w-full text-sm mb-4">
              <thead><tr className="bg-gray-50"><th className="text-left p-2 text-xs text-gray-500">Item</th><th className="text-right p-2 text-xs text-gray-500">Qty</th><th className="text-right p-2 text-xs text-gray-500">Price</th><th className="text-right p-2 text-xs text-gray-500">Total</th></tr></thead>
              <tbody>
                {selectedBill.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="p-2">{item.description}</td>
                    <td className="p-2 text-right">{item.quantity}</td>
                    <td className="p-2 text-right">${item.unitPrice}</td>
                    <td className="p-2 text-right font-semibold">${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="space-y-1 text-sm border-t border-gray-100 pt-3">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${selectedBill.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>${selectedBill.tax.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Discount</span><span className="text-emerald-600">-${selectedBill.discount.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-base pt-1 border-t border-gray-100"><span>Total</span><span>${selectedBill.total.toFixed(2)}</span></div>
              <div className="flex justify-between text-emerald-600"><span>Paid</span><span>${selectedBill.paid.toFixed(2)}</span></div>
              {selectedBill.balance > 0 && <div className="flex justify-between text-red-500 font-semibold"><span>Balance Due</span><span>${selectedBill.balance.toFixed(2)}</span></div>}
            </div>
            <div className="flex gap-3 mt-5">
              {selectedBill.balance > 0 && <button onClick={() => { setShowInvoice(null); setShowPayModal(true); }} className="flex-1 btn-primary justify-center"><CreditCard className="w-4 h-4" /> Pay Balance</button>}
              <button onClick={() => showToast('Invoice downloaded')} className="flex-1 btn-secondary justify-center"><Download className="w-4 h-4" /> Download PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPayModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 font-display mb-4">Make Payment</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Invoice</label>
                <select className="input-medical">
                  {billing.filter(b => b.balance > 0).map(b => <option key={b.id}>{b.id.toUpperCase()} - {b.patientName} (${b.balance.toFixed(2)})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Payment Method</label>
                <select value={paymentForm.method} onChange={e => setPaymentForm(f => ({...f, method: e.target.value}))} className="input-medical">
                  <option>Credit Card</option><option>Debit Card</option><option>Insurance</option><option>Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                  <input type="number" value={paymentForm.amount} onChange={e => setPaymentForm(f => ({...f, amount: e.target.value}))} className="input-medical pl-8" placeholder="0.00" />
                </div>
              </div>
              {(paymentForm.method === 'Credit Card' || paymentForm.method === 'Debit Card') && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Number</label>
                    <input value={paymentForm.card} onChange={e => setPaymentForm(f => ({...f, card: e.target.value}))} className="input-medical" placeholder="**** **** **** 4242" maxLength={19} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVV</label>
                    <input type="password" value={paymentForm.cvv} onChange={e => setPaymentForm(f => ({...f, cvv: e.target.value}))} className="input-medical" placeholder="***" maxLength={3} />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl text-xs text-emerald-700">
                <Check className="w-3.5 h-3.5" /> Secured by 256-bit SSL encryption
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowPayModal(false)} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={handlePayment} className="flex-1 btn-primary justify-center"><CreditCard className="w-4 h-4" /> Process Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      {showNewInvoice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewInvoice(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 font-display mb-4">Create New Invoice</h3>
            <div className="space-y-3">
              <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Patient</label><input className="input-medical" placeholder="Search patient..." /></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Service</label>
                <select className="input-medical"><option>Consultation</option><option>Laboratory Test</option><option>Diagnostic Imaging</option><option>Surgery</option><option>Emergency</option></select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Amount ($)</label><input type="number" className="input-medical" placeholder="0.00" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Insurance</label><select className="input-medical"><option>BlueCross</option><option>Aetna</option><option>Medicare</option><option>Self-Pay</option></select></div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowNewInvoice(false)} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={() => { setShowNewInvoice(false); showToast('Invoice created successfully'); }} className="flex-1 btn-primary justify-center">Create Invoice</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
