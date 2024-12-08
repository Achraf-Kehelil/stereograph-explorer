import { User, Box, CallRecord, Prisoner, Visitor, ActivityLog } from '@/types';
import {
  generateTunisianName,
  generateTunisianCIN,
  generateTunisianPhoneNumber,
  generateTunisianAddress,
  tunisianPrisons,
} from './tunisianData';
import { addDays, subDays, addMinutes, format } from 'date-fns';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Directeur Kamel Ben Salah',
    role: 'directeur',
    lastActive: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Superviseur Mehdi Trabelsi',
    role: 'superviseur',
    lastActive: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Agent Sami Gharbi',
    role: 'agent007',
    lastActive: new Date().toISOString(),
  },
];

export const mockBoxes = Array.from({ length: 30 }, (_, i) => ({
  id: String(i + 1),
  name: `Box ${i + 1}`,
  status: Math.random() > 0.8 
    ? 'maintenance' 
    : Math.random() > 0.6 
      ? 'in-use' 
      : 'available',
  visitorPhone: generateTunisianPhoneNumber(),
  prisonerPhone: generateTunisianPhoneNumber(),
  location: `Bloc ${String.fromCharCode(65 + Math.floor(i / 10))}-${(i % 10) + 1}`,
  maintenanceHistory: [],
  reservations: [],
}));

export const mockVisitors = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  name: generateTunisianName(),
  idNumber: generateTunisianCIN(),
  relationship: ['Famille', 'Ami', 'Avocat', 'Autre'][Math.floor(Math.random() * 4)],
  status: ['active', 'suspended', 'blocked'][Math.floor(Math.random() * 3)],
  contactInfo: {
    phone: generateTunisianPhoneNumber(),
    email: `visiteur${i + 1}@example.com`,
    address: generateTunisianAddress(),
  },
  documents: [],
  notes: '',
  createdAt: subDays(new Date(), Math.floor(Math.random() * 365)).toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const mockPrisoners = Array.from({ length: 40 }, (_, i) => {
  const prison = tunisianPrisons[Math.floor(Math.random() * tunisianPrisons.length)];
  return {
    id: String(i + 1),
    name: generateTunisianName(),
    prisonerId: generateTunisianCIN(),
    cell: `${prison.name} - Bloc ${String.fromCharCode(65 + Math.floor(i / 10))}-${(i % 10) + 1}`,
    status: ['incarcerated', 'transferred', 'released'][Math.floor(Math.random() * 3)],
    entryDate: subDays(new Date(), Math.floor(Math.random() * 1000)).toISOString(),
    releaseDate: Math.random() > 0.7 ? addDays(new Date(), Math.floor(Math.random() * 365)).toISOString() : undefined,
    visitationRights: {
      status: ['allowed', 'restricted', 'suspended'][Math.floor(Math.random() * 3)],
      restrictions: [],
      allowedVisitors: [],
    },
    documents: [],
    notes: '',
  };
});

export const mockCallRecords = Array.from({ length: 1000 }, (_, id) => {
  const startTime = subDays(new Date(), Math.floor(Math.random() * 30));
  const duration = Math.floor(Math.random() * 1800) + 300; // 5-35 minutes
  const endTime = addMinutes(startTime, duration / 60);

  return {
    id: String(id + 1),
    boxId: String(Math.floor(Math.random() * 30) + 1),
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    duration,
    visitorId: String(Math.floor(Math.random() * 50) + 1),
    prisonerId: String(Math.floor(Math.random() * 40) + 1),
    recordingUrl: Math.random() > 0.1 ? `/recordings/call-${id + 1}.mp3` : undefined,
    status: Math.random() > 0.9 ? 'flagged' : 'completed',
    notes: '',
    flags: [],
  };
});

export const mockActivityLogs = Array.from({ length: 1000 }, (_, id) => {
  const timestamp = subDays(new Date(), Math.floor(Math.random() * 30));
  const userId = String(Math.floor(Math.random() * 3) + 1);
  const actions: ActivityLog['action'][] = [
    'view_calls',
    'manage_boxes',
    'export_data',
    'manage_prisoners',
    'manage_visitors',
    'login',
    'logout',
  ];
  const action = actions[Math.floor(Math.random() * actions.length)];

  return {
    id: String(id + 1),
    userId,
    action,
    timestamp: timestamp.toISOString(),
    details: `User ${userId} performed ${action}`,
    ipAddress: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    metadata: {},
  };
});