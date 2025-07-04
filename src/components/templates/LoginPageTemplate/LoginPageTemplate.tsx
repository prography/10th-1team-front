"use client";

import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { useRouter } from "next/navigation";

export default function LoginPageTemplate() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 w-full bg-surface-normal-container0 px-[16px] py-[24px] justify-between">
      <div className="flex flex-col flex-1 items-center justify-center gap-[16px]">
        <Icon icon="ServiceLogo" size={48} />
        <span className="title-l-bold text-texticon-onnormal-highestemp text-center">
          플랫폼 별 리뷰를 <br />한 눈에 비교하고 투표하자
        </span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-[12px] w-full mb-[16px]">
          <IconButton
            variant="brandNaver"
            startIcon={<Icon icon="NaverLogo" size={24} />}
            text="네이버로 계속하기"
            onClick={() => (window.location.href = "/api/auth/naver")}
          />
          <IconButton
            variant="brandKakao"
            startIcon={<Icon icon="KakaoLogo" size={24} />}
            text="카카오로 계속하기"
            onClick={() => (window.location.href = "/api/auth/kakao")}
          />
        </div>
        <Button
          variant="text"
          className="body-s-regular text-texticon-onnormal-lowemp underline underline-offset-2"
          onClick={() => router.push("/")}
        >
          로그인하지 않고 둘러보기
        </Button>
      </div>
    </div>
  );
}
