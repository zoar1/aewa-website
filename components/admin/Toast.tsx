"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

export function Toast({ message, type, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-start gap-3 px-5 py-4 rounded-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.14)] max-w-xs border text-sm font-medium ${
        type === "success"
          ? "bg-white border-emerald-200 text-emerald-800"
          : "bg-white border-red-200 text-red-700"
      }`}
    >
      <div
        className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
          type === "success" ? "bg-emerald-100" : "bg-red-100"
        }`}
      >
        {type === "success" ? (
          <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>

      <span className="flex-1 leading-snug">{message}</span>

      <button
        onClick={onDismiss}
        className="shrink-0 text-[#999] hover:text-[#555] transition-colors mt-0.5"
        aria-label="Dismiss"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  function show(message: string, type: ToastType = "success") {
    setToast({ message, type });
  }

  function dismiss() {
    setToast(null);
  }

  return { toast, show, dismiss };
}
