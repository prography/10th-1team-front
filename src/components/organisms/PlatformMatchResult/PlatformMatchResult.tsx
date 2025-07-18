import React, { useState, useEffect } from "react";
import ReasonVoteBar from "./ReasonVoteBar";
import RatioBar from "@/components/atoms/RatioBar/RatioBar";
import NoVoteState from "./NoVoteState";
import WinningStatus from "./WinningStatus";
import VoteDescription from "./VoteDescription";
import VoteResultDisplay from "./VoteResultDisplay";
import {
  PlatformMatchResultData,
  PlatformResultItem,
  REASON_LABELS,
} from "@/types/platformMatch";
import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { cn } from "@/utils/cn";
import PlatformTabButton from "@/components/molecules/PlatformTabButton/PlatformTabButton";

interface PlatformMatchResultProps {
  data?: PlatformMatchResultData;
  handleVoteClick: () => void;
}

type PlatformView = "DROW" | "KAKAO" | "NAVER";

export default function PlatformMatchResult({
  handleVoteClick,
  data,
}: PlatformMatchResultProps) {
  let kakaoResult: PlatformResultItem | undefined = undefined;
  let naverResult: PlatformResultItem | undefined = undefined;
  let winningPlatform: PlatformView = "DROW";
  const userRecord = data?.record;
  if (data) {
    kakaoResult = data.results.KAKAO;
    naverResult = data.results.NAVER;
    if (kakaoResult && naverResult) {
      if (kakaoResult.count > naverResult.count) {
        winningPlatform = "KAKAO";
      } else if (naverResult.count > kakaoResult.count) {
        winningPlatform = "NAVER";
      } else {
        winningPlatform = "DROW";
      }
    }
  }

  const [platformView, setPlatformView] =
    useState<PlatformView>(winningPlatform);
  useEffect(() => {
    setPlatformView(winningPlatform);
  }, [winningPlatform]);

  if (!data || data.total === 0) {
    return <NoVoteState handleVoteClick={handleVoteClick} />;
  }

  if (!kakaoResult || !naverResult) {
    return null;
  }

  const totalVotes = kakaoResult.count + naverResult.count;

  // platformView에 따라 winningPlatformReasons를 동적으로 선택
  let winningPlatformReasons: Array<{ reason: string; count: number }> = [];
  if (platformView === "KAKAO") {
    winningPlatformReasons = Object.entries(kakaoResult.reasons)
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count);
  } else if (platformView === "NAVER") {
    winningPlatformReasons = Object.entries(naverResult.reasons)
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count);
  } else {
    // DROW: 동점이면 네이버 기준(기존 로직)
    winningPlatformReasons = Object.entries(naverResult.reasons)
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count);
  }

  const maxReasonCount = Math.max(
    ...winningPlatformReasons.map((r) => r.count)
  );

  const isReasonSelected = (reasonKey: string) => {
    if (!userRecord) return false;
    const platform = platformView === "DROW" ? "NAVER" : platformView;
    return (
      userRecord.platform === platform &&
      userRecord.reason.includes(reasonKey as keyof typeof REASON_LABELS)
    );
  };

  return (
    <>
      <div className="py-[24px]">
        <div className="flex flex-col justify-center items-center">
          <WinningStatus winningPlatform={winningPlatform} />
          <VoteDescription
            totalVotes={totalVotes}
            winningPlatform={winningPlatform}
          />
          <span className="caption-s-regular text-texticon-onnormal-lowemp">
            {totalVotes >= 999 ? "999+" : totalVotes}명의 유저가 참여
          </span>
        </div>
        <div className="flex flex-col justify-center items-center px-[16px] py-[24px] gap-[12px]">
          <VoteResultDisplay
            winningPlatform={winningPlatform}
            kakaoResult={kakaoResult}
            naverResult={naverResult}
          />
          <RatioBar
            leftPercent={
              totalVotes > 0 ? (kakaoResult.count / totalVotes) * 100 : 50
            }
            rightPercent={
              totalVotes > 0 ? (naverResult.count / totalVotes) * 100 : 50
            }
          />
        </div>
      </div>
      <div className="flex flex-col px-[16px] mb-[24px]">
        <div className="flex body-s-semibold text-texticon-onnormal-midemp mb-[-7px]">
          <PlatformTabButton
            platform="NAVER"
            isSelected={platformView === "NAVER" || platformView === "DROW"}
            onClick={() => setPlatformView("NAVER")}
          />
          <PlatformTabButton
            platform="KAKAO"
            isSelected={platformView === "KAKAO"}
            onClick={() => setPlatformView("KAKAO")}
          />
        </div>
        <div className="flex flex-col gap-[20px] bg-surface-normal-container-b50 rounded-[8px] px-[12px] py-[16px] z-10">
          <div className="flex items-center gap-[12px] body-l-medium">
            <Icon
              icon={platformView === "KAKAO" ? "Kakaomap" : "Navermap"}
              size={24}
            />
            {platformView === "KAKAO"
              ? "카카오 맵을 고른 이유"
              : "네이버 지도를 고른 이유"}
          </div>
          <div className="flex flex-col gap-[12px]">
            {winningPlatformReasons.map((reason) => (
              <ReasonVoteBar
                key={reason.reason}
                label={
                  REASON_LABELS[reason.reason as keyof typeof REASON_LABELS]
                }
                count={reason.count}
                total={totalVotes}
                maxCountSelected={
                  maxReasonCount > 0 && reason.count === maxReasonCount
                }
                selected={isReasonSelected(reason.reason)}
              />
            ))}
          </div>
        </div>
      </div>
      {data.voted && userRecord && (
        <div className="flex flex-col px-[16px] py-[12px]">
          <div className="flex flex-col p-[20px] rounded-[8px] border border-border-normal-highemp bg-surface-normal-container0">
            <span className="caption-m-regular text-texticon-onnormal-midemp mb-[4px]">
              {userRecord.voted_date.split("T")[0].replace(/-/g, ".")}
            </span>
            <div className="body-m-semibold mb-[12px]">
              <span
                className={cn("text-brand-kakao-main", {
                  "text-brand-naver-main": userRecord.platform === "NAVER",
                })}
              >
                {userRecord.platform === "KAKAO" ? "카카오 맵" : "네이버 지도"}
              </span>
              <span className="text-texticon-onnormal-highestemp">
                에 투표완료!
              </span>
            </div>
            <div className="caption-m-regular text-texticon-onnormal-midemp">
              캘린더에 투표가 기록되었어요!
            </div>
            <IconButton
              className="bg-texticon-onnormal-highestemp rounded-[99px] px-[14px] py-[8px] w-fit text-texticon-onnormal-white caption-m-semibold mt-[20px]"
              text="캘린더 이동"
              endIcon={<Icon icon="PageMove" size={24} stroke="#fff" />}
            />
          </div>
        </div>
      )}
    </>
  );
}
