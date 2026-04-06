
import React from 'react';
import { AttackSurfaceMap } from '../types';

interface AttackSurfaceMapperProps {
  mapper: AttackSurfaceMap;
}

export const AttackSurfaceMapper: React.FC<AttackSurfaceMapperProps> = ({ mapper }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8">
      <div className="flex items-center space-x-3 mb-2">
        <div className="bg-amber-600/20 p-2 rounded-lg">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.488V5.512a2 2 0 011.553-1.944L9 2l5.447 2.724A2 2 0 0116 6.669V16.669a2 2 0 01-1.553 1.944L9 20z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">SentinelX Attack Surface Mapper</h3>
      </div>

      <div className="prose prose-invert prose-sm max-w-none text-slate-400">
        <p className="italic border-l-2 border-amber-500/50 pl-4">
          {mapper.discoverySummary}
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Passively Discovered Assets</h4>
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Asset Path / ID</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Classification</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Strategic Risk Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mapper.assets.map((asset, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-colors group">
                  <td className="px-4 py-3 text-sm font-mono text-amber-400/80 group-hover:text-amber-400">{asset.path}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-slate-800 text-[10px] rounded border border-slate-700 text-slate-300">
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400 leading-relaxed">
                    {asset.riskNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Defender's Perimeter Strategy</h4>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              {mapper.defensiveStrategy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
