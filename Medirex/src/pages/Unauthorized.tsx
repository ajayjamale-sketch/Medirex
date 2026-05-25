import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';

const ROLE_HOME: Record<UserRole, string> = {
  patient: '/patient',
  doctor: '/doctor',
  hospital_staff: '/hospital',
  pharmacy: '/pharmacy-dash',
  lab: '/lab-dash',
  admin: '/admin',
};

export default function Unauthorized() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const goHome = () => navigate(user ? ROLE_HOME[user.role] : '/', { replace: true });
  const contact = () => window.location.href = 'mailto:admin@medirex.io?subject=Access%20Request';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">You dont have permission to view this page. If you believe this is an error, request access from administrator.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={goHome} className="btn-primary px-4 py-2">Go to Dashboard</button>
          <button onClick={contact} className="btn-ghost px-4 py-2 border">Request Access</button>
        </div>
      </div>
    </div>
  );
}
