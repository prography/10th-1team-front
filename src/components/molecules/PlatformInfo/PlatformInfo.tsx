import Icon from "@/components/atoms/Icon/Icon";
import { colors } from "@/styles/colors";
import React from "react";

interface PlatformInfoProps {
  platform: "kakao" | "naver";
  score: number;
}

export default function PlatformInfo({ platform, score }: PlatformInfoProps) {
  const platformInfo = {
    kakao: {
      icon: "Kakaomap" as const,
      name: "카카오 맵",
    },
    naver: {
      icon: "Navermap" as const,
      name: "네이버 지도",
    },
  };

  const info = platformInfo[platform];

  return (
    <div className="flex items-center">
      <Icon icon={info.icon} size={24} />
      <span className="body-l-semibold ml-[8px]">{info.name}</span>
      <Icon icon="Star" size={16} fill={colors.Etc.Icon["Star-filled"]} />
      <span className="caption-m-semibold text-etc-icon-star-filled">
        {score}
      </span>
    </div>
  );
}
