import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  iconBg?: string;
  prefix?: string;
  suffix?: string;
  animate?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function KPICard({
  title, value, change, changeLabel, icon: Icon,
  iconColor = 'text-primary-600', iconBg = 'bg-primary-50',
  prefix = '', suffix = '', animate = true, onClick, className = ''
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(animate && typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (animate && typeof value === 'number') {
      const duration = 1200;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, animate]);

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      onClick={onClick}
      className={`kpi-card ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
            isPositive ? 'bg-emerald-50 text-emerald-600' :
            isNegative ? 'bg-red-50 text-red-500' :
            'bg-gray-50 text-gray-500'
          }`}>
            {isPositive && <TrendingUp className="w-3 h-3" />}
            {isNegative && <TrendingDown className="w-3 h-3" />}
            {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 font-display">
          {prefix}{typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}{suffix}
        </p>
        <p className="text-sm text-gray-500 font-medium mt-0.5">{title}</p>
        {changeLabel && (
          <p className="text-xs text-gray-400 mt-1">{changeLabel}</p>
        )}
      </div>
    </div>
  );
}
