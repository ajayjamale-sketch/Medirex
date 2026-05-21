import type {
  Patient, Doctor, Appointment, Prescription, LabTest,
  BillingRecord, EmergencyCase, Notification, HospitalBed,
  DrugInventory, AIInsight, ChartDataPoint
} from '@/types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p001', userId: 'u001', name: 'Sarah Johnson', age: 34, gender: 'Female',
    bloodGroup: 'A+', phone: '+1 (555) 234-5678', email: 'sarah.j@email.com',
    address: '123 Oak Street, New York, NY 10001', emergencyContact: '+1 (555) 234-5679',
    allergies: ['Penicillin', 'Latex'], conditions: ['Hypertension', 'Type 2 Diabetes'],
    lastVisit: '2026-05-10', nextAppointment: '2026-05-25',
    insuranceProvider: 'BlueCross BlueShield', insuranceNumber: 'BCB-2024-789012',
    avatar: 'https://i.pravatar.cc/150?u=1494790108755-2616b612b47c'
  },
  {
    id: 'p002', userId: 'u002', name: 'Michael Chen', age: 45, gender: 'Male',
    bloodGroup: 'O+', phone: '+1 (555) 345-6789', email: 'mchen@email.com',
    address: '456 Pine Ave, Los Angeles, CA 90001', emergencyContact: '+1 (555) 345-6790',
    allergies: ['Sulfa drugs'], conditions: ['Coronary Artery Disease', 'High Cholesterol'],
    lastVisit: '2026-05-15', nextAppointment: '2026-05-28',
    insuranceProvider: 'Aetna', insuranceNumber: 'AET-2024-456789',
    avatar: 'https://i.pravatar.cc/150?u=1507003211169-0a1dd7228f2d'
  },
  {
    id: 'p003', userId: 'u003', name: 'Emily Rodriguez', age: 28, gender: 'Female',
    bloodGroup: 'B-', phone: '+1 (555) 456-7890', email: 'emily.r@email.com',
    address: '789 Maple Dr, Chicago, IL 60601', emergencyContact: '+1 (555) 456-7891',
    allergies: [], conditions: ['Asthma', 'Anxiety Disorder'],
    lastVisit: '2026-05-18', nextAppointment: '2026-06-01',
    insuranceProvider: 'United Healthcare', insuranceNumber: 'UHC-2024-123456',
    avatar: 'https://i.pravatar.cc/150?u=1438761681033-6461ffad8d80'
  },
  {
    id: 'p004', userId: 'u004', name: 'James Williams', age: 62, gender: 'Male',
    bloodGroup: 'AB+', phone: '+1 (555) 567-8901', email: 'jwilliams@email.com',
    address: '321 Elm Street, Houston, TX 77001', emergencyContact: '+1 (555) 567-8902',
    allergies: ['Aspirin', 'NSAIDs'], conditions: ['Chronic Kidney Disease', 'Hypertension', 'Diabetes'],
    lastVisit: '2026-05-12', nextAppointment: '2026-05-26',
    insuranceProvider: 'Medicare', insuranceNumber: 'MCR-2024-987654',
    avatar: 'https://i.pravatar.cc/150?u=1472099645785-5658abf4ff4e'
  },
  {
    id: 'p005', userId: 'u005', name: 'Priya Patel', age: 31, gender: 'Female',
    bloodGroup: 'A-', phone: '+1 (555) 678-9012', email: 'priya.p@email.com',
    address: '654 Birch Blvd, Phoenix, AZ 85001', emergencyContact: '+1 (555) 678-9013',
    allergies: ['Iodine'], conditions: ['Hypothyroidism', 'PCOS'],
    lastVisit: '2026-05-08', avatar: 'https://i.pravatar.cc/150?u=1488426862026-3ee34a7d66df'
  },
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd001', userId: 'du001', name: 'Dr. Robert Harrison', specialization: 'Cardiology',
    department: 'Heart & Vascular', experience: 18, rating: 4.9, consultationFee: 250,
    qualifications: ['MD', 'FACC', 'PhD Cardiology'], hospital: 'Medirex Medical Center',
    available: true, patientsToday: 12, totalPatients: 4892,
    avatar: 'https://i.pravatar.cc/150?u=1612349317150-e413f6a5b16d'
  },
  {
    id: 'd002', userId: 'du002', name: 'Dr. Amelia Torres', specialization: 'Neurology',
    department: 'Neurosciences', experience: 14, rating: 4.8, consultationFee: 220,
    qualifications: ['MD', 'PhD Neuroscience', 'Fellow AAN'], hospital: 'Medirex Medical Center',
    available: true, patientsToday: 9, totalPatients: 3211,
    avatar: 'https://i.pravatar.cc/150?u=1559839734-2b71ea197ec2'
  },
  {
    id: 'd003', userId: 'du003', name: 'Dr. David Kim', specialization: 'Orthopedics',
    department: 'Bone & Joint', experience: 22, rating: 4.7, consultationFee: 200,
    qualifications: ['MD', 'MS Orthopedics', 'FAAOS'], hospital: 'Medirex Orthopedic Center',
    available: false, nextAvailable: '2:30 PM', patientsToday: 15, totalPatients: 6145,
    avatar: 'https://i.pravatar.cc/150?u=1582750433449-648ed127bb54'
  },
  {
    id: 'd004', userId: 'du004', name: 'Dr. Fatima Al-Hassan', specialization: 'Endocrinology',
    department: 'Internal Medicine', experience: 11, rating: 4.9, consultationFee: 180,
    qualifications: ['MD', 'FACE', 'Diabetes Educator'], hospital: 'Medirex Medical Center',
    available: true, patientsToday: 11, totalPatients: 2890,
    avatar: 'https://i.pravatar.cc/150?u=1594824476967-48c8b964273f'
  },
  {
    id: 'd005', userId: 'du005', name: 'Dr. Marcus Johnson', specialization: 'Emergency Medicine',
    department: 'Emergency & Trauma', experience: 16, rating: 4.8, consultationFee: 300,
    qualifications: ['MD', 'FACEP'], hospital: 'Medirex Emergency Center',
    available: true, patientsToday: 28, totalPatients: 9811,
    avatar: 'https://i.pravatar.cc/150?u=1622253692010-333f2da6031d'
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt001', patientId: 'p001', patientName: 'Sarah Johnson',
    doctorId: 'd001', doctorName: 'Dr. Robert Harrison', specialization: 'Cardiology',
    date: '2026-05-20', time: '09:00 AM', type: 'In-Person', status: 'Confirmed',
    reason: 'Routine cardiac checkup and ECG review', fee: 250,
    avatar: 'https://i.pravatar.cc/150?u=1494790108755-2616b612b47c'
  },
  {
    id: 'apt002', patientId: 'p002', patientName: 'Michael Chen',
    doctorId: 'd001', doctorName: 'Dr. Robert Harrison', specialization: 'Cardiology',
    date: '2026-05-20', time: '10:30 AM', type: 'Telemedicine', status: 'In Progress',
    reason: 'Chest pain follow-up consultation', fee: 200,
    avatar: 'https://i.pravatar.cc/150?u=1507003211169-0a1dd7228f2d'
  },
  {
    id: 'apt003', patientId: 'p003', patientName: 'Emily Rodriguez',
    doctorId: 'd002', doctorName: 'Dr. Amelia Torres', specialization: 'Neurology',
    date: '2026-05-20', time: '11:00 AM', type: 'In-Person', status: 'Scheduled',
    reason: 'Migraine frequency evaluation', fee: 220,
    avatar: 'https://i.pravatar.cc/150?u=1438761681033-6461ffad8d80'
  },
  {
    id: 'apt004', patientId: 'p004', patientName: 'James Williams',
    doctorId: 'd004', doctorName: 'Dr. Fatima Al-Hassan', specialization: 'Endocrinology',
    date: '2026-05-21', time: '02:00 PM', type: 'In-Person', status: 'Scheduled',
    reason: 'Diabetes management and HbA1c review', fee: 180,
    avatar: 'https://i.pravatar.cc/150?u=1472099645785-5658abf4ff4e'
  },
  {
    id: 'apt005', patientId: 'p005', patientName: 'Priya Patel',
    doctorId: 'd004', doctorName: 'Dr. Fatima Al-Hassan', specialization: 'Endocrinology',
    date: '2026-05-22', time: '03:30 PM', type: 'Telemedicine', status: 'Confirmed',
    reason: 'Thyroid function test results review', fee: 180,
    avatar: 'https://i.pravatar.cc/150?u=1488426862026-3ee34a7d66df'
  },
];

