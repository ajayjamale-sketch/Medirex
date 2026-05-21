import React from 'react';
import { Activity, User, Calendar, FlaskConical, Pill, CreditCard, AlertTriangle, Zap } from 'lucide-react';

const ACTIVITY_ITEMS = [
  { id: 1, icon: User, color: 'bg-primary-50 text-primary-600', text: 'New patient Sarah Johnson registered', time: '2 min ago' },
  { id: 2, icon: AlertTriangle, color: 'bg-red-50 text-red-500', text: 'Emergency case #EM001 - Acute MI incoming', time: '5 min ago' },
  { id: 3, icon: Zap, color: 'bg-purple-50 text-purple-600', text: 'AI flagged high readmission risk for patient #P004', time: '12 min ago' },
  { id: 4, icon: FlaskConical, color: 'bg-emerald-50 text-emerald-600', text: 'Lab results ready: Lipid Panel for Michael Chen', time: '18 min ago' },
  { id: 5, icon: Calendar, color: 'bg-sky-50 text-sky-600', text: 'Appointment confirmed: Dr. Harrison at 9:00 AM', time: '25 min ago' },
  { id: 6, icon: Pill, color: 'bg-amber-50 text-amber-600', text: 'Prescription issued: Metformin 500mg × 3 months', time: '31 min ago' },
  { id: 7, icon: CreditCard, color: 'bg-green-50 text-green-600', text: 'Insurance claim approved: BCB-789012, $483.50', time: '45 min ago' },
  { id: 8, icon: User, color: 'bg-primary-50 text-primary-600', text: 'Dr. Amelia Torres started teleconsultation', time: '1 hr ago' },
];

export default function ActivityFeed() {
  return (
    <div className="medical-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary-600" />
          <h3 className="font-semibold text-gray-900 text-sm">Live Activity Feed</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Live
        </div>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin pr-1">
        {ACTIVITY_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-700 leading-relaxed">{item.text}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
