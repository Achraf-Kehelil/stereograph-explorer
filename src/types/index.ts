export type Region =
  | 'Tunis'
  | 'Ariana'
  | 'Ben Arous'
  | 'Manouba'
  | 'Nabeul'
  | 'Zaghouan'
  | 'Bizerte'
  | 'Béja'
  | 'Jendouba'
  | 'Le Kef'
  | 'Siliana'
  | 'Sousse'
  | 'Monastir'
  | 'Mahdia'
  | 'Sfax'
  | 'Kairouan'
  | 'Kasserine'
  | 'Sidi Bouzid'
  | 'Gabès'
  | 'Médenine'
  | 'Tataouine'
  | 'Gafsa'
  | 'Tozeur'
  | 'Kebili';

export type Role = 'directeur' | 'superviseur' | 'agent007';

export type Permission =
  | 'manage_users'
  | 'view_logs'
  | 'manage_boxes'
  | 'view_calls'
  | 'export_data'
  | 'manage_prisoners'
  | 'manage_visitors'
  | 'view_statistics'
  | 'manage_documents';

export interface User {
  id: string;
  name: string;
  role: Role;
  lastActive: string;
}

export interface Prison {
  id: string;
  name: string;
  region: Region;
}

export interface CallRecord {
  id: string;
  boxId: string;
  startTime: string;
  endTime: string;
  duration: number;
  visitorId: string;
  prisonerId: string;
  recordingUrl?: string;
  status: 'ongoing' | 'completed' | 'flagged';
  notes: string;
  flags: string[];
}

export interface Visitor {
  id: string;
  name: string;
  idNumber: string;
  relationship: string;
  status: 'active' | 'suspended' | 'blocked';
  contactInfo: {
    phone: string;
    email?: string;
    address?: string;
  };
  documents: Document[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Prisoner {
  id: string;
  name: string;
  prisonerId: string;
  cell: string;
  status: 'incarcerated' | 'transferred' | 'released';
  entryDate: string;
  releaseDate?: string;
  visitationRights: {
    status: 'allowed' | 'restricted' | 'suspended';
    restrictions: string[];
    allowedVisitors: string[];
  };
  documents: Document[];
  notes: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'authorization' | 'id' | 'report' | 'other';
  fileName: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'valid' | 'expired' | 'revoked';
  expiresAt?: string;
}

export interface Box {
  id: string;
  name: string;
  status: 'available' | 'in-use' | 'maintenance';
  visitorPhone: string;
  prisonerPhone: string;
  location: string;
  maintenanceHistory: {
    date: string;
    description: string;
    technician: string;
  }[];
  reservations: {
    id: string;
    startTime: string;
    endTime: string;
    visitorId: string;
    prisonerId: string;
  }[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: Permission | 'login' | 'logout';
  timestamp: string;
  details: string;
  ipAddress: string;
  metadata: Record<string, any>;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  createdAt: string;
  readAt?: string;
}