export const MOCK_LAB_TESTS: LabTest[] = [
  {
    id: 'lt001', patientId: 'p001', patientName: 'Sarah Johnson',
    testName: 'Complete Blood Count (CBC)', testCode: 'CBC-001',
    category: 'Hematology', orderedBy: 'Dr. Robert Harrison',
    date: '2026-05-20', status: 'Processing', price: 85, priority: 'Normal',
    normalRange: 'WBC: 4-11 K/uL', unit: 'K/uL'
  },
  {
    id: 'lt002', patientId: 'p002', patientName: 'Michael Chen',
    testName: 'Lipid Panel', testCode: 'LIP-002',
    category: 'Chemistry', orderedBy: 'Dr. Robert Harrison',
    date: '2026-05-20', status: 'Report Ready', price: 120, priority: 'Urgent',
    result: 'Total Cholesterol: 210 mg/dL', normalRange: '<200 mg/dL', unit: 'mg/dL'
  },
  {
    id: 'lt003', patientId: 'p003', patientName: 'Emily Rodriguez',
    testName: 'MRI Brain - Contrast', testCode: 'MRI-003',
    category: 'Imaging', orderedBy: 'Dr. Amelia Torres',
    date: '2026-05-21', status: 'Pending', price: 850, priority: 'Normal'
  },
  {
    id: 'lt004', patientId: 'p004', patientName: 'James Williams',
    testName: 'HbA1c (Glycated Hemoglobin)', testCode: 'HBA-004',
    category: 'Diabetes', orderedBy: 'Dr. Fatima Al-Hassan',
    date: '2026-05-19', status: 'Completed', price: 95, priority: 'Normal',
    result: '8.2%', normalRange: '<5.7% (Normal)', unit: '%'
  },
  {
    id: 'lt005', patientId: 'p001', patientName: 'Sarah Johnson',
    testName: 'Echocardiogram', testCode: 'ECHO-005',
    category: 'Cardiology', orderedBy: 'Dr. Robert Harrison',
    date: '2026-05-20', status: 'Sample Collected', price: 450, priority: 'STAT'
  },
];

