import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KPICard from '@/components/features/KPICard';
import { MOCK_PATIENTS, MOCK_DOCTORS, MOCK_APPOINTMENTS, MOCK_LAB_TESTS, MOCK_DRUG_INVENTORY } from '@/constants/mockData';
import {
  INITIAL_VEHICLES, INITIAL_DRIVERS, INITIAL_TASKS, INITIAL_DOCUMENTS,
  INITIAL_ADMIN_USERS, INITIAL_CHATS, INITIAL_COMPLIANCE, INITIAL_INVOICES
} from '@/constants/adminMockData';
import {
  Users, Building2, Shield, Activity, Settings, Search, UserCheck, AlertTriangle,
  Ban, CheckCircle, Zap, X, Check, Edit2, Eye, FileText, DollarSign, Phone,
  Pill, FlaskConical, MessageSquare, Trash2, Plus, Terminal, RefreshCw, Key, ShieldAlert, Monitor, MapPin
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const MODULES = [
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'hospitals', label: 'Hospitals & Directory', icon: Building2 },
  { id: 'fleet', label: 'Emergency Fleet', icon: Shield },
  { id: 'tasks', label: 'Task Workflow', icon: Activity },
  { id: 'documents', label: 'Documents & Policies', icon: FileText },
  { id: 'audit', label: 'Audit Trail & Logs', icon: Shield },
  { id: 'billing', label: 'Billing Ledger', icon: DollarSign },
  { id: 'support', label: 'Help & Support', icon: Phone },
  { id: 'ai_monitor', label: 'AI Diagnostics Monitor', icon: Zap },
  { id: 'hardware', label: 'IoT Diagnostics', icon: Settings },
  { id: 'pharmacy', label: 'Pharmacy Control', icon: Pill },
  { id: 'labs', label: 'Lab & Test Pipeline', icon: FlaskConical },
  { id: 'security', label: 'Security & WAF', icon: ShieldAlert },
  { id: 'comms', label: 'Communications & Chats', icon: MessageSquare }
] as const;

