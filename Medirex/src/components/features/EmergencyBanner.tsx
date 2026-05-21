import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, X, ChevronRight } from 'lucide-react';

interface EmergencyBannerProps {
  message?: string;
  count?: number;
}

export default function EmergencyBanner({ message = '2 critical patients incoming', count = 2 }: EmergencyBannerProps) {
  const [visible, setVisible] = useState(true);
  const [pulse, setPulse] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setPulse(p => !p), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-red-600 text-white px-4 py-2.5 flex items-center gap-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 opacity-50" />
      <div className="relative flex items-center gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <AlertTriangle className={`w-4 h-4 transition-opacity ${pulse ? 'opacity-100' : 'opacity-50'}`} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
        </div>
        <span className="font-semibold text-sm">EMERGENCY ALERT</span>
        <span className="text-red-100 text-sm hidden sm:inline">·</span>
        <span className="text-red-100 text-sm hidden sm:inline truncate">{message}</span>
      </div>
      <button
        onClick={() => navigate('/emergency')}
        className="relative flex items-center gap-1.5 px-3 py-1.5 bg-white text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors flex-shrink-0"
      >
        Respond <ChevronRight className="w-3 h-3" />
      </button>
      <button
        onClick={() => setVisible(false)}
        className="relative p-1 hover:bg-red-700/50 rounded-lg text-red-200 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
