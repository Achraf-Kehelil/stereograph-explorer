import { Card } from '@/components/ui/card';
import { CallRecord } from '@/types';
import { Phone, Clock, Box as BoxIcon, Calendar } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface StatsOverviewProps {
  calls: CallRecord[];
}

export function StatsOverview({ calls }: StatsOverviewProps) {
  const totalCalls = calls.length;
  const totalDuration = calls.reduce((acc, call) => acc + call.duration, 0);
  const uniqueBoxes = new Set(calls.map((call) => call.boxId)).size;
  const today = new Date().toISOString().split('T')[0];
  const todayCalls = calls.filter(
    (call) => call.startTime.split('T')[0] === today
  ).length;

  const stats = [
    {
      label: 'Total Calls',
      value: totalCalls,
      icon: Phone,
      color: 'text-blue-500',
    },
    {
      label: 'Total Duration',
      value: formatDuration(totalDuration),
      icon: Clock,
      color: 'text-green-500',
    },
    {
      label: 'Active Boxes',
      value: uniqueBoxes,
      icon: BoxIcon,
      color: 'text-purple-500',
    },
    {
      label: "Today's Calls",
      value: todayCalls,
      icon: Calendar,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
            </div>
            <div className={`rounded-full bg-gray-100 p-3 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}