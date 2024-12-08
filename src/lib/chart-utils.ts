import { CSSProperties } from 'react';

export const chartConfig = {
  tooltipStyle: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '8px 12px',
  } as CSSProperties,
  axisStyle: {
    tick: {
      fill: '#666',
      fontSize: 12,
      fontFamily: 'inherit',
    },
  },
  chartHeight: 300,
  margin: { top: 20, right: 20, bottom: 20, left: 40 },
};

export const chartColors = {
  primary: 'hsl(var(--primary))',
  grid: '#e2e8f0',
  text: '#666',
  tooltip: {
    background: '#fff',
    border: '#e2e8f0',
  },
};

export const defaultAxisProps = {
  tick: chartConfig.axisStyle.tick,
  tickLine: { stroke: chartColors.grid },
  axisLine: { stroke: chartColors.grid },
  tickMargin: 8,
  scale: 'auto',
  domain: ['auto', 'auto'] as ['auto', 'auto'],
  defaultProps: undefined, // Remove defaultProps to fix the warning
};

export const commonChartProps = {
  margin: chartConfig.margin,
  height: chartConfig.chartHeight,
  style: {
    fontSize: 12,
    fontFamily: 'inherit',
  },
};