export const MOCK_BILLING: BillingRecord[] = [
  {
    id: 'bill001', patientId: 'p001', patientName: 'Sarah Johnson',
    date: '2026-05-20',
    items: [
      { description: 'Cardiology Consultation', category: 'Consultation', quantity: 1, unitPrice: 250, total: 250 },
      { description: 'ECG Recording & Analysis', category: 'Diagnostics', quantity: 1, unitPrice: 150, total: 150 },
      { description: 'Complete Blood Count', category: 'Laboratory', quantity: 1, unitPrice: 85, total: 85 },
    ],
    subtotal: 485, tax: 48.50, discount: 50, total: 483.50, paid: 483.50, balance: 0,
    status: 'Paid', paymentMethod: 'Insurance', insuranceClaim: true, claimStatus: 'Approved'
  },
  {
    id: 'bill002', patientId: 'p002', patientName: 'Michael Chen',
    date: '2026-05-20',
    items: [
      { description: 'Cardiology Consultation', category: 'Consultation', quantity: 1, unitPrice: 200, total: 200 },
      { description: 'Lipid Panel', category: 'Laboratory', quantity: 1, unitPrice: 120, total: 120 },
    ],
    subtotal: 320, tax: 32, discount: 0, total: 352, paid: 0, balance: 352,
    status: 'Pending', insuranceClaim: true, claimStatus: 'Processing'
  },
  {
    id: 'bill003', patientId: 'p004', patientName: 'James Williams',
    date: '2026-05-19',
    items: [
      { description: 'Endocrinology Consultation', category: 'Consultation', quantity: 1, unitPrice: 180, total: 180 },
      { description: 'HbA1c Test', category: 'Laboratory', quantity: 1, unitPrice: 95, total: 95 },
      { description: 'Kidney Function Panel', category: 'Laboratory', quantity: 1, unitPrice: 110, total: 110 },
    ],
    subtotal: 385, tax: 38.50, discount: 25, total: 398.50, paid: 200, balance: 198.50,
    status: 'Partial', paymentMethod: 'Credit Card', insuranceClaim: true, claimStatus: 'Submitted'
  },
];

