import { useMemo } from 'react';
import { CallRecord } from '@/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { chartConfig, chartColors, defaultAxisProps, commonChartProps } from '@/lib/chart-utils';

interface BoxUsageChartProps {
  calls: CallRecord[];
}

export function BoxUsageChart({ calls }: BoxUsageChartProps) {
  const data = useMemo(() => {
    const boxUsage = new Map();
    calls.forEach((call) => {
      boxUsage.set(call.boxId, (boxUsage.get(call.boxId) || 0) + call.duration);
    });

    return Array.from(boxUsage.entries())
      .map(([boxId, duration]) => ({
        box: `Box ${boxId}`,
        minutes: Math.round(duration / 60),
      }))
      .sort((a, b) => b.minutes - a.minutes)
      .slice(0, 10);
  }, [calls]);

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div style={{ height: chartConfig.chartHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          layout="vertical"
          {...commonChartProps}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={chartColors.grid}
            horizontal={true}
            vertical={false}
          />
          <XAxis
            {...defaultAxisProps}
            type="number"
            tickFormatter={(value) => `${value}m`}
          />
          <YAxis
            {...defaultAxisProps}
            dataKey="box"
            type="category"
            width={60}
          />
          <Tooltip
            formatter={(value: number) => [`${value} minutes`, 'Usage Time']}
            contentStyle={chartConfig.tooltipStyle}
          />
          <Bar
            dataKey="minutes"
            fill={chartColors.primary}
            radius={[0, 4, 4, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}