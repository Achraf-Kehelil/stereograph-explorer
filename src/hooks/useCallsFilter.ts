import { useState, useMemo } from 'react';
import { CallRecord } from '@/types';

export interface CallsFilterType {
  boxId: string;
  startDate: Date | null;
  endDate: Date | null;
  minDuration?: number;
}

export function useCallsFilter(calls: CallRecord[]) {
  const [filters, setFilters] = useState<CallsFilterType>({
    boxId: '',
    startDate: null,
    endDate: null,
  });

  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      if (filters.boxId && !call.boxId.includes(filters.boxId)) {
        return false;
      }

      if (filters.startDate) {
        const callStart = new Date(call.startTime);
        if (callStart < filters.startDate) {
          return false;
        }
      }

      if (filters.endDate) {
        const callEnd = new Date(call.endTime);
        if (callEnd > filters.endDate) {
          return false;
        }
      }

      if (filters.minDuration && call.duration < filters.minDuration * 60) {
        return false;
      }

      return true;
    });
  }, [calls, filters]);

  return { filteredCalls, filters, setFilters };
}