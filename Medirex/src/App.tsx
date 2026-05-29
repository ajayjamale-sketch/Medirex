import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ScrollToTop from '@/components/ScrollToTop';

// Auth
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import OTPVerification from '@/pages/auth/OTPVerification';
import ForgotPassword from '@/pages/auth/ForgotPassword';

// Landing
import Landing from '@/pages/Landing';

// Dashboards
import PatientDashboard from '@/pages/patient/PatientDashboard';
import DoctorDashboard from '@/pages/doctor/DoctorDashboard';
import HospitalDashboard from '@/pages/hospital/HospitalDashboard';
import PharmacyDashboard from '@/pages/pharmacy/PharmacyDashboard';
import LabDashboard from '@/pages/lab/LabDashboard';
import AdminPanel from '@/pages/admin/AdminPanel';

// Module Pages
import Appointments from '@/pages/Appointments';
import EMR from '@/pages/EMR';
import Telemedicine from '@/pages/Telemedicine';
import Diagnostics from '@/pages/Diagnostics';
import Billing from '@/pages/Billing';
import Emergency from '@/pages/Emergency';
import Analytics from '@/pages/Analytics';
import Compliance from '@/pages/Compliance';
import Notifications from '@/pages/Notifications';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Unauthorized from '@/pages/Unauthorized';

// New Pages
import About from '@/pages/About';
import Services from '@/pages/Services';
import AIHealthcare from '@/pages/AIHealthcare';
import Contact from '@/pages/Contact';
import HIPAA from '@/pages/HIPAA';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Careers from '@/pages/Careers';
import Blog from '@/pages/Blog';
import HelpCenter from '@/pages/HelpCenter';
import Wellness from '@/pages/Wellness';
import Pharmacy from '@/pages/Pharmacy';
import MedicalProfile from '@/pages/patient/MedicalProfile';
import StaffScheduling from '@/pages/hospital/StaffScheduling';

import type { UserRole } from '@/types';

const ROLE_HOME: Record<UserRole, string> = {
  patient: '/patient',
  doctor: '/doctor',
  hospital_staff: '/hospital',
  pharmacy: '/pharmacy-dash',
  lab: '/lab-dash',
  admin: '/admin',
};

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: UserRole[] }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading Medirex...</p>
      </div>
    </div>
  );
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to their own dashboard instead of the unauthorized page
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && user) return <Navigate to={ROLE_HOME[user.role]} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/auth/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/auth/otp" element={<OTPVerification />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      
      {/* Public Subpages (5 sections each) */}
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/ai-healthcare" element={<AIHealthcare />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/company/careers" element={<Careers />} />
      <Route path="/company/blog" element={<Blog />} />
      <Route path="/legal/hipaa" element={<HIPAA />} />
      <Route path="/legal/privacy" element={<Privacy />} />
      <Route path="/legal/terms" element={<Terms />} />
      <Route path="/resources/help" element={<HelpCenter />} />

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected - Dashboards */}
      <Route path="/patient" element={<ProtectedRoute allowedRoles={[ 'patient' ]}><PatientDashboard /></ProtectedRoute>} />
      <Route path="/doctor" element={<ProtectedRoute allowedRoles={[ 'doctor' ]}><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/hospital" element={<ProtectedRoute allowedRoles={[ 'hospital_staff' ]}><HospitalDashboard /></ProtectedRoute>} />
      <Route path="/pharmacy-dash" element={<ProtectedRoute allowedRoles={[ 'pharmacy' ]}><PharmacyDashboard /></ProtectedRoute>} />
      <Route path="/lab-dash" element={<ProtectedRoute allowedRoles={[ 'lab' ]}><LabDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={[ 'admin' ]}><AdminPanel /></ProtectedRoute>} />

      {/* Protected - Modules */}
      <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
      <Route path="/emr" element={<ProtectedRoute><EMR /></ProtectedRoute>} />
      <Route path="/telemedicine" element={<ProtectedRoute><Telemedicine /></ProtectedRoute>} />
      <Route path="/pharmacy" element={<ProtectedRoute><Pharmacy /></ProtectedRoute>} />
      <Route path="/diagnostics" element={<ProtectedRoute><Diagnostics /></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
      <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/wellness" element={<ProtectedRoute><Wellness /></ProtectedRoute>} />

      {/* Protected - Patient-specific */}
      <Route path="/patient/setup" element={<ProtectedRoute allowedRoles={[ 'patient' ]}><MedicalProfile /></ProtectedRoute>} />

      {/* Protected - Hospital-specific */}
      <Route path="/hospital/staff-schedule" element={<ProtectedRoute allowedRoles={[ 'hospital_staff' ]}><StaffScheduling /></ProtectedRoute>} />

      {/* Catch all */}
      <Route path="*" element={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-7xl font-bold text-gray-200 font-display mb-4">404</div>
            <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">Page Not Found</h1>
            <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
            <a href="/" className="btn-primary inline-flex">Go to Home</a>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
