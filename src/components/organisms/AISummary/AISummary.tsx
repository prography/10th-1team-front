"use client";

import Tabs from "@/components/organisms/Tabs/Tabs";
import BarGraph from "@/components/molecules/BarGraph/BarGraph";
import MultiKeywordHighlighter from "@/components/atoms/MultiKeywordHighlighter/MultiKeywordHighlighter";
import { colors } from "@/styles/colors";

interface AISummaryProps {
  summaryAi: string;
  strengths: Array<{
    description: string;
    kakao_rate: number;
    naver_rate: number;
  }>;
}

export default function AISummary({ summaryAi, strengths }: AISummaryProps) {
  const tabItems = strengths.map((strength) => ({
    label: strength.description,
    value: strength.description,
    content: (
      <div className="flex flex-col w-full gap-[24px]">
        {summaryAi ? (
          <div className="body-m-semibold px-[16px] pt-[12px] text-left">
            <MultiKeywordHighlighter
              text={summaryAi}
              highlights={[
                { word: "카카오", color: colors.Brand.KaKao.Blue },
                { word: "네이버", color: colors.Brand.Naver.Main },
              ]}
            />
          </div>
        ) : (
          <span className="body-m-semibold px-[16px] pt-[12px] text-texticon-onnormal-lowestemp text-left">
            AI요약을 위한 리뷰 데이터가 부족해요
          </span>
        )}
        <div className="flex justify-center">
          <BarGraph
            leftLabel="카카오 맵"
            rightLabel="네이버지도"
            leftPercent={Math.round(strength.kakao_rate * 100)}
            rightPercent={Math.round(strength.naver_rate * 100)}
          />
        </div>
      </div>
    ),
  }));
  return (
    <div className="flex flex-col py-[24px] w-full bg-surface-normal-bg01">
      <p className="body-m-semibold px-[16px]">AI 요약</p>
      <Tabs items={tabItems} />
    </div>
  );
}
