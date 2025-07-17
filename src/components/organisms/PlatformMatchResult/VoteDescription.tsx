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
      {winningPlatform === "DROW" ? (
        <div className="text-center">
          두 플랫폼 리뷰의 유용성 매치,
          <br />
          아직은 팽팽한 접전이에요
        </div>
      ) : (
        <>
          <div className="mb-[4px]">
            {displayVotes}명의 사용자들은{" "}
            {winningPlatform === "KAKAO" ? (
              <span className="text-brand-kakao-main">카카오 맵</span>
            ) : (
              <span className="text-brand-naver-main">네이버 지도</span>
            )}{" "}
            리뷰가
          </div>
          더 유용하다고 평가했어요
        </>
      )}
    </div>
  );
}
