
import React from 'react';
import { ThreatScenario } from '../types';

interface ThreatModelProps {
  threatModel: {
    scenarios: ThreatScenario[];
    primaryThreatActors: string[];
  };
}

export const ThreatModelSection: React.FC<ThreatModelProps> = ({ threatModel }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8">
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Conceptual Threat Model</span>
        </h3>

        <div className="space-y-6">
          {threatModel.scenarios.map((scenario, idx) => (
            <div key={idx} className="relative pl-6 border-l-2 border-slate-800 hover:border-rose-500/50 transition-colors">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-800"></div>
              <h4 className="text-md font-bold text-slate-200 mb-2">{scenario.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">
                {scenario.riskFlow}
              </p>
              <div className="flex flex-wrap gap-2">
                {scenario.connectedFindings.map((finding, i) => (
                  <span key={i} className="text-[10px] bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded border border-rose-500/20">
                    {finding}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Relevant Threat Actors</h3>
        <div className="flex flex-wrap gap-3">
          {threatModel.primaryThreatActors.map((actor, idx) => (
            <div key={idx} className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 text-sm text-slate-300 flex items-center space-x-2">
              <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>{actor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
