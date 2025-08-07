"use client";

import { useEffect } from "react";
import { initMixpanel } from "@/utils/mixpanel";

interface MixpanelProviderProps {
  children: React.ReactNode;
}

export default function MixpanelProvider({ children }: MixpanelProviderProps) {
  useEffect(() => {
    // 클라이언트 사이드에서만 믹스패널 초기화
    initMixpanel();
  }, []);

  return <>{children}</>;
}
