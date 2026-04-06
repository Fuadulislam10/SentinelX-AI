
import React from 'react';
import { ArchitectureComponent } from '../types';

interface ArchitectureSurfaceProps {
  architecture: {
    components: ArchitectureComponent[];
    attackSurface: string[];
  };
}

export const ArchitectureSurface: React.FC<ArchitectureSurfaceProps> = ({ architecture }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8">
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>Conceptual Architecture</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {architecture.components.map((comp, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-100">{comp.name}</h4>
                <span className="text-[10px] uppercase tracking-tighter bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                  {comp.type}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {comp.indicators.map((ind, i) => (
                  <span key={i} className="text-[10px] font-mono text-cyan-400/70">
                    &gt; {ind}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Exposed Attack Surface</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {architecture.attackSurface.map((item, idx) => (
            <li key={idx} className="flex items-center space-x-2 text-sm text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
