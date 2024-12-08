import { addDays, subDays, addMinutes, format } from 'date-fns';
import { Box, CallRecord, Prisoner, Visitor, ActivityLog, User, Document } from '@/types';

// Generate 30 boxes
export const generateBoxes = (): Box[] => {
  return Array.from({ length: 30 }, (_, i) => ({
    id: String(i + 1),
    name: `Box ${i + 1}`,
    status: Math.random() > 0.8 
      ? 'maintenance' 
      : Math.random() > 0.6 
        ? 'in-use' 
        : 'available',
    visitorPhone: `V${String(i + 1).padStart(2, '0')}`,
    prisonerPhone: `P${String(i + 1).padStart(2, '0')}`,
    location: `Block ${String.fromCharCode(65 + Math.floor(i / 10))}-${(i % 10) + 1}`,
    maintenanceHistory: [],
    reservations: [],
  }));
};

// Generate 50 visitors with updated fields
export const generateVisitors = (): Visitor[] => {
  const relationships = ['Family', 'Friend', 'Legal', 'Other'];
  const statuses: Array<Visitor['status']> = ['active', 'suspended', 'blocked'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    name: `Visitor ${i + 1}`,
    idNumber: `ID${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
    relationship: relationships[Math.floor(Math.random() * relationships.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    contactInfo: {
      phone: `+33${Math.floor(Math.random() * 1000000000)}`,
      email: `visitor${i + 1}@example.com`,
      address: `${Math.floor(Math.random() * 100)} Rue de la Prison, Paris`,
    },
    documents: [],
    notes: '',
    createdAt: subDays(new Date(), Math.floor(Math.random() * 365)).toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

// Generate 40 prisoners with updated fields
export const generatePrisoners = (): Prisoner[] => {
  const statuses: Array<Prisoner['status']> = ['incarcerated', 'transferred', 'released'];
  const visitationStatuses: Array<Prisoner['visitationRights']['status']> = ['allowed', 'restricted', 'suspended'];

  return Array.from({ length: 40 }, (_, i) => ({
    id: String(i + 1),
    name: `Prisoner ${i + 1}`,
    prisonerId: `P${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
    cell: `Block ${String.fromCharCode(65 + Math.floor(i / 10))}-${(i % 10) + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    entryDate: subDays(new Date(), Math.floor(Math.random() * 1000)).toISOString(),
    releaseDate: Math.random() > 0.7 ? addDays(new Date(), Math.floor(Math.random() * 365)).toISOString() : undefined,
    visitationRights: {
      status: visitationStatuses[Math.floor(Math.random() * visitationStatuses.length)],
      restrictions: [],
      allowedVisitors: [],
    },
    documents: [],
    notes: '',
  }));
};

// Generate 1000+ calls over 8 weeks
export const generateCalls = (): CallRecord[] => {
  const calls: CallRecord[] = [];
  const endDate = new Date();
  const startDate = subDays(endDate, 56); // 8 weeks
  let id = 1;

  // Generate 15-25 calls per day
  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const dailyCalls = Math.floor(Math.random() * 11) + 15; // 15-25 calls

    for (let i = 0; i < dailyCalls; i++) {
      const hour = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
      const minute = Math.floor(Math.random() * 60);
      const duration = Math.floor(Math.random() * 1800) + 300; // 5-35 minutes
      const startTime = new Date(date.setHours(hour, minute));
      const endTime = addMinutes(startTime, duration / 60);

      calls.push({
        id: String(id++),
        boxId: String(Math.floor(Math.random() * 30) + 1),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration,
        visitorId: String(Math.floor(Math.random() * 50) + 1),
        prisonerId: String(Math.floor(Math.random() * 40) + 1),
        recordingUrl: Math.random() > 0.1 ? `/recordings/call-${id}.mp3` : undefined,
        status: Math.random() > 0.9 ? 'flagged' : 'completed',
        notes: '',
        flags: [],
      });
    }
  }

  return calls.sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
};

// Generate activity logs for the past 30 days
export const generateActivityLogs = (users: User[]): ActivityLog[] => {
  const logs: ActivityLog[] = [];
  const endDate = new Date();
  const startDate = subDays(endDate, 30);
  let id = 1;

  const actions: Array<ActivityLog['action']> = [
    'view_call',
    'edit_box',
    'add_box',
    'login',
    'logout',
    'export_data',
    'modify_user',
    'view_document',
    'upload_document',
    'create_reservation',
    'modify_prisoner',
    'modify_visitor',
  ];

  const actionDetails = {
    view_call: 'Viewed call recording',
    edit_box: 'Modified box configuration',
    add_box: 'Added new box',
    login: 'User logged in',
    logout: 'User logged out',
    export_data: 'Exported call records',
    modify_user: 'Modified user account',
    view_document: 'Viewed document',
    upload_document: 'Uploaded new document',
    create_reservation: 'Created box reservation',
    modify_prisoner: 'Modified prisoner profile',
    modify_visitor: 'Modified visitor profile',
  };

  // Generate 20-30 logs per day
  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const dailyLogs = Math.floor(Math.random() * 11) + 20;

    for (let i = 0; i < dailyLogs; i++) {
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      const timestamp = new Date(date.setHours(hour, minute));
      const action = actions[Math.floor(Math.random() * actions.length)];
      const user = users[Math.floor(Math.random() * users.length)];

      logs.push({
        id: String(id++),
        userId: user.id,
        action,
        timestamp: timestamp.toISOString(),
        details: actionDetails[action],
        ipAddress: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(
          Math.random() * 256
        )}`,
        metadata: {},
      });
    }
  }

  return logs.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};