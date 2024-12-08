import { Box } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface DayScheduleProps {
  boxes: Box[];
  date?: Date;
  onSelectBox: (box: Box) => void;
}

export function DaySchedule({ boxes, date, onSelectBox }: DayScheduleProps) {
  const getStatusBadge = (status: Box['status']) => {
    const variants = {
      available: 'bg-green-100 text-green-800',
      'in-use': 'bg-blue-100 text-blue-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      reserved: 'bg-purple-100 text-purple-800',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Planning du {date ? format(date, 'dd MMMM yyyy') : 'jour'}
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {boxes.map((box) => (
          <Card key={box.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{box.name}</h4>
                <div className="mt-2">{getStatusBadge(box.status)}</div>
                <p className="mt-2 text-sm text-gray-500">
                  Location: {box.location}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectBox(box)}
              >
                Voir détails
              </Button>
            </div>

            {box.reservations && box.reservations.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">
                  Réservations du jour:
                </p>
                <div className="mt-2 space-y-2">
                  {box.reservations
                    .filter(
                      (res) =>
                        date &&
                        format(new Date(res.startTime), 'yyyy-MM-dd') ===
                          format(date, 'yyyy-MM-dd')
                    )
                    .map((reservation) => (
                      <div
                        key={reservation.id}
                        className="rounded-md bg-gray-50 p-2 text-sm"
                      >
                        {format(new Date(reservation.startTime), 'HH:mm')} -{' '}
                        {format(new Date(reservation.endTime), 'HH:mm')}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}