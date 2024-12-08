import { useState } from 'react';
import { CallRecord, Visitor, Prisoner } from '@/types';
import { mockCallRecords, mockVisitors, mockPrisoners } from '@/data/mockData';
import { CallsFilter } from './CallsFilter';
import { CallsTable } from './CallsTable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useCallsFilter } from '@/hooks/useCallsFilter';
import { downloadExcel, formatCallsForExport } from '@/lib/excel';

export function CallsList() {
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const { filteredCalls, filters, setFilters } = useCallsFilter(mockCallRecords);

  const handleExport = () => {
    const exportData = formatCallsForExport(filteredCalls);
    downloadExcel(exportData, 'call-records');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Call Records</h2>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>
      <Card className="p-4">
        <CallsFilter filters={filters} onFiltersChange={setFilters} />
      </Card>
      <Card className="p-4">
        <CallsTable
          calls={filteredCalls}
          visitors={mockVisitors}
          prisoners={mockPrisoners}
          selectedCall={selectedCall}
          onSelectCall={setSelectedCall}
        />
      </Card>
    </div>
  );
}