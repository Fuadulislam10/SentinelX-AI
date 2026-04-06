
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ScanResult } from '../types';

interface DashboardProps {
  result: ScanResult;
}

export const Dashboard: React.FC<DashboardProps> = ({ result }) => {
  const chartData = [
    { name: 'High', value: result.summary.high, color: '#ef4444' },
    { name: 'Medium', value: result.summary.medium, color: '#f59e0b' },
    { name: 'Low', value: result.summary.low, color: '#10b981' },
  ];

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-emerald-500';
    if (score < 70) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Risk Score Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center">
        <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">Overall Risk Score</h3>
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-800"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={364}
              strokeDashoffset={364 - (364 * result.overallRiskScore) / 100}
              className={`${getRiskColor(result.overallRiskScore)} transition-all duration-1000 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-4xl font-bold ${getRiskColor(result.overallRiskScore)}`}>
              {result.overallRiskScore}
            </span>
          </div>
        </div>
        <p className="mt-4 text-slate-400 text-sm text-center italic leading-tight">
          AI-calculated risk based on {result.findings.length} findings and integrity analysis.
        </p>
      </div>

      {/* Summary Chart Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center">
        <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">Finding Distribution</h3>
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex space-x-4 mt-2">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs text-slate-400">{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Summary Text Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col h-full">
        <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">Security Snapshot</h3>
        <div className="flex-1 space-y-4">
          <p className="text-slate-200 leading-relaxed text-sm">
            {result.humanSummary}
          </p>
          <div className="pt-4 border-t border-slate-800 space-y-2">
             <div className="flex items-center text-[10px] font-mono text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse mr-2 flex-shrink-0"></span> 
                <span className="uppercase mr-1 font-bold">Target:</span> {result.target}
             </div>
             {result.resolvedIp && (
               <div className="flex items-center text-[10px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 flex-shrink-0"></span> 
                  <span className="uppercase mr-1 font-bold">IP ADDR:</span> {result.resolvedIp}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
