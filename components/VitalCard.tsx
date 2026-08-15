"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { VitalStat } from "@/types";

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 100;
  const h = 32;
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full">
      <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VitalCard({ stat, index }: { stat: VitalStat; index: number }) {
  const Icon = (Icons as any)[stat.icon] ?? Icons.Activity;
  const color = stat.status === "high" ? "#EF4444" : stat.status === "medium" ? "#F59E0B" : "#10B981";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <Badge status={stat.status}>
            {stat.status === "low" ? "Normal" : stat.status === "medium" ? "Watch" : "Alert"}
          </Badge>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stat.value}
            <span className="ml-1 text-sm font-medium text-gray-400">{stat.unit}</span>
          </p>
        </div>
        <Sparkline points={stat.trend} color={color} />
      </Card>
    </motion.div>
  );
}
