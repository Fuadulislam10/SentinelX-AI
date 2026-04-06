
import React, { useState, useEffect } from 'react';

const THREATS = [
  "Ransomware activity detected in Northern Europe - Variant: LockBit 3.0",
  "Zero-day exploit detected in major browser core - CVE-2026-X42",
  "Unusual traffic patterns observed in AWS us-east-1 region",
  "Phishing campaign targeting high-value financial institutions",
  "SentinelX AI successfully mitigated lateral movement attempt on Node-12",
  "Massive DDoS attack against critical infrastructure neutralized",
  "New IoT botnet 'Astra' spreading via telnet/SSH vulnerabilities",
  "Quantum-ready encryption protocol successfully deployed on Mainnet",
];

export const LiveThreatFeed: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % THREATS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-950 border-y border-slate-800 py-1.5 px-6 overflow-hidden flex items-center space-x-4">
      <div className="flex items-center space-x-2 shrink-0">
        <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
        <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Global Feed</span>
      </div>
      <div className="flex-1 relative h-4 overflow-hidden">
        {THREATS.map((threat, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center ${
              index === i ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <span className="text-[10px] font-mono text-slate-500 truncate">
              {threat}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4 shrink-0">
        <span className="text-[9px] font-bold text-slate-700 uppercase tracking-tighter">API V2.5 Stable</span>
        <div className="h-3 w-px bg-slate-800"></div>
        <span className="text-[9px] font-mono text-indigo-500">{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};
