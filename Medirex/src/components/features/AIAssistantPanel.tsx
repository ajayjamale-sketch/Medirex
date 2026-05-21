import React, { useState } from 'react';
import { Zap, Brain, TrendingUp, AlertCircle, ChevronRight, Loader2 } from 'lucide-react';
import { MOCK_AI_INSIGHTS } from '@/constants/mockData';

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  risk: AlertCircle,
  alert: AlertCircle,
  recommendation: Brain,
  prediction: TrendingUp,
  diagnosis: Brain,
};

const TYPE_COLORS: Record<string, string> = {
  risk: 'text-red-500 bg-red-50',
  alert: 'text-red-500 bg-red-50',
  recommendation: 'text-primary-600 bg-primary-50',
  prediction: 'text-amber-600 bg-amber-50',
  diagnosis: 'text-purple-600 bg-purple-50',
};

const PRIORITY_DOT: Record<string, string> = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-gray-400',
};

const SYMPTOM_RESPONSES: Record<string, string> = {
  'chest pain': '⚠️ Chest pain can indicate cardiac issues. Key symptoms to monitor: radiation to left arm/jaw, shortness of breath, diaphoresis. Recommend: 12-lead ECG, troponin levels, cardiology consult.',
  'headache': '🧠 Differential diagnoses include tension headache, migraine, or secondary causes. Red flags: sudden onset "thunderclap", fever + neck stiffness, neurological deficits. Consider: CT head if red flags present.',
  'fever': '🌡️ Fever >38.3°C warrants workup. Consider: CBC, CMP, blood cultures, UA. Common causes: viral/bacterial infection, inflammatory disease. Monitor for sepsis criteria (SIRS/qSOFA).',
  'shortness of breath': '💨 Dyspnea differential: cardiac (CHF, PE), pulmonary (pneumonia, COPD), metabolic (anemia). Priority tests: CXR, SpO2, BNP, D-dimer, CBC. Immediate O2 if SpO2 <94%.',
  'default': '🤖 AI analysis suggests conducting a thorough history and physical examination. Consider ordering relevant diagnostic tests based on clinical presentation. I can help narrow down differential diagnoses with more specific symptom information.'
};

export default function AIAssistantPanel() {
  const [activeTab, setActiveTab] = useState<'insights' | 'symptom'>('insights');
  const [symptomInput, setSymptomInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSymptomCheck = async () => {
    if (!symptomInput.trim()) return;
    setIsLoading(true);
    setAiResponse('');
    await new Promise(r => setTimeout(r, 1800));
    const lower = symptomInput.toLowerCase();
    const key = Object.keys(SYMPTOM_RESPONSES).find(k => lower.includes(k));
    setAiResponse(SYMPTOM_RESPONSES[key || 'default']);
    setIsLoading(false);
  };

  return (
    <div className="medical-card overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center animate-ai-glow">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Clinical Assistant</h3>
            <p className="text-primary-200 text-xs">Powered by Medirex AI Engine</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 bg-white/20 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-medium">Live</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-3">
          {[
            { id: 'insights', label: 'AI Insights' },
            { id: 'symptom', label: 'Symptom Checker' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'insights' | 'symptom')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === tab.id ? 'bg-white text-primary-600' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'insights' ? (
          <div className="space-y-3">
            {MOCK_AI_INSIGHTS.slice(0, 4).map(insight => {
              const Icon = TYPE_ICONS[insight.type] || Brain;
              const colorClass = TYPE_COLORS[insight.type] || 'text-gray-600 bg-gray-50';
              return (
                <div key={insight.id} className="p-3 rounded-xl border border-gray-100 hover:border-primary-100 hover:bg-primary-50/30 transition-all cursor-pointer group">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass.split(' ').slice(1).join(' ')}`}>
                      <Icon className={`w-3.5 h-3.5 ${colorClass.split(' ')[0]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 text-xs">{insight.title}</p>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${PRIORITY_DOT[insight.priority]}`} />
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{insight.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 bg-gray-100 rounded-full h-1">
                          <div
                            className="bg-primary-500 h-1 rounded-full"
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-500 flex-shrink-0">{insight.confidence}% confidence</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Describe symptoms or condition</label>
              <textarea
                value={symptomInput}
                onChange={e => setSymptomInput(e.target.value)}
                placeholder="e.g., chest pain, shortness of breath, fever..."
                rows={3}
                className="input-medical text-sm resize-none"
              />
            </div>
            <button
              onClick={handleSymptomCheck}
              disabled={isLoading || !symptomInput.trim()}
              className="btn-primary w-full justify-center text-sm py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Brain className="w-4 h-4" /> Analyze Symptoms</>
              )}
            </button>
            {aiResponse && (
              <div className="p-3.5 bg-primary-50 border border-primary-100 rounded-xl animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-3.5 h-3.5 text-primary-600" />
                  <span className="text-xs font-semibold text-primary-700">AI Clinical Analysis</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{aiResponse}</p>
                <p className="text-[10px] text-gray-400 mt-2 italic">⚠️ AI assistance only. Clinical judgment required. Not a substitute for medical evaluation.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
