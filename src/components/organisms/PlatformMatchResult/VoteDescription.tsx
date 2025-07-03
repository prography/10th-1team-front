import React from "react";

interface VoteDescriptionProps {
  totalVotes: number;
  winningPlatform: "DROW" | "KAKAO" | "NAVER";
}

export default function VoteDescription({
  totalVotes,
  winningPlatform,
}: VoteDescriptionProps) {
  const displayVotes = totalVotes >= 999 ? "999+" : totalVotes;

  return (
    <div className="flex flex-col justify-center items-center text-texticon-onnormal-highemp body-m-semibold">
      <div className="mb-[4px]">
        {displayVotes}명의 사용자들은{" "}
        {winningPlatform === "KAKAO" ? (
          <span className="text-brand-kakao-main">카카오맵</span>
        ) : winningPlatform === "NAVER" ? (
          <span className="text-brand-naver-main">네이버 지도</span>
        ) : (
          <span>두 플랫폼 모두</span>
        )}{" "}
        리뷰가
      </div>
      더 유용하다고 평가했어요
    </div>
  );
}
