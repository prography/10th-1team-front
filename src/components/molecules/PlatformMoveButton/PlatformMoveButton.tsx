import Button from '@/components/atoms/Button/Button';
import React from 'react';

interface PlatformMoveButtonProps {
  platform: 'kakao' | 'naver';
  placeId: string;
}

// 플랫폼별 이동 버튼 컴포넌트
export default function PlatformMoveButton({ 
  platform, 
  placeId
}: PlatformMoveButtonProps) {
  const handleMoveToPlatform = () => {
    
    if (!placeId) {
      return;
    }

    // PC 환경 체크
    const isPC = !navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
    
    if (isPC) {
      // PC에서는 무조건 웹으로 이동
      const webUrl = platform === 'kakao' 
        ? `https://place.map.kakao.com/${placeId}`
        : `https://map.naver.com/p/entry/place/${placeId}`;
      window.open(webUrl, '_blank');
      return;
    }

    const platformConfig = {
      kakao: {
        appScheme: 'kakaomap://',
        webUrl: `https://place.map.kakao.com/${placeId}`,
        appUrl: `kakaomap://place?id=${placeId}`
      },
      naver: {
        appScheme: 'nmap://',
        webUrl: `https://map.naver.com/p/entry/place/${placeId}`,
        appUrl: `nmap://place?id=${placeId}`
      }
    };

    const config = platformConfig[platform];
    
    // 앱 설치 여부 확인 및 이동 (모바일에서만)
    const checkAndNavigate = () => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = config.appScheme;
      
      const timeout = setTimeout(() => {
        // 앱이 없으면 웹으로 이동
        window.open(config.webUrl, '_blank');
      }, 1000);

      iframe.onload = () => {
        clearTimeout(timeout);
        // 앱이 있으면 앱으로 이동
        window.location.href = config.appUrl;
      };

      document.body.appendChild(iframe);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);
    };

    checkAndNavigate();
  };

  const buttonText = platform === 'kakao' ? '카카오 맵 이동' : '네이버 지도 이동';

  return (
    <Button
      variant="secondary"
      className='bg-button-secondary-bg_default px-[16px] py-[8px] button-s-medium min-w-[96px]'
      onClick={handleMoveToPlatform}
    >
      {buttonText}
    </Button>
  );
} 