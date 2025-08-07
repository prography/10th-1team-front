import mixpanel from "mixpanel-browser";

// 믹스패널 초기화
export const initMixpanel = () => {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

  if (!token) {
    console.warn("Mixpanel token is not configured");
    return;
  }

  mixpanel.init(token, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: true,
    persistence: "localStorage",
  });
};

// 사용자 식별
export const identifyUser = (
  userId: string,
  userProperties?: Record<string, unknown>
) => {
  mixpanel.identify(userId);

  if (userProperties) {
    mixpanel.people.set(userProperties);
  }
};

// 이벤트 추적
export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
) => {
  mixpanel.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

// 페이지뷰 추적
export const trackPageView = (
  pageName: string,
  properties?: Record<string, unknown>
) => {
  mixpanel.track("Page View", {
    page_name: pageName,
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

// 사용자 속성 설정
export const setUserProperties = (properties: Record<string, unknown>) => {
  mixpanel.people.set(properties);
};

// 사용자 속성 증가
export const incrementUserProperty = (property: string, value: number = 1) => {
  mixpanel.people.increment(property, value);
};

// 사용자 로그아웃
export const resetUser = () => {
  mixpanel.reset();
};

// 믹스패널 인스턴스 내보내기 (고급 사용을 위해)
export { mixpanel };
