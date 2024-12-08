import { Box } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';

interface BoxScheduleProps {
  box: Box;
  date?: Date;
  onBack: () => void;
}

export function BoxSchedule({ box, date, onBack }: BoxScheduleProps) {
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <h3 className="text-lg font-semibold">
          {box.name} - {date ? format(date, 'dd MMMM yyyy') : 'Aujourd\'hui'}
        </h3>
      </div>

      <Card className="p-6">
        <div className="space-y-2">
          {timeSlots.map((hour) => {
            const reservation = box.reservations?.find(
              (res) =>
                date &&
                format(new Date(res.startTime), 'yyyy-MM-dd HH') ===
                  format(
                    new Date(date.setHours(hour, 0, 0, 0)),
                    'yyyy-MM-dd HH'
                  )
            );

            return (
              <div
                key={hour}
                className={`flex items-center space-x-4 rounded-md p-2 ${
                  reservation ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <span className="w-16 font-medium">
                  {String(hour).padStart(2, '0')}:00
                </span>
                {reservation ? (
                  <div className="flex-1">
                    <p className="font-medium">Réservé</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(reservation.startTime), 'HH:mm')} -{' '}
                      {format(new Date(reservation.endTime), 'HH:mm')}
                    </p>
                  </div>
                ) : (
                  <span className="text-gray-500">Disponible</span>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}