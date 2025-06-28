import Button from "@/components/atoms/Button/Button";
import Image from "next/image";
import React from "react";

export default function PlatformVote({
  handleVoteClick,
}: {
  handleVoteClick: () => void;
}) {
  return (
    <div className="px-[16px] py-[14px] flex flex-col gap-[12px]">
      <Image
        src="/images/PlatformVote.svg"
        alt="platform-vote"
        width={600}
        height={184}
      />
      <Button
        variant={"primary"}
        className="w-full h-[56px]"
        onClick={handleVoteClick}
      >
        투표하기
      </Button>
    </div>
  );
}
