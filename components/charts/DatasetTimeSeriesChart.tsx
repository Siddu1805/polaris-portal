'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

interface DatasetTimeSeriesChartProps {
  data: Array<{ timestamp: string; value: number; secondaryValue?: number; depthOrAlt?: number }>;
  parameterName: string;
  secondaryParameterName?: string;
  unit: string;
}

export function DatasetTimeSeriesChart({
  data,
  parameterName,
  secondaryParameterName,
  unit
}: DatasetTimeSeriesChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasSecondary = data.some((d) => d.secondaryValue !== undefined);

  const customTooltipStyle = {
    backgroundColor: '#0f172a',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: '0.75rem',
    color: '#f8fafc',
    fontSize: '12px'
  };

  return (
    <div className="w-full h-72 min-w-0">
      {mounted ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={11} />
            <YAxis
              yAxisId="left"
              stroke="#38bdf8"
              fontSize={11}
              label={{ value: unit, angle: -90, position: 'insideLeft', fill: '#38bdf8', fontSize: 10 }}
            />
            {hasSecondary && (
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#00e5ff"
                fontSize={11}
              />
            )}
            <Tooltip contentStyle={customTooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="value"
              name={parameterName}
              stroke="#38bdf8"
              strokeWidth={2.5}
              isAnimationActive={false}
              dot={{ r: 4, fill: '#0284c7' }}
              activeDot={{ r: 6 }}
            />
            {hasSecondary && secondaryParameterName && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="secondaryValue"
                name={secondaryParameterName}
                stroke="#00e5ff"
                strokeWidth={2}
                isAnimationActive={false}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#00e5ff' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <svg className="w-full h-full" viewBox="0 0 600 240" fill="none">
          <line x1="40" y1="200" x2="560" y2="200" stroke="#334155" strokeWidth="1" />
          <line x1="40" y1="20" x2="40" y2="200" stroke="#334155" strokeWidth="1" />
          <polyline
            points="60,160 140,130 220,150 300,90 380,60 460,70 540,40"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
          />
          <circle cx="60" cy="160" r="4" fill="#0284c7" />
          <circle cx="140" cy="130" r="4" fill="#0284c7" />
          <circle cx="220" cy="150" r="4" fill="#0284c7" />
          <circle cx="300" cy="90" r="4" fill="#0284c7" />
          <circle cx="380" cy="60" r="4" fill="#0284c7" />
          <circle cx="460" cy="70" r="4" fill="#0284c7" />
          <circle cx="540" cy="40" r="4" fill="#0284c7" />
        </svg>
      )}
    </div>
  );
}
