export default function HeartbeatLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 40 H120 L140 10 L160 70 L180 20 L200 60 L220 40 H400"
        stroke="url(#heartbeatGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        style={{ animation: "dash 2.4s ease-in-out infinite" }}
      />
      <defs>
        <linearGradient id="heartbeatGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <style>{`
        @keyframes dash {
          0% { stroke-dashoffset: 1; }
          70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1; }
        }
      `}</style>
    </svg>
  );
}
