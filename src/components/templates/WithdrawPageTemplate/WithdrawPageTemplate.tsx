"use client";

import Button from "@/components/atoms/Button/Button";
import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";
import { useState } from "react";
import { colors } from "@/styles/colors";
import DefaultHeader from "@/components/molecules/Header/DefaultHeader";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/apis/user";
import { usePortal, useSheetState } from "@/hooks";
import { AlertModal } from "@/components/molecules/Modal";
import useUserStore from "@/store/useUserStore";

export default function WithdrawPageTemplate() {
  const router = useRouter();
  const createPortal = usePortal();
  const [isAgreed, setIsAgreed] = useState(false);
  const { sheet, open, close } = useSheetState<"withdraw">();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleWithdraw = async () => {
    try {
      await deleteUser();
      clearUser();
      open("withdraw");
    } catch {
      alert("탈퇴에 실패했습니다. 메인으로 이동합니다.");
    }
  };

  const handleClose = () => {
    close();
    router.push("/");
  };

  return (
    <div className="w-full flex flex-col flex-1 items-start justify-between bg-surface-normal-container0">
      <DefaultHeader
        title="회원탈퇴"
        startIcon={<Icon icon="Back" />}
        onClickStartIcon={() => router.back()}
        fullWidth
      />
      <div className="flex flex-col flex-1 px-[16px] py-[24px] gap-[60px] w-full">
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-texticon-onnormal-highestemp text-left title-l-bold">
            탈퇴 안내 및 유의사항
          </h3>
          <p className="text-texticon-onnormal-lowemp text-left body-s-regular">
            탈퇴 시 모든 정보가 사라지며, 되살릴 수 없어요.
          </p>
        </div>

        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[16px] body-s-regular text-texticon-onnormal-highestemp rounded-[8px] p-[20px] bg-surface-normal-container10">
            <div>1. 탈퇴 시 모든 정보가 사라집니다.</div>
            <div>2. 회원 탈퇴 시 서비스 이용이 즉시 불가합니다</div>
            <div>3. 참여한 투표, 저장한 그룹은 즉시 삭제됩니다.</div>
            <div>4. 다시 회원가입시 모든 회원 정보는 복구가 됩니다.</div>
          </div>
          <div className="flex gap-2 items-center">
            <IconButton
              startIcon={
                <Icon
                  icon="Radio"
                  fill={
                    isAgreed ? colors.TextIcon.OnNormal["Main 500"] : undefined
                  }
                  stroke={isAgreed ? colors.TextIcon.OnNormal.White : undefined}
                />
              }
              onClick={() => setIsAgreed(!isAgreed)}
            />
            <span className="body-s-regular">
              위 안내사항을 확인했으며 이에 동의합니다.
            </span>
          </div>
        </div>
      </div>

      <div className="w-full py-[14px] px-[16px] mb-[24px]">
        <Button
          variant="primary"
          fullWidth
          className="py-[16px]"
          disabled={!isAgreed}
          onClick={handleWithdraw}
        >
          탈퇴하기
        </Button>
      </div>

      {sheet === "withdraw" &&
        createPortal(
          <AlertModal
            isOpen={sheet === "withdraw"}
            onClose={handleClose}
            title="회원탈퇴 완료"
            description={`그 동안 이용해주셔서 감사합니다`}
            rightButtonText="확인"
            onRightButtonClick={handleClose}
          />
        )}
    </div>
  );
}
