
import React from 'react';
import { QuantumReadiness } from '../types';

interface QuantumAnalysisPanelProps {
  analysis: QuantumReadiness;
}

export const QuantumAnalysisPanel: React.FC<QuantumAnalysisPanelProps> = ({ analysis }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resilient': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
      case 'Partial': return 'text-amber-400 border-amber-500/30 bg-amber-500/5';
      case 'Vulnerable': return 'text-rose-400 border-rose-500/30 bg-rose-500/5';
      default: return 'text-slate-400 border-slate-500/30 bg-slate-500/5';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 relative overflow-hidden group">
      {/* Neural Link Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-600/20 p-2 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Quantum-Safe <span className="text-cyan-400">Readiness</span></h3>
        </div>
        <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusColor(analysis.status)}`}>
          {analysis.status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-500">Post-Quantum Algorithm Depth</span>
              <span className="text-xs font-mono text-cyan-400">{analysis.score}% Match</span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-500 transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
            <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-2">Algorithm Detection</h4>
            <p className="text-sm text-slate-200 font-mono leading-relaxed">{analysis.postQuantumAlgorithmStatus}</p>
          </div>
        </div>

        <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 space-y-4">
          <div>
            <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-widest">NIST Compliance Note</h4>
            <p className="text-xs text-slate-400 leading-relaxed italic">{analysis.technicalDetails}</p>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-[10px] uppercase font-bold text-cyan-500 mb-1 tracking-widest">Post-Quantum Strategy</h4>
            <p className="text-sm text-slate-200 leading-relaxed font-semibold">{analysis.mitigationStrategy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
