"use client";

import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
}

export default function Toast({
  message,
  icon,
  isOpen,
  autoClose = true,
  duration = 1500,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (isOpen && autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-1/2 bottom-8 z-50 -translate-x-1/2 bg-surface-normal-bg06 text-texticon-onnormal-white rounded-[8px] flex items-center px-[20px] py-[16px] gap-[10px] transition-all duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-2"
      style={{ minWidth: 328, maxWidth: "90vw" }}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span className="body-s-semibold">{message}</span>
    </div>
  );
}
