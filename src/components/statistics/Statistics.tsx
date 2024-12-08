import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { StatsOverview } from './StatsOverview';
import { CallsChart } from './CallsChart';
import { BoxUsageChart } from './BoxUsageChart';
import { DashboardFilter } from './DashboardFilter';
import { mockCallRecords, mockBoxes } from '@/data/mockData';

export function Statistics() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedBoxId, setSelectedBoxId] = useState('');

  const filteredCalls = mockCallRecords.filter((call) => {
    if (selectedBoxId && call.boxId !== selectedBoxId) {
      return false;
    }
    if (startDate && new Date(call.startTime) < startDate) {
      return false;
    }
    if (endDate && new Date(call.endTime) > endDate) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Statistics</h2>
      </div>

      <DashboardFilter
        startDate={startDate}
        endDate={endDate}
        boxId={selectedBoxId}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onBoxIdChange={setSelectedBoxId}
        boxes={mockBoxes}
      />

      <StatsOverview calls={filteredCalls} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">Calls Over Time</h3>
          <CallsChart calls={filteredCalls} />
        </Card>

        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">Box Usage Distribution</h3>
          <BoxUsageChart calls={filteredCalls} />
        </Card>
      </div>
    </div>
  );
}