import Button from "@/components/atoms/Button/Button";
import React from "react";

export default function PlatformVote({
  handleVoteClick,
  participantCount = 0,
  isUserVoted = false,
  hasZeroReviews = false,
}: {
  handleVoteClick: () => void;
  participantCount?: number;
  isUserVoted?: boolean;
  hasZeroReviews?: boolean;
}) {
  const formattedCount = participantCount.toLocaleString();

  return hasZeroReviews ? (
    <div className="px-[16px] py-[14px] flex flex-col gap-[12px]">
      <div className="relative min-h-[184px] w-full">
        <object
          className="w-full h-[184px] object-cover"
          data="/images/PlatformVoteDisabled.svg"
          type="image/svg+xml"
          aria-label="platformoteDisabled"
        />
      </div>
      <Button
        variant={"primary"}
        className="w-full h-[56px]"
        onClick={handleVoteClick}
        disabled={hasZeroReviews}
      >
        투표하기
      </Button>
    </div>
  ) : (
    <div className="px-[16px] py-[14px] flex flex-col gap-[12px]">
      <div className="relative min-h-[184px] w-full">
        <object
          className="w-full h-[184px] object-cover"
          data="/images/PlatformVote.svg"
          type="image/svg+xml"
          aria-label="platformVote"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-[20px] text-white">
          <span className="flex items-center justify-center text-texticon-onnormal-lowemp caption-s-semibold">
            {formattedCount}명의 유저들이 이 매치에 참여했어요
          </span>
          <div className="flex items-center justify-center mt-[6px] w-[148px] h-[28px]">
            <object
              data="/images/PlatformVoteText.svg"
              type="image/svg+xml"
              aria-label="platformVoteText"
            />
          </div>
        </div>
      </div>
      <Button
        variant={"primary"}
        className="w-full h-[56px]"
        onClick={handleVoteClick}
        disabled={isUserVoted}
      >
        {isUserVoted ? "투표가 반영되었어요" : "투표하기"}
      </Button>
    </div>
  );
}
