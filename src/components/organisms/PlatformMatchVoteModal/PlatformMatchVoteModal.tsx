"use client";

import React, { useState, useCallback } from "react";
import Icon from "@/components/atoms/Icon/Icon";
import Image from "next/image";
import IconButton from "@/components/molecules/IconButton/IconButton";
import Button from "@/components/atoms/Button/Button";
import { List, ListItem } from "@/components/atoms/List";
import { cn } from "@/utils/cn";
import { useModalStore } from "@/store/useModalStore";
import { getVoteCount } from "@/apis/place";
interface PlatformMatchVoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (platform: "KAKAO" | "NAVER", reasons: string[]) => void;
  handleTabChange: (value: "vote" | "result") => void;
}

const REASONS = [
  { text: "리뷰가 많아요", value: "MANY_REVIEWS" },
  { text: "디테일한 설명이 많아요", value: "DETAILED" },
  { text: "리뷰가 솔직해요", value: "HONEST" },
  { text: "설명이 정확해요", value: "ACCURATE" },
];

const LEVEL_UP_CONDITIONS = {
  LEVEL_2: { voteCount: 1, level: 2 },
  LEVEL_3: { voteCount: 4, level: 3 },
  LEVEL_4: { voteCount: 11, level: 4 },
  LEVEL_5: { voteCount: 20, level: 5 },
} as const;

