import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { TableHeaderCell } from '@/components/ui/table-header-cell';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableSearch } from '@/components/ui/table-search';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { CallRecord, Visitor, Prisoner } from '@/types';
import { formatDuration, formatDateTime } from '@/lib/utils';
import { useTable } from '@/hooks/useTable';

interface CallsTableProps {
  calls: CallRecord[];
  visitors: Visitor[];
  prisoners: Prisoner[];
  selectedCall: CallRecord | null;
  onSelectCall: (call: CallRecord | null) => void;
}

export function CallsTable({
  calls,
  visitors,
  prisoners,
  selectedCall,
  onSelectCall,
}: CallsTableProps) {
  const {
    data: paginatedCalls,
    currentPage,
    totalPages,
    pageSize,
    sortConfig,
    searchQuery,
    handleSort,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
  } = useTable<CallRecord>(calls, {
    pageSize: 10,
    searchQuery: '',
  }, ['boxId', 'startTime', 'duration']);

  const getVisitorName = (visitorId: string) =>
    visitors.find((v) => v.id === visitorId)?.name || 'Unknown';

  const getPrisonerName = (prisonerId: string) =>
    prisoners.find((p) => p.id === prisonerId)?.name || 'Unknown';

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="w-72">
          <TableSearch
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search calls..."
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell
              label="Box"
              sortKey="boxId"
              sortDirection={sortConfig?.key === 'boxId' ? sortConfig.direction : undefined}
              onSort={() => handleSort('boxId')}
            />
            <TableHeaderCell
              label="Start Time"
              sortKey="startTime"
              sortDirection={sortConfig?.key === 'startTime' ? sortConfig.direction : undefined}
              onSort={() => handleSort('startTime')}
            />
            <TableHeaderCell
              label="Duration"
              sortKey="duration"
              sortDirection={sortConfig?.key === 'duration' ? sortConfig.direction : undefined}
              onSort={() => handleSort('duration')}
            />
            <TableHeaderCell label="Visitor" />
            <TableHeaderCell label="Prisoner" />
            <TableHeaderCell label="Recording" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCalls.map((call) => (
            <TableRow key={call.id}>
              <TableCell>{call.boxId}</TableCell>
              <TableCell>{formatDateTime(call.startTime)}</TableCell>
              <TableCell>{formatDuration(call.duration)}</TableCell>
              <TableCell>{getVisitorName(call.visitorId)}</TableCell>
              <TableCell>{getPrisonerName(call.prisonerId)}</TableCell>
              <TableCell>
                {call.recordingUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onSelectCall(selectedCall?.id === call.id ? null : call)
                    }
                  >
                    {selectedCall?.id === call.id ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}