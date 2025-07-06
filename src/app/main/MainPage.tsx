"use client";

import { useRecommendListQuery } from "@/hooks/queries/useRecommendListQuery";
import MainPageTemplate from "@/components/templates/MainPageTemplate/MainPageTemplate";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import { logout } from "@/apis/login";
import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";
import { getMyInfo } from "@/apis/user";

export default function MainPage() {
  const user = useUserStore((state) => state.user);
  const handleLogout = async () => {
    await logout();
    useUserStore.getState().clearUser();
  };

  const { data: recommendList, isLoading } = useRecommendListQuery({
    size: 3,
  });

  useEffect(() => {
    if (!user) {
      getMyInfo().then((user) => useUserStore.getState().setUser(user));
    }
  }, []);

  return (
    <MainLayout>
      <MainPageTemplate
        user={user}
        items={recommendList ?? []}
        isLoading={isLoading}
        onLogout={handleLogout}
      />
    </MainLayout>
  );
}
