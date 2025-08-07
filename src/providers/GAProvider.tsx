"use client";

import { useEffect } from "react";
import { initGA } from "@/utils/ga";

interface GAProviderProps {
  children: React.ReactNode;
}

export default function GAProvider({ children }: GAProviderProps) {
  useEffect(() => {
    // 클라이언트 사이드에서만 GA4 초기화
    initGA();
  }, []);

  return <>{children}</>;
}
