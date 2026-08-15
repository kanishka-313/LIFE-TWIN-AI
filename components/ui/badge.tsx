import * as React from "react";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-red-100 text-red-700 border-red-200",
  info: "bg-blue-100 text-blue-700 border-blue-200",
};

export function Badge({
  status = "info",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { status?: "low" | "medium" | "high" | "info" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        statusStyles[status],
        className
      )}
      {...props}
    />
  );
}
