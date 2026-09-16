'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Compass, X, Send, Download, Sparkles, RefreshCw, 
  ChevronRight, ExternalLink, CheckCircle2, User, Calendar, 
  MapPin, Clock, MessageSquare, Bot
} from 'lucide-react';
import { 
  processAssistantQuery, 
  AssistantMessage 
} from '@/lib/assistant/expeditionAssistantEngine';
import { downloadExpeditionReport } from '@/utils/downloadUtils';
import { useToast } from '@/context/ToastContext';
import { Expedition, POLAR_REPORTS } from '@/data/polaris-data';

export function ExpeditionAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'init-msg',
      role: 'assistant',
      content: `Welcome to the **PolarVision Expedition Assistant**! I can instantly look up scientific expeditions, research objectives, polar station telemetry, and provide verified mission reports.\n\nWhat would you like to explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Tell me about 43rd Antarctic Expedition',
        'Show me Arctic expeditions',
        'Which expedition studied sea ice?',
        'Give me the report for 43-IAE',
        'What were the findings of SOE-12?',
        'Tell me about the MOSAiC expedition'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: AssistantMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await processAssistantQuery(text, messages);
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, I encountered an issue processing your query. Please try asking again or select one of the suggested topics below.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: [
            'Tell me about 43rd Antarctic Expedition',
            'Show me Arctic expeditions',
            'Which expedition studied sea ice?'
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (exp: Expedition) => {
    const associatedReports = POLAR_REPORTS.filter((r) => r.expeditionId === exp.id);
    const filename = downloadExpeditionReport(exp, associatedReports);
    showToast(
      'Report downloaded successfully',
      `Saved: ${filename}`,
      'success'
    );
  };

  const handleReset = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'assistant',
        content: `Conversation reset. How can I help you navigate the polar expeditions catalog?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          'Tell me about 43rd Antarctic Expedition',
          'Show me Arctic expeditions',
          'Which expedition studied sea ice?',
          'Give me the report for 43-IAE'
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Chatbot Launcher Button */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open PolarVision Expedition Assistant"
            className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 hover:from-sky-500 hover:to-cyan-300 text-slate-950 font-bold text-xs sm:text-sm shadow-2xl shadow-sky-500/40 hover:shadow-sky-400/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/25"
          >
            {/* Animated Pulsing Radar Beacon */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>

            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 animate-spin-slow" />
            <span className="font-extrabold tracking-wide">PolarVision Assistant</span>

            {/* Subtle Tooltip Pill */}
            <span className="absolute -top-9 right-0 bg-slate-900 text-sky-300 text-[10px] font-mono px-2.5 py-1 rounded-md border border-sky-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              AI Expedition Search & Reports
            </span>
          </button>
        )}
      </div>

      {/* Slide-Up Chat Panel */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="PolarVision Expedition Assistant Chat Window"
          className="fixed inset-x-3 bottom-20 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[430px] h-[580px] max-h-[82vh] z-50 flex flex-col rounded-2xl sm:rounded-3xl bg-slate-950/95 border border-sky-500/40 shadow-2xl backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-sky-500/20 bg-slate-900/90">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-md shadow-sky-500/20">
                <Compass className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm text-white tracking-wide">PolarVision Assistant</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Expedition & Report Search</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart conversation"
                aria-label="Restart conversation"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat window"
                aria-label="Close assistant"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  {/* Sender Tag & Timestamp */}
                  <span className="text-[10px] text-slate-500 mb-1 px-1">
                    {isAssistant ? '✦ PolarVision Expedition Assistant' : 'You'} • {msg.timestamp}
                  </span>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[92%] rounded-2xl p-3.5 sm:p-4 leading-relaxed ${
                      isAssistant
                        ? 'bg-slate-900 border border-sky-500/20 text-slate-200 shadow-md'
                        : 'bg-gradient-to-r from-sky-600 to-sky-500 text-slate-950 font-medium shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-line space-y-2">
                      {msg.content.split('\n\n').map((paragraph, pIdx) => {
                        // Bold title formatting
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h4 key={pIdx} className="text-sm font-black text-sky-300 pt-1">
                              {paragraph.replace('### ', '')}
                            </h4>
                          );
                        }
                        return <p key={pIdx}>{paragraph}</p>;
                      })}
                    </div>

                    {/* Single Selected Expedition Card */}
                    {msg.selectedExpedition && (
                      <div className="mt-3.5 p-3 rounded-xl bg-slate-950 border border-sky-500/30 space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-900/80 text-sky-300">
                              {msg.selectedExpedition.code}
                            </span>
                            <h5 className="text-xs font-bold text-white mt-1">
                              {msg.selectedExpedition.name}
                            </h5>
                          </div>
                          <span className="text-[10px] font-bold text-sky-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {msg.selectedExpedition.region}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-400 space-y-1">
                          <p className="flex items-center gap-1.5">
                            <User className="w-3 h-3 text-sky-400 flex-shrink-0" />
                            <span>Lead: <strong>{msg.selectedExpedition.leadResearcher}</strong></span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-amber-400 flex-shrink-0" />
                            <span>{msg.selectedExpedition.duration}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Compass className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            <span>{msg.selectedExpedition.vesselOrBase}</span>
                          </p>
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-800">
                          {msg.showDownloadButton && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDownload(msg.selectedExpedition!);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] transition-transform active:scale-95 shadow-sm"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download Report</span>
                            </button>
                          )}

                          <Link
                            href={`/expeditions/${msg.selectedExpedition.id}`}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white font-semibold text-[11px] transition-colors"
                          >
                            <span>View Full Profile</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Multi-Match Expeditions List */}
                    {msg.expeditions && msg.expeditions.length > 0 && !msg.selectedExpedition && (
                      <div className="mt-3 space-y-2">
                        {msg.expeditions.map((exp) => (
                          <div
                            key={exp.id}
                            className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-colors flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-mono font-bold text-sky-400">
                                  {exp.code}
                                </span>
                                <span className="text-[9px] text-slate-500">
                                  • {exp.year}
                                </span>
                              </div>
                              <p className="text-[11px] font-bold text-white truncate">
                                {exp.name}
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button
                                onClick={() => handleSendMessage(`Tell me about ${exp.code}`)}
                                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-sky-600 hover:text-white text-[10px] font-bold text-sky-300 transition-colors"
                              >
                                Details
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleDownload(exp);
                                }}
                                title="Download Report"
                                className="p-1 rounded bg-sky-950 hover:bg-sky-800 text-sky-300 border border-sky-400/30 transition-colors"
                              >
                                <Download className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Suggested Query Chips */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.suggestedActions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleSendMessage(action)}
                          className="px-2.5 py-1 rounded-full bg-slate-900/90 hover:bg-sky-950 text-slate-300 hover:text-sky-300 border border-slate-800 hover:border-sky-500/40 text-[10px] transition-colors"
                        >
                          ✦ {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-slate-500 mb-1 px-1">
                  ✦ PolarVision Expedition Assistant
                </span>
                <div className="rounded-2xl px-4 py-3 bg-slate-900 border border-sky-500/20 text-sky-300 flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    Querying polar expedition records...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 border-t border-sky-500/20 bg-slate-900/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about 43-IAE, Arctic, sea ice, reports..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-sky-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send query"
                className="p-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-bold transition-all disabled:opacity-40 disabled:pointer-events-none shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 px-1">
              <span>Local Expedition NLU Engine</span>
              <span>PolarVision Portal</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
