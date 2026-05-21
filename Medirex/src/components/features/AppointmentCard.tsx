import React from 'react';
import { Clock, Video, MapPin, MoreVertical, Check, X, Phone } from 'lucide-react';
import type { Appointment } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
  onAction?: (action: string, appointment: Appointment) => void;
  compact?: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  'Scheduled': 'badge-primary',
  'Confirmed': 'bg-emerald-100 text-emerald-700',
  'Completed': 'bg-gray-100 text-gray-600',
  'Cancelled': 'bg-red-100 text-red-600',
  'In Progress': 'bg-amber-100 text-amber-700',
};

export default function AppointmentCard({ appointment, onAction, compact = false }: AppointmentCardProps) {
  const statusClass = STATUS_STYLES[appointment.status] || 'badge-primary';

  return (
    <div className="medical-card p-4 group">
      <div className="flex items-start gap-3">
        <img
          src={appointment.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(appointment.patientName)}&background=0284C7&color=fff`}
          alt={appointment.patientName}
          className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{appointment.patientName}</p>
              <p className="text-xs text-gray-500 truncate">{appointment.doctorName} · {appointment.specialization}</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={`badge text-[10px] ${statusClass}`}>{appointment.status}</span>
              {onAction && (
                <button
                  onClick={(e) => { e.stopPropagation(); onAction('menu', appointment); }}
                  className="p-1 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}
            </div>
          </div>
          {!compact && (
            <p className="text-xs text-gray-500 mt-1.5 line-clamp-1">{appointment.reason}</p>
          )}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {appointment.date} · {appointment.time}
            </div>
            <div className={`flex items-center gap-1 text-xs ${appointment.type === 'Telemedicine' ? 'text-primary-600' : 'text-gray-500'}`}>
              {appointment.type === 'Telemedicine' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
              {appointment.type}
            </div>
          </div>
          {!compact && onAction && (
            <div className="flex gap-2 mt-3">
              {appointment.status === 'Confirmed' || appointment.status === 'Scheduled' ? (
                <>
                  {appointment.type === 'Telemedicine' && (
                    <button onClick={() => onAction('join', appointment)} className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-semibold hover:bg-primary-700 transition-colors">
                      <Video className="w-3 h-3" /> Join
                    </button>
                  )}
                  <button onClick={() => onAction('confirm', appointment)} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors">
                    <Check className="w-3 h-3" /> Complete
                  </button>
                  <button onClick={() => onAction('cancel', appointment)} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors">
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </>
              ) : appointment.status === 'In Progress' ? (
                <button onClick={() => onAction('view', appointment)} className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors">
                  <Phone className="w-3 h-3" /> View Active
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