export const MOCK_EMERGENCY_CASES: EmergencyCase[] = [
  {
    id: 'em001', patientName: 'Unknown Male', age: 52,
    condition: 'Acute Myocardial Infarction', severity: 'Critical',
    location: '5th Ave & 42nd St, New York', ambulanceId: 'AMB-007',
    eta: 4, assignedDoctor: 'Dr. Marcus Johnson',
    status: 'Incoming', timestamp: '2026-05-20T14:32:00Z',
    vitals: { bp: '180/110', pulse: 118, spo2: 91, temp: 37.8 }
  },
  {
    id: 'em002', patientName: 'Maria Santos', age: 67,
    condition: 'Ischemic Stroke - Large vessel occlusion', severity: 'Critical',
    location: 'Broadway & 34th St', ambulanceId: 'AMB-012',
    eta: 8, assignedDoctor: 'Dr. Amelia Torres',
    status: 'Incoming', timestamp: '2026-05-20T14:28:00Z',
    vitals: { bp: '195/120', pulse: 92, spo2: 94, temp: 37.2 }
  },
  {
    id: 'em003', patientName: 'David Park', age: 34,
    condition: 'Traumatic Brain Injury - MVA', severity: 'High',
    location: 'ER Bay 3', assignedDoctor: 'Dr. Marcus Johnson',
    status: 'In Treatment', timestamp: '2026-05-20T13:45:00Z',
    vitals: { bp: '145/90', pulse: 104, spo2: 96, temp: 37.6 }
  },
  {
    id: 'em004', patientName: 'Lisa Anderson', age: 28,
    condition: 'Anaphylactic Shock - Bee Sting', severity: 'High',
    location: 'ER Bay 1', assignedDoctor: 'Dr. Marcus Johnson',
    status: 'Stabilized', timestamp: '2026-05-20T14:10:00Z',
    vitals: { bp: '110/70', pulse: 88, spo2: 98, temp: 36.9 }
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n001', title: 'Emergency Alert', message: 'Critical patient incoming - Acute MI, ETA 4 min. Dr. Harrison notified.',
    type: 'emergency', read: false, timestamp: '2026-05-20T14:32:00Z', priority: 'high', action: '/emergency'
  },
  {
    id: 'n002', title: 'Lab Result Ready', message: 'Lipid Panel results for Michael Chen are ready for review.',
    type: 'lab', read: false, timestamp: '2026-05-20T14:15:00Z', priority: 'medium', action: '/diagnostics'
  },
  {
    id: 'n003', title: 'Appointment Reminder', message: 'You have 3 appointments scheduled for tomorrow starting at 9:00 AM.',
    type: 'appointment', read: false, timestamp: '2026-05-20T13:00:00Z', priority: 'medium', action: '/appointments'
  },
  {
    id: 'n004', title: 'AI Health Insight', message: 'Predictive model flags elevated readmission risk for patient James Williams.',
    type: 'ai', read: false, timestamp: '2026-05-20T12:30:00Z', priority: 'high', action: '/analytics'
  },
  {
    id: 'n005', title: 'Prescription Expiring', message: "Sarah Johnson's Metformin prescription expires in 5 days.",
    type: 'prescription', read: true, timestamp: '2026-05-20T10:00:00Z', priority: 'low', action: '/pharmacy'
  },
  {
    id: 'n006', title: 'Insurance Claim Approved', message: 'Claim #BCB-789012 for Sarah Johnson approved. Amount: $483.50',
    type: 'billing', read: true, timestamp: '2026-05-20T09:30:00Z', priority: 'low', action: '/billing'
  },
  {
    id: 'n007', title: 'Drug Expiry Alert', message: '3 medications in Pharmacy inventory expire within 30 days.',
    type: 'system', read: false, timestamp: '2026-05-20T08:00:00Z', priority: 'medium', action: '/pharmacy'
  },
];

