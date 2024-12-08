import { useMemo } from 'react';
import { CallRecord } from '@/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO, startOfDay, eachDayOfInterval } from 'date-fns';
import { chartConfig, chartColors, defaultAxisProps, commonChartProps } from '@/lib/chart-utils';

interface CallsChartProps {
  calls: CallRecord[];
}

export function CallsChart({ calls }: CallsChartProps) {
  const data = useMemo(() => {
    if (!calls.length) return [];
    
    const dateRange = {
      start: startOfDay(parseISO(calls[0]?.startTime || new Date().toISOString())),
      end: startOfDay(new Date()),
    };

    const days = eachDayOfInterval(dateRange);
    const callsByDay = new Map();

    days.forEach((day) => {
      callsByDay.set(format(day, 'yyyy-MM-dd'), 0);
    });

    calls.forEach((call) => {
      const day = format(parseISO(call.startTime), 'yyyy-MM-dd');
      callsByDay.set(day, (callsByDay.get(day) || 0) + 1);
    });

    return Array.from(callsByDay.entries()).map(([date, count]) => ({
      date,
      calls: count,
    }));
  }, [calls]);

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-gray-500">
        Aucune donnée disponible
      </div>
    );
  }

  return (
    <div style={{ height: chartConfig.chartHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} {...commonChartProps}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={chartColors.grid}
            vertical={false}
          />
          <XAxis
            {...defaultAxisProps}
            dataKey="date"
            tickFormatter={(date) => format(parseISO(date), 'MMM d')}
          />
          <YAxis
            {...defaultAxisProps}
            tickFormatter={(value) => Math.round(value)}
          />
          <Tooltip
            labelFormatter={(date) => format(parseISO(date), 'MMMM d, yyyy')}
            contentStyle={chartConfig.tooltipStyle}
            formatter={(value: number) => [value, 'Appels']}
          />
          <Line
            type="monotone"
            dataKey="calls"
            stroke={chartColors.primary}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}