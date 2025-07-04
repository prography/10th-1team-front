"use client";

import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";
import Button from "@/components/atoms/Button/Button";
import { useRouter } from "next/navigation";

export default function AlreadyLoginTemplate() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col flex-1 items-start justify-between px-[16px] bg-surface-normal-container0">
      <div className="flex flex-col w-full">
        <header className="pt-[24px] pb-[16px]">
          <IconButton
            startIcon={<Icon icon="Back" />}
            onClick={() => router.back()}
          />
        </header>
        <div className="flex flex-col gap-[12px] py-[24px]">
          <h3 className="text-texticon-onnormal-highestemp text-left title-l-bold">
            이미 로그인이 되어있어요
          </h3>
          <p className="text-texticon-onnormal-lowemp text-left body-s-regular">
            홈으로 이동해서 서비스를 계속 이용해주세요.
          </p>
        </div>
      </div>

      <div className="w-full py-[14px] mb-[24px]">
        <Button
          variant="primary"
          fullWidth
          className="py-[16px]"
          onClick={() => router.push("/")}
        >
          홈으로 이동
        </Button>
      </div>
    </div>
  );
}
