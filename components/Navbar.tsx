"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Moon, Sun, Menu, X, HeartPulse, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Prediction", href: "/disease-prediction" },
  { label: "Assistant", href: "/assistant" },
  { label: "Doctors", href: "/doctor" },
  { label: "Analytics", href: "/analytics" },
];

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "--";

  const toggleDark = () => {
    setDark((d) => !d);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/40 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-soft">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-bold text-gray-900 dark:text-white">LifeTwin AI</p>
            <p className="text-[10px] font-medium tracking-wide text-gray-500 dark:text-gray-400">
              AI DIGITAL TWIN FOR HUMAN HEALTH
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary dark:text-gray-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
          </button>
          <button
            aria-label="Toggle dark mode"
            onClick={toggleDark}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-primary/10 hover:text-primary"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link
            href="/health-profile"
            className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-primary to-accent p-[2px]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-xs font-bold text-primary dark:bg-slate-900 dark:text-accent">
              {initials}
            </div>
          </Link>
          {user && (
            <button
              aria-label="Log out"
              onClick={logout}
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
          <button
            className="rounded-full p-2 text-gray-500 hover:bg-primary/10 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/40 px-4 pb-4 pt-2 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-primary/5 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
