import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Heart, ArrowRight, Twitter, Linkedin, Github,
  AlertTriangle, Menu, X, Sun, Moon, ChevronDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const ROLE_HOME: Record<string, string> = {
    patient: '/patient',
    doctor: '/doctor',
    hospital_staff: '/hospital',
    pharmacy: '/pharmacy-dash',
    lab: '/lab-dash',
    admin: '/admin',
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'AI Healthcare', path: '/ai-healthcare' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* ── Top Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-200/60 dark:border-slate-700/60'
          : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-medical group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white font-display">
              Medirex
            </span>
            <span className="hidden sm:inline badge-primary text-[10px] ml-0.5">AI-Powered</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                    : 'text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right — Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark'
                ? <Sun className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                : <Moon className="w-[18px] h-[18px]" />
              }
            </button>

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate(user ? ROLE_HOME[user.role] : '/patient')}
                  className="btn-ghost text-sm py-2 px-4"
                >
                  My Portal
                </button>
                <button
                  onClick={logout}
                  className="btn-primary text-sm py-2 px-5 !bg-red-600 hover:!bg-red-700 !border-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth/login')}
                  className="btn-ghost text-sm py-2 px-4"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/auth/login')}
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile — Theme Toggle + Hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun className="w-[18px] h-[18px]" />
                : <Moon className="w-[18px] h-[18px]" />
              }
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 space-y-2 animate-slide-in">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex gap-3">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate(user ? ROLE_HOME[user.role] : '/patient')}
                    className="flex-1 btn-ghost text-center py-2 text-sm justify-center"
                  >
                    My Portal
                  </button>
                  <button
                    onClick={logout}
                    className="flex-1 btn-primary bg-red-600 hover:bg-red-700 text-center py-2 text-sm justify-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/auth/login')}
                    className="flex-1 btn-ghost text-center py-2 text-sm justify-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/auth/login')}
                    className="flex-1 btn-primary text-center py-2 text-sm justify-center"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Page Area */}
      <main className="flex-1 pt-[64px]">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="py-16 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white mt-auto border-t border-slate-100 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">

            {/* Brand Info */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-primary-600/80 rounded-xl flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white font-display text-lg">Medirex</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">
                AI-powered healthcare ecosystem for hospitals, clinics, and medical professionals worldwide.
              </p>
              <div className="flex gap-3">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-4 font-display uppercase tracking-wider">Company</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'About Us', path: '/about' },
                  { label: 'Careers', path: '/company/careers' },
                  { label: 'Blog', path: '/company/blog' },
                  { label: 'Leadership', path: '/about' },
                ].map(item => (
                  <li key={item.label}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white text-xs text-left transition-colors hover:translate-x-0.5 transform"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-4 font-display uppercase tracking-wider">Platform</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'Services', path: '/services' },
                  { label: 'AI Healthcare', path: '/ai-healthcare' },
                  { label: 'Help Center', path: '/resources/help' },
                  { label: 'Contact', path: '/contact' },
                ].map(item => (
                  <li key={item.label}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white text-xs text-left transition-colors hover:translate-x-0.5 transform"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-4 font-display uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'HIPAA Compliance', path: '/legal/hipaa' },
                  { label: 'Privacy Policy', path: '/legal/privacy' },
                  { label: 'Terms of Service', path: '/legal/terms' },
                  { label: 'Security Audit', path: '/compliance' },
                ].map(item => (
                  <li key={item.label}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white text-xs text-left transition-colors hover:translate-x-0.5 transform"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-4 font-display uppercase tracking-wider">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">All Systems Operational</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">99.99% Uptime SLA</span>
                </div>
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl">
                  <p className="text-red-600 dark:text-red-400 text-[11px] font-bold mb-1">Emergency</p>
                  <a href="tel:+18005550911" className="text-red-500 dark:text-red-300 text-xs hover:text-red-600 dark:hover:text-red-200 font-semibold">
                    +1-800-555-0911
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-slate-500">© 2026 Medirex Inc. All rights reserved. Designed for healthcare excellence.</p>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
              <span className="font-medium">Systems Active</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