export const MOCK_BEDS: HospitalBed[] = [
  { id: 'bed001', ward: 'ICU', bedNumber: 'ICU-01', type: 'ICU', status: 'Occupied', patientName: 'David Park', admissionDate: '2026-05-20', expectedDischarge: '2026-05-25' },
  { id: 'bed002', ward: 'ICU', bedNumber: 'ICU-02', type: 'ICU', status: 'Occupied', patientName: 'Unknown Male (Em001)', admissionDate: '2026-05-20' },
  { id: 'bed003', ward: 'ICU', bedNumber: 'ICU-03', type: 'ICU', status: 'Reserved' },
  { id: 'bed004', ward: 'ICU', bedNumber: 'ICU-04', type: 'ICU', status: 'Available' },
  { id: 'bed005', ward: 'General Ward A', bedNumber: 'GWA-01', type: 'General', status: 'Occupied', patientName: 'Maria Santos', admissionDate: '2026-05-19', expectedDischarge: '2026-05-23' },
  { id: 'bed006', ward: 'General Ward A', bedNumber: 'GWA-02', type: 'General', status: 'Available' },
  { id: 'bed007', ward: 'General Ward A', bedNumber: 'GWA-03', type: 'General', status: 'Available' },
  { id: 'bed008', ward: 'Private Suite', bedNumber: 'PS-01', type: 'Private', status: 'Occupied', patientName: 'James Williams', admissionDate: '2026-05-18', expectedDischarge: '2026-05-22' },
  { id: 'bed009', ward: 'Private Suite', bedNumber: 'PS-02', type: 'Private', status: 'Available' },
  { id: 'bed010', ward: 'Emergency', bedNumber: 'ER-01', type: 'Emergency', status: 'Occupied', patientName: 'Lisa Anderson' },
  { id: 'bed011', ward: 'Emergency', bedNumber: 'ER-02', type: 'Emergency', status: 'Occupied', patientName: 'David Park' },
  { id: 'bed012', ward: 'Emergency', bedNumber: 'ER-03', type: 'Emergency', status: 'Reserved' },
];

export const MOCK_DRUG_INVENTORY: DrugInventory[] = [
  { id: 'drug001', name: 'Metformin HCl 500mg', genericName: 'Metformin', category: 'Antidiabetic', stock: 2400, unit: 'Tablets', expiryDate: '2027-08-01', manufacturer: 'Pharma Corp', price: 0.25, reorderLevel: 500, status: 'In Stock', batchNumber: 'MET-2024-001' },
  { id: 'drug002', name: 'Amlodipine 5mg', genericName: 'Amlodipine', category: 'Antihypertensive', stock: 180, unit: 'Tablets', expiryDate: '2026-06-15', manufacturer: 'CardioMed', price: 0.85, reorderLevel: 200, status: 'Low Stock', batchNumber: 'AML-2024-045' },
  { id: 'drug003', name: 'Atorvastatin 40mg', genericName: 'Atorvastatin', category: 'Lipid Lowering', stock: 1100, unit: 'Tablets', expiryDate: '2027-03-20', manufacturer: 'LipidCare', price: 1.20, reorderLevel: 300, status: 'In Stock', batchNumber: 'ATV-2024-089' },
  { id: 'drug004', name: 'Lisinopril 10mg', genericName: 'Lisinopril', category: 'ACE Inhibitor', stock: 0, unit: 'Tablets', expiryDate: '2027-01-10', manufacturer: 'CardioMed', price: 0.45, reorderLevel: 400, status: 'Out of Stock', batchNumber: 'LIS-2024-023' },
  { id: 'drug005', name: 'Insulin Glargine 100U/mL', genericName: 'Insulin', category: 'Antidiabetic', stock: 48, unit: 'Vials', expiryDate: '2026-07-01', manufacturer: 'InsulinPlus', price: 78.50, reorderLevel: 30, status: 'Expiring Soon', batchNumber: 'INS-2024-112' },
  { id: 'drug006', name: 'Epinephrine 1mg/mL', genericName: 'Epinephrine', category: 'Emergency', stock: 120, unit: 'Ampoules', expiryDate: '2027-06-30', manufacturer: 'EmergMed', price: 15.00, reorderLevel: 50, status: 'In Stock', batchNumber: 'EPI-2024-067' },
];

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  { id: 'ai001', type: 'risk', title: 'High Readmission Risk Detected', description: 'Patient James Williams shows 78% readmission probability within 30 days based on CKD progression, HbA1c trends, and social determinants.', confidence: 87, priority: 'high', timestamp: '2026-05-20T12:30:00Z', tags: ['CKD', 'Diabetes', 'Readmission'] },
  { id: 'ai002', type: 'alert', title: 'Drug Interaction Alert', description: 'Potential interaction detected between Lisinopril and NSAIDs for patient James Williams. Risk of acute kidney injury. Review medication list.', confidence: 95, priority: 'high', timestamp: '2026-05-20T11:45:00Z', tags: ['Drug Interaction', 'Safety Alert'] },
  { id: 'ai003', type: 'recommendation', title: 'Screening Recommendation', description: "Based on Sarah Johnson's age, gender and family history profile, annual mammography screening is recommended. Last screening: 18 months ago.", confidence: 91, priority: 'medium', timestamp: '2026-05-20T10:00:00Z', tags: ['Preventive Care', 'Screening'] },
  { id: 'ai004', type: 'prediction', title: 'ICU Capacity Alert', description: 'AI predicts 94% ICU occupancy by 6 PM today based on current admissions and historical patterns. Consider activating surge protocol.', confidence: 82, priority: 'high', timestamp: '2026-05-20T14:00:00Z', tags: ['Capacity', 'ICU', 'Operations'] },
  { id: 'ai005', type: 'diagnosis', title: 'Sepsis Early Warning', description: 'Patient in ER Bay 3 shows early sepsis indicators (qSOFA score: 2). Recommend immediate blood cultures and broad-spectrum antibiotics.', confidence: 79, priority: 'high', timestamp: '2026-05-20T14:20:00Z', tags: ['Sepsis', 'Emergency', 'Clinical Alert'] },
];

