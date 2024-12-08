import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Box } from '@/types';

interface DashboardFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  boxId: string;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onBoxIdChange: (boxId: string) => void;
  boxes: Box[];
}

export function DashboardFilter({
  startDate,
  endDate,
  boxId,
  onStartDateChange,
  onEndDateChange,
  onBoxIdChange,
  boxes,
}: DashboardFilterProps) {
  return (
    <Card className="mb-6 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Start Date</Label>
          <DatePicker
            date={startDate}
            onSelect={onStartDateChange}
          />
        </div>
        <div className="space-y-2">
          <Label>End Date</Label>
          <DatePicker
            date={endDate}
            onSelect={onEndDateChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Box</Label>
          <Select
            value={boxId || "all"}
            onValueChange={onBoxIdChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select box" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Boxes</SelectItem>
              {boxes.map((box) => (
                <SelectItem key={box.id} value={box.id}>
                  {box.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}