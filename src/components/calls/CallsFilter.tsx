import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { CallsFilterType } from '@/hooks/useCallsFilter';

interface CallsFilterProps {
  filters: CallsFilterType;
  onFiltersChange: (filters: CallsFilterType) => void;
}

export function CallsFilter({ filters, onFiltersChange }: CallsFilterProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="space-y-2">
        <Label>Box ID</Label>
        <Input
          placeholder="Search by box..."
          value={filters.boxId}
          onChange={(e) =>
            onFiltersChange({ ...filters, boxId: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Start Date</Label>
        <DatePicker
          date={filters.startDate}
          onSelect={(date) =>
            onFiltersChange({ ...filters, startDate: date })
          }
        />
      </div>
      <div className="space-y-2">
        <Label>End Date</Label>
        <DatePicker
          date={filters.endDate}
          onSelect={(date) =>
            onFiltersChange({ ...filters, endDate: date })
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Duration (min)</Label>
        <Input
          type="number"
          placeholder="Minimum duration..."
          value={filters.minDuration || ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              minDuration: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
        />
      </div>
    </div>
  );
}