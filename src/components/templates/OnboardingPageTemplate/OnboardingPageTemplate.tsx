"use client";

import { UserInfo } from "@/types/user";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button/Button";
import { USER_LEVEL_LABEL } from "@/constants/userLevel";

export default function OnboardingPageTemplate({ user }: { user: UserInfo }) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col flex-1 items-start justify-between px-[16px] bg-surface-normal-container0">
      <div className="flex flex-col py-[24px] gap-[60px] mt-[60px] w-full">
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-texticon-onnormal-highestemp text-left title-l-bold">
            환영합니다 :)
            <br />
            투표에 참여하고 레벨을 높여보세요
          </h3>
          <p className="text-texticon-onnormal-lowemp text-left body-s-regular">
            닉네임이 랜덤으로 설정되었어요.
            <br />
            나중에 내 프로필에서 언제든 수정할 수 있어요.
          </p>
        </div>

        <div className="w-full rounded-[8px] p-[20px] flex flex-col gap-4 bg-surface-normal-container10">
          <div className="flex gap-8">
            <div className="flex flex-col gap-[16px] body-s-regular text-texticon-onnormal-midemp">
              <div>닉네임</div>
              <div>레벨 정보</div>
            </div>
            <div className="flex flex-col gap-[16px] body-s-semibold text-texticon-onnormal-highestemp">
              <div>{user.nickname}</div>
              <div>
                LV.{user.level + 1} {USER_LEVEL_LABEL[user.level]}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-[14px] mb-[24px]">
        <Button
          variant="primary"
          fullWidth
          className="py-[16px]"
          onClick={() => router.push("/")}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}
