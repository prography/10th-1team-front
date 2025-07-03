import React, { useState, useEffect } from "react";
import ReasonVoteBar from "./ReasonVoteBar";
import RatioBar from "@/components/atoms/RatioBar/RatioBar";
import NoVoteState from "./NoVoteState";
import WinningStatus from "./WinningStatus";
import VoteDescription from "./VoteDescription";
import VoteResultDisplay from "./VoteResultDisplay";
import {
  PlatformMatchResultData,
  PlatformResult,
  REASON_LABELS,
} from "@/types/platformMatch";
import Icon from "@/components/atoms/Icon/Icon";

interface PlatformMatchResultProps {
  data?: PlatformMatchResultData;
  handleVoteClick: () => void;
}

type PlatformView = "DROW" | "KAKAO" | "NAVER";

export default function PlatformMatchResult({
  handleVoteClick,
  data,
}: PlatformMatchResultProps) {
  let kakaoResult: PlatformResult | undefined = undefined;
  let naverResult: PlatformResult | undefined = undefined;
  let winningPlatform: PlatformView = "DROW";
  if (data && data.voted) {
    kakaoResult = data.results.find((result) => result.platform === "KAKAO");
    naverResult = data.results.find((result) => result.platform === "NAVER");
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

  if (!data || !data.voted) {
    return <NoVoteState handleVoteClick={handleVoteClick} />;
  }

  if (!kakaoResult || !naverResult) {
    return null;
  }

  const totalVotes = kakaoResult.count + naverResult.count;

  // platformView에 따라 winningPlatformReasons를 동적으로 선택
  let winningPlatformReasons = [];
  if (platformView === "KAKAO") {
    winningPlatformReasons = [...kakaoResult.reasons].sort(
      (a, b) => b.count - a.count
    );
  } else if (platformView === "NAVER") {
    winningPlatformReasons = [...naverResult.reasons].sort(
      (a, b) => b.count - a.count
    );
  } else {
    // DROW: 동점이면 네이버 기준(기존 로직)
    winningPlatformReasons = [...naverResult.reasons].sort(
      (a, b) => b.count - a.count
    );
  }

  const maxReasonCount = Math.max(
    ...winningPlatformReasons.map((r) => r.count)
  );

  // 버튼 텍스트/동작 분기
  let buttonText = "";
  let nextPlatform: PlatformView = "DROW";

  if (platformView === "KAKAO") {
    buttonText = "네이버 결과로 바꾸기";
    nextPlatform = "NAVER";
  } else if (platformView === "NAVER") {
    buttonText = "카카오 결과로 바꾸기";
    nextPlatform = "KAKAO";
  } else {
    buttonText = "카카오 결과로 바꾸기";
    nextPlatform = "KAKAO";
  }

  const handleButtonClick = () => {
    setPlatformView(nextPlatform);
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
      <div className="flex flex-col px-[16px] gap-[12px]">
        {winningPlatformReasons.map((reason) => (
          <ReasonVoteBar
            key={reason.reason}
            label={REASON_LABELS[reason.reason as keyof typeof REASON_LABELS]}
            count={reason.count}
            total={totalVotes}
            maxCountSelected={reason.count === maxReasonCount}
            selected={reason.is_user_voted}
          />
        ))}
      </div>
      <div
        className="flex justify-center items-center mt-[22px] cursor-pointer"
        onClick={handleButtonClick}
      >
        <span className="body-s-regular text-texticon-onnormal-lowemp mr-[8px]">
          {buttonText}
        </span>
        <Icon icon="Switch" size={24} />
      </div>
    </>
  );
}
