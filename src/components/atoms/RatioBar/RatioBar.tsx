import { colors } from "@/styles/colors";
import React from "react";

interface RatioBarProps {
  leftPercent: number; // 0~100
  rightPercent: number; // 0~100
  leftColor?: string;
  rightColor?: string;
}

export default function RatioBar({
  leftPercent,
  rightPercent,
  leftColor = colors.Brand.KaKao.Main, // 노랑
  rightColor = colors.Brand.Naver.Main, // 초록
}: RatioBarProps) {
  // 0~100 보정
  const left = Math.max(0, Math.min(100, leftPercent));
  const right = Math.max(0, Math.min(100, rightPercent));

  return (
    <div className="w-full flex gap-[2px] rounded-full overflow-hidden h-[30px]">
      {/* 왼쪽 바 - 0%일 때는 렌더링하지 않음 */}
      {left > 0 && (
        <div
          className="text-brand-kakao-blue flex items-center justify-start pl-[12px] body-s-semibold"
          style={{
            width: `${left}%`,
            background: leftColor,
          }}
        >
          {`${left.toFixed(1)}%`}
        </div>
      )}
      {/* 오른쪽 바 - 0%일 때는 렌더링하지 않음 */}
      {right > 0 && (
        <div
          className="text-texticon-onnormal-white flex items-center justify-end pr-6 body-s-semibold"
          style={{
            width: `${right}%`,
            background: rightColor,
            color: "#fff",
          }}
        >
          {`${right.toFixed(1)}%`}
        </div>
      )}
    </div>
  );
}
