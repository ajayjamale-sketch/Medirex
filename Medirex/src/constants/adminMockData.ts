import type { UserRole } from '@/types';

export interface Vehicle {
  id: string;
  plate: string;
  type: string;
  status: 'Active' | 'Idle' | 'Maintenance';
  driverName: string;
  driverId: string;
  fuel: number;
  battery: number;
  currentLat: number;
  currentLng: number;
  speed: number;
  destination: string;
  routeProgress: number; // 0-100%
  patientName?: string;
  eta: number; // in minutes
}

export interface DriverProfile {
  id: string;
  name: string;
  status: 'Active' | 'Off-Duty' | 'Suspended';
  rating: number;
  vehicleId: string;
  contact: string;
  tripsCompleted: number;
  activeHours: number;
  avatar: string;
}

export interface WorkspaceTask {
  id: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  assignee: string;
  assigneeAvatar: string;
  category: 'Billing' | 'Clinical' | 'Compliance' | 'Operations' | 'IT';
  dueDate: string;
  description: string;
}

export interface AdminDocument {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'jpg';
  size: string;
  uploadDate: string;
  category: 'Billing' | 'Clinical' | 'Compliance' | 'Legal' | 'Operational';
  uploader: string;
  url: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Locked' | 'Suspended';
  lastActive: string;
  department: string;
  permissions: string[];
  avatar: string;
}

export interface MessageSender {
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline';
}

export interface ChatThread {
  id: string;
  user: MessageSender;
  unreadCount: number;
  messages: Array<{
    id: string;
    sender: string;
    text: string;
    timestamp: string;
    self: boolean;
  }>;
}

export interface ComplianceLog {
  id: string;
  action: string;
  user: string;
  role: string;
  ipAddress: string;
  resource: string;
  status: 'Passed' | 'Flagged' | 'Failed';
  timestamp: string;
  details: string;
}

export const INITIAL_VEHICLES: Vehicle[] = [
  { id: 'AMB-01', plate: 'TX-293-AMB', type: 'Advanced Life Support', status: 'Active', driverName: 'Marcus Vance', driverId: 'DRV-01', fuel: 82, battery: 95, currentLat: 37.7749, currentLng: -122.4194, speed: 45, destination: 'Mercy General Hospital', routeProgress: 42, patientName: 'Elena Rostova', eta: 8 },
  { id: 'AMB-02', plate: 'TX-941-AMB', type: 'Basic Life Support', status: 'Idle', driverName: 'Clara Oswald', driverId: 'DRV-02', fuel: 90, battery: 99, currentLat: 37.7833, currentLng: -122.4167, speed: 0, destination: 'N/A', routeProgress: 0, eta: 0 },
  { id: 'AMB-03', plate: 'TX-105-AMB', type: 'Critical Care Transport', status: 'Active', driverName: 'James Wilson', driverId: 'DRV-03', fuel: 58, battery: 78, currentLat: 37.7699, currentLng: -122.4468, speed: 52, destination: 'Medirex Diagnostics Hub', routeProgress: 68, patientName: 'Thomas Shelby', eta: 4 },
  { id: 'AMB-04', plate: 'TX-804-AMB', type: 'Neonatal Transport', status: 'Maintenance', driverName: 'Gregory House', driverId: 'DRV-04', fuel: 15, battery: 40, currentLat: 37.7651, currentLng: -122.4011, speed: 0, destination: 'West Care Depot', routeProgress: 0, eta: 0 },
  { id: 'AMB-05', plate: 'TX-573-AMB', type: 'Bariatric Ambulance', status: 'Idle', driverName: 'Lisa Cuddy', driverId: 'DRV-05', fuel: 74, battery: 89, currentLat: 37.7892, currentLng: -122.4014, speed: 0, destination: 'N/A', routeProgress: 0, eta: 0 }
];

