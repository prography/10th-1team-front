import React from "react";
import { cn } from "@/utils/cn";
import { colors } from "@/styles/colors";
import { VoteReslutLeft, VoteReslutRight } from "@/components/atoms/Icon/icons";

interface PlatformTabButtonProps {
  platform: "NAVER" | "KAKAO";
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export default function PlatformTabButton({
  platform,
  isSelected,
  onClick,
  className,
}: PlatformTabButtonProps) {
  const config = {
    NAVER: {
      icon: VoteReslutLeft,
      text: "네이버지도",
      width: 100,
      height: 38,
      textPosition: "left-[12px] top-[8px]",
      marginLeft: "",
    },
    KAKAO: {
      icon: VoteReslutRight,
      text: "카카오 맵",
      width: 120,
      height: 38,
      textPosition: "left-[36px] top-[8px]",
      marginLeft: "ml-[-33px]",
    },
  };

  const {
    icon: IconComponent,
    text,
    width,
    height,
    textPosition,
    marginLeft,
  } = config[platform];

  return (
    <div
      className={cn(
        "relative cursor-pointer",
        marginLeft,
        isSelected ? "z-10" : "z-0",
        className
      )}
      onClick={onClick}
    >
      <IconComponent
        width={width}
        height={height}
        fill={
          isSelected
            ? colors.Brand.Primary.Surface
            : colors.TextIcon.OnNormal["Main 300"]
        }
      />
      <span
        className={cn(
          "absolute caption-s-semibold",
          textPosition,
          isSelected
            ? "text-texticon-onnormal-main-300"
            : "text-texticon-onnormal-white"
        )}
      >
        {text}
      </span>
    </div>
  );
}
