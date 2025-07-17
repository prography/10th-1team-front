import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import React from "react";

interface NoVoteStateProps {
  handleVoteClick: () => void;
}

export default function NoVoteState({ handleVoteClick }: NoVoteStateProps) {
  return (
    <>
      <div className="flex flex-col py-[42px] px-[16px] items-center justify-center">
        <div className="mb-[12px]">
          <Icon icon="Empty" size={40} />
        </div>
        <p className="mb-[8px] body-m-semibold text-texticon-onnormal-highemp">
          아직 투표가 없어요
        </p>
        <p className="caption-m-regular text-texticon-onnormal-midemp">
          첫 번째 투표자가 되어주세요
        </p>
      </div>
      <div className="px-[16px] py-[14px] mt-[12px]">
        <Button
          variant={"primary"}
          className="w-full h-[56px]"
          onClick={handleVoteClick}
        >
          투표하기
        </Button>
      </div>
    </>
  );
}
