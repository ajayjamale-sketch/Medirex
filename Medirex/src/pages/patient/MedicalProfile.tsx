import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  User, Heart, AlertTriangle, Shield, Phone, ChevronRight,
  CheckCircle, Activity, Pill, FileText, Check, ChevronLeft
} from 'lucide-react';

interface ProfileData {
  // Step 1 — Personal Info
  dob: string;
  gender: string;
  height: string;
  weight: string;
  bloodGroup: string;
  // Step 2 — Medical History
  conditions: string[];
  previousSurgeries: string;
  familyHistory: string;
  // Step 3 — Allergies
  drugAllergies: string[];
  foodAllergies: string[];
  otherAllergies: string;
  // Step 4 — Emergency Contacts
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  // Step 5 — Insurance
  insuranceProvider: string;
  insurancePolicyNo: string;
  groupNo: string;
}

const CONDITIONS = ['Hypertension', 'Type 2 Diabetes', 'Asthma', 'Arthritis', 'Heart Disease', 'Thyroid Disorder', 'Chronic Kidney Disease', 'Depression / Anxiety'];
const DRUG_ALLERGIES = ['Penicillin', 'Sulfa drugs', 'Aspirin / NSAIDs', 'Codeine', 'Ibuprofen', 'None Known'];
const FOOD_ALLERGIES = ['Nuts', 'Shellfish', 'Gluten', 'Dairy', 'Eggs', 'None Known'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const INSURERS = ['BlueCross BlueShield', 'Aetna', 'Cigna', 'UnitedHealth', 'Medicare', 'Medicaid', 'Humana', 'Self-Pay'];

const STEPS = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Medical History', icon: Heart },
  { id: 3, label: 'Allergies', icon: AlertTriangle },
  { id: 4, label: 'Emergency Contacts', icon: Phone },
  { id: 5, label: 'Insurance', icon: Shield },
];

