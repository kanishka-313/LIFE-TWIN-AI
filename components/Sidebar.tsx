"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UserRound,
  Watch,
  Stethoscope,
  Bot,
  Siren,
  ClipboardList,
  LineChart,
  Settings,
  Sparkles,
} from "lucide-react";

const items = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Health Profile", href: "/health-profile", icon: UserRound },
  { label: "Devices", href: "/wearables", icon: Watch },
  { label: "AI Digital Twin", href: "/digital-twin", icon: Sparkles },
  { label: "Disease Prediction", href: "/disease-prediction", icon: Stethoscope },
  { label: "AI Assistant", href: "/assistant", icon: Bot },
  { label: "Emergency", href: "/emergency", icon: Siren },
  { label: "Doctor Dashboard", href: "/doctor", icon: ClipboardList },
  { label: "Analytics", href: "/analytics", icon: LineChart },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 shrink-0 flex-col gap-1 overflow-y-auto border-r border-white/40 glass p-4 lg:flex">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all",
              active
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-soft"
                : "text-gray-600 hover:bg-primary/5 hover:text-primary dark:text-gray-300"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
