
import React from 'react';

interface RemediationRoadmapProps {
  steps: string[];
}

export const RemediationRoadmap: React.FC<RemediationRoadmapProps> = ({ steps }) => {
  return (
    <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-2xl p-8">
      <h3 className="text-xl font-bold text-indigo-400 mb-6 flex items-center space-x-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span>Security Hardening Roadmap</span>
      </h3>
      
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start space-x-4 group">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm group-hover:bg-indigo-500 group-hover:text-white transition-all">
              {idx + 1}
            </div>
            <div className="pt-1">
              <p className="text-slate-200 text-sm leading-relaxed font-medium">
                {step}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
