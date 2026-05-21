export type UserRole = 'patient' | 'doctor' | 'hospital_staff' | 'pharmacy' | 'lab' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  verified: boolean;
  createdAt: string;
  profileComplete: boolean;
}

export interface Patient {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  allergies: string[];
  conditions: string[];
  avatar?: string;
  lastVisit: string;
  nextAppointment?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialization: string;
  department: string;
  experience: number;
  rating: number;
  consultationFee: number;
  avatar?: string;
  qualifications: string[];
  hospital: string;
  available: boolean;
  nextAvailable?: string;
  patientsToday: number;
  totalPatients: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Telemedicine' | 'Emergency';
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'In Progress';
  reason: string;
  notes?: string;
  fee: number;
  avatar?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  medicines: Medicine[];
  diagnosis: string;
  instructions: string;
  followUp?: string;
  status: 'Active' | 'Completed' | 'Expired';
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: number;
  price: number;
}

export interface LabTest {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  testCode: string;
  category: string;
  orderedBy: string;
  date: string;
  status: 'Pending' | 'Sample Collected' | 'Processing' | 'Completed' | 'Report Ready';
  result?: string;
  normalRange?: string;
  unit?: string;
  price: number;
  priority: 'Normal' | 'Urgent' | 'STAT';
}

export interface BillingRecord {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  items: BillingItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paid: number;
  balance: number;
  status: 'Paid' | 'Pending' | 'Partial' | 'Overdue';
  paymentMethod?: string;
  insuranceClaim?: boolean;
  claimStatus?: 'Submitted' | 'Processing' | 'Approved' | 'Rejected';
}

export interface BillingItem {
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface EmergencyCase {
  id: string;
  patientName: string;
  age: number;
  condition: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  location: string;
  ambulanceId?: string;
  eta?: number;
  assignedDoctor?: string;
  status: 'Incoming' | 'Arrived' | 'In Treatment' | 'Stabilized' | 'Discharged';
  timestamp: string;
  vitals: {
    bp: string;
    pulse: number;
    spo2: number;
    temp: number;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'lab' | 'prescription' | 'emergency' | 'billing' | 'system' | 'ai';
  read: boolean;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  action?: string;
}

export interface HospitalBed {
  id: string;
  ward: string;
  bedNumber: string;
  type: 'General' | 'ICU' | 'Emergency' | 'Private' | 'Semi-Private';
  status: 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';
  patientName?: string;
  admissionDate?: string;
  expectedDischarge?: string;
}

export interface DrugInventory {
  id: string;
  name: string;
  genericName: string;
  category: string;
  stock: number;
  unit: string;
  expiryDate: string;
  manufacturer: string;
  price: number;
  reorderLevel: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expiring Soon';
  batchNumber: string;
}

export interface AIInsight {
  id: string;
  type: 'diagnosis' | 'risk' | 'recommendation' | 'alert' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  tags: string[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
  tertiary?: number;
}
