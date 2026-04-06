
import React from 'react';
import { InfrastructureInsight } from '../types';

interface InfrastructurePanelProps {
  insight: InfrastructureInsight;
  resolvedIp?: string;
}

export const InfrastructurePanel: React.FC<InfrastructurePanelProps> = ({ insight, resolvedIp }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-600/20 p-2 rounded-lg border border-indigo-500/30">
          <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">Infrastructure Insights</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Resolved IP Address</span>
          <div className="text-lg font-mono text-indigo-400">{resolvedIp || 'N/A'}</div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Hosting Classification</span>
          <div className="text-sm text-slate-200">{insight.hostingType}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Reputation & Risks</h4>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50 space-y-3">
             <div>
               <span className="text-[10px] text-slate-600 font-bold uppercase block">IP Reputation</span>
               <p className="text-xs text-slate-400">{insight.ipReputation}</p>
             </div>
             <div>
               <span className="text-[10px] text-slate-600 font-bold uppercase block">Geographic Risk</span>
               <p className="text-xs text-slate-400">{insight.geolocationRisk}</p>
             </div>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Network Topology</h4>
          <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-800/50 h-full">
            <p className="text-xs text-slate-400 leading-relaxed italic">
              {insight.networkTopologyNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
