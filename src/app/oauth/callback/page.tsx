"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import LocalStorage from "@/utils/localStorage";

export default function OAuthCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectTo = searchParams.get("redirectTo") ?? "/";
    const error = searchParams.get("error");
    const provider = searchParams.get("provider");

    if (provider) {
      LocalStorage.setItem("lastProvider", provider);
    }

    if (error) {
      alert(`로그인에 실패했습니다. 다시 시도해주세요.\n${error}`);
      window.location.replace("/login");
    } else {
      window.location.replace(redirectTo);
    }
  }, [searchParams]);

  return (
    <MainLayout>
      <div className="w-full flex flex-1 bg-surface-normal-container0">
        {/* TODO: 로그인 중 화면 추가 필요 */}
      </div>
    </MainLayout>
  );
}
