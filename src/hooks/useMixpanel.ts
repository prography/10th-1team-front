import { useEffect, useCallback } from "react";
import {
  initMixpanel,
  identifyUser,
  trackEvent,
  trackPageView,
  setUserProperties,
  incrementUserProperty,
  resetUser,
} from "@/utils/mixpanel";

export const useMixpanel = () => {
  // 믹스패널 초기화
  useEffect(() => {
    initMixpanel();
  }, []);

  const identify = useCallback(
    (userId: string, userProperties?: Record<string, unknown>) => {
      identifyUser(userId, userProperties);
    },
    []
  );

  const track = useCallback(
    (eventName: string, properties?: Record<string, unknown>) => {
      trackEvent(eventName, properties);
    },
    []
  );

  const trackPage = useCallback(
    (pageName: string, properties?: Record<string, unknown>) => {
      trackPageView(pageName, properties);
    },
    []
  );

  const setUserProps = useCallback((properties: Record<string, unknown>) => {
    setUserProperties(properties);
  }, []);

  const increment = useCallback((property: string, value: number = 1) => {
    incrementUserProperty(property, value);
  }, []);

  const reset = useCallback(() => {
    resetUser();
  }, []);

  return {
    identify,
    track,
    trackPage,
    setUserProps,
    increment,
    reset,
  };
};
