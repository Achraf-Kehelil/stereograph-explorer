import { CallRecord } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Play, AlertTriangle } from 'lucide-react';
import { formatDateTime, formatDuration } from '@/lib/utils';

interface CallHistoryProps {
  calls: CallRecord[];
}

export function CallHistory({ calls }: CallHistoryProps) {
  const getStatusBadge = (status: CallRecord['status']) => {
    const variants = {
      ongoing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      flagged: 'bg-red-100 text-red-800',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {calls.map((call) => (
        <Card key={call.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="font-medium">Box {call.boxId}</span>
                {getStatusBadge(call.status)}
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">
                  Started: {formatDateTime(call.startTime)}
                </p>
                <p className="text-sm text-gray-500">
                  Duration: {formatDuration(call.duration)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {call.flags && call.flags.length > 0 && (
                <Badge variant="destructive" className="flex items-center">
                  <AlertTriangle className="mr-1 h-4 w-4" />
                  {call.flags.length} Flag(s)
                </Badge>
              )}
              {call.recordingUrl && (
                <Button size="sm" variant="ghost">
                  <Play className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          {call.notes && (
            <p className="mt-2 text-sm text-gray-600">{call.notes}</p>
          )}
        </Card>
      ))}
    </div>
  );
}