
import React, { useState } from 'react';
import { ScanOptions, CustomModules } from '../types';

interface ScanFormProps {
  onScan: (options: ScanOptions) => void;
  isLoading: boolean;
}

export const ScanForm: React.FC<ScanFormProps> = ({ onScan, isLoading }) => {
  const [url, setUrl] = useState('');
  const [targetIp, setTargetIp] = useState('');
  const [depth, setDepth] = useState<'low' | 'medium' | 'high'>('low');
  const [shaDepth, setShaDepth] = useState<'standard' | 'deep' | 'forensic'>('standard');
  const [learningMode, setLearningMode] = useState(true);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [ipError, setIpError] = useState<string | null>(null);
  const [showCustomOptions, setShowCustomOptions] = useState(false);

  const [modules, setModules] = useState<CustomModules>({
    cookieAnalysis: true,
    headerAnalysis: true,
    integrityAnalysis: true,
    attackSurfaceMapping: true,
    infrastructureAnalysis: true,
    quantumReadiness: true,
  });

  const validateUrl = (input: string) => {
    // Basic URL pattern that allows domain with or without protocol
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,63})(:[0-9]+)?(\/.*)?$/i;
    return urlPattern.test(input.trim());
  };

  const validateIp = (input: string) => {
    if (!input) return true; // Optional field
    const ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    return ipv4Pattern.test(input.trim()) || ipv6Pattern.test(input.trim());
  };

  const toggleModule = (module: keyof CustomModules) => {
    setModules(prev => ({ ...prev, [module]: !prev[module] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError(null);
    setIpError(null);

    const trimmedUrl = url.trim();
    const trimmedIp = targetIp.trim();

    let hasError = false;

    if (!trimmedUrl) {
      setUrlError('Please enter a target URL.');
      hasError = true;
    } else if (!validateUrl(trimmedUrl)) {
      setUrlError('Please enter a valid website URL (e.g., example.com).');
      hasError = true;
    }

    if (trimmedIp && !validateIp(trimmedIp)) {
      setIpError('Please enter a valid IPv4 or IPv6 address.');
      hasError = true;
    }

    if (hasError) return;
    
    let formattedUrl = trimmedUrl;
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    onScan({ 
      url: formattedUrl, 
      targetIp: targetIp.trim() || undefined,
      depth, 
      shaAnalysisDepth: shaDepth,
      learningMode,
      customModules: modules
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="url" className="block text-sm font-semibold text-slate-300 mb-2">Target Website URL</label>
            <div className="relative">
              <input
                id="url"
                type="text"
                className={`w-full bg-slate-950 border ${urlError ? 'border-rose-500/50 ring-1 ring-rose-500/20' : 'border-slate-700'} rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600`}
                placeholder="e.g., example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError(null);
                }}
                disabled={isLoading}
              />
              {isLoading && (
                <div className="absolute right-3 top-3">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {urlError ? (
              <p className="mt-2 text-xs text-rose-400 font-medium flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {urlError}
              </p>
            ) : (
              <p className="mt-2 text-xs text-slate-500 italic">Example: scan-me.edu, my-app.internal.com</p>
            )}
          </div>

          <div>
            <label htmlFor="ip" className="block text-sm font-semibold text-slate-300 mb-2">Target IP (Optional)</label>
            <input
              id="ip"
              type="text"
              className={`w-full bg-slate-950 border ${ipError ? 'border-rose-500/50 ring-1 ring-rose-500/20' : 'border-slate-700'} rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 font-mono text-sm`}
              placeholder="e.g., 192.168.1.10"
              value={targetIp}
              onChange={(e) => {
                setTargetIp(e.target.value);
                if (ipError) setIpError(null);
              }}
              disabled={isLoading}
            />
            {ipError ? (
              <p className="mt-2 text-xs text-rose-400 font-medium flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {ipError}
              </p>
            ) : (
              <p className="mt-2 text-xs text-slate-500 italic">Helps identify infrastructure geolocation.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Overall Analysis Depth</label>
            <div className="flex p-1 bg-slate-950 rounded-lg border border-slate-800">
              {(['low', 'medium', 'high'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDepth(d)}
                  className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                    depth === d ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">SHA512 Analysis Intensity</label>
            <div className="flex p-1 bg-slate-950 rounded-lg border border-slate-800">
              {(['standard', 'deep', 'forensic'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setShaDepth(s)}
                  className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                    shaDepth === s ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Scan Options Toggle */}
        <div className="pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setShowCustomOptions(!showCustomOptions)}
            className="flex items-center space-x-2 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className={`w-4 h-4 transform transition-transform ${showCustomOptions ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Custom Scan Options</span>
          </button>

          {showCustomOptions && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {Object.entries(modules).map(([moduleKey, enabled]) => (
                <button
                  key={moduleKey}
                  type="button"
                  onClick={() => toggleModule(moduleKey as keyof CustomModules)}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg border text-[11px] font-bold uppercase tracking-wider transition-all ${
                    enabled 
                      ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-400' 
                      : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}
                >
                  <span>{moduleKey.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'bg-slate-800'}`}></div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-slate-500 font-medium">Higher intensity increases AI tokens for integrity checks.</span>
          </div>
          
          <button
            type="button"
            onClick={() => setLearningMode(!learningMode)}
            className="flex items-center space-x-3 group"
          >
            <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${learningMode ? 'bg-indigo-600' : 'bg-slate-700'}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${learningMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
            <span className="text-sm font-semibold text-slate-300">Learning Mode</span>
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || !url}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <span>Analyzing Security Posture...</span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Initiate Deep Passive Scan</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