export default function AdminPanel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeModule = searchParams.get('tab') || 'users';
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // State definitions for modular interactivity
  // 1. Users
  const [users, setUsers] = useState(INITIAL_ADMIN_USERS);
  const [userSearch, setUserSearch] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'doctor', department: '' });
  const [selectedUserPerms, setSelectedUserPerms] = useState<string[]>(users[0]?.permissions || []);

  // 2. Hospitals
  const [hospitals, setHospitals] = useState([
    { name: 'Medirex Medical Center', location: 'New York, NY', beds: 234, doctors: 48, status: 'Active', patients: 1284 },
    { name: 'Medirex Orthopedic Center', location: 'Los Angeles, CA', beds: 120, doctors: 24, status: 'Active', patients: 642 },
    { name: 'Medirex Emergency Center', location: 'Chicago, IL', beds: 88, doctors: 36, status: 'Active', patients: 1820 },
    { name: 'Medirex Children\'s Hospital', location: 'Phoenix, AZ', beds: 180, doctors: 31, status: 'Maintenance', patients: 540 }
  ]);
  const [hospitalSearch, setHospitalSearch] = useState('');
  const [icuBeds, setIcuBeds] = useState([
    { bed: 'ICU-101', occupied: true, patient: 'Sarah J.', status: 'Critical' },
    { bed: 'ICU-102', occupied: false, patient: '', status: 'Available' },
    { bed: 'ICU-103', occupied: true, patient: 'Thomas S.', status: 'Stable' },
    { bed: 'ICU-104', occupied: false, patient: '', status: 'Available' }
  ]);

  // 3. Fleet
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [newDispatch, setNewDispatch] = useState({ destination: '', plate: 'AMB-01', patient: '' });

  // 4. Tasks
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState({ title: '', assignee: '', category: 'Compliance', priority: 'Medium' });
  const [taskFilter, setTaskFilter] = useState('All');

  // 5. Documents
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [docCategory, setDocCategory] = useState('All');
  const [simulatedSize, setSimulatedSize] = useState(17.6); // MB

  // 6. Audit
  const [auditLogs, setAuditLogs] = useState(INITIAL_COMPLIANCE);
  const [ips, setIps] = useState(['192.168.1.10', '192.168.1.15', '10.0.0.8']);
  const [newIp, setNewIp] = useState('');
  const [auditLevel, setAuditLevel] = useState('Comprehensive');

  // 7. Billing
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [newInvoiceItem, setNewInvoiceItem] = useState({ patient: '', item: '', price: 0 });

  // 8. Support
  const [tickets, setTickets] = useState([
    { id: 'TKT-01', requester: 'Dr. Harrison', issue: 'WAF block on file export', status: 'Open', priority: 'High' },
    { id: 'TKT-02', requester: 'Staff Miller', issue: 'Ward B Bed dashboard sync latency', status: 'In Progress', priority: 'Medium' },
    { id: 'TKT-03', requester: 'Pharmacist Gahan', issue: 'Barcode printer driver mismatch', status: 'Resolved', priority: 'Low' }
  ]);
  const [chatText, setChatText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'System', text: 'Connecting with IT support desk...' },
    { sender: 'Agent Helpdesk', text: 'Hi Alina. How can I assist you with portal permissions today?' }
  ]);

  // 9. AI Diagnostics Monitor
  const [aiThreshold, setAiThreshold] = useState(0.85);
  const [aiEngineStatus, setAiEngineStatus] = useState('Active');
  const [aiAccuracyTrend] = useState([
    { name: 'Day 1', acc: 93.4 }, { name: 'Day 2', acc: 94.1 }, { name: 'Day 3', acc: 93.8 },
    { name: 'Day 4', acc: 94.5 }, { name: 'Day 5', acc: 94.7 }
  ]);

  // 10. IoT Diagnostics
  const [nodes, setNodes] = useState([
    { label: 'Ward A Temp', type: 'Sensor', battery: 84, status: 'Online', latency: '12ms' },
    { label: 'Drug Refrigerator 3', type: 'Cooler Sensor', battery: 92, status: 'Online', latency: '15ms' },
    { label: 'Patient Gateway ICU', type: 'Gateway', battery: 100, status: 'Online', latency: '4ms' },
    { label: 'EKG Monitor E12', type: 'Medical Node', battery: 40, status: 'Warning', latency: '22ms' }
  ]);

  // 11. Pharmacy Control
  const [inventory, setInventory] = useState(MOCK_DRUG_INVENTORY);
  const [supplierOrder, setSupplierOrder] = useState({ drug: '', qty: 100, supplier: 'Pharma Corp' });

  // 12. Lab & Test Pipeline
  const [labTests, setLabTests] = useState(MOCK_LAB_TESTS);
  const [labReagents, setLabReagents] = useState([
    { name: 'CBC Assay Kits', stock: 120, status: 'Optimal' },
    { name: 'Lipid Assay Reagents', stock: 45, status: 'Low Stock' },
    { name: 'PCR Enzymes', stock: 200, status: 'Optimal' }
  ]);

  // 13. Security & WAF
  const [wafThreats, setWafThreats] = useState([
    { ip: '198.51.100.42', threat: 'SQL Injection Attempt', timestamp: '14:22:11', severity: 'Critical' },
    { ip: '203.0.113.88', threat: 'Brute Force login check', timestamp: '14:15:02', severity: 'High' }
  ]);
  const [isWafLock, setIsWafLock] = useState(false);

  // 14. Communications
  const [threads, setThreads] = useState(INITIAL_CHATS);
  const [activeThreadId, setActiveThreadId] = useState(threads[0]?.id || '');
  const [commsInput, setCommsInput] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [blockedPorts, setBlockedPorts] = useState<string[]>([]);
  const [faqCacheCleared, setFaqCacheCleared] = useState(false);

  const activeThread = threads.find(t => t.id === activeThreadId);

  // ----------------------------------------------------
  // Interactive handlers
  // ----------------------------------------------------
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const newEntry = {
      id: `USR-0${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as any,
      status: 'Active' as const,
      lastActive: 'Just Now',
      department: newUser.department || 'General',
      permissions: ['Read EMR'],
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(newUser.name) + '&background=0284C7&color=fff'
    };
    setUsers([...users, newEntry]);
    showToast('New platform administrator user added');
    setNewUser({ name: '', email: '', role: 'doctor', department: '' });
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setVehicles(prev => prev.map(v => v.id === newDispatch.plate ? {
      ...v,
      status: 'Active' as const,
      destination: newDispatch.destination || 'Mercy General Hospital',
      patientName: newDispatch.patient || 'Unknown Patient',
      routeProgress: 5,
      eta: 12
    } : v));
    showToast(`Dispatched ${newDispatch.plate} to ${newDispatch.destination}`);
    setNewDispatch({ destination: '', plate: 'AMB-01', patient: '' });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    const taskEntry = {
      id: `TSK-${tasks.length + 101}`,
      title: newTask.title,
      status: 'Todo' as const,
      priority: newTask.priority as any,
      assignee: newTask.assignee || 'Alina Kabanova',
      assigneeAvatar: 'https://i.pravatar.cc/150?u=1573496359142-b8d87734a5a2',
      category: newTask.category as any,
      dueDate: '2026-05-30',
      description: 'System generated operational request.'
    };
    setTasks([...tasks, taskEntry]);
    showToast(`Task assigned to ${taskEntry.assignee}`);
    setNewTask({ title: '', assignee: '', category: 'Compliance', priority: 'Medium' });
  };

  const handleUploadSimulate = () => {
    const size = Math.random() * 3 + 0.5;
    setSimulatedSize(prev => Number((prev + size).toFixed(1)));
    setDocuments(prev => [{ id: `DOC-${Date.now()}`, name: `New_Upload_${Date.now()}.pdf`, type: 'pdf', size: `${size.toFixed(1)} MB`, uploadDate: new Date().toISOString().split('T')[0], category: 'Operational', uploader: 'Admin', url: '#' }, ...prev]);
    showToast(`Document uploaded successfully (+${size.toFixed(1)} MB)`);
  };

  const handleAddIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp) return;
    setIps([...ips, newIp]);
    showToast(`IP range ${newIp} whitelisted successfully`);
    setNewIp('');
  };

  const handleArchiveDocument = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;
    setDocuments(prev => prev.filter(d => d.id !== docId));
    setAuditLogs(prev => [{ id: `LOG-${Date.now()}`, action: 'Document Archived', user: 'Admin', role: 'Admin', ipAddress: '127.0.0.1', resource: doc.name, status: 'Passed', timestamp: new Date().toLocaleTimeString(), details: `Archived document ${doc.name}` }, ...prev]);
    showToast(`Archived document ${doc.name}`);
  };

  const downloadCSV = (filename: string, rows: string[]) => {
    const csv = rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportFinancialCSV = () => {
    const rows = [['Invoice ID', 'Patient', 'Date', 'Amount', 'Status'].join(',')];
    invoices.forEach(i => rows.push([i.id, i.patientName, i.date, i.amount.toFixed(2), i.status].join(',')));
    downloadCSV('invoices_export.csv', rows);
    showToast('Billing CSV ledger exported');
  };

  const handleDiagnosticsSigned = () => {
    setAuditLogs(prev => [{ id: `LOG-${Date.now()}`, action: 'Diagnostics Checklist Signed', user: 'Admin', role: 'Admin', ipAddress: '127.0.0.1', resource: 'Encryption Signatures', status: 'Passed', timestamp: new Date().toLocaleTimeString(), details: 'Signed encryption diagnostics checklist' }, ...prev]);
    showToast('Diagnostics checklist signed');
  };

  const handlePublishAnnouncement = () => {
    if (!announcementText.trim()) return showToast('Announcement is empty');
    const threadId = `BCAST-${Date.now()}`;
    const newThread = {
      id: threadId,
      user: { name: 'Broadcast', role: 'System', avatar: '', status: 'online' },
      unreadCount: 0,
      messages: [{ id: `m_${Date.now()}`, sender: 'System', text: announcementText, timestamp: 'Just Now', self: false }]
    };
    setThreads(prev => [newThread, ...prev]);
    setAnnouncementText('');
    showToast('Announcement published');
  };

  const handleEmergencyBroadcast = () => {
    const msg = 'Emergency Staff Broadcast: Please check emergency dashboard immediately.';
    setThreads(prev => [{ id: `EMERG-${Date.now()}`, user: { name: 'Emergency', role: 'System', avatar: '', status: 'online' }, unreadCount: 0, messages: [{ id: `m_${Date.now()}`, sender: 'System', text: msg, timestamp: 'Just Now', self: false }] }, ...prev]);
    showToast('Broadcast notification sent to all staff');
  };

  const handleTogglePort = (port: string, label: string) => {
    setBlockedPorts(prev => prev.includes(port) ? prev.filter(p => p !== port) : [...prev, port]);
    showToast(`${label} ${blockedPorts.includes(port) ? 'unrestricted' : 'restricted'}`);
  };

  const handleGenerateFDAStockReport = () => {
    const rows = [['Name', 'Category', 'Stock', 'Unit', 'Expiry', 'Status'].join(',')];
    inventory.forEach(d => rows.push([d.name, d.category, String(d.stock), d.unit, d.expiryDate, d.status].join(',')));
    downloadCSV('fda_stock_report.csv', rows);
    showToast('Dispatched stock report to FDA');
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoiceItem.patient || !newInvoiceItem.price) return;
    const inv = {
      id: `INV-40${invoices.length + 1}`,
      patientName: newInvoiceItem.patient,
      date: new Date().toISOString().split('T')[0],
      amount: newInvoiceItem.price,
      status: 'Pending',
      category: 'Self-Pay',
      itemized: [{ desc: newInvoiceItem.item || 'Clinical Service Consultation', amount: newInvoiceItem.price }]
    };
    setInvoices([...invoices, inv]);
    showToast(`Invoice generated for ${newInvoiceItem.patient}`);
    setNewInvoiceItem({ patient: '', item: '', price: 0 });
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    setChatMessages([...chatMessages, { sender: 'You (Alina)', text: chatText }]);
    setChatText('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'Agent Helpdesk', text: 'Request received. Analyzing system permission groups.' }]);
    }, 1500);
  };

  const handleSupplierOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierOrder.drug) return;
    showToast(`Sent refill PO for ${supplierOrder.qty} units of ${supplierOrder.drug}`);
    setSupplierOrder({ drug: '', qty: 100, supplier: 'Pharma Corp' });
  };

  const handleSendComms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commsInput.trim() || !activeThreadId) return;
    setThreads(prev => prev.map(t => t.id === activeThreadId ? {
      ...t,
      messages: [...t.messages, { id: `msg_${Date.now()}`, sender: 'You', text: commsInput, timestamp: 'Just Now', self: true }]
    } : t));
    setCommsInput('');
  };

  return (
    <DashboardLayout>
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      {/* Main Admin layout structure */}
      <div className="space-y-6">
        {/* Portal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">Super Admin Operations Center</h1>
            <p className="text-gray-500 text-sm mt-0.5">Medirex Enterprise SaaS Platform Control Panel</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-primary-600 rounded-full animate-ping" /> System Live
            </span>
          </div>
        </div>

        {/* 14-Module Navigation Grid */}
        <div className="w-full">
          {/* Module Active Workspace Area */}
          <div className="space-y-6">

            {/* MODULE 1: User Management */}
            {activeModule === 'users' && (
              <div className="space-y-6">
                {/* Section 1: Filters & Search */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: Search & Lock Filters</h3>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={userSearch}
                      onChange={e => setUserSearch(e.target.value)}
                      placeholder="Search credentials or email..."
                      className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                    />
                  </div>
                </div>

                {/* Section 2: User Status KPIs */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Active Admins</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">{users.filter(u => u.status === 'Active').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Locked Users</p>
                    <h4 className="text-xl font-bold text-amber-600 font-display mt-0.5">{users.filter(u => u.status === 'Locked').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Suspended</p>
                    <h4 className="text-xl font-bold text-red-500 font-display mt-0.5">{users.filter(u => u.status === 'Suspended').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Security Clearance</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">99.8%</h4>
                  </div>
                </div>

                {/* Section 3: Users Table */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-4">Section 3: Platform Staff Accounts</h3>
                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr><th>Staff Member</th><th>Role</th><th>Status</th><th>Department</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase())).map(u => (
                          <tr key={u.id}>
                            <td>
                              <div className="flex items-center gap-2">
                                <img src={u.avatar} className="w-6 h-6 rounded-full" alt={u.name} />
                                <span className="font-medium text-xs text-slate-800">{u.name}</span>
                              </div>
                            </td>
                            <td><span className="badge text-[10px] badge-primary">{u.role}</span></td>
                            <td>
                              <span className={`badge text-[10px] ${u.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{u.status}</span>
                            </td>
                            <td><span className="text-xs text-slate-500">{u.department}</span></td>
                            <td>
                              <button
                                onClick={() => {
                                  setUsers(prev => prev.map(item => item.id === u.id ? { ...item, status: item.status === 'Active' ? 'Locked' : 'Active' } : item));
                                  showToast(`Status toggled for ${u.name}`);
                                }}
                                className="text-[10px] text-primary-600 font-bold hover:underline"
                              >
                                Toggle Lock
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Create User Form */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 4: Create Platform User</h3>
                  <form onSubmit={handleAddUser} className="grid sm:grid-cols-4 gap-3">
                    <input
                      required
                      placeholder="Name"
                      value={newUser.name}
                      onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                      className="input-medical text-xs"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                      className="input-medical text-xs"
                    />
                    <select
                      value={newUser.role}
                      onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                      className="input-medical text-xs bg-white"
                    >
                      <option value="doctor">Doctor</option>
                      <option value="pharmacy">Pharmacist</option>
                      <option value="lab">Lab Technician</option>
                      <option value="admin">Super Admin</option>
                    </select>
                    <button type="submit" className="btn-primary text-xs py-2 justify-center">
                      <Plus className="w-3.5 h-3.5" /> Add Staff
                    </button>
                  </form>
                </div>

                {/* Section 5: Permissions Panel */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-2">Section 5: Security Policy & Permission Override</h3>
                  <p className="text-xs text-slate-500 mb-3">Override role permissions on a granular security hash level.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Modify EMR', 'Financial Export', 'Emergency Broadcast Override', 'Audit Override', 'Credentials Reset'].map(perm => {
                      const enabled = selectedUserPerms.includes(perm);
                      return (
                        <label key={perm} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer">
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={() => {
                              setSelectedUserPerms(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
                              showToast(`Permission '${perm}' modified`);
                            }}
                            className="w-3.5 h-3.5 rounded text-primary-600"
                          />
                          <span className="text-[10px] font-semibold text-slate-700">{perm}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 2: Hospital & Directory */}
            {activeModule === 'hospitals' && (
              <div className="space-y-6">
                {/* Section 1: Search & Filter */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: Search Facilities</h3>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={hospitalSearch}
                      onChange={e => setHospitalSearch(e.target.value)}
                      placeholder="Search city, state or facility name..."
                      className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                    />
                  </div>
                </div>

                {/* Section 2: KPIs */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Total Wards</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">38</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">ICU beds total</p>
                    <h4 className="text-xl font-bold text-primary-600 font-display mt-0.5">142</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Admissions/hr</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">14.2</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Average wait</p>
                    <h4 className="text-xl font-bold text-amber-600 font-display mt-0.5">18 min</h4>
                  </div>
                </div>

                {/* Section 3: Hospital Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {hospitals.filter(h => h.name.toLowerCase().includes(hospitalSearch.toLowerCase())).map((h, idx) => (
                    <div key={h.name} className="medical-card p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{h.name}</h4>
                          <p className="text-[10px] text-slate-400">{h.location}</p>
                        </div>
                        <span className="badge text-[10px] badge-success">{h.status}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-2.5 rounded-xl">
                        <div><p className="text-xs font-bold text-slate-800">{h.beds}</p><p className="text-[9px] text-slate-400">Beds</p></div>
                        <div><p className="text-xs font-bold text-slate-800">{h.doctors}</p><p className="text-[9px] text-slate-400">Doctors</p></div>
                        <div><p className="text-xs font-bold text-slate-800">{h.patients}</p><p className="text-[9px] text-slate-400">Patients</p></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section 4: Emergency Ward ICU status */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 4: Live Emergency ICU Bed Status</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {icuBeds.map(b => (
                      <button
                        key={b.bed}
                        onClick={() => {
                          setIcuBeds(prev => prev.map(x => x.bed === b.bed ? { ...x, occupied: !x.occupied, status: x.occupied ? 'Available' : 'Stable' } : x));
                          showToast(`Toggled ${b.bed} admission state`);
                        }}
                        className={`p-3 border rounded-xl text-center transition-all ${
                          b.occupied ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-800">{b.bed}</p>
                        <p className="text-[10px] font-semibold opacity-70 mt-0.5">{b.occupied ? 'Occupied' : 'Free'}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 5: Staff Utilization Distribution Chart */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 5: Department Distribution Chart</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={[
                      { dept: 'Cardiology', doctors: 14, nurses: 28 },
                      { dept: 'Emergency', doctors: 22, nurses: 45 },
                      { dept: 'Neurology', doctors: 8, nurses: 16 },
                      { dept: 'Pediatrics', doctors: 18, nurses: 32 }
                    ]}>
                      <XAxis dataKey="dept" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="doctors" fill="#0284C7" name="Doctors" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="nurses" fill="#10B981" name="Nurses" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* MODULE 3: Emergency Fleet */}
            {activeModule === 'fleet' && (
              <div className="space-y-6">
                {/* Section 1: GPS Fleet Coordinates Search */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: GPS Dispatch Center</h3>
                  <div className="text-xs text-slate-500 font-mono">Simulating real-time satellite coordinates: 37.7749° N, 122.4194° W</div>
                </div>

                {/* Section 2: Fleet Status Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Fleet Active</p>
                    <h4 className="text-xl font-bold text-red-600 font-display mt-0.5">{vehicles.filter(v => v.status === 'Active').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Idle / Ready</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">{vehicles.filter(v => v.status === 'Idle').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">In Workshop</p>
                    <h4 className="text-xl font-bold text-slate-500 font-display mt-0.5">{vehicles.filter(v => v.status === 'Maintenance').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Avg Response Time</p>
                    <h4 className="text-xl font-bold text-primary-600 font-display mt-0.5">6.2 min</h4>
                  </div>
                </div>

                {/* Section 3: Ambulance List Table */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-4">Section 3: Emergency Ambulances</h3>
                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr><th>Vehicle ID</th><th>Driver</th><th>Plate</th><th>Route Progress</th><th>Destination</th><th>ETA</th></tr>
                      </thead>
                      <tbody>
                        {vehicles.map(v => (
                          <tr key={v.id}>
                            <td className="font-bold text-xs">{v.id}</td>
                            <td className="text-xs font-semibold text-slate-700">{v.driverName}</td>
                            <td className="text-xs text-slate-500 font-mono">{v.plate}</td>
                            <td>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                                  <div className="h-full bg-primary-600 rounded-full" style={{ width: `${v.routeProgress}%` }} />
                                </div>
                                <span className="text-[10px] font-bold">{v.routeProgress}%</span>
                              </div>
                            </td>
                            <td className="text-xs text-slate-600">{v.destination}</td>
                            <td>
                              <span className="text-xs font-bold text-red-500">{v.eta > 0 ? `${v.eta} min` : 'Idle'}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Dispatch Request Form */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 4: Dispatch Vehicle</h3>
                  <form onSubmit={handleDispatch} className="grid sm:grid-cols-4 gap-3">
                    <select
                      value={newDispatch.plate}
                      onChange={e => setNewDispatch({ ...newDispatch, plate: e.target.value })}
                      className="input-medical text-xs bg-white"
                    >
                      {vehicles.filter(v => v.status === 'Idle').map(v => (
                        <option key={v.id} value={v.id}>{v.id} ({v.type})</option>
                      ))}
                      {vehicles.filter(v => v.status === 'Idle').length === 0 && (
                        <option value="">No vehicles idle</option>
                      )}
                    </select>
                    <input
                      required
                      placeholder="Destination ward/address"
                      value={newDispatch.destination}
                      onChange={e => setNewDispatch({ ...newDispatch, destination: e.target.value })}
                      className="input-medical text-xs"
                    />
                    <input
                      placeholder="Patient Name"
                      value={newDispatch.patient}
                      onChange={e => setNewDispatch({ ...newDispatch, patient: e.target.value })}
                      className="input-medical text-xs"
                    />
                    <button type="submit" className="btn-danger text-xs py-2 justify-center">
                      <Zap className="w-3.5 h-3.5" /> dispatch
                    </button>
                  </form>
                </div>

                {/* Section 5: Driver Profiles Grid */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 5: Active Shift Driver Roster</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {INITIAL_DRIVERS.map(drv => (
                      <div key={drv.id} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                        <img src={drv.avatar} className="w-10 h-10 rounded-xl object-cover" alt={drv.name} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800">{drv.name}</p>
                          <p className="text-[10px] text-slate-400">Trips completed: {drv.tripsCompleted} · {drv.contact}</p>
                          <span className={`inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                            drv.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                          }`}>{drv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 4: Task Workflow */}
            {activeModule === 'tasks' && (
              <div className="space-y-6">
                {/* Section 1: Header & Category Filters */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: Task Category Selection</h3>
                  <div className="flex gap-2">
                    {['All', 'Billing', 'Clinical', 'Compliance', 'IT'].map(c => (
                      <button key={c} onClick={() => setTaskFilter(c)} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${taskFilter === c ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 2: Task Board Status */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Todo</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">{tasks.filter(t => t.status === 'Todo').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">In Progress</p>
                    <h4 className="text-xl font-bold text-primary-600 font-display mt-0.5">{tasks.filter(t => t.status === 'In Progress').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Under Review</p>
                    <h4 className="text-xl font-bold text-amber-600 font-display mt-0.5">{tasks.filter(t => t.status === 'Review').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Completed</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">{tasks.filter(t => t.status === 'Completed').length}</h4>
                  </div>
                </div>

                {/* Section 3: Tasks Board List */}
                <div className="medical-card p-5 space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 3: Operations Kanban Tasks</h3>
                  <div className="space-y-2">
                    {tasks.filter(t => taskFilter === 'All' || t.category === taskFilter).map(tsk => (
                      <div key={tsk.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50">
                        <div>
                          <p className="text-xs font-bold text-slate-800">{tsk.title}</p>
                          <p className="text-[10px] text-slate-400">Due: {tsk.dueDate} · Assignee: {tsk.assignee}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`badge text-[9px] ${
                            tsk.priority === 'High' ? 'badge-danger' : 'badge-primary'
                          }`}>{tsk.priority} Priority</span>
                          <button
                            onClick={() => {
                              setTasks(prev => prev.map(t => t.id === tsk.id ? { ...t, status: 'Completed' } : t));
                              showToast(`Task ${tsk.id} completed`);
                            }}
                            className="text-xs text-emerald-600 font-bold hover:underline"
                          >
                            Mark Complete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Assign Task Form */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 4: Create Task Order</h3>
                  <form onSubmit={handleAddTask} className="grid sm:grid-cols-4 gap-3">
                    <input
                      required
                      placeholder="Task Title..."
                      value={newTask.title}
                      onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                      className="input-medical text-xs"
                    />
                    <input
                      placeholder="Assignee Name"
                      value={newTask.assignee}
                      onChange={e => setNewTask({ ...newTask, assignee: e.target.value })}
                      className="input-medical text-xs"
                    />
                    <select
                      value={newTask.category}
                      onChange={e => setNewTask({ ...newTask, category: e.target.value })}
                      className="input-medical text-xs bg-white"
                    >
                      <option value="IT">IT</option>
                      <option value="Billing">Billing</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Operations">Operations</option>
                    </select>
                    <button type="submit" className="btn-primary text-xs py-2 justify-center">
                      Assign Task
                    </button>
                  </form>
                </div>

                {/* Section 5: Overdue Warning Alerts */}
                <div className="medical-card p-4 border border-red-200 bg-red-50 flex items-start gap-3 rounded-2xl">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-red-800">Section 5: High Priority SLA Warnings</h4>
                    <p className="text-[10px] text-red-700 mt-0.5">
                      {tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length} tasks require compliance auditing review before the upcoming hospital network lock.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 5: Documents & Policies */}
            {activeModule === 'documents' && (
              <div className="space-y-6">
                {/* Section 1: File Search & filter */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: Policy Repository Filters</h3>
                  <select
                    value={docCategory}
                    onChange={e => setDocCategory(e.target.value)}
                    className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-white"
                  >
                    <option value="All">All Categories</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Billing">Billing</option>
                    <option value="Clinical">Clinical</option>
                  </select>
                </div>

                {/* Section 2: Storage Allocation Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Vault Capacity</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">{simulatedSize} GB</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Total PDF Checklists</p>
                    <h4 className="text-xl font-bold text-primary-600 font-display mt-0.5">{documents.length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">HIPAA Compliance Score</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">100%</h4>
                  </div>
                </div>

                {/* Section 3: Documents Table */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-4">Section 3: Electronic Form Vault</h3>
                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr><th>Document Name</th><th>Size</th><th>Category</th><th>Upload Date</th><th>Action</th></tr>
                      </thead>
                      <tbody>
                        {documents.filter(d => docCategory === 'All' || d.category === docCategory).map(doc => (
                          <tr key={doc.id}>
                            <td className="text-xs font-semibold text-slate-700">{doc.name}</td>
                            <td className="text-xs text-slate-500">{doc.size}</td>
                            <td><span className="badge text-[10px] badge-primary">{doc.category}</span></td>
                            <td className="text-xs text-slate-500">{doc.uploadDate}</td>
                            <td>
                              <button onClick={() => handleArchiveDocument(doc.id)} className="text-[10px] text-red-500 font-bold hover:underline">
                                Archive
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: File Upload Simulator */}
                <div className="medical-card p-5 text-center border-dashed border-2 border-slate-200">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-2">Section 4: Upload Policy Template</h3>
                  <p className="text-xs text-slate-500 mb-3">Accepts PDF, DOCX, XLSX up to 10MB</p>
                  <button onClick={handleUploadSimulate} className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Upload File
                  </button>
                </div>

                {/* Section 5: Retention & Lock Status */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-xs font-display mb-2">Section 5: HIPAA Document Retention Lock</h3>
                  <p className="text-[10px] text-slate-500">
                    Medirex is automatically enforcing 6-year secure encryption vaulting on all files uploaded to the HIPAA category.
                  </p>
                </div>
              </div>
            )}

            {/* MODULE 6: Audit Trail & Logs */}
            {activeModule === 'audit' && (
              <div className="space-y-6">
                {/* Section 1: Time filter */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: Severity Settings</h3>
                  <div className="flex gap-2">
                    {['Comprehensive', 'Warning Only', 'Errors Only'].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => {
                          setAuditLevel(lvl);
                          showToast(`Auditing level switched to ${lvl}`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          auditLevel === lvl ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 2: Incident KPI Summary */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Audits Today</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">{auditLogs.length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Passed Checks</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">{auditLogs.filter(a => a.status === 'Passed').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">IP Flags</p>
                    <h4 className="text-xl font-bold text-red-500 font-display mt-0.5">{auditLogs.filter(a => a.status === 'Failed' || a.status === 'Flagged').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Compliance</p>
                    <h4 className="text-xl font-bold text-primary-600 font-display mt-0.5">100.0%</h4>
                  </div>
                </div>

                {/* Section 3: Audit Logs List */}
                <div className="medical-card p-5 space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 3: Security & EMR Auditor Trail</h3>
                  <div className="space-y-2">
                    {auditLogs.map(log => (
                      <div key={log.id} className="p-3 border border-slate-100 rounded-xl bg-slate-50 flex justify-between items-start gap-4">
                        <div>
                          <p className="text-xs font-bold text-slate-800">{log.action}</p>
                          <p className="text-[10px] text-slate-400">User: {log.user} ({log.role}) · IP: {log.ipAddress}</p>
                          <p className="text-[10px] text-slate-500 mt-1 font-semibold">{log.details}</p>
                        </div>
                        <span className={`badge text-[9px] flex-shrink-0 ${
                          log.status === 'Passed' ? 'badge-success' : 'badge-danger'
                        }`}>{log.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: IP Whitelist Config */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 4: Platform Firewall IP Whitelist</h3>
                  <form onSubmit={handleAddIp} className="flex gap-2 mb-3">
                    <input
                      required
                      placeholder="e.g. 192.168.1.10/24"
                      value={newIp}
                      onChange={e => setNewIp(e.target.value)}
                      className="input-medical text-xs flex-1"
                    />
                    <button type="submit" className="btn-primary text-xs py-2 px-4">
                      Add Range
                    </button>
                  </form>
                  <div className="flex flex-wrap gap-1.5">
                    {ips.map(ip => (
                      <span key={ip} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                        {ip}
                        <button type="button" onClick={() => { setIps(ips.filter(x => x !== ip)); showToast(`Removed ${ip}`); }} className="text-red-500 hover:text-red-700">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section 5: Query Encryption Auditing */}
                <div className="medical-card p-5 border border-primary-100 bg-primary-50/20">
                  <h3 className="font-bold text-gray-900 text-xs font-display mb-1">Section 5: EMR Column Decryption Audit Mode</h3>
                  <p className="text-[10px] text-slate-500 mb-2">Logs details of all columns queried during active patient file views.</p>
                  <button onClick={handleDiagnosticsSigned} className="btn-ghost border border-primary-200 text-xs py-1.5">
                    Generate Encryption Signatures
                  </button>
                </div>
              </div>
            )}

            {/* MODULE 7: Billing Ledger */}
            {activeModule === 'billing' && (
              <div className="space-y-6">
                {/* Section 1: Header Filter */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: Ledger Operations</h3>
                  <button onClick={handleExportFinancialCSV} className="btn-secondary text-xs py-1.5">
                    Export Financial CSV
                  </button>
                </div>

                {/* Section 2: KPIs */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Gross Billed</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">
                      ${invoices.reduce((acc, i) => acc + i.amount, 0).toLocaleString()}
                    </h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Paid Invoices</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">
                      {invoices.filter(i => i.status === 'Paid').length}
                    </h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Pending Refills</p>
                    <h4 className="text-xl font-bold text-amber-600 font-display mt-0.5">
                      {invoices.filter(i => i.status === 'Pending').length}
                    </h4>
                  </div>
                </div>

                {/* Section 3: Invoices List */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-4">Section 3: Billing Transactions</h3>
                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr><th>Invoice ID</th><th>Patient</th><th>Date</th><th>Amount</th><th>Status</th></tr>
                      </thead>
                      <tbody>
                        {invoices.map(i => (
                          <tr key={i.id}>
                            <td className="font-mono text-xs text-slate-500 uppercase">{i.id}</td>
                            <td className="text-xs font-semibold text-slate-800">{i.patientName}</td>
                            <td className="text-xs text-slate-500">{i.date}</td>
                            <td className="text-xs font-bold text-slate-900">${i.amount.toFixed(2)}</td>
                            <td>
                              <span className={`badge text-[10px] ${
                                i.status === 'Paid' ? 'badge-success' : 'badge-warning'
                              }`}>{i.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Create Invoice Panel */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 4: Create Invoice Item</h3>
                  <form onSubmit={handleCreateInvoice} className="grid sm:grid-cols-4 gap-3">
                    <input
                      required
                      placeholder="Patient Name"
                      value={newInvoiceItem.patient}
                      onChange={e => setNewInvoiceItem({ ...newInvoiceItem, patient: e.target.value })}
                      className="input-medical text-xs"
                    />
                    <input
                      placeholder="Item Description"
                      value={newInvoiceItem.item}
                      onChange={e => setNewInvoiceItem({ ...newInvoiceItem, item: e.target.value })}
                      className="input-medical text-xs"
                    />
                    <input
                      required
                      type="number"
                      placeholder="Price ($)"
                      value={newInvoiceItem.price || ''}
                      onChange={e => setNewInvoiceItem({ ...newInvoiceItem, price: Number(e.target.value) })}
                      className="input-medical text-xs"
                    />
                    <button type="submit" className="btn-primary text-xs py-2 justify-center">
                      Create Invoice
                    </button>
                  </form>
                </div>

                {/* Section 5: Insurance Claim Stage progress */}
                <div className="medical-card p-5 space-y-3">
                  <h3 className="font-bold text-gray-900 text-xs font-display">Section 5: Claim Processing Pipeline</h3>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] text-slate-500">
                    <div className="p-2 border border-slate-100 bg-slate-50 rounded-lg">
                      <p className="font-bold text-slate-800">Submitted</p>
                      <p className="mt-0.5">3 Active</p>
                    </div>
                    <div className="p-2 border border-slate-100 bg-slate-50 rounded-lg">
                      <p className="font-bold text-slate-800">Verified</p>
                      <p className="mt-0.5">2 Active</p>
                    </div>
                    <div className="p-2 border border-slate-100 bg-slate-50 rounded-lg">
                      <p className="font-bold text-slate-800">Adjudicating</p>
                      <p className="mt-0.5">1 Active</p>
                    </div>
                    <div className="p-2 border border-slate-100 bg-emerald-50 text-emerald-700 rounded-lg">
                      <p className="font-bold text-emerald-800">Approved</p>
                      <p className="mt-0.5">14 Today</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 8: Help & Support */}
            {activeModule === 'support' && (
              <div className="space-y-6">
                {/* Section 1: ticket search */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: Support Tickets</h3>
                  <button onClick={() => { setFaqCacheCleared(true); showToast('FAQ cache cleared'); }} className="btn-secondary text-xs py-1.5">
                    Clear Helpdesk Cache
                  </button>
                </div>

                {/* Section 2: Helpdesk KPI Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Open Tickets</p>
                    <h4 className="text-xl font-bold text-amber-600 font-display mt-0.5">
                      {tickets.filter(t => t.status !== 'Resolved').length}
                    </h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Avg Resolution</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">1.4 hrs</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Resolved Today</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">
                      {tickets.filter(t => t.status === 'Resolved').length + 4}
                    </h4>
                  </div>
                </div>

                {/* Section 3: Support Tickets List */}
                <div className="medical-card p-5 space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 3: Staff Inquiries</h3>
                  <div className="space-y-2">
                    {tickets.map(t => (
                      <div key={t.id} className="p-3 border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-800">{t.issue}</p>
                          <p className="text-[10px] text-slate-400">Requester: {t.requester} · Priority: {t.priority}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`badge text-[9px] ${
                            t.status === 'Resolved' ? 'badge-success' : 'badge-warning'
                          }`}>{t.status}</span>
                          {t.status !== 'Resolved' && (
                            <button
                              onClick={() => {
                                setTickets(prev => prev.map(item => item.id === t.id ? { ...item, status: 'Resolved' } : item));
                                showToast(`Ticket ${t.id} resolved`);
                              }}
                              className="text-xs text-emerald-600 font-bold hover:underline"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Live Helpdesk Chat Thread */}
                <div className="medical-card p-5 space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 4: IT Helpdesk Chat</h3>
                  <div className="h-32 overflow-y-auto border border-slate-100 rounded-xl p-3 space-y-2 bg-slate-50/50 text-[11px]">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="font-bold text-slate-700">{msg.sender}</span>
                        <span className="text-slate-600 mt-0.5">{msg.text}</span>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendChat} className="flex gap-2">
                    <input
                      placeholder="Type a support message..."
                      value={chatText}
                      onChange={e => setChatText(e.target.value)}
                      className="input-medical text-xs flex-1"
                    />
                    <button type="submit" className="btn-primary text-xs py-2 px-4">
                      Send
                    </button>
                  </form>
                </div>

                {/* Section 5: Knowledge Base Reference */}
                <div className="medical-card p-4 bg-primary-50/20 border border-primary-100">
                  <h3 className="font-bold text-xs text-slate-800">Section 5: Administrator FAQ</h3>
                  <p className="text-[10px] text-slate-500 mt-1">
                    To modify EMR schema, please update the HIPAA auditing log config file directly under settings page.
                  </p>
                </div>
              </div>
            )}

            {/* MODULE 9: AI Diagnostics Monitor */}
            {activeModule === 'ai_monitor' && (
              <div className="space-y-6">
                {/* Section 1: Model settings */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: AI Settings</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Decision Threshold: {(aiThreshold * 100).toFixed(0)}%</span>
                    <input
                      type="range"
                      min="0.5"
                      max="0.99"
                      step="0.05"
                      value={aiThreshold}
                      onChange={e => setAiThreshold(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>

                {/* Section 2: Accuracy KPI Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Neural Latency</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">142ms</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Daily Predictions</p>
                    <h4 className="text-xl font-bold text-primary-600 font-display mt-0.5">1,489</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Accuracy Rate</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">94.7%</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Mismatches flagged</p>
                    <h4 className="text-xl font-bold text-red-500 font-display mt-0.5">14</h4>
                  </div>
                </div>

                {/* Section 3: Prediction Accuracy Chart */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 3: Model Accuracy Trend</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={aiAccuracyTrend}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[90, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="acc" stroke="#6366F1" strokeWidth={2.5} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Section 4: Model Controls */}
                <div className="medical-card p-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">Section 4: AI Model Deployment Trigger</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Current Model: DiagnosticsPatch_v2.4.1 (Active)</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setAiEngineStatus(prev => prev === 'Active' ? 'Suspended' : 'Active');
                        showToast(`AI engine status switched to ${aiEngineStatus === 'Active' ? 'Suspended' : 'Active'}`);
                      }}
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      {aiEngineStatus === 'Active' ? 'Suspend Engine' : 'Resume Engine'}
                    </button>
                    <button onClick={() => showToast('Triggered AI model retraining pipeline')} className="btn-primary text-xs py-1.5 px-3">
                      Trigger Retraining
                    </button>
                  </div>
                </div>

                {/* Section 5: Flagged AI Mismatches */}
                <div className="medical-card p-4 border border-amber-200 bg-amber-50 rounded-2xl">
                  <h4 className="font-bold text-xs text-amber-800">Section 5: AI Misclassification Audit Alert</h4>
                  <p className="text-[10px] text-amber-700 mt-0.5">
                    Dr. Harrison reported EMR diagnostic mismatch on Patient Thomas Shelby. AI prediction was 'Pneumonia', doctor confirmed 'Flu'. Re-weighting node paths.
                  </p>
                </div>
              </div>
            )}

            {/* MODULE 10: IoT & Hardware */}
            {activeModule === 'hardware' && (
              <div className="space-y-6">
                {/* Section 1: search */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: IoT Gateway Search</h3>
                  <button onClick={() => showToast('Pinging all IoT nodes')} className="btn-secondary text-xs py-1.5">
                    Ping Nodes
                  </button>
                </div>

                {/* Section 2: IoT Node KPIs */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Total Nodes</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">{nodes.length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Online</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">{nodes.filter(n => n.status === 'Online').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Warnings</p>
                    <h4 className="text-xl font-bold text-amber-600 font-display mt-0.5">{nodes.filter(n => n.status === 'Warning').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Average Battery</p>
                    <h4 className="text-xl font-bold text-primary-600 font-display mt-0.5">92%</h4>
                  </div>
                </div>

                {/* Section 3: Hardware Diagnostics Table */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-4">Section 3: Telemetry Nodes</h3>
                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr><th>Device Label</th><th>Type</th><th>Battery</th><th>Status</th><th>Latency</th></tr>
                      </thead>
                      <tbody>
                        {nodes.map(node => (
                          <tr key={node.label}>
                            <td className="text-xs font-semibold text-slate-700">{node.label}</td>
                            <td className="text-xs text-slate-500">{node.type}</td>
                            <td className="text-xs text-slate-800">{node.battery}%</td>
                            <td>
                              <span className={`badge text-[10px] ${
                                node.status === 'Online' ? 'badge-success' : 'badge-warning'
                              }`}>{node.status}</span>
                            </td>
                            <td className="text-xs font-mono text-slate-600">{node.latency}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Firmware Dispatch Panel */}
                <div className="medical-card p-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">Section 4: Over-The-Air Firmware Dispatch</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Current Firmware: MedirexNodeOS_v1.0.8</p>
                  </div>
                  <button onClick={() => showToast('Firmware updates queued')} className="btn-primary text-xs py-1.5 px-3">
                    Queue Firmware Update
                  </button>
                </div>

                {/* Section 5: IoT Warning Logs */}
                <div className="medical-card p-4 border border-amber-200 bg-amber-50 rounded-2xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-amber-800">Section 5: Cooler Refrigerator Temp Spike</h4>
                    <p className="text-[10px] text-amber-700 mt-0.5">
                      Node 'Drug Refrigerator 3' logged a temperature of 5.8°C (allowed range: 2.0°C - 8.0°C). Normal parameters maintained, checking auto defrost logs.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 11: Pharmacy Control */}
            {activeModule === 'pharmacy' && (
              <div className="space-y-6">
                {/* Section 1: search */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: Drug Registry</h3>
                  <button onClick={handleGenerateFDAStockReport} className="btn-secondary text-xs py-1.5">
                    Generate FDA Stock Report
                  </button>
                </div>

                {/* Section 2: Supply Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">In Stock Items</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">{inventory.filter(i => i.status === 'In Stock').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Low Stock Alert</p>
                    <h4 className="text-xl font-bold text-amber-600 font-display mt-0.5">{inventory.filter(i => i.status === 'Low Stock').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Out of Stock</p>
                    <h4 className="text-xl font-bold text-red-500 font-display mt-0.5">{inventory.filter(i => i.status === 'Out of Stock').length}</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Total Units</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">38,400</h4>
                  </div>
                </div>

                {/* Section 3: Drug Table */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-4">Section 3: Pharmacy Central Stocks</h3>
                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr><th>Generic Name</th><th>Category</th><th>Stock</th><th>Expiry</th><th>Status</th></tr>
                      </thead>
                      <tbody>
                        {inventory.map(drug => (
                          <tr key={drug.id}>
                            <td className="text-xs font-semibold text-slate-700">{drug.name}</td>
                            <td className="text-xs text-slate-500">{drug.category}</td>
                            <td className="text-xs text-slate-800 font-bold">{drug.stock} {drug.unit}</td>
                            <td className="text-xs text-slate-500">{drug.expiryDate}</td>
                            <td>
                              <span className={`badge text-[10px] ${
                                drug.status === 'In Stock' ? 'badge-success' : 'badge-danger'
                              }`}>{drug.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: PO Supplier Order Form */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 4: Create Pharmacy Refill Order</h3>
                  <form onSubmit={handleSupplierOrder} className="grid sm:grid-cols-4 gap-3">
                    <input
                      required
                      placeholder="Medicine Generic Name..."
                      value={supplierOrder.drug}
                      onChange={e => setSupplierOrder({ ...supplierOrder, drug: e.target.value })}
                      className="input-medical text-xs"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Quantity"
                      value={supplierOrder.qty}
                      onChange={e => setSupplierOrder({ ...supplierOrder, qty: Number(e.target.value) })}
                      className="input-medical text-xs"
                    />
                    <select
                      value={supplierOrder.supplier}
                      onChange={e => setSupplierOrder({ ...supplierOrder, supplier: e.target.value })}
                      className="input-medical text-xs bg-white"
                    >
                      <option>Pharma Corp</option>
                      <option>CardioMed Supplies</option>
                      <option>Insulin Plus Inc</option>
                    </select>
                    <button type="submit" className="btn-primary text-xs py-2 justify-center">
                      Refill Order
                    </button>
                  </form>
                </div>

                {/* Section 5: Expiration Warnings */}
                <div className="medical-card p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-red-800">Section 5: Imminent Expiry Stock</h4>
                    <p className="text-[10px] text-red-700 mt-0.5">
                      Batch insulin glargine (2 vials) is expiring within the next 45 days. Automatic routing to regional clinic.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 12: Lab & Test Pipeline */}
            {activeModule === 'labs' && (
              <div className="space-y-6">
                {/* Section 1: category filter */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: Pathology Catalog</h3>
                  <button onClick={() => showToast('Re-calibrating lab equipment')} className="btn-secondary text-xs py-1.5">
                    Trigger Lab Equipment Re-calibration
                  </button>
                </div>

                {/* Section 2: Lab Load KPI Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">CBC Panel tests</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">
                      {labTests.filter(t => t.testName.includes('CBC')).length + 3}
                    </h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">STAT Priority</p>
                    <h4 className="text-xl font-bold text-red-500 font-display mt-0.5">
                      {labTests.filter(t => t.priority === 'STAT').length}
                    </h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Processing Load</p>
                    <h4 className="text-xl font-bold text-amber-600 font-display mt-0.5">
                      {labTests.filter(t => t.status === 'Processing').length}
                    </h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Diagnostic Accuracy</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">99.9%</h4>
                  </div>
                </div>

                {/* Section 3: Lab Test Requests Table */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-4">Section 3: Diagnostic Backlog</h3>
                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr><th>Patient Name</th><th>Test Panel</th><th>Priority</th><th>Status</th><th>Code</th></tr>
                      </thead>
                      <tbody>
                        {labTests.slice(0, 4).map(t => (
                          <tr key={t.id}>
                            <td className="text-xs font-semibold text-slate-700">{t.patientName}</td>
                            <td className="text-xs text-slate-800">{t.testName}</td>
                            <td>
                              <span className={`badge text-[10px] ${
                                t.priority === 'STAT' ? 'badge-danger' : 'badge-primary'
                              }`}>{t.priority}</span>
                            </td>
                            <td>
                              <span className={`badge text-[10px] ${
                                t.status === 'Completed' || t.status === 'Report Ready' ? 'badge-success' : 'badge-warning'
                              }`}>{t.status}</span>
                            </td>
                            <td className="text-xs text-slate-500 font-mono">{t.testCode}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Lab Reagent Consumables inventory */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 4: Diagnostic Assay Chemical Stocks</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {labReagents.map(re => (
                      <div key={re.name} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                        <p className="text-xs font-bold text-slate-800">{re.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Kits: {re.stock}</p>
                        <span className={`inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full mt-1.5 ${
                          re.status === 'Optimal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>{re.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Pathology Lab Schedule */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-xs font-display mb-2">Section 5: Laboratory Machine Schedule</h3>
                  <p className="text-[10px] text-slate-500">
                    Spectrometry Unit 3 is currently reserved for STAT lipid panels until 16:00.
                  </p>
                </div>
              </div>
            )}

            {/* MODULE 13: Security & WAF */}
            {activeModule === 'security' && (
              <div className="space-y-6">
                {/* Section 1: Firewall profile */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: WAF Profile Status</h3>
                  <button
                    onClick={() => {
                      setIsWafLock(!isWafLock);
                      showToast(`WAF security profile set to ${!isWafLock ? 'LOCKDOWN' : 'MODERATE'}`);
                    }}
                    className={`btn-danger text-xs py-1.5 ${isWafLock ? 'bg-red-700 text-white animate-pulse' : ''}`}
                  >
                    {isWafLock ? 'CANCEL LOCKDOWN' : 'TRIGGER SECURITY LOCKDOWN'}
                  </button>
                </div>

                {/* Section 2: Security Threat KPI Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Blocked IPs</p>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-0.5">148</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">Intrusions Intercepted</p>
                    <h4 className="text-xl font-bold text-red-600 font-display mt-0.5">1,242</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">DDoS Rate-limits</p>
                    <h4 className="text-xl font-bold text-amber-600 font-display mt-0.5">0</h4>
                  </div>
                  <div className="medical-card p-4 text-center">
                    <p className="text-xs text-slate-500">SSL Cert Status</p>
                    <h4 className="text-xl font-bold text-emerald-600 font-display mt-0.5">Healthy</h4>
                  </div>
                </div>

                {/* Section 3: WAF Blocked Intrusion Logs */}
                <div className="medical-card p-5 space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 3: Firewalled Traffic Logs</h3>
                  <div className="space-y-2">
                    {wafThreats.map(threat => (
                      <div key={threat.ip} className="p-3 border border-red-100 bg-red-50/20 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-red-900">{threat.threat}</p>
                          <p className="text-[10px] text-slate-500">Source: {threat.ip} · Time: {threat.timestamp}</p>
                        </div>
                        <button
                          onClick={() => {
                            setWafThreats(prev => prev.filter(t => t.ip !== threat.ip));
                            showToast(`Permanently blocked source IP ${threat.ip}`);
                          }}
                          className="text-xs text-red-600 font-bold hover:underline"
                        >
                          Blacklist IP
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Quick Port Blocker */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-sm font-display mb-3">Section 4: API Port Controller</h3>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <button onClick={() => handleTogglePort('8080', 'Internal Port 8080')} className="p-3 border border-slate-200 rounded-xl hover:border-red-400 bg-white">
                      Restrict Internal Port 8080
                    </button>
                    <button onClick={() => handleTogglePort('api-gateway', 'Public API Gateway')} className="p-3 border border-slate-200 rounded-xl hover:border-red-400 bg-white">
                      Disable Public API Gateway
                    </button>
                  </div>
                </div>

                {/* Section 5: Cryptographic Hash Status */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 text-xs font-display mb-1.5 flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-emerald-600" /> Section 5: EMR Verification Hash Signatures
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Blockchain verification blocks: <strong>Verified</strong>. All patient record audits match cloud checksum hashes.
                  </p>
                </div>
              </div>
            )}

            {/* MODULE 14: Communications & Chats */}
            {activeModule === 'comms' && (
              <div className="space-y-6">
                {/* Section 1: Header Chat Search */}
                <div className="medical-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm font-display">Section 1: Communication Hub</h3>
                  <button onClick={handleEmergencyBroadcast} className="btn-danger text-xs py-1.5 px-3">
                    Emergency Staff Broadcast
                  </button>
                </div>

                {/* Section 2: Thread List Widget */}
                <div className="grid grid-cols-3 gap-3">
                  {threads.map(thr => (
                    <button
                      key={thr.id}
                      onClick={() => setActiveThreadId(thr.id)}
                      className={`p-3 border rounded-xl text-left transition-all ${
                        activeThreadId === thr.id ? 'border-primary-500 bg-primary-50 dark:border-primary-500/50 dark:bg-primary-900/20' : 'border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{thr.user.name}</p>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{thr.user.role}</p>
                      {thr.unreadCount > 0 && (
                        <span className="inline-block text-[9px] font-semibold bg-primary-600 text-white px-1.5 py-0.5 rounded-full mt-1">
                          {thr.unreadCount} unread
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Section 3: Interactive Messenger */}
                {activeThread && (
                  <div className="medical-card p-5 space-y-3">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm font-display">Section 3: Live Chat with {activeThread.user.name}</h3>
                    <div className="h-40 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-xl p-3 space-y-2 bg-slate-50/50 dark:bg-slate-900/50 text-xs">
                      {activeThread.messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-2xl px-3 py-1.5 ${
                            msg.self ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                          }`}>
                            <p className="text-xs leading-relaxed">{msg.text}</p>
                            <span className="text-[8px] opacity-70 block text-right mt-0.5">{msg.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSendComms} className="flex gap-2">
                      <input
                        placeholder="Write a message..."
                        value={commsInput}
                        onChange={e => setCommsInput(e.target.value)}
                        className="input-medical text-xs flex-1"
                      />
                      <button type="submit" className="btn-primary text-xs py-2 px-4">
                        Send message
                      </button>
                    </form>
                  </div>
                )}

                {/* Section 4: Broadcast Announcements Form */}
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm font-display mb-2">Section 4: Broadcast News</h3>
                  <div className="flex gap-2">
                    <input value={announcementText} onChange={e => setAnnouncementText(e.target.value)} className="input-medical text-xs flex-1" placeholder="Announcement header text..." />
                    <button onClick={handlePublishAnnouncement} className="btn-primary text-xs py-2 px-4">
                      Publish
                    </button>
                  </div>
                </div>

                {/* Section 5: Communication Performance */}
                <div className="medical-card p-4 bg-primary-50/20 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/30 text-xs text-slate-500 dark:text-slate-400">
                  <p className="font-bold text-slate-800 dark:text-slate-300 mb-1">Section 5: Chat metrics</p>
                  Average system read rate: 94.2% within 5 minutes of dispatch.
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
