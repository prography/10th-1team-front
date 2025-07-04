import Image from "next/image";
import React from "react";

interface VoteResultDisplayProps {
  winningPlatform: "DROW" | "KAKAO" | "NAVER";
  kakaoResult: { count: number };
  naverResult: { count: number };
}

export default function VoteResultDisplay({
  winningPlatform,
  kakaoResult,
  naverResult,
}: VoteResultDisplayProps) {
  const getImageSrc = () => {
    if (winningPlatform === "KAKAO") return "/images/kakaoWin.svg";
    if (winningPlatform === "NAVER") return "/images/naverWin.svg";
    return "/images/drow.svg";
  };

  const getImageAlt = () => {
    if (winningPlatform === "KAKAO") return "kakaoWin";
    if (winningPlatform === "NAVER") return "naverWin";
    return "draw";
  };

  const formatVoteCount = (count: number) => {
    return count >= 999 ? "999+" : count;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <Image
          className="w-full h-full"
          src={getImageSrc()}
          alt={getImageAlt()}
          width={328}
          height={130}
        />
      </div>
      <div className="flex w-full mb-[20px]">
        <div className="flex-1">
          <div className="flex justify-center caption-m-semibold">카카오맵</div>
          <div className="flex justify-center items-center caption-s-regular">
            {formatVoteCount(kakaoResult.count)}표
          </div>
        </div>
        <div className="flex-1 ">
          <div className="flex justify-center caption-m-semibold">
            네이버지도
          </div>
          <div className="flex justify-center items-center caption-s-regular">
            {formatVoteCount(naverResult.count)}표
          </div>
        </div>
      </div>
    </div>
  );
}
