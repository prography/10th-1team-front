import Tabs from "@/components/organisms/Tabs/Tabs";
import PlatformVote from "@/components/organisms/PlatformVote/PlatformVote";
import PlatformMatchResult from "@/components/organisms/PlatformMatchResult/PlatformMatchResult";
import PlatformMatchVoteModal from "@/components/organisms/PlatformMatchVoteModal/PlatformMatchVoteModal";
import { useState } from "react";

export default function PlatformMatch() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleVoteClick = () => {
    setModalOpen(true);
  };

  const tabItems = [
    {
      label: "투표 참여하기",
      value: "vote",
      content: <PlatformVote handleVoteClick={handleVoteClick} />,
    },
    {
      label: "결과 확인하기",
      value: "result",
      content: <PlatformMatchResult handleVoteClick={handleVoteClick} />,
    },
  ];
  return (
    <div className="bg-surface-normal-bg01 py-[16px] w-full max-w-full overflow-hidden">
      <div className="px-[16px] gap-[12px] flex flex-col">
        <h2 className="body-m-semibold ">플랫폼 매치</h2>
        <div className="gap-[4px] flex flex-col">
          <p className="body-l-semibold text-texticon-onnormal-highemp">
            어느쪽 리뷰가 더 신뢰가나요?
          </p>
          <p className="caption-m-regular text-texticon-onnormal-midemp">
            더 유용한 정보를 제공한 플랫폼과 이유를 투표해주세요
          </p>
        </div>
      </div>
      <Tabs items={tabItems} />
      <PlatformMatchVoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={() => setModalOpen(false)}
      />
    </div>
  );
}
