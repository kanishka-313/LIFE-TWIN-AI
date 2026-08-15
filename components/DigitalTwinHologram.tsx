"use client";

import { motion } from "framer-motion";

export default function DigitalTwinHologram({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className={`relative mx-auto ${compact ? "h-72 w-56" : "h-[420px] w-72"} flex items-center justify-center`}>
      {/* glow aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/40 to-accent/40 blur-3xl animate-glowPulse" />

      {/* human silhouette built from simple shapes */}
      <motion.svg
        viewBox="0 0 200 400"
        className="relative z-10 h-full drop-shadow-[0_0_25px_rgba(16,185,129,0.55)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <defs>
          <linearGradient id="bodyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        {/* head */}
        <circle cx="100" cy="45" r="28" fill="url(#bodyGradient)" opacity="0.85" />
        {/* torso */}
        <path
          d="M60 80 Q100 70 140 80 L150 210 Q100 230 50 210 Z"
          fill="url(#bodyGradient)"
          opacity="0.7"
        />
        {/* arms */}
        <path d="M60 90 L25 180 L38 190 L70 110 Z" fill="url(#bodyGradient)" opacity="0.6" />
        <path d="M140 90 L175 180 L162 190 L130 110 Z" fill="url(#bodyGradient)" opacity="0.6" />
        {/* legs */}
        <path d="M70 215 L55 380 L78 380 L95 225 Z" fill="url(#bodyGradient)" opacity="0.6" />
        <path d="M130 215 L145 380 L122 380 L105 225 Z" fill="url(#bodyGradient)" opacity="0.6" />
        {/* heart pulse marker */}
        <circle cx="100" cy="140" r="9" fill="#fff" className="animate-heartbeat" style={{ transformOrigin: "100px 140px" }} />
        <circle cx="100" cy="140" r="16" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" className="animate-heartbeat" style={{ transformOrigin: "100px 140px" }} />
        {/* scan lines */}
        <line x1="20" y1="120" x2="180" y2="120" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="20" y1="220" x2="180" y2="220" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="20" y1="320" x2="180" y2="320" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
      </motion.svg>

      {/* orbiting particles */}
      <div className="absolute h-full w-full animate-float">
        <span className="absolute left-2 top-8 h-2 w-2 rounded-full bg-accent shadow-glow" />
        <span className="absolute right-4 top-24 h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
        <span className="absolute bottom-12 left-6 h-2 w-2 rounded-full bg-accent shadow-glow" />
      </div>
    </div>
  );
}