export default function MedicalProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const [data, setData] = useState<ProfileData>({
    dob: '', gender: 'female', height: '', weight: '', bloodGroup: 'O+',
    conditions: [], previousSurgeries: '', familyHistory: '',
    drugAllergies: [], foodAllergies: [], otherAllergies: '',
    emergencyName: '', emergencyRelation: '', emergencyPhone: '',
    insuranceProvider: '', insurancePolicyNo: '', groupNo: '',
  });

  const toggleCondition = (cond: string) => {
    setData(d => ({
      ...d, conditions: d.conditions.includes(cond)
        ? d.conditions.filter(c => c !== cond)
        : [...d.conditions, cond]
    }));
  };

  const toggleDrugAllergy = (a: string) => {
    setData(d => ({
      ...d, drugAllergies: d.drugAllergies.includes(a)
        ? d.drugAllergies.filter(x => x !== a)
        : [...d.drugAllergies, a]
    }));
  };

  const toggleFoodAllergy = (a: string) => {
    setData(d => ({
      ...d, foodAllergies: d.foodAllergies.includes(a)
        ? d.foodAllergies.filter(x => x !== a)
        : [...d.foodAllergies, a]
    }));
  };

  const handleFinish = () => {
    updateUser({ profileComplete: true });
    showToast('Medical profile saved successfully!');
    setTimeout(() => navigate('/patient'), 1500);
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary-600" /> Medical Profile Setup
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Complete your profile so doctors can provide personalised care</p>
        </div>

        {/* Stepper */}
        <div className="medical-card p-5">
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isDone = s.id < step;
              const isActive = s.id === step;
              return (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500' : isActive ? 'bg-primary-600' : 'bg-gray-100'}`}>
                      {isDone ? <Check className="w-4 h-4 text-white" /> : <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />}
                    </div>
                    <span className={`text-[10px] font-semibold hidden sm:block ${isActive ? 'text-primary-600' : isDone ? 'text-emerald-600' : 'text-gray-400'}`}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 transition-all ${s.id < step ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1.5">Step {step} of {STEPS.length} — {STEPS[step - 1].label}</p>
        </div>

        {/* Step Content */}
        <div className="medical-card p-6 space-y-5 animate-fade-in">

          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <>
              <h2 className="font-bold text-gray-900 font-display flex items-center gap-2"><User className="w-5 h-5 text-primary-600" /> Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date of Birth</label>
                  <input type="date" value={data.dob} onChange={e => setData(d => ({ ...d, dob: e.target.value }))} className="input-medical" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Gender</label>
                  <select value={data.gender} onChange={e => setData(d => ({ ...d, gender: e.target.value }))} className="input-medical">
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Non-binary / Other</option>
                    <option value="prefer_not">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Height (cm)</label>
                  <input type="number" placeholder="e.g. 168" value={data.height} onChange={e => setData(d => ({ ...d, height: e.target.value }))} className="input-medical" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Weight (kg)</label>
                  <input type="number" placeholder="e.g. 72" value={data.weight} onChange={e => setData(d => ({ ...d, weight: e.target.value }))} className="input-medical" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Blood Group</label>
                  <select value={data.bloodGroup} onChange={e => setData(d => ({ ...d, bloodGroup: e.target.value }))} className="input-medical">
                    {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Medical History */}
          {step === 2 && (
            <>
              <h2 className="font-bold text-gray-900 font-display flex items-center gap-2"><Heart className="w-5 h-5 text-red-500" /> Medical History</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Existing Conditions (select all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CONDITIONS.map(cond => (
                    <label key={cond} onClick={() => toggleCondition(cond)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border-2 cursor-pointer transition-all text-xs font-medium ${data.conditions.includes(cond) ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${data.conditions.includes(cond) ? 'bg-primary-500' : 'border border-gray-300'}`}>
                        {data.conditions.includes(cond) && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      {cond}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Previous Surgeries / Procedures</label>
                <textarea value={data.previousSurgeries} onChange={e => setData(d => ({ ...d, previousSurgeries: e.target.value }))}
                  placeholder="e.g. Appendectomy 2019, Knee arthroscopy 2021..." rows={3} className="input-medical resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Family Medical History</label>
                <textarea value={data.familyHistory} onChange={e => setData(d => ({ ...d, familyHistory: e.target.value }))}
                  placeholder="e.g. Father - Type 2 Diabetes, Mother - Hypertension..." rows={3} className="input-medical resize-none" />
              </div>
            </>
          )}

          {/* STEP 3: Allergies */}
          {step === 3 && (
            <>
              <h2 className="font-bold text-gray-900 font-display flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> Allergies & Reactions</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Drug Allergies</label>
                <div className="flex flex-wrap gap-2">
                  {DRUG_ALLERGIES.map(a => (
                    <button key={a} type="button" onClick={() => toggleDrugAllergy(a)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${data.drugAllergies.includes(a) ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 text-gray-600 hover:border-red-300'}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Food Allergies</label>
                <div className="flex flex-wrap gap-2">
                  {FOOD_ALLERGIES.map(a => (
                    <button key={a} type="button" onClick={() => toggleFoodAllergy(a)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${data.foodAllergies.includes(a) ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-200 text-gray-600 hover:border-amber-300'}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Other Allergies or Sensitivities</label>
                <input value={data.otherAllergies} onChange={e => setData(d => ({ ...d, otherAllergies: e.target.value }))}
                  placeholder="e.g. Latex, bee stings, specific dyes..." className="input-medical" />
              </div>
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Allergy information is critical — this data will appear prominently in your medical records and will be flagged to treating physicians.
              </div>
            </>
          )}

          {/* STEP 4: Emergency Contacts */}
          {step === 4 && (
            <>
              <h2 className="font-bold text-gray-900 font-display flex items-center gap-2"><Phone className="w-5 h-5 text-primary-600" /> Emergency Contact</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Contact Name</label>
                  <input value={data.emergencyName} onChange={e => setData(d => ({ ...d, emergencyName: e.target.value }))}
                    placeholder="Full name" className="input-medical" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Relationship</label>
                  <select value={data.emergencyRelation} onChange={e => setData(d => ({ ...d, emergencyRelation: e.target.value }))} className="input-medical">
                    <option value="">Select...</option>
                    <option>Spouse</option><option>Parent</option><option>Sibling</option>
                    <option>Child</option><option>Friend</option><option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number</label>
                  <input type="tel" value={data.emergencyPhone} onChange={e => setData(d => ({ ...d, emergencyPhone: e.target.value }))}
                    placeholder="+1 (555) 000-0000" className="input-medical" />
                </div>
              </div>
              <div className="p-3 bg-primary-50 border border-primary-100 rounded-xl text-xs text-primary-700">
                This contact will be automatically notified in case of medical emergencies triggered through the SOS system.
              </div>
            </>
          )}

          {/* STEP 5: Insurance */}
          {step === 5 && (
            <>
              <h2 className="font-bold text-gray-900 font-display flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-600" /> Insurance Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Insurance Provider</label>
                  <select value={data.insuranceProvider} onChange={e => setData(d => ({ ...d, insuranceProvider: e.target.value }))} className="input-medical">
                    <option value="">Select provider...</option>
                    {INSURERS.map(ins => <option key={ins}>{ins}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Policy / Member ID</label>
                  <input value={data.insurancePolicyNo} onChange={e => setData(d => ({ ...d, insurancePolicyNo: e.target.value }))}
                    placeholder="e.g. BCB1234567" className="input-medical" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Group Number</label>
                  <input value={data.groupNo} onChange={e => setData(d => ({ ...d, groupNo: e.target.value }))}
                    placeholder="e.g. GRP99812" className="input-medical" />
                </div>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <p className="font-semibold text-emerald-800 text-sm">Profile Summary</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-emerald-700">
                  <div>✓ Blood Group: {data.bloodGroup}</div>
                  <div>✓ Conditions: {data.conditions.length || 'None selected'}</div>
                  <div>✓ Drug Allergies: {data.drugAllergies.length || 'None'}</div>
                  <div>✓ Emergency Contact: {data.emergencyName || 'Not set'}</div>
                </div>
              </div>
            </>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 pt-2">
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} className="flex-1 btn-ghost border border-gray-200 justify-center">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            {step < STEPS.length ? (
              <button onClick={() => setStep(s => s + 1)} className="flex-1 btn-primary justify-center">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleFinish} className="flex-1 btn-primary justify-center">
                <CheckCircle className="w-4 h-4" /> Complete Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
