'use client';

import React, { useEffect, useState } from 'react';

interface StatCounterProps {
  target: number;
  suffix?: string;
  durationMs?: number;
  decimals?: number;
}

export function StatCounter({ target, suffix = '+', durationMs = 1800, decimals = 0 }: StatCounterProps) {
  const [count, setCount] = useState(target);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * target;

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, durationMs]);

  const formatted = decimals > 0 
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span>
      {formatted}{suffix}
    </span>
  );
}
