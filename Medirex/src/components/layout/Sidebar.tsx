import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Calendar, FileText, Video, Pill, FlaskConical,
  CreditCard, AlertTriangle, BarChart3, Shield, Settings, Bell, User,
  ChevronDown, ChevronRight, Activity, Heart, Stethoscope, Building2,
  Package, Microscope, X, Zap, LogOut, Truck, UserCheck, Navigation, MapPin, Briefcase, Folder, MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string | number;
  badgeType?: 'danger' | 'warning' | 'info';
  children?: NavItem[];
}

const ROLE_NAV: Record<UserRole, NavItem[]> = {
  patient: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/patient' },
    { label: 'Appointments', icon: Calendar, path: '/appointments', badge: 2, badgeType: 'info' },
    { label: 'Medical Records', icon: FileText, path: '/emr' },
    { label: 'Telemedicine', icon: Video, path: '/telemedicine' },
    { label: 'Prescriptions', icon: Pill, path: '/pharmacy' },
    { label: 'Lab Results', icon: FlaskConical, path: '/diagnostics' },
    { label: 'Billing & Payments', icon: CreditCard, path: '/billing' },
    { label: 'Emergency SOS', icon: AlertTriangle, path: '/emergency', badgeType: 'danger', badge: '!' },
    { label: 'Health Tracker', icon: Heart, path: '/wellness' },
    { label: 'Notifications', icon: Bell, path: '/notifications', badge: 5, badgeType: 'danger' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  doctor: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/doctor' },
    { label: 'My Schedule', icon: Calendar, path: '/appointments' },
    { label: 'EMR / EHR', icon: FileText, path: '/emr' },
    { label: 'Telemedicine', icon: Video, path: '/telemedicine' },
    { label: 'Prescriptions', icon: Pill, path: '/pharmacy' },
    { label: 'Lab Orders', icon: Microscope, path: '/diagnostics' },
    { label: 'Emergency', icon: AlertTriangle, path: '/emergency', badge: 2, badgeType: 'danger' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Notifications', icon: Bell, path: '/notifications', badge: 4, badgeType: 'danger' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  hospital_staff: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/hospital' },
    { label: 'Appointments', icon: Calendar, path: '/appointments' },
    { label: 'Patient Records', icon: FileText, path: '/emr' },
    { label: 'Staff Scheduling', icon: UserCheck, path: '/hospital/staff-schedule' },
    { label: 'Lab & Diagnostics', icon: FlaskConical, path: '/diagnostics' },
    { label: 'Pharmacy', icon: Package, path: '/pharmacy' },
    { label: 'Billing', icon: CreditCard, path: '/billing' },
    { label: 'Emergency', icon: AlertTriangle, path: '/emergency', badge: 3, badgeType: 'danger' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Compliance', icon: Shield, path: '/compliance' },
    { label: 'Notifications', icon: Bell, path: '/notifications', badge: 7, badgeType: 'danger' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  pharmacy: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/pharmacy-dash' },
    { label: 'Inventory', icon: Package, path: '/pharmacy' },
    { label: 'E-Prescriptions', icon: FileText, path: '/emr' },
    { label: 'Dispensing Orders', icon: Pill, path: '/pharmacy-dash?tab=orders' },
    { label: 'Billing', icon: CreditCard, path: '/billing' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Notifications', icon: Bell, path: '/notifications', badge: 2, badgeType: 'warning' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  lab: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/lab-dash' },
    { label: 'Test Requests', icon: Microscope, path: '/lab-dash?tab=requests' },
    { label: 'Sample Tracking', icon: Activity, path: '/lab-dash?tab=tracking' },
    { label: 'Reports', icon: FileText, path: '/lab-dash?tab=reports' },
    { label: 'Billing', icon: CreditCard, path: '/billing' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Notifications', icon: Bell, path: '/notifications', badge: 3, badgeType: 'info' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  admin: [
    { label: 'User Management', icon: Users, path: '/admin?tab=users' },
    { label: 'Hospitals & Directory', icon: Building2, path: '/admin?tab=hospitals' },
    { label: 'Emergency Fleet', icon: Truck, path: '/admin?tab=fleet' },
    { label: 'Task Workflow', icon: Activity, path: '/admin?tab=tasks' },
    { label: 'Documents & Policies', icon: Folder, path: '/admin?tab=documents' },
    { label: 'Audit Trail & Logs', icon: Shield, path: '/admin?tab=audit' },
    { label: 'Billing Ledger', icon: CreditCard, path: '/admin?tab=billing' },
    { label: 'Help & Support', icon: MessageSquare, path: '/admin?tab=support' },
    { label: 'AI Diagnostics Monitor', icon: Zap, path: '/admin?tab=ai_monitor', badge: 1, badgeType: 'info' },
    { label: 'IoT Diagnostics', icon: Settings, path: '/admin?tab=hardware' },
    { label: 'Pharmacy Control', icon: Pill, path: '/admin?tab=pharmacy' },
    { label: 'Lab & Test Pipeline', icon: FlaskConical, path: '/admin?tab=labs' },
    { label: 'Security & WAF', icon: Shield, path: '/admin?tab=security', badge: 2, badgeType: 'danger' },
    { label: 'Communications', icon: MessageSquare, path: '/admin?tab=comms', badge: 2, badgeType: 'warning' },
  ],
};

const ROLE_COLORS: Record<UserRole, string> = {
  patient: 'from-sky-600 to-blue-700',
  doctor: 'from-teal-600 to-emerald-700',
  hospital_staff: 'from-violet-600 to-purple-700',
  pharmacy: 'from-amber-500 to-orange-600',
  lab: 'from-rose-500 to-red-600',
  admin: 'from-slate-700 to-gray-900',
};

const ROLE_LABELS: Record<UserRole, string> = {
  patient: 'Patient Portal',
  doctor: 'Clinical Suite',
  hospital_staff: 'Hospital Ops',
  pharmacy: 'Pharmacy Hub',
  lab: 'Laboratory',
  admin: 'Admin Control',
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { sidebarOpen, setSidebarOpen, unreadCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  if (!user) return null;

  const navItems = ROLE_NAV[user.role];
  const gradientClass = ROLE_COLORS[user.role];
  const roleLabel = ROLE_LABELS[user.role];

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => {
    if (path.includes('?')) {
      const [pathname, search] = path.split('?');
      return location.pathname === pathname && location.search === `?${search}`;
    }
    return location.pathname === path && !location.search.includes('tab=');
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-50 w-64
        bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800
        flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className={`p-5 border-b border-gray-100 dark:border-slate-800`}>
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleNavigate('/')}
            >
              <div className="w-9 h-9 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center shadow-sm">
                <Heart className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <div className="text-gray-900 dark:text-white font-bold text-lg font-display leading-none">Medirex</div>
                <div className="text-gray-500 dark:text-slate-400 text-xs mt-0.5">{roleLabel}</div>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors" onClick={() => handleNavigate('/profile')}>
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0284C7&color=fff`}
              alt={user.name}
              className="w-9 h-9 rounded-xl object-cover border-2 border-primary-100 dark:border-primary-900"
            />
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 dark:text-white font-semibold text-sm truncate">{user.name}</div>
              <div className="text-gray-500 dark:text-slate-400 text-xs capitalize">{user.role.replace('_', ' ')}</div>
            </div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto scrollbar-thin">
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              const expanded = expandedItems.includes(item.label);
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div key={item.label}>
                  <button
                    onClick={() => hasChildren ? toggleExpand(item.label) : handleNavigate(item.path)}
                    className={`sidebar-item w-full text-left ${active ? 'active' : ''}`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && !active && (
                      <span className={`
                        badge text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center
                        ${item.badgeType === 'danger' ? 'bg-red-500 text-white' :
                          item.badgeType === 'warning' ? 'bg-amber-500 text-white' :
                          'bg-primary-500 text-white'}
                      `}>
                        {item.badge}
                      </span>
                    )}
                    {hasChildren && (
                      expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {hasChildren && expanded && item.children && (
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      {item.children.map(child => {
                        const ChildIcon = child.icon;
                        return (
                          <button
                            key={child.label}
                            onClick={() => handleNavigate(child.path)}
                            className={`sidebar-item w-full text-left text-xs ${isActive(child.path) ? 'active' : ''}`}
                          >
                            <ChildIcon className="w-3.5 h-3.5 flex-shrink-0" />
                            {child.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-gray-100 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-700 dark:text-emerald-300 text-xs font-medium">System Operational</span>
            <span className="ml-auto w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
          </div>
          <button
            onClick={logout}
            className="sidebar-item w-full text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
