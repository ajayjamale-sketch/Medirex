import React, { useEffect, useRef, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS } from '@/constants/mockData';
import {
  Search,
  Heart,
  Pill,
  FlaskConical,
  AlertTriangle,
  Plus,
  Download,
  Edit2,
  Check,
  X,
  Save,
  Share2,
} from 'lucide-react';

import type { Patient } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface VitalEntry {
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

const DEFAULT_VITALS: VitalEntry[] = [
  { label: 'Blood Pressure', value: '128/82', unit: 'mmHg', status: 'normal' },
  { label: 'Pulse', value: '76', unit: 'bpm', status: 'normal' },
  { label: 'SpO2', value: '97', unit: '%', status: 'normal' },
  { label: 'Temperature', value: '98.6', unit: '°F', status: 'normal' },
];

export default function EMR() {
  const { user } = useAuth();

  const isPatient = user?.role === 'patient';

  const emrRef = useRef<HTMLDivElement>(null);

  // ===============================
  // STATES
  // ===============================

  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('patients');
    return saved ? JSON.parse(saved) : MOCK_PATIENTS;
  });

  const [selectedPatient, setSelectedPatient] = useState<Patient>(
    MOCK_PATIENTS[0]
  );

  const [search, setSearch] = useState('');

  const [toast, setToast] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'history' | 'prescriptions' | 'labs' | 'notes'
  >('overview');

  const [editing, setEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const [editingVitals, setEditingVitals] = useState(false);

  const [vitals, setVitals] = useState<VitalEntry[]>(() => {
    const saved = localStorage.getItem('vitals');
    return saved ? JSON.parse(saved) : DEFAULT_VITALS;
  });

  const [editVitals, setEditVitals] = useState<VitalEntry[]>(DEFAULT_VITALS);

  const [notes, setNotes] = useState<string[]>(() => {
    const saved = localStorage.getItem('notes');

    return saved
      ? JSON.parse(saved)
      : [
          'Patient reports improvement in blood pressure control. Continue medications.',
        ];
  });

  const [note, setNote] = useState('');

  const [showAddNote, setShowAddNote] = useState(false);

  const [showShareModal, setShowShareModal] = useState(false);

  const [shareEmail, setShareEmail] = useState('');

  const [labs, setLabs] = useState<any[]>(() => {
    const saved = localStorage.getItem('labs');

    return saved
      ? JSON.parse(saved)
      : [
          {
            test: 'HbA1c',
            date: '2026-05-10',
            result: '8.2%',
            range: '<5.7%',
            status: 'High',
          },
        ];
  });

  const [selectedLab, setSelectedLab] = useState<any>(null);

  const [showLabModal, setShowLabModal] = useState(false);

  const [labForm, setLabForm] = useState({
    test: '',
    date: '',
    priority: 'Normal',
    homeCollection: false,
  });

  // ===============================
  // LOCAL STORAGE
  // ===============================

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('labs', JSON.stringify(labs));
  }, [labs]);

  useEffect(() => {
    localStorage.setItem('vitals', JSON.stringify(vitals));
  }, [vitals]);

  // ===============================
  // TOAST
  // ===============================

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // ===============================
  // SEARCH
  // ===============================

  const filteredPatients = patients.filter(
    patient =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  // ===============================
  // EDIT PATIENT
  // ===============================

  const startEdit = () => {
    setEditForm({
      name: selectedPatient.name,
      phone: selectedPatient.phone,
      email: selectedPatient.email,
      address: selectedPatient.address,
    });

    setEditing(true);
  };

  const saveEdit = () => {
    const updatedPatients = patients.map(patient =>
      patient.id === selectedPatient.id
        ? { ...patient, ...editForm }
        : patient
    );

    setPatients(updatedPatients);

    setSelectedPatient(prev => ({
      ...prev,
      ...editForm,
    }));

    setEditing(false);

    showToast('Patient updated');
  };

  // ===============================
  // SAVE VITALS
  // ===============================

  const saveVitals = () => {
    setVitals(editVitals);

    setEditingVitals(false);

    showToast('Vitals updated');
  };

  // ===============================
  // ADD NOTE
  // ===============================

  const addNote = () => {
    if (!note.trim()) return;

    const newNote = `${note} — Dr. Harrison · ${new Date().toLocaleString()}`;

    setNotes(prev => [newNote, ...prev]);

    setNote('');

    setShowAddNote(false);

    showToast('Note added');
  };

  // ===============================
  // DELETE NOTE
  // ===============================

  const deleteNote = (index: number) => {
    const confirmDelete = window.confirm('Delete this note?');

    if (!confirmDelete) return;

    setNotes(prev => prev.filter((_, i) => i !== index));

    showToast('Note deleted');
  };

  // ===============================
  // ORDER LAB
  // ===============================

  const handleOrderTest = () => {
    if (!labForm.test || !labForm.date) {
      showToast('Please complete all fields');
      return;
    }

    const newLab = {
      test: labForm.test,
      date: labForm.date,
      result: 'Pending',
      range: '-',
      status: 'Ordered',
    };

    setLabs(prev => [newLab, ...prev]);

    setShowLabModal(false);

    showToast('Lab ordered successfully');
  };

  // ===============================
  // PDF EXPORT
  // ===============================

  const exportPDF = async () => {
    if (!emrRef.current) return;

    const canvas = await html2canvas(emrRef.current);

    const image = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');

    const width = pdf.internal.pageSize.getWidth();

    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(image, 'PNG', 0, 0, width, height);

    pdf.save(`${selectedPatient.name}-EMR.pdf`);

    showToast('PDF downloaded');
  };

  // ===============================
  // SHARE RECORD
  // ===============================

  const shareRecord = () => {
    if (!shareEmail.includes('@')) {
      showToast('Invalid email');
      return;
    }

    setShowShareModal(false);

    showToast(`Secure link sent to ${shareEmail}`);

    setShareEmail('');
  };

  // ===============================
  // DOWNLOAD PRESCRIPTION
  // ===============================

  const downloadPrescription = (rx: any) => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text('Prescription', 20, 20);

    pdf.setFontSize(12);

    pdf.text(`Doctor: ${rx.doctor}`, 20, 40);

    pdf.text(`Diagnosis: ${rx.diagnosis}`, 20, 50);

    let y = 70;

    rx.meds.forEach((med: string) => {
      pdf.text(`• ${med}`, 20, y);

      y += 10;
    });

    pdf.save('prescription.pdf');

    showToast('Prescription downloaded');
  };

  // ===============================
  // JSX
  // ===============================

  return (
    <DashboardLayout>
      <div ref={emrRef} className="space-y-6">
        {/* TOAST */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            {toast}
          </div>
        )}

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {isPatient ? 'My Records' : 'EMR / EHR'}
            </h1>

            <p className="text-sm text-gray-500">
              Electronic Medical Records
            </p>
          </div>

          <button
            onClick={exportPDF}
            className="btn-primary text-sm py-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>

        {/* SEARCH */}
        {!isPatient && (
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search patients..."
              className="pl-10 input-medical"
            />
          </div>
        )}

        {/* PATIENTS */}
        {!isPatient && (
          <div className="grid gap-3">
            {filteredPatients.map(patient => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className="p-4 border rounded-xl text-left hover:border-primary-400"
              >
                <h3 className="font-semibold">{patient.name}</h3>

                <p className="text-xs text-gray-500">
                  {patient.age} years · {patient.gender}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* PATIENT CARD */}
        <div className="medical-card p-5">
          <div className="flex items-start justify-between">
            <div>
              {editing ? (
                <input
                  value={editForm.name}
                  onChange={e =>
                    setEditForm(prev => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="input-medical"
                />
              ) : (
                <h2 className="text-xl font-bold">
                  {selectedPatient.name}
                </h2>
              )}

              <p className="text-sm text-gray-500 mt-1">
                {selectedPatient.age} years ·{' '}
                {selectedPatient.gender}
              </p>
            </div>

            <div className="flex gap-2">
              {editing ? (
                <>
                  <button
                    onClick={() => setEditing(false)}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveEdit}
                    className="btn-primary"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={startEdit}
                    className="btn-ghost"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>

                  <button
                    onClick={() => setShowShareModal(true)}
                    className="btn-primary"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ALLERGIES */}
          {selectedPatient.allergies?.length > 0 && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />

              <p className="text-sm text-red-600">
                {selectedPatient.allergies.join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* TABS */}
        <div className="flex gap-2">
          {['overview', 'history', 'prescriptions', 'labs', 'notes'].map(
            tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-xl text-sm ${
                  activeTab === tab
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="medical-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Vitals</h3>

              {editingVitals ? (
                <button
                  onClick={saveVitals}
                  className="btn-primary"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditVitals(vitals);

                    setEditingVitals(true);
                  }}
                  className="btn-ghost"
                >
                  Update
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {vitals.map((vital, index) => (
                <div
                  key={vital.label}
                  className="p-4 bg-gray-50 rounded-xl"
                >
                  {editingVitals ? (
                    <input
                      value={editVitals[index].value}
                      onChange={e =>
                        setEditVitals(prev =>
                          prev.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  value: e.target.value,
                                }
                              : item
                          )
                        )
                      }
                      className="input-medical"
                    />
                  ) : (
                    <p className="text-xl font-bold">
                      {vital.value}
                    </p>
                  )}

                  <p className="text-xs text-gray-500">
                    {vital.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LABS */}
        {activeTab === 'labs' && (
          <div className="medical-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Lab Results</h3>

              <button
                onClick={() => setShowLabModal(true)}
                className="btn-primary"
              >
                <Plus className="w-4 h-4" />
                Order Test
              </button>
            </div>

            <div className="space-y-3">
              {labs.map(lab => (
                <button
                  key={`${lab.test}-${lab.date}`}
                  onClick={() => setSelectedLab(lab)}
                  className="w-full p-4 border rounded-xl text-left hover:border-primary-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{lab.test}</p>

                      <p className="text-xs text-gray-500">
                        {lab.date}
                      </p>
                    </div>

                    <span className="text-sm font-medium">
                      {lab.result}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            <button
              onClick={() => setShowAddNote(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4" />
              Add Note
            </button>

            {notes.map((singleNote, index) => (
              <div
                key={index}
                className="medical-card p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm">{singleNote}</p>

                  <button
                    onClick={() => deleteNote(index)}
                    className="text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRESCRIPTIONS */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-3">
            {[
              {
                doctor: 'Dr. Harrison',
                diagnosis: 'Hypertension',
                meds: [
                  'Lisinopril 10mg',
                  'Aspirin 81mg',
                ],
              },
            ].map((rx, index) => (
              <div
                key={index}
                className="medical-card p-4"
              >
                <h3 className="font-semibold">
                  {rx.diagnosis}
                </h3>

                <p className="text-xs text-gray-500 mb-3">
                  {rx.doctor}
                </p>

                <div className="space-y-2">
                  {rx.meds.map(med => (
                    <div
                      key={med}
                      className="flex items-center gap-2"
                    >
                      <Pill className="w-4 h-4 text-amber-500" />

                      <span>{med}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => downloadPrescription(rx)}
                  className="btn-primary mt-4"
                >
                  Download Prescription
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full">
            <h3 className="font-bold text-lg mb-4">
              Share Medical Record
            </h3>

            <input
              value={shareEmail}
              onChange={e => setShareEmail(e.target.value)}
              placeholder="doctor@example.com"
              className="input-medical"
            />

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowShareModal(false)}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>

              <button
                onClick={shareRecord}
                className="btn-primary flex-1"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NOTE MODAL */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full">
            <h3 className="font-bold text-lg mb-4">
              Add Clinical Note
            </h3>

            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={5}
              className="input-medical resize-none"
            />

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowAddNote(false)}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>

              <button
                onClick={addNote}
                className="btn-primary flex-1"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LAB MODAL */}
      {showLabModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full">
            <h3 className="font-bold text-lg mb-4">
              Order Lab Test
            </h3>

            <div className="space-y-3">
              <input
                value={labForm.test}
                onChange={e =>
                  setLabForm(prev => ({
                    ...prev,
                    test: e.target.value,
                  }))
                }
                placeholder="Test Name"
                className="input-medical"
              />

              <input
                type="date"
                value={labForm.date}
                onChange={e =>
                  setLabForm(prev => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="input-medical"
              />
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowLabModal(false)}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>

              <button
                onClick={handleOrderTest}
                className="btn-primary flex-1"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LAB VIEWER */}
      {selectedLab && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full">
            <h3 className="font-bold text-lg mb-4">
              {selectedLab.test}
            </h3>

            <div className="space-y-2 text-sm">
              <p>Date: {selectedLab.date}</p>
              <p>Result: {selectedLab.result}</p>
              <p>Status: {selectedLab.status}</p>
              <p>Range: {selectedLab.range}</p>
            </div>

            <button
              onClick={() => setSelectedLab(null)}
              className="btn-primary w-full mt-5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}