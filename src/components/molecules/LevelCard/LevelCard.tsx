import { USER_LEVEL_LABEL } from "@/constants/userLevel";

interface LevelCardProps {
  voteCount: number;
  className?: string;
  isLoading?: boolean;
}

// 레벨업 조건 정의 (PlatformMatchVoteModal에서 가져옴)
const LEVEL_UP_CONDITIONS = {
  LEVEL_1: { voteCount: 0, level: 1 },
  LEVEL_2: { voteCount: 1, level: 2 },
  LEVEL_3: { voteCount: 4, level: 3 },
  LEVEL_4: { voteCount: 11, level: 4 },
  LEVEL_5: { voteCount: 20, level: 5 },
} as const;

export default function LevelCard({
  voteCount,
  className = "",
  isLoading = false,
}: LevelCardProps) {
  // 현재 레벨과 다음 레벨 계산
  const getCurrentLevel = (votes: number): number => {
    if (votes >= LEVEL_UP_CONDITIONS.LEVEL_5.voteCount) return 5;
    if (votes >= LEVEL_UP_CONDITIONS.LEVEL_4.voteCount) return 4;
    if (votes >= LEVEL_UP_CONDITIONS.LEVEL_3.voteCount) return 3;
    if (votes >= LEVEL_UP_CONDITIONS.LEVEL_2.voteCount) return 2;
    return 1;
  };

  const getNextLevelVoteCount = (currentLevel: number): number => {
    switch (currentLevel) {
      case 1:
        return LEVEL_UP_CONDITIONS.LEVEL_2.voteCount;
      case 2:
        return LEVEL_UP_CONDITIONS.LEVEL_3.voteCount;
      case 3:
        return LEVEL_UP_CONDITIONS.LEVEL_4.voteCount;
      case 4:
        return LEVEL_UP_CONDITIONS.LEVEL_5.voteCount;
      default:
        return LEVEL_UP_CONDITIONS.LEVEL_5.voteCount;
    }
  };

  const getCurrentLevelVoteCount = (currentLevel: number): number => {
    switch (currentLevel) {
      case 1:
        return LEVEL_UP_CONDITIONS.LEVEL_1.voteCount;
      case 2:
        return LEVEL_UP_CONDITIONS.LEVEL_2.voteCount;
      case 3:
        return LEVEL_UP_CONDITIONS.LEVEL_3.voteCount;
      case 4:
        return LEVEL_UP_CONDITIONS.LEVEL_4.voteCount;
      case 5:
        return LEVEL_UP_CONDITIONS.LEVEL_5.voteCount;
      default:
        return 0;
    }
  };

  const currentLevel = getCurrentLevel(voteCount);
  const nextLevelVoteCount = getNextLevelVoteCount(currentLevel);
  const currentLevelVoteCount = getCurrentLevelVoteCount(currentLevel);

  // 진행률 계산 (최대 레벨인 경우 100%)
  const isMaxLevel = currentLevel === 5;
  const progress = isMaxLevel
    ? 100
    : ((voteCount - currentLevelVoteCount) /
        (nextLevelVoteCount - currentLevelVoteCount)) *
      100;

  // 스켈레톤 UI 렌더링
  if (isLoading) {
    return (
      <div
        className={`bg-surface-normal-container0 rounded-[8px] pt-[15px] pb-[22px] px-[24px] border border-border-normal-lowemp ${className}`}
      >
        {/* 레벨 표시 스켈레톤 */}
        <div className="mb-[8px]">
          <div className="w-[40px] h-[14px] bg-surface-normal-container-b10 rounded animate-pulse" />
        </div>

        {/* 레벨 라벨 스켈레톤 */}
        <div className="mb-[5px]">
          <div className="w-[80px] h-[20px] bg-surface-normal-container-b10 rounded animate-pulse" />
        </div>

        {/* 진행률 바 스켈레톤 */}
        <div className="relative mb-[2px]">
          <div className="w-full h-[8px] bg-surface-normal-container-b10 rounded-full overflow-hidden">
            <div className="h-full w-[60%] bg-surface-normal-container-b20 rounded-full animate-pulse" />
          </div>
        </div>

        {/* 투표 수량 표시 스켈레톤 */}
        <div className="flex justify-between">
          <div className="w-[20px] h-[14px] bg-surface-normal-container-b10 rounded animate-pulse" />
          <div className="w-[30px] h-[14px] bg-surface-normal-container-b10 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-surface-normal-container0 rounded-[8px] pt-[15px] pb-[22px] px-[24px] border border-border-normal-lowemp ${className}`}
    >
      {/* 레벨 표시 */}
      <div className="caption-m-semibold text-texticon-onnormal-highemp body-s-semibold mb-[8px]">
        LV.0{currentLevel}
      </div>

      {/* 레벨 라벨 */}
      <div className="body-m-semibold text-texticon-onnormal-highestemp title-s-bold mb-[5px]">
        {USER_LEVEL_LABEL[currentLevel - 1]}
      </div>

      {/* 진행률 바 */}
      <div className="relative mb-[2px]">
        <div className="w-full h-[8px] bg-surface-normal-container-b10 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-primary-light rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 투표 수량 표시 */}
      <div className="caption-m-regular flex justify-between text-texticon-onnormal-highemp">
        <span>{currentLevelVoteCount}</span>
        <span>{isMaxLevel ? voteCount : nextLevelVoteCount}</span>
      </div>
    </div>
  );
}
