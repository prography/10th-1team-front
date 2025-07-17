import { colors } from "@/styles/colors";
import React from "react";

interface BarGraphProps {
  leftLabel: string;
  rightLabel: string;
  leftPercent: number; // 0~100
  rightPercent: number; // 0~100
}

const BAR_HEIGHT = 180; // px
const MIN_BAR_HEIGHT = 8; // px
const TICK_OFFSET = 1; // px, 눈금선 살짝만 아래로

export default function BarGraph({
  leftLabel,
  rightLabel,
  leftPercent,
  rightPercent,
}: BarGraphProps) {
  // 색상은 필요에 따라 수정
  const leftColor = colors.Brand.KaKao.Main; // 카카오 노랑
  const rightColor = colors.Brand.Naver.Main; // 네이버 초록
  const leftTextColor = colors.Brand.KaKao.Blue; // 카카오 파랑(글씨)
  const rightTextColor = colors.Brand.Naver.Main; // 네이버 초록(글씨)

  // 실제 막대 높이 계산 (0%여도 최소 높이 보장)
  const getBarHeight = (percent: number) =>
    percent === 0 ? MIN_BAR_HEIGHT : (BAR_HEIGHT * percent) / 100;

  return (
    <div className="relative w-full h-[260px] flex flex-col justify-end items-center ml-[20px] ">
      {/* y축 눈금선 (막대 영역 기준으로 위치 계산, TICK_OFFSET만큼만 아래로) */}
      {[100, 75, 50, 25, 0].map((v) => (
        <div
          key={v}
          className={`absolute left-[5%] w-[90%] border-b ${v === 0 ? "border-border-normal-highemp " : "border-border-normal-lowemp border-dashed"} z-0`}
          style={{
            top: `${37 + (BAR_HEIGHT - (v / 100) * BAR_HEIGHT) + TICK_OFFSET}px`,
          }}
        >
          <span className="absolute -left-[24px] text-[12px] text-gray-400 -translate-y-1/2">
            {v}%
          </span>
        </div>
      ))}

      {/* 막대 그래프 */}
      <div className="flex w-full h-full items-end justify-center px-8 pb-8 z-10 gap-[36px]">
        {/* 카카오 */}
        <div className="flex flex-1 flex-col items-end">
          <div className="flex items-end" style={{ height: `${BAR_HEIGHT}px` }}>
            <div
              className="w-[44px] relative flex items-end justify-center rounded-t-[4px] border-2 border-t-brand-kakao-deep border-l-brand-kakao-deep border-r-brand-kakao-deep border-b-transparent transition-[height] duration-300"
              style={{
                height: `${getBarHeight(leftPercent)}px`,
                background: leftColor,
              }}
            >
              <span
                className="absolute -top-[28px] left-1/2 -translate-x-1/2 body-s-semibold"
                style={{ color: leftTextColor }}
              >
                {leftPercent}%
              </span>
            </div>
          </div>
          <span className="mt-2 caption-m-regular text-texticon-onnormal-highemp">
            {leftLabel}
          </span>
        </div>
        {/* 네이버 */}
        <div className="flex flex-1 flex-col items-start">
          <div className="flex items-end" style={{ height: `${BAR_HEIGHT}px` }}>
            <div
              className="w-[44px] relative flex items-end justify-center rounded-t-[4px] border-2 border-t-brand-naver-deep border-l-brand-naver-deep border-r-brand-naver-deep border-b-transparent transition-[height] duration-300"
              style={{
                height: `${getBarHeight(rightPercent)}px`,
                background: rightColor,
              }}
            >
              <span
                className="absolute -top-[28px] left-1/2 -translate-x-1/2 body-s-semibold"
                style={{ color: rightTextColor }}
              >
                {rightPercent}%
              </span>
            </div>
          </div>
          <span className="mt-2 caption-m-regular text-texticon-onnormal-highemp">
            {rightLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
