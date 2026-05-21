import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Notification } from '@/types';
import { MOCK_NOTIFICATIONS } from '@/constants/mockData';

interface AppContextType {
  notifications: Notification[];
  unreadCount: number;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  activeModal: string | null;
  openModal: (modal: string) => void;
  closeModal: () => void;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [globalSearch, setGlobalSearch] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const newNotif: Notification = { ...notification, id: `n_${Date.now()}` };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  const openModal = useCallback((modal: string) => setActiveModal(modal), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <AppContext.Provider value={{
      notifications, unreadCount, sidebarOpen, setSidebarOpen,
      markNotificationRead, markAllRead, addNotification,
      activeModal, openModal, closeModal,
      globalSearch, setGlobalSearch
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
