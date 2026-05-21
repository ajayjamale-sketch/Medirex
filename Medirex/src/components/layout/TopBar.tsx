import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, AlertTriangle, ChevronDown, Settings, User, LogOut, Zap, X, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import type { UserRole } from '@/types';

const ROLE_LABELS: Record<UserRole, string> = {
  patient: 'Patient Portal',
  doctor: 'Doctor Portal',
  hospital_staff: 'Hospital Portal',
  pharmacy: 'Pharmacy Portal',
  lab: 'Lab Portal',
  admin: 'Admin Panel',
};

const PAGE_LABELS: Record<string, string> = {
  '/patient': 'Dashboard',
  '/doctor': 'Dashboard',
  '/hospital': 'Dashboard',
  '/pharmacy-dash': 'Dashboard',
  '/lab-dash': 'Dashboard',
  '/admin': 'Control Panel',
  '/appointments': 'Appointments',
  '/emr': 'EMR / EHR',
  '/telemedicine': 'Telemedicine',
  '/pharmacy': 'Inventory',
  '/diagnostics': 'Lab Diagnostics',
  '/billing': 'Billing & Insurance',
  '/emergency': 'Emergency Services',
  '/wellness': 'Health Tracker',
  '/analytics': 'Analytics & Insights',
  '/notifications': 'Notifications',
  '/profile': 'My Profile',
  '/settings': 'Settings',
  '/compliance': 'Compliance',
  '/hospital/staff-schedule': 'Staff Scheduling',
  '/patient/setup': 'Medical Profile Setup',
  '/legal/terms': 'Terms of Service',
  '/legal/privacy': 'Privacy Policy',
};

export default function TopBar() {
  const { user, logout } = useAuth();
  const { setSidebarOpen, unreadCount, notifications, markNotificationRead } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  // Resolve current page label from path (strip query params)
  const basePath = location.pathname;
  const currentPage = PAGE_LABELS[basePath] || (
    basePath.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Dashboard'
  );
  const roleLabel = ROLE_LABELS[user.role];
  const isOnRootDash = ['/', '/patient', '/doctor', '/hospital', '/pharmacy-dash', '/lab-dash', '/admin'].includes(basePath);

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    navigate('/auth/login');
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 px-4 lg:px-6 py-3 flex items-center gap-3 sticky top-0 z-30 shadow-sm transition-colors duration-300">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page context breadcrumb */}
      <div className="hidden md:flex items-center gap-1.5 text-sm">
        <span className="font-semibold text-gray-800 dark:text-white">Medirex</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600" />
        <span className="text-gray-500 dark:text-slate-400 font-medium">{roleLabel}</span>
        {!isOnRootDash && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-primary-600 font-semibold capitalize">{currentPage}</span>
          </>
        )}
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto relative hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search patients, doctors, appointments..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-slate-900 text-gray-900 dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Mobile search */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Emergency button */}
        <button
          onClick={() => navigate('/emergency')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-semibold transition-colors border border-red-100"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Emergency</span>
        </button>

        {/* AI Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-primary-50 text-primary-600 rounded-xl text-xs font-semibold border border-primary-100">
          <Zap className="w-3.5 h-3.5" />
          <span>AI Active</span>
          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative p-2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 z-50 animate-scale-in overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{unreadCount} unread</p>
                </div>
                <button onClick={() => navigate('/notifications')} className="text-xs text-primary-600 font-medium hover:underline">View all</button>
              </div>
              <div className="max-h-72 overflow-y-auto scrollbar-thin">
                {notifications.slice(0, 5).map(notif => (
                  <div
                    key={notif.id}
                    onClick={() => { markNotificationRead(notif.id); navigate(notif.action || '/notifications'); setShowNotifications(false); }}
                    className={`p-3.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors ${!notif.read ? 'bg-primary-50/40' : ''}`}
                  >
                    <div className="flex gap-3 items-start">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        notif.priority === 'high' ? 'bg-red-500' :
                        notif.priority === 'medium' ? 'bg-amber-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">{notif.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 p-1 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0284C7&color=fff`}
              alt={user.name}
              className="w-8 h-8 rounded-xl object-cover border-2 border-primary-100 dark:border-primary-900"
            />
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-gray-800 dark:text-slate-200 leading-none">{user.name.split(' ')[0]}</div>
              <div className="text-[10px] text-gray-500 dark:text-slate-400 capitalize">{ROLE_LABELS[user.role]}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-scale-in overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-primary-50 to-sky-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0284C7&color=fff`}
                    alt={user.name} className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-[10px] font-semibold text-primary-600 capitalize mt-0.5">{ROLE_LABELS[user.role]}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button onClick={() => { navigate('/profile'); setShowProfile(false); }} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <User className="w-4 h-4" /> Profile
                </button>
                <button onClick={() => { navigate('/settings'); setShowProfile(false); }} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search expanded */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-3 md:hidden shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      )}
    </header>
  );
}