export const INITIAL_DRIVERS: DriverProfile[] = [
  { id: 'DRV-01', name: 'Marcus Vance', status: 'Active', rating: 4.9, vehicleId: 'AMB-01', contact: '+1 (555) 102-3948', tripsCompleted: 342, activeHours: 42, avatar: 'https://i.pravatar.cc/150?u=1500648767791-00dcc994a43e' },
  { id: 'DRV-02', name: 'Clara Oswald', status: 'Active', rating: 4.8, vehicleId: 'AMB-02', contact: '+1 (555) 394-2093', tripsCompleted: 156, activeHours: 32, avatar: 'https://i.pravatar.cc/150?u=1494790108755-2616b612b47c' },
  { id: 'DRV-03', name: 'James Wilson', status: 'Active', rating: 4.7, vehicleId: 'AMB-03', contact: '+1 (555) 492-2039', tripsCompleted: 580, activeHours: 50, avatar: 'https://i.pravatar.cc/150?u=1472099645785-5658abf4ff4e' },
  { id: 'DRV-04', name: 'Gregory House', status: 'Suspended', rating: 4.5, vehicleId: 'AMB-04', contact: '+1 (555) 091-2394', tripsCompleted: 890, activeHours: 0, avatar: 'https://i.pravatar.cc/150?u=1560250097-0b93528c311a' },
  { id: 'DRV-05', name: 'Lisa Cuddy', status: 'Off-Duty', rating: 4.9, vehicleId: 'AMB-05', contact: '+1 (555) 402-9384', tripsCompleted: 243, activeHours: 10, avatar: 'https://i.pravatar.cc/150?u=1573496359142-b8d87734a5a2' }
];