export default function PlatformMatchVoteModal({
  isOpen,
  onClose,
  onSubmit,
  handleTabChange,
}: PlatformMatchVoteModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlatform, setSelectedPlatform] = useState<
    "KAKAO" | "NAVER" | null
  >(null);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const openModal = useModalStore((state) => state.openModal);

  const getLevelUpImage = useCallback((level: number): string => {
    switch (level) {
      case 2:
        return "/images/Level2.svg";
      case 3:
        return "/images/Level3.svg";
      case 4:
        return "/images/Level4.svg";
      case 5:
        return "/images/Level5.svg";
      default:
        return "/images/Level2.svg";
    }
  }, []);

  // 투표 수 확인 및 레벨업 모달 표시 로직을 추출한 헬퍼 함수
  const checkVoteCountAndShowLevelUp = useCallback(async () => {
    if (step === 3) {
      try {
        const voteCount = await getVoteCount();
        const levelUpCondition = Object.values(LEVEL_UP_CONDITIONS).find(
          (condition) => condition.voteCount === voteCount
        );

        if (levelUpCondition) {
          openModal("levelUp", {
            imageSrc: getLevelUpImage(levelUpCondition.level),
          });
        }
      } catch (error) {
        console.error("투표 수 조회 실패:", error);
      }
    }
  }, [step, openModal, getLevelUpImage]);

  const toggleReason = useCallback((reasonValue: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reasonValue)
        ? prev.filter((r) => r !== reasonValue)
        : [...prev, reasonValue]
    );
  }, []);

  const handleClose = useCallback(async () => {
    setStep(1);
    setSelectedPlatform(null);
    setSelectedReasons([]);
    onClose();
    await checkVoteCountAndShowLevelUp();
  }, [onClose, checkVoteCountAndShowLevelUp]);

  const handleResult = useCallback(async () => {
    handleTabChange("result");
    handleClose();
  }, [handleTabChange, handleClose]);

  const handleSubmit = useCallback(async () => {
    if (selectedPlatform && selectedReasons.length > 0) {
      onSubmit(selectedPlatform, selectedReasons);
      setStep(3);
    }
  }, [selectedPlatform, selectedReasons, onSubmit]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full max-w-[600px] left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl w-[360px] max-w-full p-0 flex flex-col">
        {/* Header */}
        <div className="self-stretch px-[16px] pt-[14px] pb-[10px] border-b border-border-normal-lowemp inline-flex justify-between items-center">
          <h2 className="body-m-regular text-black">매치 투표하기</h2>
          <IconButton onClick={handleClose} endIcon={<Icon icon="Exit" />} />
        </div>
        {/* Step 1: 플랫폼 선택 */}
        {step === 1 && (
          <div className="px-[16px] py-[12px] flex flex-col">
            <div className="flex flex-col mb-[24px]">
              <div className="text-brand-primary-main body-m-semibold mb-[8px]">
                STEP. 1
              </div>
              <div className="text-texticon-onnormal-highestemp title-m-semibold mb-[4px]">
                플랫폼을 선택해주세요
              </div>
              <div className="text-texticon-onnormal-midemp caption-m-regular">
                투표는 한 번만 가능해요. 신중하게 투표해주세요!
              </div>
            </div>
            <div className="flex gap-[12px]">
              <Button
                className={cn(
                  "flex-1 flex flex-col items-center justify-center border rounded-[8px] py-[43px] transition",
                  selectedPlatform === "KAKAO"
                    ? "bg-surface-normal-container-b50 border-brand-primary-main "
                    : "bg-surface-normal-container0 border border-border-normal-highemp text-texticon-onnormal-highemp"
                )}
                onClick={() => setSelectedPlatform("KAKAO")}
              >
                <Icon icon="GraphicsKakao" size={60} />
                <span
                  className={cn(
                    "mt-[12px] body-m-regular",
                    selectedPlatform === "KAKAO"
                      ? "text-body-m-semibold text-texticon-onnormal-main-500"
                      : "text-texticon-onnormal-highemp"
                  )}
                >
                  카카오 맵
                </span>
              </Button>
              <Button
                className={cn(
                  "flex-1 flex flex-col items-center justify-center border rounded-[8px] py-[43px] transition",
                  selectedPlatform === "NAVER"
                    ? "bg-surface-normal-container-b50 border-brand-primary-main"
                    : "bg-surface-normal-container0 border border-border-normal-highemp text-texticon-onnormal-highemp"
                )}
                onClick={() => setSelectedPlatform("NAVER")}
              >
                <Icon icon="GraphicsNaver" size={60} />
                <span
                  className={cn(
                    "mt-[12px] body-m-regular",
                    selectedPlatform === "NAVER"
                      ? "text-body-m-semibold text-texticon-onnormal-main-500"
                      : "text-texticon-onnormal-highemp"
                  )}
                >
                  네이버 지도
                </span>
              </Button>
            </div>
            <div className="flex w-full pt-[14px]">
              <Button
                className="flex-1 h-[56px]"
                variant="primary"
                disabled={!selectedPlatform}
                onClick={() => setStep(2)}
              >
                다음
              </Button>
            </div>
          </div>
        )}
        {/* Step 2: 이유 선택 */}
        {step === 2 && (
          <div className="px-[16px] py-[12px]">
            <div className="flex flex-col mb-[24px]">
              <div className="text-brand-primary-main body-m-semibold mb-[8px]">
                STEP. 2
              </div>
              <div className="text-texticon-onnormal-highestemp title-m-semibold mb-[4px]">
                이유를 선택해주세요
              </div>
              <div className="text-texticon-onnormal-midemp caption-m-regular">
                투표는 한 번만 가능해요. 신중하게 투표해주세요!
              </div>
            </div>
            <List as="ul" className="flex flex-col gap-[8px]">
              {REASONS.map((reason) => (
                <ListItem
                  as="li"
                  key={reason.value}
                  variant="platform-vote"
                  className={cn(
                    "min-h-[44px] pl-[20px] pr-[16px] py-[8px] flex flex-row justify-between items-center body-s-regular cursor-pointer",
                    selectedReasons.includes(reason.value)
                      ? "bg-surface-normal-container-b50 text-texticon-onnormal-main-500 border-brand-primary-main"
                      : "bg-button-neutral-bg_default border border-button-neutral-border text-button-neutral-text_default"
                  )}
                  onClick={() => toggleReason(reason.value)}
                >
                  {reason.text}
                  {selectedReasons.includes(reason.value) && (
                    <IconButton
                      className="flex"
                      endIcon={<Icon size={20} icon="Check" />}
                    />
                  )}
                </ListItem>
              ))}
            </List>
            <div className="flex w-full pt-[14px]">
              <Button
                className="flex-1 h-[56px]"
                variant="primary"
                disabled={selectedReasons.length === 0}
                onClick={handleSubmit}
              >
                완료
              </Button>
            </div>
          </div>
        )}
        {/* Step 3: 투표 완료 */}
        {step === 3 && (
          <div className="px-[16px] py-[12px] flex flex-col">
            <div className="flex flex-col mb-[24px]">
              <div className="text-brand-primary-main body-m-semibold mb-[8px]">
                투표 완료!
              </div>
              <div className="text-texticon-onnormal-highestemp title-m-semibold mb-[4px]">
                소중한 의견, 잘 전달됐어요 :)
              </div>
              <div className="text-texticon-onnormal-midemp caption-m-regular">
                다른 사람들은 어떻게 생각했는지도 확인해보세요.
              </div>
            </div>
            <div className="w-full flex justify-center mb-[12px]">
              <Image
                src="/images/PlatformVoteComplete.svg"
                alt="platform-complete"
                width={600}
                height={184}
                className="min-h-[184px] w-full object-cover rounded-[8px]"
              />
            </div>
            <div className="flex items-center justify-center h-[84px]">
              <IconButton
                className="h-[36px] py-[8px] px-[14px] rounded-[99px] bg-black text-white font-bold text-lg flex items-center justify-center gap-2"
                onClick={handleResult}
                text="결과 확인하러 가기"
                endIcon={<Icon icon="Success" />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
