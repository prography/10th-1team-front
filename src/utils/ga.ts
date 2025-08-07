declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "set" | "consent",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

// GA4 초기화
export const initGA = () => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn("GA4 measurement ID is not configured");
    return;
  }

  // gtag가 이미 로드되어 있는지 확인
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// 페이지뷰 추적
export const trackPageView = (url: string, title?: string) => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", measurementId, {
    page_title: title || document.title,
    page_location: url,
  });
};

// 이벤트 추적
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, {
    ...parameters,
    timestamp: new Date().toISOString(),
  });
};

// 사용자 속성 설정
export const setUserProperties = (properties: Record<string, unknown>) => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("set", "user_properties", properties);
};

// 사용자 ID 설정
export const setUserId = (userId: string) => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", measurementId, {
    user_id: userId,
  });
};

// 전환 추적
export const trackConversion = (
  conversionId: string,
  conversionLabel?: string
) => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", "conversion", {
    send_to: `${measurementId}/${conversionId}${conversionLabel ? `/${conversionLabel}` : ""}`,
  });
};
