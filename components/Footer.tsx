import Link from "next/link";
import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/40 bg-white/60 py-10 backdrop-blur-xl dark:bg-slate-950/60 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
            <HeartPulse className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">LifeTwin AI</span>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Predict. Prevent. Protect.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
          <Link href="#" className="hover:text-primary">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary">Terms</Link>
          <Link href="#" className="hover:text-primary">Support</Link>
          <Link href="#" className="hover:text-primary">Contact</Link>
        </div>
        <p className="text-xs text-gray-400">© 2026 LifeTwin AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
