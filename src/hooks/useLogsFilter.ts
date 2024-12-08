import { useState, useMemo } from 'react';
import { ActivityLog } from '@/types';

export interface LogsFilterType {
  userId: string;
  action?: ActivityLog['action'];
  startDate: Date | null;
  endDate: Date | null;
}

export function useLogsFilter(logs: ActivityLog[]) {
  const [filters, setFilters] = useState<LogsFilterType>({
    userId: '',
    startDate: null,
    endDate: null,
  });

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (filters.userId && !log.userId.includes(filters.userId)) {
        return false;
      }

      if (filters.action && log.action !== filters.action) {
        return false;
      }

      if (filters.startDate) {
        const logDate = new Date(log.timestamp);
        if (logDate < filters.startDate) {
          return false;
        }
      }

      if (filters.endDate) {
        const logDate = new Date(log.timestamp);
        if (logDate > filters.endDate) {
          return false;
        }
      }

      return true;
    });
  }, [logs, filters]);

  return { filteredLogs, filters, setFilters };
}