
import React, { useMemo, useState } from 'react';
import { RiskReasoning, RiskCorrelation } from '../types';

interface RiskReasoningEngineProps {
  reasoning: RiskReasoning;
}

const CorrelationGraph: React.FC<{ correlation: RiskCorrelation }> = ({ correlation }) => {
  const [activeFinding, setActiveFinding] = useState<number | null>(null);
  const findingCount = correlation.findings.length;
  
  // Layout Constants
  const itemHeight = 54;
  const graphWidth = 240;
  const svgHeight = Math.max(200, findingCount * itemHeight + 60);
  const centerY = svgHeight / 2;
  const processorX = graphWidth / 2;

  const paths = useMemo(() => {
    return correlation.findings.map((_, index) => {
      const startY = (index * itemHeight) + (centerY - ((findingCount - 1) * itemHeight) / 2);
      // Path 1: Finding to Processor (S-Curve)
      const toProcessor = `M 0,${startY} C ${processorX * 0.4},${startY} ${processorX * 0.6},${centerY} ${processorX},${centerY}`;
      // Path 2: Processor to Outcome (Convergence)
      const toOutcome = `M ${processorX},${centerY} L ${graphWidth},${centerY}`;
      return { toProcessor, toOutcome, startY };
    });
  }, [findingCount, centerY, processorX, graphWidth]);

  return (
    <div className="relative bg-slate-950 border border-slate-800/80 rounded-[2rem] p-10 overflow-hidden group transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Immersive Background Shaders */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>
      
      <div className="relative flex flex-col space-y-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Source Findings Column */}
          <div className="flex flex-col space-y-4 w-full lg:w-80 z-10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Atomic Indicators</h4>
            </div>
            {correlation.findings.map((finding, idx) => (
              <div 
                key={idx} 
                onMouseEnter={() => setActiveFinding(idx)}
                onMouseLeave={() => setActiveFinding(null)}
                className={`flex items-center space-x-4 px-5 py-4 rounded-2xl border transition-all duration-500 cursor-default backdrop-blur-md ${
                  activeFinding === idx 
                    ? 'bg-indigo-500/10 border-indigo-500/50 scale-[1.02] shadow-lg shadow-indigo-500/5' 
                    : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className={`flex-shrink-0 w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                  activeFinding === idx ? 'bg-indigo-400 border-indigo-300 scale-125 shadow-[0_0_10px_rgba(129,140,248,0.8)]' : 'bg-slate-800 border-slate-700'
                }`}></div>
                <span className={`text-xs font-mono leading-relaxed transition-colors duration-500 ${
                  activeFinding === idx ? 'text-white' : 'text-slate-400'
                }`} title={finding}>
                  {finding}
                </span>
              </div>
            ))}
          </div>

          {/* Logic Flow Visualization */}
          <div className="hidden lg:block relative z-0" style={{ width: graphWidth, height: svgHeight }}>
            <svg width={graphWidth} height={svgHeight} viewBox={`0 0 ${graphWidth} ${svgHeight}`} fill="none" className="overflow-visible">
              <defs>
                <linearGradient id={`grad-${activeFinding}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
                </linearGradient>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Connection Paths */}
              {paths.map((p, i) => {
                const isActive = activeFinding === i || activeFinding === null;
                return (
                  <g key={i} className="transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0.15 }}>
                    <path 
                      d={p.toProcessor} 
                      stroke={activeFinding === i ? `url(#grad-${activeFinding})` : '#334155'} 
                      strokeWidth={activeFinding === i ? "2.5" : "1.5"} 
                      fill="none"
                      className="transition-all duration-500"
                    />
                    <circle r={activeFinding === i ? "4" : "2.5"} fill={activeFinding === i ? "#818cf8" : "#475569"} filter={activeFinding === i ? "url(#neonGlow)" : ""}>
                      <animateMotion dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" path={p.toProcessor} />
                    </circle>
                  </g>
                );
              })}
              
              {/* Central Processing Core */}
              <g transform={`translate(${processorX}, ${centerY})`}>
                <circle r="24" className="fill-slate-950 stroke-indigo-500/40" strokeWidth="2" />
                <circle r="18" className={`transition-all duration-500 ${activeFinding !== null ? 'fill-indigo-500/30' : 'fill-slate-900'}`} />
                <path d="M-8,-8 L8,8 M-8,8 L8,-8" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" className={activeFinding !== null ? 'animate-pulse' : ''} />
                
                {/* Rotating HUD Rings */}
                <circle r="32" className="stroke-indigo-500/10 fill-none" strokeWidth="1" strokeDasharray="4 8">
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="15s" repeatCount="indefinite" />
                </circle>
                <circle r="38" className="stroke-indigo-500/5 fill-none" strokeWidth="1" strokeDasharray="2 12">
                  <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="25s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Aggregated Output Flow */}
              <path 
                d={`M ${processorX},${centerY} L ${graphWidth},${centerY}`} 
                stroke="#f43f5e" 
                strokeWidth="3" 
                strokeDasharray="8 4" 
                className={`transition-opacity duration-500 ${activeFinding !== null ? 'opacity-100' : 'opacity-40'}`} 
              />
              <circle r="5" fill="#f43f5e" filter="url(#neonGlow)" className={activeFinding !== null ? 'opacity-100' : 'opacity-0'}>
                <animateMotion dur="1s" repeatCount="indefinite" path={`M ${processorX},${centerY} L ${graphWidth},${centerY}`} />
              </circle>
            </svg>
          </div>

          {/* High-Level Risk Outcome Card */}
          <div className="w-full lg:w-96 z-10">
            <div className={`relative p-8 rounded-[2.5rem] border transition-all duration-700 shadow-2xl backdrop-blur-xl ${
              activeFinding !== null 
                ? 'bg-rose-500/20 border-rose-500/50 scale-[1.05] -translate-y-1' 
                : 'bg-gradient-to-br from-rose-500/10 to-transparent border-rose-500/20'
            }`}>
              <div className="absolute -top-4 left-8 px-4 py-1.5 bg-rose-600 text-[11px] font-black text-white rounded-full uppercase tracking-[0.25em] shadow-xl shadow-rose-900/40 animate-in fade-in slide-in-from-top-2">
                Critical Synthesis
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-5">
                  <div className={`p-4 rounded-2xl ring-1 ring-rose-500/30 transition-all duration-700 ${
                    activeFinding !== null ? 'bg-rose-500 text-white scale-110 rotate-3' : 'bg-rose-500/20 text-rose-500'
                  }`}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xl font-black text-white leading-tight">
                      {correlation.outcome}
                    </h5>
                    <p className="text-[10px] text-rose-400 font-black uppercase tracking-[0.2em] mt-1">Vulnerability Vector</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neural Logic Explanation */}
        <div className="relative overflow-hidden p-8 bg-slate-900/40 border border-slate-800/60 rounded-[1.5rem] backdrop-blur-md group-hover:border-slate-700/80 transition-all duration-500">
          <div className="flex items-start space-x-5">
            <div className="mt-1 bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 flex-shrink-0">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.2em]">Heuristic Chain Analysis</p>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {correlation.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RiskReasoningEngine: React.FC<RiskReasoningEngineProps> = ({ reasoning }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-[3rem] p-12 lg:p-16 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]">
      {/* Dynamic Engine Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-800/50 pb-12">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-slate-950 p-6 rounded-[1.5rem] border border-indigo-500/40 shadow-[0_10px_30px_rgba(99,102,241,0.2)]">
              <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-black text-white tracking-tighter flex items-center">
              Risk Reasoning <span className="text-indigo-500 ml-3">Engine</span>
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="px-3 py-1 bg-emerald-500/10 text-[10px] font-black text-emerald-400 border border-emerald-500/20 rounded-lg uppercase tracking-widest">Active Core</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
              <span className="text-[11px] text-slate-500 font-mono tracking-tighter uppercase font-bold">Sentinel Protocol v4.20-X</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-3">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Heuristic Processing Integrity</span>
          <div className="flex space-x-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`w-8 h-1.5 rounded-full transition-all duration-700 ${i < 8 ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative Synthesis Section */}
      <div className="relative group mx-auto max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-slate-800/10 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl"></div>
        <div className="relative px-12 py-10 bg-slate-950/80 border border-slate-800 rounded-[2rem] backdrop-blur-2xl shadow-inner">
          <div className="absolute top-0 left-12 -translate-y-1/2 px-4 py-1 bg-slate-800 border border-slate-700 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Executive Summary
          </div>
          <p className="text-slate-200 text-xl leading-relaxed italic font-light font-serif text-center">
            "{reasoning.engineSummary}"
          </p>
        </div>
      </div>

      {/* Aggregated Visual Correlation Graphs */}
      <div className="grid grid-cols-1 gap-12">
        {reasoning.correlations.map((correlation, idx) => (
          <CorrelationGraph key={idx} correlation={correlation} />
        ))}
      </div>
      
      {/* Defensive Strategic Footer */}
      <div className="pt-12 border-t border-slate-800/50">
        <div className="flex items-center space-x-6 bg-slate-950/40 p-6 lg:p-8 rounded-[2rem] border border-slate-800/50 hover:bg-slate-950/60 transition-all duration-500">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Architectural Forensics Note</h4>
            <p className="text-sm text-slate-500 italic leading-relaxed font-medium">
              Correlation graphs map complex logical dependencies. While individual findings may seem localized, their combined resonance often defines the true attack surface. SentinelX identifies these higher-order relationships by analyzing passive component fingerprints against known adversarial logic chains.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
