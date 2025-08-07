import { useEffect, useCallback } from "react";
import {
  initGA,
  trackPageView,
  trackEvent,
  setUserProperties,
  setUserId,
  trackConversion,
} from "@/utils/ga";

export const useGA = () => {
  // GA4 초기화
  useEffect(() => {
    initGA();
  }, []);

  const trackPage = useCallback((url: string, title?: string) => {
    trackPageView(url, title);
  }, []);

  const track = useCallback(
    (eventName: string, parameters?: Record<string, unknown>) => {
      trackEvent(eventName, parameters);
    },
    []
  );

  const setUserProps = useCallback((properties: Record<string, unknown>) => {
    setUserProperties(properties);
  }, []);

  const identify = useCallback((userId: string) => {
    setUserId(userId);
  }, []);

  const trackConversionEvent = useCallback(
    (conversionId: string, conversionLabel?: string) => {
      trackConversion(conversionId, conversionLabel);
    },
    []
  );

  return {
    trackPage,
    track,
    setUserProps,
    identify,
    trackConversion: trackConversionEvent,
  };
};
