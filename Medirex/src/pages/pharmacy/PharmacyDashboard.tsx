import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KPICard from '@/components/features/KPICard';
import { MOCK_DRUG_INVENTORY } from '@/constants/mockData';
import { Package, AlertTriangle, TrendingDown, ShoppingCart, Search, Plus, RefreshCw, Check, X, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { DrugInventory } from '@/types';

interface RestockModalProps { drug?: DrugInventory; onClose: () => void; onSuccess: (name: string, qty: number) => void; }

function RestockModal({ drug, onClose, onSuccess }: RestockModalProps) {
  const [form, setForm] = useState({ medicine: drug?.name || '', quantity: 500, priority: 'Normal', supplier: 'Pharma Corp' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => { setSubmitted(true); setTimeout(() => { onSuccess(form.medicine, form.quantity); onClose(); }, 1200); };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-emerald-600" /></div>
            <p className="font-bold text-gray-900">Restock Order Placed!</p>
            <p className="text-sm text-gray-500 mt-1">Supplier notified. Expected in 2-3 days.</p>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-gray-900 font-display mb-4">Create Restock Order</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Medicine Name</label>
                <input value={form.medicine} onChange={e => setForm(f => ({...f, medicine: e.target.value}))} className="input-medical" placeholder="Search medicine..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quantity</label>
                  <input type="number" value={form.quantity} onChange={e => setForm(f => ({...f, quantity: Number(e.target.value)}))} className="input-medical" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Priority</label>
                  <select value={form.priority} onChange={e => setForm(f => ({...f, priority: e.target.value}))} className="input-medical">
                    <option>Normal</option><option>Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Supplier</label>
                <select value={form.supplier} onChange={e => setForm(f => ({...f, supplier: e.target.value}))} className="input-medical">
                  <option>Pharma Corp</option><option>CardioMed</option><option>InsulinPlus</option><option>LipidCare</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={onClose} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={handleSubmit} disabled={!form.medicine} className="flex-1 btn-primary justify-center disabled:opacity-50">Submit Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AddMedicineModal({ onClose, onAdd, initialDrug }: { onClose: () => void; onAdd: (drug: DrugInventory) => void; initialDrug?: DrugInventory }) {
  const [form, setForm] = useState(() => ({
    name: initialDrug?.name || '',
    genericName: initialDrug?.genericName || '',
    category: initialDrug?.category || '',
    stock: initialDrug?.stock ?? 0,
    unit: initialDrug?.unit || 'tabs',
    expiryDate: initialDrug?.expiryDate || '',
    manufacturer: initialDrug?.manufacturer || '',
    price: initialDrug?.price ?? 0,
    reorderLevel: initialDrug?.reorderLevel ?? 0,
    batchNumber: initialDrug?.batchNumber || ''
  }));
  const [submitted, setSubmitted] = useState(false);
  const handleAdd = () => {
    const id = initialDrug?.id || `drug${Date.now()}`;
    const expiry = form.expiryDate || new Date().toISOString().split('T')[0];
    const status: DrugInventory['status'] = (form.stock === 0) ? 'Out of Stock' : (new Date(expiry) < new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) ? 'Expiring Soon' : (form.stock < form.reorderLevel ? 'Low Stock' : 'In Stock'));
    const newDrug: DrugInventory = {
      id,
      name: form.name,
      genericName: form.genericName,
      category: form.category || 'General',
      stock: form.stock,
      unit: form.unit,
      expiryDate: expiry,
      manufacturer: form.manufacturer || 'Unknown',
      price: Number(form.price),
      reorderLevel: Number(form.reorderLevel),
      status,
      batchNumber: form.batchNumber || `B-${Date.now()}`
    };
    setSubmitted(true);
    setTimeout(() => { onAdd(newDrug); onClose(); }, 900);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full animate-scale-in" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-emerald-600" /></div>
            <p className="font-bold text-gray-900">Medicine Added</p>
            <p className="text-sm text-gray-500 mt-1">New medicine has been added to inventory.</p>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-gray-900 font-display mb-4">Add New Medicine</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
                <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="input-medical" placeholder="Medicine name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Generic Name</label>
                  <input value={form.genericName} onChange={e => setForm(f => ({...f, genericName: e.target.value}))} className="input-medical" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                  <input value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} className="input-medical" placeholder="e.g., Antidiabetic" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm(f => ({...f, stock: Number(e.target.value)}))} className="input-medical" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Unit</label>
                  <input value={form.unit} onChange={e => setForm(f => ({...f, unit: e.target.value}))} className="input-medical" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reorder Level</label>
                  <input type="number" value={form.reorderLevel} onChange={e => setForm(f => ({...f, reorderLevel: Number(e.target.value)}))} className="input-medical" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry Date</label>
                  <input type="date" value={form.expiryDate} onChange={e => setForm(f => ({...f, expiryDate: e.target.value}))} className="input-medical" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price ($)</label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({...f, price: Number(e.target.value)}))} className="input-medical" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Manufacturer</label>
                  <input value={form.manufacturer} onChange={e => setForm(f => ({...f, manufacturer: e.target.value}))} className="input-medical" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Batch Number</label>
                  <input value={form.batchNumber} onChange={e => setForm(f => ({...f, batchNumber: e.target.value}))} className="input-medical" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={onClose} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={handleAdd} disabled={!form.name} className="flex-1 btn-primary justify-center disabled:opacity-50">Add Medicine</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface DispenseModalProps { rx: { patient: string; meds: string; doctor: string }; onClose: () => void; }
function DispenseModal({ rx, onClose }: DispenseModalProps) {
  const [step, setStep] = useState<1|2>(1);
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-in" onClick={e => e.stopPropagation()}>
        {step === 1 ? (
          <>
            <h3 className="font-bold text-gray-900 font-display mb-1">Dispense Prescription</h3>
            <div className="p-3 bg-gray-50 rounded-xl my-4 text-sm">
              <p className="font-semibold text-gray-900">{rx.patient}</p>
              <p className="text-gray-600 mt-0.5">{rx.meds}</p>
              <p className="text-xs text-gray-400 mt-1">Prescribed by {rx.doctor}</p>
            </div>
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600" /> Verified patient identity</label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600" /> Checked for drug interactions</label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600" /> Counseled patient on usage</label>
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={() => setStep(2)} className="flex-1 btn-primary justify-center">Dispense</button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-7 h-7 text-emerald-600" /></div>
            <h3 className="font-bold text-gray-900 font-display mb-1">Dispensed Successfully</h3>
            <p className="text-sm text-gray-500 mb-4">Prescription for {rx.patient} fulfilled. Inventory updated.</p>
            <button onClick={onClose} className="btn-primary w-full justify-center">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PharmacyDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showRestock, setShowRestock] = useState<DrugInventory | null | undefined>(undefined);
  const [showAddMedicine, setShowAddMedicine] = useState<DrugInventory | 'new' | null>(null);
  const [dispenseRx, setDispenseRx] = useState<{ patient: string; meds: string; doctor: string } | null>(null);
  const [inventory, setInventory] = useState(MOCK_DRUG_INVENTORY);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = inventory.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = inventory.filter(d => d.status === 'Low Stock' || d.status === 'Out of Stock').length;
  const expiring = inventory.filter(d => d.status === 'Expiring Soon').length;

  const handleRestockSuccess = (name: string, qty: number) => {
    setInventory(prev => prev.map(d => d.name === name ? { ...d, stock: d.stock + qty, status: 'In Stock' as const } : d));
    showToast(`Restock order placed for ${name}`);
  };

  const handleAddMedicine = (drug: DrugInventory) => {
    setInventory(prev => {
      const exists = prev.find(d => d.id === drug.id);
      if (exists) {
        return prev.map(d => d.id === drug.id ? drug : d);
      }
      return [drug, ...prev];
    });
    showToast(`${drug.name} added to inventory`);
  };

  const [pendingRx, setPendingRx] = useState([
    { patient: 'Sarah Johnson', doctor: 'Dr. Harrison', meds: 'Metformin 500mg × 90 tabs', time: '9:15 AM', urgent: false },
    { patient: 'Michael Chen', doctor: 'Dr. Harrison', meds: 'Atorvastatin 40mg × 30 tabs', time: '10:45 AM', urgent: false },
    { patient: 'James Williams', doctor: 'Dr. Al-Hassan', meds: 'Insulin Glargine × 3 vials', time: '11:30 AM', urgent: true },
  ]);

  return (
    <DashboardLayout>
      {showRestock !== undefined && (
        <RestockModal drug={showRestock ?? undefined} onClose={() => setShowRestock(undefined)} onSuccess={handleRestockSuccess} />
      )}
      {dispenseRx && <DispenseModal rx={dispenseRx} onClose={() => setDispenseRx(null)} />}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">Pharmacy Hub</h1>
            <p className="text-gray-500 text-sm mt-0.5">Inventory management & prescription processing</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowRestock(null)} className="btn-secondary text-sm py-2.5">
              <RefreshCw className="w-4 h-4" /> Restock Order
            </button>
            <button onClick={() => setShowAddMedicine('new')} className="btn-primary text-sm py-2.5">
              <Plus className="w-4 h-4" /> Add Medicine
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Total Items" value={inventory.length} icon={Package} change={2} />
          <KPICard title="Low/Out of Stock" value={lowStock} icon={TrendingDown} iconColor="text-red-500" iconBg="bg-red-50" />
          <KPICard title="Expiring Soon" value={expiring} icon={AlertTriangle} iconColor="text-amber-600" iconBg="bg-amber-50" />
          <KPICard title="Orders Today" value={47} icon={ShoppingCart} iconColor="text-emerald-600" iconBg="bg-emerald-50" change={12} />
        </div>

        {/* Inventory Table */}
        <div className="medical-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="font-bold text-gray-900 font-display">Medicine Inventory</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicines..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-56" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr><th>Medicine</th><th>Category</th><th>Stock</th><th>Expiry</th><th>Price</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(drug => (
                  <tr key={drug.id}>
                    <td>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{drug.name}</p>
                        <p className="text-xs text-gray-400">{drug.genericName} · {drug.batchNumber}</p>
                      </div>
                    </td>
                    <td><span className="text-xs text-gray-600">{drug.category}</span></td>
                    <td><span className={`font-semibold text-sm ${drug.stock === 0 ? 'text-red-500' : drug.stock < drug.reorderLevel ? 'text-amber-600' : 'text-gray-900'}`}>{drug.stock} {drug.unit}</span></td>
                    <td><span className={`text-xs ${new Date(drug.expiryDate) < new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>{drug.expiryDate}</span></td>
                    <td><span className="text-sm font-medium text-gray-800">${drug.price.toFixed(2)}</span></td>
                    <td>
                      <span className={`badge text-[10px] ${
                        drug.status === 'In Stock' ? 'badge-success' :
                        drug.status === 'Low Stock' ? 'badge-warning' :
                        drug.status === 'Out of Stock' ? 'badge-danger' : 'bg-orange-100 text-orange-700'}`}>
                        {drug.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => setShowRestock(drug)} className="text-xs text-primary-600 font-semibold hover:underline">Restock</button>
                        <span className="text-gray-300">|</span>
                        <button onClick={() => setShowAddMedicine(drug)} title="Edit medicine" className="p-1 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button onClick={() => {
                          if (window.confirm(`Delete ${drug.name} from inventory?`)) {
                            setInventory(prev => prev.filter(d => d.id !== drug.id));
                            showToast(`${drug.name} removed`);
                          }
                        }} title="Delete medicine" className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Prescriptions */}
        <div className="medical-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 font-display">Pending E-Prescriptions</h2>
            <span className="badge-danger">{pendingRx.length} pending</span>
          </div>
          <div className="space-y-3">
            {pendingRx.map((rx, i) => (
              <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl border ${rx.urgent ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {rx.patient}
                    {rx.urgent && <span className="badge-danger ml-2 text-[10px]">URGENT</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{rx.meds}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{rx.doctor} · {rx.time}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setDispenseRx(rx)} className="btn-primary text-xs py-1.5 px-3">Dispense</button>
                  <button onClick={() => { setPendingRx(prev => prev.filter((_, idx) => idx !== i)); showToast('Prescription declined'); }} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="medical-card p-5 border border-amber-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h2 className="font-bold text-gray-900 font-display">Stock Alerts</h2>
          </div>
          <div className="space-y-2">
            {inventory.filter(d => d.status !== 'In Stock').map(drug => (
              <div key={drug.id} className="flex items-center justify-between p-3 rounded-xl border border-amber-100 bg-amber-50/40">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{drug.name}</p>
                  <p className="text-xs text-gray-500">Stock: {drug.stock} {drug.unit} · Reorder at: {drug.reorderLevel}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge text-[10px] ${
                    drug.status === 'Out of Stock' ? 'badge-danger' :
                    drug.status === 'Low Stock' ? 'badge-warning' : 'bg-orange-100 text-orange-700'}`}>
                    {drug.status}
                  </span>
                  <button onClick={() => setShowRestock(drug)} className="btn-primary text-xs py-1 px-2">Order</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      {showAddMedicine !== null && (
        <AddMedicineModal
          initialDrug={typeof showAddMedicine === 'object' ? showAddMedicine ?? undefined : undefined}
          onClose={() => setShowAddMedicine(null)}
          onAdd={handleAddMedicine}
        />
      )}
      </div>
    </DashboardLayout>
  );
}
