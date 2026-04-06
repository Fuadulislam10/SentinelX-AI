
import React from 'react';

interface InsightPanelProps {
  title: string;
  content: string;
  variant: 'learning' | 'sentinel';
}

export const InsightPanel: React.FC<InsightPanelProps> = ({ title, content, variant }) => {
  const styles = {
    learning: 'border-emerald-500/20 bg-emerald-500/5',
    sentinel: 'border-indigo-500/20 bg-indigo-500/5',
  };

  const textStyles = {
    learning: 'text-emerald-400',
    sentinel: 'text-indigo-400',
  };

  return (
    <div className={`p-8 rounded-2xl border ${styles[variant]} space-y-4`}>
      <div className="flex items-center space-x-3">
        {variant === 'learning' ? (
          <svg className={`w-6 h-6 ${textStyles[variant]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ) : (
          <svg className={`w-6 h-6 ${textStyles[variant]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
        <h3 className={`text-xl font-bold ${textStyles[variant]}`}>{title}</h3>
      </div>
      <p className="text-slate-300 leading-relaxed italic">
        {content}
      </p>
    </div>
  );
};
