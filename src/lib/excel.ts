import { CallRecord, ActivityLog } from '@/types';
import { formatDateTime, formatDuration } from './utils';

export function downloadExcel(data: any[], filename: string) {
  // Create CSV content
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        const formattedValue = String(value).replace(/"/g, '""');
        return `"${formattedValue}"`;
      }).join(',')
    )
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function formatCallsForExport(calls: CallRecord[]): any[] {
  return calls.map(call => ({
    'Box ID': call.boxId,
    'Start Time': formatDateTime(call.startTime),
    'End Time': formatDateTime(call.endTime),
    'Duration': formatDuration(call.duration),
    'Visitor ID': call.visitorId,
    'Prisoner ID': call.prisonerId,
    'Recording Available': call.recordingUrl ? 'Yes' : 'No'
  }));
}

export function formatLogsForExport(logs: ActivityLog[]): any[] {
  return logs.map(log => ({
    'Timestamp': formatDateTime(log.timestamp),
    'User ID': log.userId,
    'Action': log.action.replace('_', ' ').toUpperCase(),
    'Details': log.details,
    'IP Address': log.ipAddress
  }));
}