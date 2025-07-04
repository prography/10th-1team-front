import Button from "@/components/atoms/Button/Button";
import React from "react";
import { usePlatformMove } from "@/hooks/usePlatformMove";

interface PlatformMoveButtonProps {
  platform: "kakao" | "naver";
  placeId: string;
}

// 플랫폼별 이동 버튼 컴포넌트
export default function PlatformMoveButton({
  platform,
  placeId,
}: PlatformMoveButtonProps) {
  const handleMoveToPlatform = usePlatformMove(platform, placeId);

  const buttonText =
    platform === "kakao" ? "카카오 맵 이동" : "네이버 지도 이동";

  return (
    <Button
      variant="secondary"
      className="bg-button-secondary-bg_default px-[16px] py-[8px] button-s-medium min-w-[96px]"
      onClick={handleMoveToPlatform}
    >
      {buttonText}
    </Button>
  );
}
