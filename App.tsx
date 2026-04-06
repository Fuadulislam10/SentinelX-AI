
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScanForm } from './components/ScanForm';
import { Dashboard } from './components/Dashboard';
import { FindingCard } from './components/FindingCard';
import { InsightPanel } from './components/InsightPanel';
import { ArchitectureSurface } from './components/ArchitectureSurface';
import { ThreatModelSection } from './components/ThreatModelSection';
import { RemediationRoadmap } from './components/RemediationRoadmap';
import { RiskReasoningEngine } from './components/RiskReasoningEngine';
import { AttackSurfaceMapper } from './components/AttackSurfaceMapper';
import { SHA512IntegrityPanel } from './components/SHA512IntegrityPanel';
import { InfrastructurePanel } from './components/InfrastructurePanel';
import { QuantumAnalysisPanel } from './components/QuantumAnalysisPanel';
import { LiveThreatFeed } from './components/LiveThreatFeed';
import { MentorAI } from './components/MentorAI';
import { performSecurityScan } from './services/geminiService';
import { ScanResult, ScanOptions } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  const handleScan = async (options: ScanOptions) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setScanLogs(["[SYSTEM] Initializing SentinelX Neural Core..."]);

    const logSequence = [
      "[AUTH] Validating session permissions...",
      "[DNS] Resolving target infrastructure fingerprints...",
      "[SCAN] Mapping passive attack surface...",
      "[INTEGRITY] Analyzing SHA512 subresource chains...",
      "[QUANTUM] Checking post-quantum resilience...",
      "[REASONING] Activating Risk Correlation Engine...",
      "[AI] Consulting Secure-by-Design knowledge base...",
      "[REPORT] Synthesizing remediation roadmap..."
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logSequence.length) {
        const nextLog = logSequence[logIndex];
        if (nextLog) {
          setScanLogs(prev => [...prev, nextLog]);
        }
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 1000);

    try {
      const data = await performSecurityScan(options);
      clearInterval(logInterval);
      setScanLogs(prev => [...prev, "[SUCCESS] Analysis complete. Rendering dashboard..."]);
      setTimeout(() => {
        setResult(data);
        setIsLoading(false);
      }, 800);
    } catch (err: any) {
      clearInterval(logInterval);
      setError(err.message || 'An unexpected error occurred during the scan.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-indigo-500/30 bg-[#070b14]">
      <LiveThreatFeed />
      <Header />
      
      <main className="max-w-6xl mx-auto px-4">
        {!result && !isLoading && (
          <div className="py-20 text-center space-y-6">
            <h2 className="text-6xl font-black text-white tracking-tighter">
              Secure the <span className="text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">Next Era</span> of Web
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              SentinelX AI v4.0. Using neural reasoning to audit architectures for the threats of 2026, 
              including advanced passive discovery and quantum readiness.
            </p>
          </div>
        )}

        <ScanForm onScan={handleScan} isLoading={isLoading} />

        {error && (
          <div className="mt-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-center flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {isLoading && (
          <div className="mt-16 space-y-8 animate-in fade-in duration-500">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono text-sm overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600 animate-pulse"></div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="ml-4 text-slate-500 text-xs uppercase font-bold tracking-widest">sentinelx-core v4.2.0 -- neural_analysis_active</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
                {scanLogs.map((log, i) => (
                  <div key={i} className={`flex items-start space-x-2 ${log && log.startsWith('[SUCCESS]') ? 'text-emerald-400' : 'text-slate-400'}`}>
                    <span className="text-indigo-500/50 shrink-0">➜</span>
                    <span className="animate-in fade-in slide-in-from-left-2 duration-300">{log}</span>
                  </div>
                ))}
                {!error && (
                  <div className="flex items-center space-x-2 text-indigo-400">
                    <span className="text-indigo-500/50">➜</span>
                    <span className="w-2 h-4 bg-indigo-500 animate-pulse"></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-12 pb-20">
            <Dashboard result={result} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SHA512IntegrityPanel analysis={result.sha512Analysis} />
              <QuantumAnalysisPanel analysis={result.quantumReadiness} />
            </div>

            <InfrastructurePanel insight={result.infrastructure} resolvedIp={result.resolvedIp} />

            <RiskReasoningEngine reasoning={result.riskReasoning} />

            <AttackSurfaceMapper mapper={result.attackSurfaceMap} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ArchitectureSurface architecture={result.architecture} />
              <ThreatModelSection threatModel={result.threatModel} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Analysis Findings</span>
                </h3>
                <span className="text-slate-500 text-sm font-mono">{result.findings.length} points detected</span>
              </div>
              
              <div className="space-y-4">
                {result.findings.map((finding, idx) => (
                  <FindingCard key={idx} finding={finding} />
                ))}
              </div>
            </div>

            <RemediationRoadmap steps={result.remediationRoadmap} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InsightPanel 
                variant="learning"
                title="Educational Insight" 
                content={result.learningInsight} 
              />
              <InsightPanel 
                variant="sentinel"
                title="SentinelX Perspective" 
                content={result.sentinelXInsight} 
              />
            </div>

            <div className="mt-12 p-8 bg-slate-900 border border-slate-800 rounded-2xl">
              <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Ethical Use Disclaimer</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                SentinelX AI results are based on heuristic analysis and simulated security patterns. 
                This tool is intended for educational and authorized testing environments only. 
                Passive scanning may still trigger security alarms on some systems. 
                Always ensure you have explicit permission before scanning any systems you do not own. 
              </p>
            </div>
          </div>
        )}
      </main>

      {result && <MentorAI scanResult={result} />}

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 py-3 px-6 text-center z-50">
        <p className="text-xs text-slate-500 flex items-center justify-center space-x-2">
          <span>&copy; 2026 SentinelX AI</span>
          <span>&bull;</span>
          <span className="text-indigo-400 font-medium italic">Security through understanding.</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
