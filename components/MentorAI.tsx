
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ScanResult } from '../types';
import { getMentorResponse, resetMentorChat, generateSpeech } from '../services/geminiService';

interface MentorAIProps {
  scanResult: ScanResult;
}

export const MentorAI: React.FC<MentorAIProps> = ({ scanResult }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    resetMentorChat();
    setMessages([
      {
        role: 'mentor',
        text: `Hello! I'm your SentinelX AI Mentor. I've reviewed the scan of ${scanResult.target}. How can I help you understand these security findings today?`,
        timestamp: new Date()
      }
    ]);
  }, [scanResult]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const decodeAudio = async (base64: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = audioContextRef.current;
    
    // Manual base64 decode (from guidelines)
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Audio Decoding (from guidelines)
    const dataInt16 = new Int16Array(bytes.buffer);
    const numChannels = 1;
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, 24000);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getMentorResponse(userMessage.text, scanResult);
      let audioData: string | undefined;
      
      if (isAudioEnabled) {
        audioData = await generateSpeech(response);
        if (audioData) {
          decodeAudio(audioData);
        }
      }

      const mentorMessage: ChatMessage = {
        role: 'mentor',
        text: response,
        timestamp: new Date(),
        audioData
      };
      setMessages(prev => [...prev, mentorMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'mentor',
        text: "I encountered an error while processing your question. Let's try refocusing on the security remediation steps.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-8 z-[60] bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl shadow-indigo-500/40 transition-all active:scale-95 flex items-center space-x-2 group"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-sm">
          Ask SentinelX Mentor
        </span>
      </button>

      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl z-[70] transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">SentinelX Mentor AI</h3>
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Cybersecurity Instructor</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`p-2 rounded-lg transition-colors ${isAudioEnabled ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 hover:text-white'}`}
              title={isAudioEnabled ? "Voice Enabled" : "Voice Disabled"}
            >
              {isAudioEnabled ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              )}
            </button>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-slate-700">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-500/10' 
                  : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700 shadow-xl'
              }`}>
                {msg.text}
                {msg.role === 'mentor' && msg.audioData && (
                  <button 
                    onClick={() => decodeAudio(msg.audioData!)}
                    className="mt-2 text-[10px] text-indigo-400 font-bold uppercase hover:text-indigo-300 flex items-center space-x-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    <span>Replay Audio</span>
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-bl-none shadow-xl">
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50 shrink-0">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              placeholder="Ask about a finding..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none pr-12 transition-all shadow-inner"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 top-2 p-1.5 text-indigo-400 hover:text-indigo-300 disabled:text-slate-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <p className="mt-3 text-[10px] text-slate-600 text-center uppercase tracking-tighter">
            Defensive AI Mentor &bull; Educational Guidance Only
          </p>
        </div>
      </div>
    </>
  );
};
