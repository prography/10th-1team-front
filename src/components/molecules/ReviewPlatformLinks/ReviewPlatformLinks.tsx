import Icon from "@/components/atoms/Icon/Icon";
import React from "react";
import Button from "@/components/atoms/Button/Button";
import { usePlatformMove } from "@/hooks/usePlatformMove";

interface ReviewPlatformLinksProps {
  kakaoPlaceId: string;
  naverPlaceId: string;
}

export default function ReviewPlatformLinks({
  kakaoPlaceId,
  naverPlaceId,
}: ReviewPlatformLinksProps) {
  const handleKakaoMove = usePlatformMove("kakao", kakaoPlaceId);
  const handleNaverMove = usePlatformMove("naver", naverPlaceId);
  return (
    <div className="bg-surface-normal-container0 flex flex-col items-center justify-center gap-[32px] px-[16px] py-[52px] w-full">
      <div className="flex flex-col gap-[8px] items-center justify-center">
        <Icon className="mb-[12px]" icon="Empty" size={40} />
        <span className="body-l-semibold text-texticon-onnormal-highestemp">
          이 가게에 쌓인 리뷰, 더 궁금하신가요?
        </span>
        <span className="caption-m-regular text-texticon-onnormal-midemp">
          플랫폼에서 확인해보실 수 있어요
        </span>
      </div>
      <div className="flex flex-col gap-[8px]">
        <Button
          className="bg-texticon-onnormal-highestemp rounded-[99px] px-[14px] py-[8px] w-fit"
          onClick={handleKakaoMove}
        >
          <span className="text-brand-kakao-main">카카오 맵</span>
          <span className="text-texticon-onnormal-white mr-[4px]">
            으로 이동
          </span>
          <Icon icon="PageMove" size={24} stroke="#fff" />
        </Button>
        <Button
          className="bg-texticon-onnormal-highestemp rounded-[99px] px-[14px] py-[8px] w-fit"
          onClick={handleNaverMove}
        >
          <span className="text-brand-naver-main">네이버 지도</span>
          <span className="text-texticon-onnormal-white mr-[4px]">로 이동</span>
          <Icon icon="PageMove" size={24} stroke="#fff" />
        </Button>
      </div>
    </div>
  );
}
