
import React from 'react';
import { SHA512AnalysisReport } from '../types';

interface SHA512IntegrityPanelProps {
  analysis: SHA512AnalysisReport;
}

export const SHA512IntegrityPanel: React.FC<SHA512IntegrityPanelProps> = ({ analysis }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg className="w-24 h-24 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 11V3.5l3-2h-6l3 2V11m6 0v1a6 6 0 01-6 6H6a6 6 0 01-6-6v-1m18 0H0" />
        </svg>
      </div>

      <div className="flex items-center space-x-3">
        <div className="bg-emerald-600/20 p-2 rounded-lg border border-emerald-500/30">
          <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">SHA512 Integrity Fingerprint</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Confidence Score</span>
          <div className="flex items-center space-x-2">
             <span className="text-2xl font-mono text-emerald-400">{analysis.implementationConfidence}%</span>
             <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${analysis.implementationConfidence}%` }}></div>
             </div>
          </div>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Hashing Strategy</span>
          <span className="text-sm text-slate-200 font-medium truncate block">{analysis.hashingStrategy}</span>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Collision Resistance</span>
          <span className="text-sm text-emerald-500 font-bold truncate block">{analysis.collisionResistance}</span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Technical Analysis</h4>
        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/40">
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {analysis.technicalDeepDive}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/50">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Hardening Recommendations</h4>
        <div className="flex flex-wrap gap-2">
          {analysis.recommendations.map((rec, idx) => (
            <span key={idx} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-400 rounded-lg">
              {rec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