export const REVENUE_CHART_DATA: ChartDataPoint[] = [
  { name: 'Jan', value: 420000, secondary: 380000 },
  { name: 'Feb', value: 390000, secondary: 350000 },
  { name: 'Mar', value: 480000, secondary: 430000 },
  { name: 'Apr', value: 520000, secondary: 470000 },
  { name: 'May', value: 580000, secondary: 520000 },
  { name: 'Jun', value: 610000, secondary: 550000 },
  { name: 'Jul', value: 590000, secondary: 530000 },
  { name: 'Aug', value: 640000, secondary: 580000 },
  { name: 'Sep', value: 670000, secondary: 610000 },
  { name: 'Oct', value: 720000, secondary: 650000 },
  { name: 'Nov', value: 695000, secondary: 630000 },
  { name: 'Dec', value: 780000, secondary: 710000 },
];

export const PATIENT_CHART_DATA: ChartDataPoint[] = [
  { name: 'Jan', value: 1240, secondary: 180 },
  { name: 'Feb', value: 1180, secondary: 165 },
  { name: 'Mar', value: 1350, secondary: 210 },
  { name: 'Apr', value: 1420, secondary: 195 },
  { name: 'May', value: 1580, secondary: 230 },
  { name: 'Jun', value: 1490, secondary: 220 },
];

export const DEPARTMENT_DATA = [
  { name: 'Cardiology', value: 28, color: '#0284C7' },
  { name: 'Emergency', value: 22, color: '#DC2626' },
  { name: 'Orthopedics', value: 18, color: '#10B981' },
  { name: 'Neurology', value: 15, color: '#7C3AED' },
  { name: 'Endocrinology', value: 12, color: '#F59E0B' },
  { name: 'Others', value: 5, color: '#6B7280' },
];

export const OCCUPANCY_DATA: ChartDataPoint[] = [
  { name: 'Mon', value: 78, secondary: 85 },
  { name: 'Tue', value: 82, secondary: 88 },
  { name: 'Wed', value: 91, secondary: 94 },
  { name: 'Thu', value: 87, secondary: 90 },
  { name: 'Fri', value: 94, secondary: 96 },
  { name: 'Sat', value: 71, secondary: 78 },
  { name: 'Sun', value: 65, secondary: 70 },
];