export const INITIAL_TASKS: WorkspaceTask[] = [
  { id: 'TSK-101', title: 'Conduct HIPAA Compliance Quarterly Audit', status: 'In Progress', priority: 'High', assignee: 'Dr. Sarah Harrison', assigneeAvatar: 'https://i.pravatar.cc/150?u=1559839734-2b71ea197ec2', category: 'Compliance', dueDate: '2026-05-25', description: 'Review operational access logs, patient records modification queries, and database encryption status to ensure compliance with SOC2/HIPAA guidelines.' },
  { id: 'TSK-102', title: 'Procure Additional ICU Ventilators', status: 'Todo', priority: 'High', assignee: 'Jane Miller (Staff)', assigneeAvatar: 'https://ui-avatars.com/api/?name=Jane+Miller&background=0284C7&color=fff', category: 'Operations', dueDate: '2026-06-02', description: 'Coordinate with procurement suppliers to secure 5 premium grade ICU ventilators under the allocated FY26 hospital emergency budget.' },
  { id: 'TSK-103', title: 'Resolve Pending Insurance Disputes', status: 'Review', priority: 'Medium', assignee: 'Robert Chen', assigneeAvatar: 'https://ui-avatars.com/api/?name=Robert+Chen&background=10B981&color=fff', category: 'Billing', dueDate: '2026-05-22', description: 'Review claim rejections for case ID REC-904 (LifeCare policies) and upload supplemental diagnostics reports.' },
  { id: 'TSK-104', title: 'Deploy AI Diagnostics Patch v2.4.1', status: 'Completed', priority: 'Low', assignee: 'Alex Rivera (IT)', assigneeAvatar: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=6366F1&color=fff', category: 'IT', dueDate: '2026-05-18', description: 'Deploy the latest updates to the deep neural net symptom prediction model. Solves false negatives in drug-interaction warnings.' },
  { id: 'TSK-105', title: 'Configure Ward B Bed Allocation System', status: 'Todo', priority: 'Medium', assignee: 'Jane Miller (Staff)', assigneeAvatar: 'https://ui-avatars.com/api/?name=Jane+Miller&background=0284C7&color=fff', category: 'Operations', dueDate: '2026-05-30', description: 'Optimize the bed assignment flow chart so Ward B admissions automatically trigger laboratory alerts.' }
];

export const INITIAL_DOCUMENTS: AdminDocument[] = [
  { id: 'DOC-501', name: 'HIPAA_Compliance_Cert_2026.pdf', type: 'pdf', size: '1.2 MB', uploadDate: '2026-04-10', category: 'Compliance', uploader: 'Super Admin', url: '#' },
  { id: 'DOC-502', name: 'ICU_Oxygen_System_Blueprint.docx', type: 'docx', size: '4.8 MB', uploadDate: '2026-05-01', category: 'Operational', uploader: 'Chief Engineer', url: '#' },
  { id: 'DOC-503', name: 'Billing_Ledger_Q1_2026.xlsx', type: 'xlsx', size: '8.4 MB', uploadDate: '2026-05-15', category: 'Billing', uploader: 'Finance Director', url: '#' },
  { id: 'DOC-504', name: 'Patient_Consent_Form_Template.pdf', type: 'pdf', size: '420 KB', uploadDate: '2026-02-14', category: 'Legal', uploader: 'Compliance Officer', url: '#' },
  { id: 'DOC-505', name: 'Clinical_Guidelines_Cardiology.pdf', type: 'pdf', size: '2.5 MB', uploadDate: '2026-05-18', category: 'Clinical', uploader: 'Dr. Harrison', url: '#' }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  { id: 'USR-001', name: 'Alina Kabanova', email: 'alina.k@medirex.io', role: 'admin', status: 'Active', lastActive: 'Just Now', department: 'Executive governance', permissions: ['All Access', 'Modify Users', 'Compliance Override', 'Financial Export'], avatar: 'https://i.pravatar.cc/150?u=1573496359142-b8d87734a5a2' },
  { id: 'USR-002', name: 'Robert Harrison', email: 'r.harrison@medirex.io', role: 'doctor', status: 'Active', lastActive: '5 min ago', department: 'Cardiology Clinic', permissions: ['EMR Read', 'EMR Write', 'Teleconsultation', 'Prescribe Meds'], avatar: 'https://i.pravatar.cc/150?u=1612349317150-e413f6a5b16d' },
  { id: 'USR-003', name: 'Jane Miller', email: 'j.miller@medirex.io', role: 'hospital_staff', status: 'Active', lastActive: '12 min ago', department: 'Admissions desk', permissions: ['Bed Management', 'Patient Intake', 'Invoicing', 'Queue Controls'], avatar: 'https://i.pravatar.cc/150?u=1544005313-94ddf0286df2' },
  { id: 'USR-004', name: 'David Gahan', email: 'd.gahan@medirex.io', role: 'pharmacy', status: 'Active', lastActive: '1 hr ago', department: 'Central Dispensary', permissions: ['Prescription Fill', 'Inventory Control', 'Courier Assign'], avatar: 'https://i.pravatar.cc/150?u=1506794778202-cad84cf45f1d' },
  { id: 'USR-005', name: 'Elizabeth Shaw', email: 'e.shaw@medirex.io', role: 'lab', status: 'Locked', lastActive: '2 days ago', department: 'Pathology Diagnostics', permissions: ['Lab Access', 'Upload Reports', 'Verify Samples'], avatar: 'https://i.pravatar.cc/150?u=1534528741775-53994a69daeb' },
  { id: 'USR-006', name: 'Markus Vance', email: 'm.vance@medirex.io', role: 'patient', status: 'Active', lastActive: '3 hrs ago', department: 'Patient Services', permissions: ['View Health Profile', 'Book Consulting', 'Refill Orders'], avatar: 'https://i.pravatar.cc/150?u=1500648767791-00dcc994a43e' }
];

export const INITIAL_CHATS: ChatThread[] = [
  {
    id: 'CHT-01',
    user: { name: 'Dr. Robert Harrison', role: 'Cardiologist', avatar: 'https://i.pravatar.cc/150?u=1612349317150-e413f6a5b16d', status: 'online' },
    unreadCount: 2,
    messages: [
      { id: 'm1_1', sender: 'Dr. Harrison', text: 'Hi Admin, I noticed an access error trying to retrieve historical ECG records for patient Sarah Johnson.', timestamp: '10:14 AM', self: false },
      { id: 'm1_2', sender: 'Dr. Harrison', text: 'Could you double-check my clinical access policy groups?', timestamp: '10:15 AM', self: false }
    ]
  },
  {
    id: 'CHT-02',
    user: { name: 'Marcus Vance (Driver)', role: 'Fleet Lead', avatar: 'https://i.pravatar.cc/150?u=1500648767791-00dcc994a43e', status: 'online' },
    unreadCount: 0,
    messages: [
      { id: 'm2_1', sender: 'You', text: 'Marcus, what is the status of the emergency transfer to Mercy General Hospital?', timestamp: '09:30 AM', self: true },
      { id: 'm2_2', sender: 'Marcus Vance', text: 'Patient is stabilized and we are passing the Highway 5 intersection. ETA is 8 minutes.', timestamp: '09:32 AM', self: false }
    ]
  },
  {
    id: 'CHT-03',
    user: { name: 'Jane Miller (Staff)', role: 'Registrar', avatar: 'https://ui-avatars.com/api/?name=Jane+Miller&background=0284C7&color=fff', status: 'offline' },
    unreadCount: 0,
    messages: [
      { id: 'm3_1', sender: 'Jane Miller', text: 'The billing terminal at Ward B is offline. Could IT verify the network router connection?', timestamp: 'Yesterday', self: false },
      { id: 'm3_2', sender: 'You', text: 'IT support has re-configured the port. Please restart the terminal and check now.', timestamp: 'Yesterday', self: true }
    ]
  }
];

export const INITIAL_COMPLIANCE: ComplianceLog[] = [
  { id: 'LOG-701', action: 'EMR File View', user: 'Dr. Robert Harrison', role: 'Doctor', ipAddress: '192.168.1.144', resource: 'PAT-8809 (Sarah Johnson)', status: 'Passed', timestamp: '10:42 AM', details: 'Authorized read of patient records for active telemedicine session.' },
  { id: 'LOG-702', action: 'User Permissions Update', user: 'Alina Kabanova', role: 'Admin', ipAddress: '192.168.1.10', resource: 'USR-005 (Elizabeth Shaw)', status: 'Flagged', timestamp: '10:35 AM', details: 'Account status toggled from Active to Locked due to missing audit certification.' },
  { id: 'LOG-703', action: 'Database Decryption Request', user: 'Unknown IP', role: 'External', ipAddress: '195.42.12.99', resource: 'Clinical Billing DB', status: 'Failed', timestamp: '09:12 AM', details: 'Blocked unauthorized decryption query. IP has been logged and blacklisted.' },
  { id: 'LOG-704', action: 'Prescription Export', user: 'David Gahan', role: 'Pharmacist', ipAddress: '192.168.1.58', resource: 'RX-99201 (Aspirin Refill)', status: 'Passed', timestamp: '08:45 AM', details: 'Successfully verified medical hash signature and exported to local inventory.' }
];

export const INITIAL_INVOICES = [
  { id: 'INV-401', patientName: 'Sarah Johnson', date: '2026-05-19', amount: 350.00, status: 'Paid', category: 'Insurance', itemized: [{ desc: 'Cardiology Teleconsultation', amount: 150 }, { desc: 'Electrocardiogram analysis', amount: 200 }] },
  { id: 'INV-402', patientName: 'Elena Rostova', date: '2026-05-18', amount: 1800.00, status: 'Pending', category: 'Insurance', itemized: [{ desc: 'Ambulance Critical Transport', amount: 1200 }, { desc: 'Emergency intake examination', amount: 600 }] },
  { id: 'INV-403', patientName: 'Thomas Shelby', date: '2026-05-15', amount: 95.00, status: 'Paid', category: 'Self-Pay', itemized: [{ desc: 'Laboratory Blood Diagnostics', amount: 95 }] },
  { id: 'INV-404', patientName: 'John Doe', date: '2026-05-10', amount: 450.00, status: 'Overdue', category: 'Self-Pay', itemized: [{ desc: 'General Practitioner consultation', amount: 100 }, { desc: 'Extended Ward B Observation', amount: 350 }] }
];
