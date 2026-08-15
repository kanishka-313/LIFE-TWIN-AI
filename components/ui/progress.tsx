import * as React from "react";
import { cn } from "@/lib/utils";

const barColor: Record<string, string> = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

export function Progress({
  value,
  level = "low",
  className,
}: {
  value: number;
  level?: "low" | "medium" | "high";
  className?: string;
}) {
  return (
    <div className={cn("h-2 w-full rounded-full bg-gray-100 overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700", barColor[level])}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}
