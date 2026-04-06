
import React, { useState } from 'react';
import { SecurityFinding, Severity } from '../types';

interface FindingCardProps {
  finding: SecurityFinding;
}

export const FindingCard: React.FC<FindingCardProps> = ({ finding }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityColors = {
    [Severity.LOW]: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    [Severity.MEDIUM]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    [Severity.HIGH]: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all hover:border-slate-700 shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 flex items-center justify-between group"
      >
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border rounded-full ${severityColors[finding.severity]}`}>
            {finding.severity}
          </span>
          <h4 className="text-lg font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
            {finding.name}
          </h4>
        </div>
        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2 space-y-8 animate-in slide-in-from-top-2 duration-300">
          {/* Analysis Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
                <svg className="w-3 h-3 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Analysis
              </h5>
              <p className="text-slate-300 text-sm leading-relaxed">{finding.description}</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
                <svg className="w-3 h-3 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Potential Impact
              </h5>
              <p className="text-slate-300 text-sm leading-relaxed">{finding.impact}</p>
            </div>
          </div>

          {/* Educational Lab Section */}
          {finding.educationalContent && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-emerald-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.285a2 2 0 01-1.963 0l-.628-.285a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547V18a2 2 0 002 2h11a2 2 0 002-2v-2.572zM12 11V3.5l3-2h-6l3 2V11" />
                </svg>
                <h5 className="text-sm font-bold uppercase tracking-widest">Architectural Insights</h5>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Core Concept & Analogy */}
                <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div>
                    <h6 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Technical Core</h6>
                    <p className="text-xs text-slate-300 leading-relaxed">{finding.educationalContent.concept}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800">
                    <h6 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Real-World Analogy</h6>
                    <p className="text-xs text-slate-400 italic leading-relaxed">"{finding.educationalContent.analogy}"</p>
                  </div>
                </div>

                {/* Secure-by-Design & Mistakes */}
                <div className="space-y-4">
                  {/* Secure-by-Design Section */}
                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 group/design">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover/design:bg-indigo-500 group-hover/design:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h6 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Secure-by-Design Principle</h6>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {finding.educationalContent.secureByDesignPrinciple}
                    </p>
                  </div>

                  {/* Common Developer Mistake Section */}
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 group/mistake">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-1.5 bg-rose-500/20 rounded-lg text-rose-400 group-hover/mistake:bg-rose-500 group-hover/mistake:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h6 className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Common Developer Mistake</h6>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {finding.educationalContent.commonMistake}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="space-y-1">
              <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Conceptual Misuse Flow</h5>
              <p className="text-slate-400 text-sm italic">{finding.exploitationConcept}</p>
            </div>
            
            <div className="space-y-1 pt-4 border-t border-slate-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Security Hardening Guidance</h5>
              <p className="text-slate-100 text-sm font-semibold">{finding.remediation}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Confidence</span>
                <span className="text-xs font-mono font-black text-slate-400">{finding.confidence}</span>
              </div>
              <div className="w-px h-3 bg-slate-800"></div>
              <div className="flex items-center space-x-1">
                <span className="text-[10px] font-mono text-indigo-400/70">{finding.owaspReference}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
