'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: Date;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'alert') => void;
  removeToast: (id: string) => void;
  notificationHistory: ToastMessage[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [notificationHistory, setNotificationHistory] = useState<ToastMessage[]>([
    {
      id: 'init-1',
      title: 'New Dataset Published',
      message: 'Central Dronning Maud Land Ice Velocity NetCDF is now live.',
      type: 'info',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 'init-2',
      title: 'Peer Review Completed',
      message: 'Article "Reading 800,000 Years in Antarctic Ice" approved for publication.',
      type: 'success',
      timestamp: new Date(Date.now() - 7200000)
    }
  ]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, message: string, type: 'info' | 'success' | 'warning' | 'alert' = 'info') => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, message, type, timestamp: new Date() };

    setToasts((prev) => [...prev, newToast]);
    setNotificationHistory((prev) => [newToast, ...prev].slice(0, 20));

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast, notificationHistory }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 bg-slate-900/95 border-sky-500/30 text-slate-100 dark:bg-slate-900/95 dark:border-sky-500/30 dark:text-slate-100"
          >
            <div className="mt-0.5 flex-shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
              {toast.type === 'alert' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
