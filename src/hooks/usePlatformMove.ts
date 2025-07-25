import { useCallback } from "react";

export function usePlatformMove(
  platform: "kakao" | "naver",
  placeId: string,
  options: { disableAppMove?: boolean } = { disableAppMove: true }
) {
  return useCallback(() => {
    if (!placeId) return;

    // 앱 이동이 비활성화된 경우 웹으로만 이동
    if (options?.disableAppMove) {
      const webUrl =
        platform === "kakao"
          ? `https://place.map.kakao.com/${placeId}`
          : `https://map.naver.com/p/entry/place/${placeId}`;
      window.open(webUrl, "_blank");
      return;
    }

    const isPC = !navigator.userAgent.match(
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    );

    if (isPC) {
      const webUrl =
        platform === "kakao"
          ? `https://place.map.kakao.com/${placeId}`
          : `https://map.naver.com/p/entry/place/${placeId}`;
      window.open(webUrl, "_blank");
      return;
    }

    const platformConfig = {
      kakao: {
        appScheme: "kakaomap://",
        webUrl: `https://place.map.kakao.com/${placeId}`,
        appUrl: `kakaomap://place?id=${placeId}`,
      },
      naver: {
        appScheme: "nmap://",
        webUrl: `https://map.naver.com/p/entry/place/${placeId}`,
        appUrl: `nmap://place?id=${placeId}`,
      },
    };

    const config = platformConfig[platform];

    const checkAndNavigate = () => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = config.appScheme;

      const timeout = setTimeout(() => {
        window.open(config.webUrl, "_blank");
      }, 1000);

      iframe.onload = () => {
        clearTimeout(timeout);
        window.location.href = config.appUrl;
      };

      document.body.appendChild(iframe);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);
    };

    checkAndNavigate();
  }, [platform, placeId, options?.disableAppMove]);
}
