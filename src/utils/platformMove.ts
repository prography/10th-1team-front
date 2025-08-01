export function getPlatformMoveHandler(
  platform: "kakao" | "naver",
  placeId: string
) {
  return () => {
    if (!placeId) return;

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
  };
}
