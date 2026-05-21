import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<User>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

const DEMO_USERS: Record<UserRole, User> = {
  patient: {
    id: 'u001', name: 'Sarah Johnson', email: 'patient@medirex.com',
    phone: '+1 (555) 234-5678', role: 'patient', verified: true,
    createdAt: '2024-01-15', profileComplete: true,
    avatar: 'https://i.pravatar.cc/150?u=1494790108755-2616b612b47c'
  },
  doctor: {
    id: 'du001', name: 'Dr. Robert Harrison', email: 'doctor@medirex.com',
    phone: '+1 (555) 890-1234', role: 'doctor', verified: true,
    createdAt: '2023-06-10', profileComplete: true,
    avatar: 'https://i.pravatar.cc/150?u=1612349317150-e413f6a5b16d'
  },
  hospital_staff: {
    id: 'hs001', name: 'Jennifer Adams', email: 'staff@medirex.com',
    phone: '+1 (555) 567-8901', role: 'hospital_staff', verified: true,
    createdAt: '2023-09-20', profileComplete: true,
    avatar: 'https://i.pravatar.cc/150?u=1573496359142-b8d87734a5a2'
  },
  pharmacy: {
    id: 'ph001', name: 'Alex Martinez', email: 'pharmacy@medirex.com',
    phone: '+1 (555) 678-9012', role: 'pharmacy', verified: true,
    createdAt: '2023-11-05', profileComplete: true,
    avatar: 'https://i.pravatar.cc/150?u=1582750433449-648ed127bb54'
  },
  lab: {
    id: 'lb001', name: 'Dr. Karen Wu', email: 'lab@medirex.com',
    phone: '+1 (555) 789-0123', role: 'lab', verified: true,
    createdAt: '2023-08-12', profileComplete: true,
    avatar: 'https://i.pravatar.cc/150?u=1559839734-2b71ea197ec2'
  },
  admin: {
    id: 'admin001', name: 'Dr. Andrew Collins', email: 'admin@medirex.com',
    phone: '+1 (555) 101-2345', role: 'admin', verified: true,
    createdAt: '2023-01-01', profileComplete: true,
    avatar: 'https://i.pravatar.cc/150?u=1472099645785-5658abf4ff4e'
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('medirex_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('medirex_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Try finding the user in localStorage registered users
    const registeredUsersStr = localStorage.getItem('medirex_registered_users');
    let registeredUsers: User[] = [];
    if (registeredUsersStr) {
      try {
        registeredUsers = JSON.parse(registeredUsersStr);
      } catch (e) {
        console.error(e);
      }
    }

    const foundUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    let userToLogin: User;
    if (foundUser) {
      userToLogin = foundUser;
    } else {
      // Auto-detect role from email content for demo robustness
      let targetRole = role;
      const emailLower = email.toLowerCase();
      if (emailLower.includes('doctor')) {
        targetRole = 'doctor';
      } else if (emailLower.includes('staff')) {
        targetRole = 'hospital_staff';
      } else if (emailLower.includes('pharmacy')) {
        targetRole = 'pharmacy';
      } else if (emailLower.includes('lab')) {
        targetRole = 'lab';
      } else if (emailLower.includes('admin')) {
        targetRole = 'admin';
      } else if (emailLower.includes('patient')) {
        targetRole = 'patient';
      }

      const demoUser = DEMO_USERS[targetRole];
      userToLogin = { ...demoUser, email: email || demoUser.email };
    }

    setUser(userToLogin);
    localStorage.setItem('medirex_user', JSON.stringify(userToLogin));
    setIsLoading(false);
    return userToLogin;
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newUser: User = {
      id: `u_${Date.now()}`, name: data.name, email: data.email,
      phone: data.phone, role: data.role, verified: false,
      createdAt: new Date().toISOString(), profileComplete: false,
    };

    // Save to registered users list in localStorage
    const registeredUsersStr = localStorage.getItem('medirex_registered_users');
    let registeredUsers: User[] = [];
    if (registeredUsersStr) {
      try {
        registeredUsers = JSON.parse(registeredUsersStr);
      } catch (e) {
        console.error(e);
      }
    }

    // Prevent duplicates
    registeredUsers = registeredUsers.filter(u => u.email.toLowerCase() !== data.email.toLowerCase());
    registeredUsers.push(newUser);
    localStorage.setItem('medirex_registered_users', JSON.stringify(registeredUsers));

    setUser(newUser);
    localStorage.setItem('medirex_user', JSON.stringify(newUser));
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('medirex_user');
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem('medirex_user', JSON.stringify(updated));
      return updated;
    });
  }, []);


  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
