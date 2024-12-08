import { useState } from 'react';
import { Box } from '@/types';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { mockBoxes } from '@/data/mockData';
import { DaySchedule } from './DaySchedule';
import { BoxSchedule } from './BoxSchedule';

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Planning des visites</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-3 p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </Card>

        <div className="col-span-9 space-y-6">
          {selectedBox ? (
            <BoxSchedule
              box={selectedBox}
              date={selectedDate}
              onBack={() => setSelectedBox(null)}
            />
          ) : (
            <DaySchedule
              boxes={mockBoxes}
              date={selectedDate}
              onSelectBox={setSelectedBox}
            />
          )}
        </div>
      </div>
    </div>
  );
}